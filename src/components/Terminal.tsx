import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, Minus, Square, Play } from "lucide-react";

interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: string;
}

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 1,
      type: 'output',
      content: 'Welcome to Developer Terminal',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'output',
      content: 'Type "help" for available commands',
      timestamp: new Date().toISOString()
    },
    {
      id: 3,
      type: 'input',
      content: '$ npm run dev',
      timestamp: new Date().toISOString()
    },
    {
      id: 4,
      type: 'output',
      content: '> vite dev --host :: --port 8080',
      timestamp: new Date().toISOString()
    },
    {
      id: 5,
      type: 'output',
      content: '✓ Server running at http://localhost:8080',
      timestamp: new Date().toISOString()
    }
  ]);

  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (command: string) => {
    if (command.trim() === '') return;

    const newInputLine: TerminalLine = {
      id: lines.length + 1,
      type: 'input',
      content: `$ ${command}`,
      timestamp: new Date().toISOString()
    };

    let outputLine: TerminalLine;

    // Mock command responses
    switch (command.toLowerCase()) {
      case 'help':
        outputLine = {
          id: lines.length + 2,
          type: 'output',
          content: 'Available commands: help, clear, ls, pwd, npm, git, status',
          timestamp: new Date().toISOString()
        };
        break;
      case 'clear':
        setLines([]);
        setCurrentInput("");
        return;
      case 'ls':
        outputLine = {
          id: lines.length + 2,
          type: 'output',
          content: 'src/  package.json  README.md  tsconfig.json  vite.config.ts',
          timestamp: new Date().toISOString()
        };
        break;
      case 'pwd':
        outputLine = {
          id: lines.length + 2,
          type: 'output',
          content: '/home/developer/project',
          timestamp: new Date().toISOString()
        };
        break;
      case 'status':
        outputLine = {
          id: lines.length + 2,
          type: 'output',
          content: 'Status: ✓ Development server running\n✓ TypeScript compiled successfully\n✓ No lint errors',
          timestamp: new Date().toISOString()
        };
        break;
      default:
        outputLine = {
          id: lines.length + 2,
          type: 'error',
          content: `Command not found: ${command}`,
          timestamp: new Date().toISOString()
        };
    }

    setLines(prev => [...prev, newInputLine, outputLine]);
    setCurrentInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    }
  };

  return (
    <div className="flex flex-col h-full bg-terminal-bg">
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 bg-card border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="w-4 h-4 p-0 rounded-full bg-destructive hover:bg-destructive/80">
              <X size={8} className="text-destructive-foreground" />
            </Button>
            <Button variant="ghost" size="sm" className="w-4 h-4 p-0 rounded-full bg-terminal-yellow hover:bg-terminal-yellow/80">
              <Minus size={8} className="text-background" />
            </Button>
            <Button variant="ghost" size="sm" className="w-4 h-4 p-0 rounded-full bg-terminal-green hover:bg-terminal-green/80">
              <Square size={6} className="text-background" />
            </Button>
          </div>
          <span className="text-sm font-mono text-terminal-text">Terminal</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <Play size={12} className="text-terminal-green" />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <ScrollArea className="flex-1 p-3" ref={scrollRef}>
        <div className="space-y-1 font-mono text-sm">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`${
                line.type === 'input'
                  ? 'text-terminal-text'
                  : line.type === 'error'
                  ? 'text-terminal-red'
                  : 'text-terminal-green'
              } whitespace-pre-wrap`}
            >
              {line.content}
            </div>
          ))}
          
          {/* Current Input Line */}
          <div className="flex items-center text-terminal-text">
            <span className="text-terminal-blue mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none font-mono text-terminal-text caret-terminal-green"
              placeholder="Введите команду..."
              autoFocus
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};