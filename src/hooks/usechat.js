"use client";

import { useState } from "react";

export default function useChat() {
  const structuredOnlyTypes = new Set([
    "education",
    "experience",
    "achievements",
    "hobbies",
  ]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState(false);

  const resetChat = () => {
    setChatMode(false);
    setMessages([]);
  };

  const appendLocalSection = (userPrompt, aiText, type) => {
    setMessages(prev => [
      ...prev,
      { role: "user", text: userPrompt },
      { role: "ai", text: aiText },
      { role: "ai", type }
    ]);
  };

  const sendMessage = (text) => {

    const userText = text || input;

    if (!userText.trim()) return;

    setChatMode(true);

    setInput("");
    if(userText === "Me"){
    appendLocalSection("Tell me about yourself.", "Here's a little about me.", "profile");

    return;
   }
   if(userText === "Skills"){
   appendLocalSection("What technologies do you work with?", "Here are the technologies I work with.", "skills");

   return;
  }
  if(userText === "Contacts"){
  appendLocalSection("How can I reach you?", "You can reach me here.", "contact");

  return;
}

    /* -------------------------
       PROJECTS MESSAGE
    ------------------------- */

    if (userText === "Projects") {
      appendLocalSection("What projects have you worked on?", "I have built many projects like following:", "projects");

      return;
    }

    /* -------------------------
       RESUME MESSAGE
    ------------------------- */

    if (userText === "Resume") {
      appendLocalSection("Show me your resume.", "You can view or download my resume below.", "resume");

      return;
    }

    /* -------------------------
       NORMAL TEXT MESSAGE
    ------------------------- */

   setMessages(prev => [
  ...prev,
  { role: "user", text: userText },
]);

setIsTyping(true);

fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: userText }),
})
  .then(async (res) => {
    const data = await res.json();

    const nextMessages = [];

    if (!structuredOnlyTypes.has(data.action)) {
      nextMessages.push({
        role: "ai",
        text: data.reply || "I could not generate a response right now.",
      });
    }

    if (data.action) {
      nextMessages.push({
        role: "ai",
        type: data.action,
      });
    }

    setMessages(prev => [...prev, ...nextMessages]);
  })
  .catch(() => {
    setMessages(prev => [
      ...prev,
      {
        role: "ai",
        text: "Something went wrong. Please try again.",
      },
    ]);
  })
  .finally(() => {
    setIsTyping(false);
  });



  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isTyping,
    chatMode,
    setChatMode,
    resetChat
  };
}
