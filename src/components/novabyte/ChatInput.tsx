import { Send } from "lucide-react";
import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ onSend, disabled, placeholder }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto relative">
        <input
          type="text"
          disabled={disabled}
          placeholder={placeholder || "Type a message..."}
          className="w-full bg-nova-white-5 border border-nova-white-10 rounded-2xl py-4 pl-6 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all disabled:opacity-50"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-xl hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} className="text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};
