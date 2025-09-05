import { useState } from "react";
import { Save, Play, Bug, Settings, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EditorTab {
  id: string;
  name: string;
  content: string;
  language: string;
  modified: boolean;
}

interface CodeEditorProps {
  tabs?: EditorTab[];
  onFileClose?: (fileId: string) => void;
  onFileChange?: (fileId: string, content: string) => void;
}

export const CodeEditor = ({ tabs = [], onFileClose, onFileChange }: CodeEditorProps) => {
  const [defaultTabs] = useState<EditorTab[]>([
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
    },
    {
      id: '2',
      name: 'index.css',
      language: 'css',
      modified: false,
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217 91% 60%;
  }
}`
    }
  ]);

  const currentTabs = tabs.length > 0 ? tabs : defaultTabs;
  const [activeTab, setActiveTab] = useState(currentTabs[0]?.id || '1');

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'typescript':
        return 'text-terminal-blue';
      case 'css':
        return 'text-terminal-purple';
      case 'json':
        return 'text-terminal-yellow';
      default:
        return 'text-foreground';
    }
  };

  const renderSyntaxHighlighted = (code: string, language: string) => {
    // Simple syntax highlighting for demo
    const lines = code.split('\n');
    return lines.map((line, index) => {
      let highlightedLine = line;
      
      if (language === 'typescript') {
        // Keywords
        highlightedLine = highlightedLine.replace(
          /(import|export|const|let|var|function|return|if|else|from)/g,
          '<span class="text-terminal-purple">$1</span>'
        );
        // Strings
        highlightedLine = highlightedLine.replace(
          /"([^"]*)"/g,
          '<span class="text-terminal-green">"$1"</span>'
        );
        // Comments
        highlightedLine = highlightedLine.replace(
          /(\/\/.*)/g,
          '<span class="text-muted-foreground">$1</span>'
        );
      }

      return (
        <div key={index} className="flex">
          <span className="text-muted-foreground text-xs w-8 text-right mr-4 select-none">
            {index + 1}
          </span>
          <span 
            className="flex-1" 
            dangerouslySetInnerHTML={{ __html: highlightedLine || '&nbsp;' }}
          />
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Save size={16} className="mr-1" />
              Сохранить
            </Button>
            <Button variant="ghost" size="sm">
              <Play size={16} className="mr-1 text-terminal-green" />
              Запустить
            </Button>
            <Button variant="ghost" size="sm">
              <Bug size={16} className="mr-1 text-terminal-red" />
              Отладка
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground font-mono">
            TypeScript React
          </span>
          <Button variant="ghost" size="sm">
            <Settings size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      {currentTabs.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start rounded-none bg-card border-b border-border h-10 px-2">
            {currentTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="px-3 py-1.5 text-xs font-mono data-[state=active]:bg-editor-bg rounded-t border-t border-l border-r border-border data-[state=active]:border-b-editor-bg relative group"
              >
                <span className={getLanguageColor(tab.language)}>
                  {tab.name}
                </span>
                {tab.modified && (
                  <span className="w-2 h-2 bg-terminal-yellow rounded-full ml-2"></span>
                )}
                {onFileClose && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-4 h-4 p-0 ml-2 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground rounded-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onFileClose(tab.id);
                    }}
                  >
                    <X size={10} />
                  </Button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {currentTabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="flex-1 m-0 p-4 bg-editor-bg font-mono text-sm overflow-auto"
          >
            <div className="space-y-0.5">
              {renderSyntaxHighlighted(tab.content, tab.language)}
            </div>
          </TabsContent>
        ))}
        </Tabs>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-editor-bg">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-mono">Добро пожаловать в редактор</p>
            <p className="text-sm mt-2">Выберите файл для редактирования</p>
          </div>
        </div>
      )}
    </div>
  );
};