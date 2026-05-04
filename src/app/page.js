"use client";

import useChat from "@/hooks/usechat";
import useTheme from "@/hooks/usetheme";

import ChatMessages from "@/components/chat/chatmessages";
import ChatInput from "@/components/chat/chatinput";
import PromptButtons from "@/components/chat/promtbutton";
import CanvasCursor from "@/components/cursor/canvascursor";
import FluidCursor from "@/components/cursor/fluidcursor";

import HeroIntro from "@/components/hero/herointro";
import Lamp from "@/components/lamp/lamp";
import LightCone from "@/components/lamp/lightcone";
import AvatarContainer from "@/components/avatar/Avatarcontainer";

export default function Home() {
  const { messages, input, setInput, sendMessage, chatMode, resetChat } = useChat();
  const { lampOn, bounce, toggleLamp } = useTheme();

  return (
    <main
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: lampOn ? "#fff" : "#000",
        color: lampOn ? "#000" : "#fff",
        transition: "background-color .2s ease",
        position: "relative",
      }}
    >

      {/* ── TOP: Lamp (fixed height zone) ── */}
      {!chatMode && (
        <div style={{ position: "relative", width: "100%", height: "160px", flexShrink: 0 }}>
          <Lamp lampOn={lampOn} toggleLamp={toggleLamp} bounce={bounce} />
          {lampOn && <LightCone lampOn={lampOn} />}
        </div>
      )}

      <div
        style={{
          width: "100%",
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: 0,
          padding: chatMode ? "18px 0 12px" : "0",
          gap: chatMode ? "18px" : "0",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1400px",
            flex: chatMode ? "0 0 auto" : "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: chatMode ? "90px" : 0,
            zIndex: 0,
          }}
        >
          {!chatMode && <HeroIntro lampOn={lampOn} />}
          <AvatarContainer lampOn={lampOn} chatMode={chatMode} resetChat={resetChat} />
        </div>

        {chatMode && (
          <div
            style={{
              width: "100%",
              maxWidth: "1000px",
              flex: "1 1 auto",
              minHeight: 0,
              display: "flex",
              justifyContent: "center",
              padding: "0 16px",
              zIndex: 0,
            }}
          >
            <ChatMessages messages={messages} lampOn={lampOn} />
          </div>
        )}
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          padding: "0 16px 28px",
          zIndex: 6,
        }}
      >
        <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} lampOn={lampOn} />
        <PromptButtons sendMessage={sendMessage} lampOn={lampOn} />
      </div>

      {lampOn && <FluidCursor />}
      {!lampOn && <CanvasCursor />}
    </main>
  );
}
