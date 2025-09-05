import { GitBranch, Wifi, Zap, AlertCircle, CheckCircle } from "lucide-react";

export const StatusBar = () => {
  return (
    <div className="h-6 bg-primary text-primary-foreground flex items-center justify-between px-4 text-xs font-mono">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <GitBranch size={12} />
          <span>main</span>
        </div>
        <div className="flex items-center space-x-1">
          <CheckCircle size={12} className="text-terminal-green" />
          <span>TypeScript: OK</span>
        </div>
        <div className="flex items-center space-x-1">
          <Zap size={12} className="text-terminal-yellow" />
          <span>Live Server</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span>Строка 42, Стб 12</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>UTF-8</span>
        </div>
        <div className="flex items-center space-x-1">
          <Wifi size={12} />
          <span>Подключено</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
          <span>14:42</span>
        </div>
      </div>
    </div>
  );
};