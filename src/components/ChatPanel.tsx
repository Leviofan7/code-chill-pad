import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'developer' | 'system';
  timestamp: string;
  avatar?: string;
}

export const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Добро пожаловать в Developer Chat! Здесь вы можете общаться с командой разработчиков.",
      sender: 'system',
      timestamp: '14:30'
    },
    {
      id: 2,
      text: "Привет! Есть вопросы по новому функционалу?",
      sender: 'developer',
      timestamp: '14:32'
    },
    {
      id: 3,
      text: "Да, хотел обсудить API интеграцию",
      sender: 'user',
      timestamp: '14:35'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <h3 className="font-semibold text-sm flex items-center">
          <div className="w-2 h-2 bg-terminal-green rounded-full mr-2"></div>
          Developer Chat
        </h3>
        <p className="text-xs text-muted-foreground mt-1">3 участника онлайн</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {msg.sender !== 'user' && (
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {msg.sender === 'system' ? 'S' : 'D'}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className="flex flex-col">
                  <div
                    className={`px-3 py-2 rounded-lg text-sm ${
                      msg.sender === 'user'
                        ? 'bg-chat-bubble-own text-primary-foreground'
                        : msg.sender === 'system'
                        ? 'bg-muted text-muted-foreground border border-border'
                        : 'bg-chat-bubble text-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-1">
            <Paperclip size={16} className="text-muted-foreground" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите сообщение..."
            className="flex-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
          <Button variant="ghost" size="sm" className="p-1">
            <Smile size={16} className="text-muted-foreground" />
          </Button>
          <Button 
            onClick={handleSendMessage}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            <Send size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};