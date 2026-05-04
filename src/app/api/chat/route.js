import { GoogleGenerativeAI } from "@google/generative-ai";

import assistantplan from "@/data/assistantplan";
import profile from "@/data/profile";
import projects from "@/data/projects";
import contacts from "@/data/contacts";
import skillGroups from "@/data/skills";
import resumeText from "@/data/resumeText";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const directActionPriority = [
  "resume",
  "education",
  "experience",
  "achievements",
  "hobbies",
  "projects",
  "skills",
  "contact",
  "profile"
];
const requestLog = new Map();
const aiRequestLog = new Map();
const responseCache = new Map();

const REQUEST_WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const AI_REQUEST_WINDOW_MS = 10 * 60 * 1000;
const MAX_AI_REQUESTS_PER_WINDOW = 8;
const MAX_MESSAGE_LENGTH = 300;
const CACHE_TTL_MS = 30 * 60 * 1000;

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getClientIp(req) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return realIp || "unknown";
}

function normalizeMessage(message) {
  return message.trim().toLowerCase().replace(/\s+/g, " ");
}

function pruneOldEntries(store, now, windowMs) {
  for (const [key, entries] of store.entries()) {
    const filteredEntries = entries.filter((timestamp) => now - timestamp < windowMs);

    if (filteredEntries.length) {
      store.set(key, filteredEntries);
    } else {
      store.delete(key);
    }
  }
}

function isRateLimited(store, key, now, windowMs, maxRequests) {
  pruneOldEntries(store, now, windowMs);

  const currentEntries = store.get(key) || [];

  if (currentEntries.length >= maxRequests) {
    return true;
  }

  currentEntries.push(now);
  store.set(key, currentEntries);
  return false;
}

function getCachedResponse(cacheKey) {
  const cached = responseCache.get(cacheKey);
  if (!cached) return null;

  if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
    responseCache.delete(cacheKey);
    return null;
  }

  return cached.data;
}

function setCachedResponse(cacheKey, data) {
  responseCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });
}

function matchesKeyword(text, keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) return false;

  if (normalizedKeyword.includes(" ") || normalizedKeyword.length <= 3) {
    return new RegExp(`\\b${escapeRegex(normalizedKeyword)}\\b`, "i").test(text);
  }

  return text.includes(normalizedKeyword);
}

function getWords(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function getEditDistance(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i++) dp[i][0] = i;
  for (let j = 0; j < cols; j++) dp[0][j] = j;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

function matchesKeywordLoosely(text, keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase();
  if (!normalizedKeyword || normalizedKeyword.includes(" ")) return false;
  if (normalizedKeyword.length < 5) return false;

  const words = getWords(text);
  return words.some((word) => {
    if (Math.abs(word.length - normalizedKeyword.length) > 1) return false;
    return getEditDistance(word, normalizedKeyword) <= 1;
  });
}

function detectDirectAction(message) {
  const text = message.trim().toLowerCase();
  let bestMatch = null;

  for (const key of directActionPriority) {
    const item = assistantplan.directActions[key];
    if (!item) continue;

    const matchedKeywords = item.keywords.filter(
      (keyword) => matchesKeyword(text, keyword) || matchesKeywordLoosely(text, keyword)
    );

    if (!matchedKeywords.length) continue;

    const strongestKeywordLength = Math.max(
      ...matchedKeywords.map((keyword) => keyword.trim().length)
    );

    if (
      !bestMatch ||
      strongestKeywordLength > bestMatch.strongestKeywordLength
    ) {
      bestMatch = {
        reply: item.reply,
        action: item.action,
        strongestKeywordLength,
      };
    }
  }

  if (!bestMatch) return null;

  return {
    reply: bestMatch.reply,
    action: bestMatch.action,
  };
}

function inferActionFromReply(reply) {
  const text = reply.toLowerCase();

  if (
    text.includes("project") ||
    text.includes("built") ||
    text.includes("portfolio work")
  ) {
    return "projects";
  }

  if (
    text.includes("skill") ||
    text.includes("tech stack") ||
    text.includes("technology")
  ) {
    return "skills";
  }

  if (
    text.includes("resume") ||
    text.includes("cv")
  ) {
    return "resume";
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("linkedin") ||
    text.includes("github")
  ) {
    return "contact";
  }

  if (
    text.includes("i am") ||
    text.includes("developer") ||
    text.includes("about")
  ) {
    return "profile";
  }

  return null;
}

export async function POST(req) {
  
  try {
    const body = await req.json();
    const userMessage = body.message?.trim();
    const normalizedMessage = normalizeMessage(userMessage || "");
    const clientIp = getClientIp(req);
    const now = Date.now();

    if (!userMessage) {
      return Response.json(
        {
          reply: "Please enter a message.",
          action: null,
        },
        { status: 400 }
      );
    }

    if (userMessage.length > MAX_MESSAGE_LENGTH) {
      return Response.json(
        {
          reply: "Please keep your message under 300 characters.",
          action: null,
        },
        { status: 400 }
      );
    }

    if (
      isRateLimited(
        requestLog,
        clientIp,
        now,
        REQUEST_WINDOW_MS,
        MAX_REQUESTS_PER_WINDOW
      )
    ) {
      return Response.json(
        {
          reply: "Too many requests right now. Please wait a few minutes and try again.",
          action: null,
        },
        { status: 429 }
      );
    }

    const directMatch = detectDirectAction(userMessage);

    if (directMatch) {
      return Response.json(directMatch);
    }

    const cachedResponse = getCachedResponse(normalizedMessage);
    if (cachedResponse) {
      return Response.json(cachedResponse);
    }

    if (
      isRateLimited(
        aiRequestLog,
        clientIp,
        now,
        AI_REQUEST_WINDOW_MS,
        MAX_AI_REQUESTS_PER_WINDOW
      )
    ) {
      return Response.json(
        {
          reply: "I can answer a few AI questions at a time. Please try again in a little while.",
          action: null,
        },
        { status: 429 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    

    const prompt = `
You are ${assistantplan.role}.

Goal:
${assistantplan.goal}

Tone:
${assistantplan.tone.join(", ")}

Rules:
${assistantplan.rules.map((rule) => `- ${rule}`).join("\n")}

Allowed topics:
${assistantplan.allowedTopics.join(", ")}

Fallback reply:
${assistantplan.fallback}

Portfolio profile:
${JSON.stringify(profile, null, 2)}

Projects:
${JSON.stringify(projects, null, 2)}

Skills:
${JSON.stringify(skillGroups, null, 2)}

Contacts:
${JSON.stringify(contacts, null, 2)}

Resume:
${JSON.stringify(resumeText, null, 2)}

User question:
${userMessage}

Instructions:
- Answer only from the provided portfolio and resume data.
- Do not invent missing details.
-If exact answer is not found, try to answer using related information.
Only use fallback if nothing relevant exists. , reply exactly with:
"${assistantplan.fallback}"
- Keep the answer concise and natural.
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim() || assistantplan.fallback;
    const action = inferActionFromReply(reply);
    const payload = {
      reply,
      action,
    };

    setCachedResponse(normalizedMessage, payload);
   
    return Response.json(payload);
  } catch (error) {
    console.error("Chat API error:", error);

    return Response.json(
      {
        reply: assistantplan.fallback,
        action: null,
      },
      { status: 500 }
    );
  }
}

