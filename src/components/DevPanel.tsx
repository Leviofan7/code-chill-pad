import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatPanel } from "@/components/ChatPanel";
import { Terminal } from "@/components/Terminal";
import { FileExplorer } from "@/components/FileExplorer";
import { CodeEditor } from "@/components/CodeEditor";
import { StatusBar } from "@/components/StatusBar";

interface EditorTab {
  id: string;
  name: string;
  content: string;
  language: string;
  modified: boolean;
}

export const DevPanel = () => {
  const [activePanel, setActivePanel] = useState<'chat' | 'terminal' | 'files'>('chat');
  const [openFiles, setOpenFiles] = useState<EditorTab[]>([
    {
      id: '1',
      name: 'DevPanel.tsx',
      language: 'typescript',
      modified: true,
      content: `import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatPanel } from "@/components/ChatPanel";

export const DevPanel = () => {
  const [activePanel, setActivePanel] = useState<'chat' | 'terminal'>('chat');

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />
      {/* Main content area */}
      <div className="flex-1">
        {activePanel === 'chat' && <ChatPanel />}
        {activePanel === 'terminal' && <Terminal />}
      </div>
    </div>
  );
};`
    }
  ]);

  const handleFileOpen = (fileName: string, content: string = '') => {
    const fileExtension = fileName.split('.').pop();
    let language = 'text';
    
    switch (fileExtension) {
      case 'tsx':
      case 'ts':
        language = 'typescript';
        break;
      case 'js':
      case 'jsx':
        language = 'javascript';
        break;
      case 'css':
        language = 'css';
        break;
      case 'json':
        language = 'json';
        break;
      case 'md':
        language = 'markdown';
        break;
    }

    const existingFile = openFiles.find(f => f.name === fileName);
    if (!existingFile) {
      const newFile: EditorTab = {
        id: Date.now().toString(),
        name: fileName,
        content: content || `// Содержимое файла ${fileName}\n// Начните редактирование...`,
        language,
        modified: false
      };
      setOpenFiles([...openFiles, newFile]);
    }
  };

  const handleFileClose = (fileId: string) => {
    setOpenFiles(openFiles.filter(f => f.id !== fileId));
  };

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
            {activePanel === 'files' && <FileExplorer onFileOpen={handleFileOpen} />}
            {activePanel === 'chat' && <ChatPanel />}
            {activePanel === 'terminal' && <Terminal />}
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 bg-editor-bg">
            <CodeEditor 
              tabs={openFiles} 
              onFileClose={handleFileClose}
              onFileChange={(fileId, content) => {
                setOpenFiles(openFiles.map(f => 
                  f.id === fileId ? { ...f, content, modified: true } : f
                ));
              }}
            />
          </div>
        </div>

        {/* Status Bar */}
        <StatusBar />
      </div>
    </div>
  );
};