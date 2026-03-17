import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { NovaBadge } from "./Badge";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { ThemeToggle } from "./ThemeToggle";

export interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  options?: string[];
}

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  inputDisabled: boolean;
  inputPlaceholder?: string;
  onOptionClick: (option: string) => void;
  onSendMessage: (message: string) => void;
}

export const ChatWindow = ({
  messages,
  isTyping,
  inputDisabled,
  inputPlaceholder,
  onOptionClick,
  onSendMessage,
}: ChatWindowProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const lastMsg = messages[messages.length - 1];
  const hasOptions = lastMsg?.options && lastMsg.options.length > 0;

  return (
    <main className="flex-1 flex flex-col relative bg-[radial-gradient(ellipse_at_top,_hsl(217_91%_60%/0.06),_transparent_60%)]">
      <header className="h-14 border-b border-nova-white-5 flex items-center px-8 justify-between backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-primary" />
          <h2 className="text-sm font-semibold tracking-wide">Onboarding Assistant</h2>
        </div>
        <NovaBadge>Active Session</NovaBadge>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              options={msg.role === "assistant" && msg.id === lastMsg?.id ? msg.options : undefined}
              onOptionClick={onOptionClick}
            />
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>

      <ChatInput
        onSend={onSendMessage}
        disabled={inputDisabled || !!hasOptions}
        placeholder={hasOptions ? "Select an option above..." : inputPlaceholder}
      />
    </main>
  );
};
