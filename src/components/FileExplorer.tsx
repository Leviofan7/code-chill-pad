import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  expanded?: boolean;
}

const initialFiles: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: '1-1',
        name: 'components',
        type: 'folder',
        expanded: true,
        children: [
          { id: '1-1-1', name: 'DevPanel.tsx', type: 'file' },
          { id: '1-1-2', name: 'Sidebar.tsx', type: 'file' },
          { id: '1-1-3', name: 'ChatPanel.tsx', type: 'file' },
          { id: '1-1-4', name: 'Terminal.tsx', type: 'file' },
        ]
      },
      {
        id: '1-2',
        name: 'pages',
        type: 'folder',
        children: [
          { id: '1-2-1', name: 'Index.tsx', type: 'file' },
          { id: '1-2-2', name: 'NotFound.tsx', type: 'file' },
        ]
      },
      { id: '1-3', name: 'App.tsx', type: 'file' },
      { id: '1-4', name: 'main.tsx', type: 'file' },
      { id: '1-5', name: 'index.css', type: 'file' },
    ]
  },
  { id: '2', name: 'package.json', type: 'file' },
  { id: '3', name: 'vite.config.ts', type: 'file' },
  { id: '4', name: 'tailwind.config.ts', type: 'file' },
  { id: '5', name: 'tsconfig.json', type: 'file' },
  { id: '6', name: 'README.md', type: 'file' },
];

interface FileExplorerProps {
  onFileOpen?: (fileName: string, content?: string) => void;
}

export const FileExplorer = ({ onFileOpen }: FileExplorerProps) => {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const toggleFolder = (id: string) => {
    const toggleNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: toggleNode(node.children) };
        }
        return node;
      });
    };

    setFiles(toggleNode(files));
  };

  const getFileIcon = (file: FileNode) => {
    if (file.type === 'folder') {
      return file.expanded ? FolderOpen : Folder;
    }
    return File;
  };

  const getFileColor = (fileName: string) => {
    const ext = fileName.split('.').pop();
    switch (ext) {
      case 'tsx':
      case 'ts':
        return 'text-terminal-blue';
      case 'json':
        return 'text-terminal-yellow';
      case 'css':
        return 'text-terminal-purple';
      case 'md':
        return 'text-terminal-green';
      default:
        return 'text-foreground';
    }
  };

  const renderFileNode = (node: FileNode, depth: number = 0) => {
    const Icon = getFileIcon(node);
    const isSelected = selectedFile === node.id;

    return (
      <div key={node.id}>
        <Button
          variant="ghost"
          className={`w-full justify-start h-7 px-2 hover:bg-sidebar-hover ${
            isSelected ? 'bg-primary/20 border-l-2 border-l-primary' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else {
              setSelectedFile(node.id);
              onFileOpen?.(node.name);
            }
          }}
        >
          <div className="flex items-center space-x-1 text-sm">
            {node.type === 'folder' && (
              <div className="w-3 h-3 flex items-center justify-center">
                {node.expanded ? (
                  <ChevronDown size={12} className="text-muted-foreground" />
                ) : (
                  <ChevronRight size={12} className="text-muted-foreground" />
                )}
              </div>
            )}
            <Icon size={14} className={node.type === 'folder' ? 'text-terminal-blue' : getFileColor(node.name)} />
            <span className={`font-mono text-xs ${getFileColor(node.name)}`}>
              {node.name}
            </span>
          </div>
        </Button>
        
        {node.children && node.expanded && (
          <div>
            {node.children.map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <h3 className="font-semibold text-sm flex items-center">
          <Folder size={14} className="mr-2 text-terminal-blue" />
          Проводник
        </h3>
        <p className="text-xs text-muted-foreground mt-1">Структура проекта</p>
      </div>

      {/* File Tree */}
      <ScrollArea className="flex-1">
        <div className="p-1">
          {files.map(file => renderFileNode(file))}
        </div>
      </ScrollArea>
    </div>
  );
};