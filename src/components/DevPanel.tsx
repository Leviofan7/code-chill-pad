import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatPanel } from "@/components/ChatPanel";
import { Terminal } from "@/components/Terminal";
import { FileExplorer } from "@/components/FileExplorer";
import { CodeEditor } from "@/components/CodeEditor";
import { StatusBar } from "@/components/StatusBar";

export const DevPanel = () => {
  const [activePanel, setActivePanel] = useState<'chat' | 'terminal' | 'files'>('chat');

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-10 bg-card border-b border-border flex items-center px-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
          </div>
          <div className="ml-4 text-sm text-muted-foreground font-mono">
            Developer Console v2.0
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex-1 flex">
          {/* Left Panel - Files/Chat/Terminal Switcher */}
          <div className="w-80 bg-card border-r border-border flex flex-col">
            {activePanel === 'files' && <FileExplorer />}
            {activePanel === 'chat' && <ChatPanel />}
            {activePanel === 'terminal' && <Terminal />}
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 bg-editor-bg">
            <CodeEditor />
          </div>
        </div>

        {/* Status Bar */}
        <StatusBar />
      </div>
    </div>
  );
};