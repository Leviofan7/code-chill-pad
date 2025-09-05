import { MessageCircle, Terminal, Folder, Settings, Code, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  activePanel: 'chat' | 'terminal' | 'files';
  onPanelChange: (panel: 'chat' | 'terminal' | 'files') => void;
}

export const Sidebar = ({ activePanel, onPanelChange }: SidebarProps) => {
  const menuItems = [
    { id: 'files' as const, icon: Folder, label: 'Файлы', color: 'text-terminal-blue' },
    { id: 'chat' as const, icon: MessageCircle, label: 'Чат', color: 'text-primary' },
    { id: 'terminal' as const, icon: Terminal, label: 'Терминал', color: 'text-terminal-green' },
  ];

  const bottomItems = [
    { icon: Code, label: 'Код', color: 'text-terminal-purple' },
    { icon: Activity, label: 'Активность', color: 'text-terminal-yellow' },
    { icon: Settings, label: 'Настройки', color: 'text-muted-foreground' },
  ];

  return (
    <div className="w-12 bg-card border-r border-border flex flex-col items-center py-2">
      {/* Logo */}
      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-glow">
        <Code size={18} className="text-primary-foreground" />
      </div>

      {/* Main Menu Items */}
      <div className="flex flex-col space-y-2 mb-auto">
        {menuItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`w-8 h-8 p-0 hover:bg-sidebar-hover transition-colors ${
                  activePanel === item.id ? 'bg-primary/20 border border-primary/30' : ''
                }`}
                onClick={() => onPanelChange(item.id)}
              >
                <item.icon 
                  size={16} 
                  className={`${item.color} ${
                    activePanel === item.id ? 'text-primary' : ''
                  }`} 
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-mono text-xs">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Bottom Menu Items */}
      <div className="flex flex-col space-y-2">
        {bottomItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-sidebar-hover transition-colors"
              >
                <item.icon size={16} className={item.color} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-mono text-xs">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};