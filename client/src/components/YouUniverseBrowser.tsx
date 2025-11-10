import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Plus, X, Search, Star, MoreVertical, History, Download, Bookmark, Settings, Share2, FileSearch, Languages, Monitor, Trash2, Code, FileCode, Bot, Gamepad2, LayoutTemplate, GitBranch, Upload, Terminal, Folder, File, ChevronDown, ChevronRight as ChevronRightIcon, Play, Palette, Box, Cpu, Home, Blocks, ThumbsUp, TrendingUp, Lock, Unlock, Eye, Sparkles, MessageCircle, Calendar, Brain, Zap, ExternalLink, Copy } from "lucide-react";
import DevSystemPanel from "./DevSystemPanel";
import DashboardContent from "./DashboardContent";
import BashTerminal from "./BashTerminal";
import AIChat from "./AIChat";
import LivePreview from "./LivePreview";
import LLMTrainer from "./LLMTrainer";
import GANTrainer from "./GANTrainer";
import PlatformIndicator from "./PlatformIndicator";
import HumanDesignHome from "./HumanDesignHome";
import { useToast } from "@/hooks/use-toast";

interface Tab {
  id: string;
  title: string;
  url: string;
}

const themes = {
  cosmic: { 
    name: 'Cosmic Purple', 
    color: 'hsl(270, 70%, 60%)',
    vars: {
      '--background': '270 70% 8%',
      '--foreground': '270 15% 90%',
      '--border': '270 40% 25%',
      '--card': '270 60% 12%',
      '--card-foreground': '270 15% 90%',
      '--muted': '270 50% 18%',
      '--muted-foreground': '270 10% 70%',
      '--accent': '270 80% 28%',
      '--accent-foreground': '270 25% 95%',
      '--primary': '270 90% 65%',
      '--primary-foreground': '270 90% 98%',
    }
  },
  ocean: { 
    name: 'Ocean Blue', 
    color: 'hsl(200, 80%, 50%)',
    vars: {
      '--background': '200 70% 8%',
      '--foreground': '200 15% 90%',
      '--border': '200 50% 25%',
      '--card': '200 60% 12%',
      '--card-foreground': '200 15% 90%',
      '--muted': '200 50% 18%',
      '--muted-foreground': '200 10% 70%',
      '--accent': '200 70% 28%',
      '--accent-foreground': '200 25% 95%',
      '--primary': '200 90% 55%',
      '--primary-foreground': '200 90% 98%',
    }
  },
  forest: { 
    name: 'Forest Green', 
    color: 'hsl(140, 60%, 50%)',
    vars: {
      '--background': '140 60% 8%',
      '--foreground': '140 15% 90%',
      '--border': '140 40% 25%',
      '--card': '140 55% 12%',
      '--card-foreground': '140 15% 90%',
      '--muted': '140 45% 18%',
      '--muted-foreground': '140 10% 70%',
      '--accent': '140 60% 28%',
      '--accent-foreground': '140 25% 95%',
      '--primary': '140 80% 50%',
      '--primary-foreground': '140 80% 98%',
    }
  },
  sunset: { 
    name: 'Sunset Orange', 
    color: 'hsl(25, 90%, 55%)',
    vars: {
      '--background': '25 70% 8%',
      '--foreground': '25 15% 90%',
      '--border': '25 60% 25%',
      '--card': '25 65% 12%',
      '--card-foreground': '25 15% 90%',
      '--muted': '25 55% 18%',
      '--muted-foreground': '25 10% 70%',
      '--accent': '25 75% 28%',
      '--accent-foreground': '25 25% 95%',
      '--primary': '25 95% 60%',
      '--primary-foreground': '25 95% 98%',
    }
  },
  rose: { 
    name: 'Rose Pink', 
    color: 'hsl(330, 70%, 60%)',
    vars: {
      '--background': '330 70% 8%',
      '--foreground': '330 15% 90%',
      '--border': '330 50% 25%',
      '--card': '330 60% 12%',
      '--card-foreground': '330 15% 90%',
      '--muted': '330 50% 18%',
      '--muted-foreground': '330 10% 70%',
      '--accent': '330 70% 28%',
      '--accent-foreground': '330 25% 95%',
      '--primary': '330 85% 65%',
      '--primary-foreground': '330 85% 98%',
    }
  },
  cyber: { 
    name: 'Cyber Cyan', 
    color: 'hsl(180, 80%, 50%)',
    vars: {
      '--background': '180 60% 8%',
      '--foreground': '180 15% 90%',
      '--border': '180 50% 25%',
      '--card': '180 55% 12%',
      '--card-foreground': '180 15% 90%',
      '--muted': '180 45% 18%',
      '--muted-foreground': '180 10% 70%',
      '--accent': '180 65% 28%',
      '--accent-foreground': '180 25% 95%',
      '--primary': '180 90% 55%',
      '--primary-foreground': '180 90% 98%',
    }
  },
};

export default function YouUniverseBrowser() {
  const { toast } = useToast();
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'New Tab', url: '' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [menuOpen, setMenuOpen] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);
  const [devActiveTab, setDevActiveTab] = useState<'ide' | 'agent' | 'game' | '3d' | 'templates' | 'git' | 'deploy' | 'system' | 'modules' | 'terminal' | 'chat' | 'llm-trainer' | 'gan-trainer' | 'workspaces'>('ide');
  const [systemPanel, setSystemPanel] = useState('console');
  const [moduleActiveTab, setModuleActiveTab] = useState<'proposals' | 'my-modules' | 'create' | 'upload'>('proposals');
  const [uploadedModule, setUploadedModule] = useState<any>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [addressBarValue, setAddressBarValue] = useState('');
  const [selectedFile, setSelectedFile] = useState('index.html');
  const [filesExpanded, setFilesExpanded] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>('cyber');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [show3DBuilder, setShow3DBuilder] = useState<'world' | 'vr' | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [blockCookies, setBlockCookies] = useState(true);
  const [doNotTrack, setDoNotTrack] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [idePanel, setIdePanel] = useState<'explorer' | 'code' | 'preview' | 'game'>('explorer');
  const [showExplorer, setShowExplorer] = useState(true);

  // Agent Builder state
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState('Personal Assistant');
  const [agentAIModel, setAgentAIModel] = useState('openai');
  const [agentPrompt, setAgentPrompt] = useState('');
  const [fieldAlignment, setFieldAlignment] = useState<string[]>([]);

  // Game Maker state
  const [gameType, setGameType] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [gameField, setGameField] = useState('None');

  // Git state
  const [gitRepo, setGitRepo] = useState('');
  const [gitCommits, setGitCommits] = useState([{ message: 'Initial commit', time: '2h ago' }]);

  // IDE state
  const [codeContent, setCodeContent] = useState('');
  const [codeRunning, setCodeRunning] = useState(false);

  // Workspaces state
  const [workspaces, setWorkspaces] = useState([
    { id: '1', name: 'My Portfolio', type: 'website', lastModified: '2 hours ago', color: 'cyan' },
    { id: '2', name: 'AI Game Project', type: 'game', lastModified: '1 day ago', color: 'purple' },
    { id: '3', name: 'Blog Platform', type: 'website', lastModified: '3 days ago', color: 'orange' },
  ]);
  const [currentWorkspace, setCurrentWorkspace] = useState('1');
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceType, setNewWorkspaceType] = useState('website');

  const theme = themes[currentTheme];

  // Workspace handlers
  const handleCreateWorkspace = () => {
    if (!newWorkspaceName.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter a workspace name.",
        variant: "destructive",
      });
      return;
    }
    const newWorkspace = {
      id: Date.now().toString(),
      name: newWorkspaceName,
      type: newWorkspaceType,
      lastModified: 'just now',
      color: ['cyan', 'purple', 'orange', 'pink', 'green'][Math.floor(Math.random() * 5)],
    };
    setWorkspaces([...workspaces, newWorkspace]);
    setCurrentWorkspace(newWorkspace.id);
    setNewWorkspaceName('');
    toast({
      title: "Workspace Created",
      description: `"${newWorkspaceName}" workspace has been created.`,
    });
  };

  const handleSwitchWorkspace = (id: string) => {
    setCurrentWorkspace(id);
    const workspace = workspaces.find(w => w.id === id);
    toast({
      title: "Workspace Switched",
      description: `Now working on "${workspace?.name}".`,
    });
  };

  const handleDeleteWorkspace = (id: string) => {
    const workspace = workspaces.find(w => w.id === id);
    setWorkspaces(workspaces.filter(w => w.id !== id));
    if (currentWorkspace === id && workspaces.length > 1) {
      setCurrentWorkspace(workspaces.find(w => w.id !== id)?.id || '1');
    }
    toast({
      title: "Workspace Deleted",
      description: `"${workspace?.name}" has been deleted.`,
    });
  };

  // Agent Builder handlers
  const handleTestAgent = () => {
    if (!agentName || !agentPrompt) {
      toast({
        title: "Missing Information",
        description: "Please fill in agent name and system prompt to test.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Testing Agent",
      description: `Testing "${agentName}" with ${fieldAlignment.length} field alignments...`,
    });
  };

  const handleSaveAgent = () => {
    if (!agentName || !agentPrompt) {
      toast({
        title: "Missing Information",
        description: "Please fill in agent name and system prompt to save.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Agent Saved",
      description: `"${agentName}" has been saved to your personal agents.`,
    });
  };

  const handleProposeAgent = () => {
    if (!agentName || !agentPrompt) {
      toast({
        title: "Missing Information",
        description: "Please fill in agent name and system prompt to propose.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Agent Proposed",
      description: `"${agentName}" has been submitted for public review.`,
    });
  };

  // Game Maker handlers
  const handleSelectGameType = (type: string) => {
    setGameType(type);
    toast({
      title: "Game Type Selected",
      description: `${type} template loaded.`,
    });
  };

  const handleCreateGame = () => {
    if (!gameTitle) {
      toast({
        title: "Missing Information",
        description: "Please enter a game title.",
        variant: "destructive",
      });
      return;
    }
    const type = gameType || 'Custom';
    toast({
      title: "Game Created",
      description: `"${gameTitle}" (${type}) has been created with ${gameField} integration.`,
    });
  };

  // Template handlers
  const handleUseTemplate = (templateName: string) => {
    toast({
      title: "Template Applied",
      description: `${templateName} template has been loaded into your project.`,
    });
    setDevActiveTab('ide');
  };

  // Git handlers
  const handleGitClone = () => {
    if (!gitRepo) {
      toast({
        title: "Missing URL",
        description: "Please enter a repository URL.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Repository Cloned",
      description: `Successfully cloned ${gitRepo}`,
    });
    setGitCommits([...gitCommits, { message: 'Cloned repository', time: 'just now' }]);
  };

  const handleGitPull = () => {
    toast({
      title: "Changes Pulled",
      description: "Successfully pulled latest changes from remote.",
    });
    setGitCommits([...gitCommits, { message: 'Pulled latest changes', time: 'just now' }]);
  };

  const handleGitCommit = () => {
    toast({
      title: "Changes Committed",
      description: "Your changes have been committed locally.",
    });
    setGitCommits([...gitCommits, { message: 'Committed changes', time: 'just now' }]);
  };

  const handleGitPush = () => {
    toast({
      title: "Changes Pushed",
      description: "Successfully pushed changes to remote repository.",
    });
  };

  // Deploy handlers
  const handleDeploy = (platform: string) => {
    toast({
      title: `Deploying to ${platform}`,
      description: `Your app is being deployed to ${platform}. This may take a few minutes.`,
    });
    setTimeout(() => {
      toast({
        title: "Deployment Complete",
        description: `Your app is now live on ${platform}!`,
      });
    }, 3000);
  };

  // IDE handlers
  const handleRunCode = () => {
    setCodeRunning(true);
    toast({
      title: "Running Code",
      description: `Executing ${selectedFile}...`,
    });
    setTimeout(() => {
      setCodeRunning(false);
      toast({
        title: "Execution Complete",
        description: "Code executed successfully.",
      });
    }, 2000);
  };

  const handleSaveCode = () => {
    toast({
      title: "File Saved",
      description: `${selectedFile} has been saved.`,
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    // Ensure dark mode is always on
    root.classList.add('dark');
    // Apply theme color overrides
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [currentTheme, theme]);

  const addTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: 'New Tab',
      url: ''
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setMenuOpen(false);
  };

  const closeTab = (id: string) => {
    const newTabs = tabs.filter(t => t.id !== id);
    if (newTabs.length === 0) {
      addTab();
    } else if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
    setTabs(newTabs);
  };

  const openDeveloperSettings = () => {
    setDeveloperMode(true);
    setMenuOpen(false);
  };

  const handleModuleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    setUploadError(null);
    setUploadedModule(null);

    try {
      const formData = new FormData();
      formData.append('module', file);

      const response = await fetch('/api/upload-module', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const assembly = await response.json();
      setUploadedModule(assembly);
      
      toast({
        title: "Module Analyzed",
        description: `${assembly.moduleName} has been successfully analyzed by the SynthAssembler.`,
      });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : 'Upload failed',
        variant: "destructive",
      });
    } finally {
      setUploadLoading(false);
      // Reset the input so the same file can be uploaded again
      event.target.value = '';
    }
  };

  const [fileTree, setFileTree] = useState([
    { name: 'index.html', type: 'file', icon: FileCode },
    { name: 'style.css', type: 'file', icon: FileCode },
    { name: 'script.js', type: 'file', icon: FileCode },
    { name: 'images', type: 'folder', icon: Folder },
  ]);

  const handleDuplicateFile = (fileName: string) => {
    const fileIndex = fileTree.findIndex(f => f.name === fileName);
    if (fileIndex === -1) return;

    const originalFile = fileTree[fileIndex];
    const extension = originalFile.name.includes('.') ? originalFile.name.split('.').pop() : '';
    const baseName = originalFile.name.includes('.') ? originalFile.name.split('.').slice(0, -1).join('.') : originalFile.name;
    
    // Find a unique name
    let copyNumber = 1;
    let newName = extension ? `${baseName}-copy.${extension}` : `${baseName}-copy`;
    while (fileTree.some(f => f.name === newName)) {
      copyNumber++;
      newName = extension ? `${baseName}-copy${copyNumber}.${extension}` : `${baseName}-copy${copyNumber}`;
    }

    const newFile = { ...originalFile, name: newName };
    const newFileTree = [...fileTree];
    newFileTree.splice(fileIndex + 1, 0, newFile);
    setFileTree(newFileTree);

    toast({
      title: "File Duplicated",
      description: `Created ${newName}`,
    });
  };

  const handleDeleteFile = (fileName: string) => {
    const newFileTree = fileTree.filter(f => f.name !== fileName);
    setFileTree(newFileTree);
    
    // If deleted file was selected, select the first file
    if (selectedFile === fileName && newFileTree.length > 0) {
      const firstFile = newFileTree.find(f => f.type === 'file');
      if (firstFile) setSelectedFile(firstFile.name);
    }

    toast({
      title: "File Deleted",
      description: `${fileName} has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Tab Bar - Hidden on mobile */}
      <div className="hidden sm:flex h-8 md:h-9 bg-muted border-b border-border items-center px-1 md:px-2 gap-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`group h-6 md:h-7 min-w-[80px] md:min-w-[120px] max-w-[160px] md:max-w-[240px] flex items-center gap-1 md:gap-2 px-2 md:px-3 rounded-t cursor-pointer ${
              activeTabId === tab.id 
                ? 'bg-background' 
                : 'bg-muted hover:bg-background/50'
            }`}
            data-testid={`tab-${tab.id}`}
          >
            <span className="text-xs text-foreground truncate flex-1">{tab.title}</span>
            <button
              onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
              className="opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded p-0.5 transition-all duration-200"
              data-testid={`button-close-tab-${tab.id}`}
            >
              <X size={10} className="md:w-3 md:h-3 text-muted-foreground hover:text-red-400 transition-colors" />
            </button>
          </div>
        ))}
        <button
          onClick={addTab}
          className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center hover:bg-background/50 rounded"
          data-testid="button-new-tab"
        >
          <Plus size={12} className="md:w-3.5 md:h-3.5" />
        </button>
      </div>

      {/* Address Bar */}
      <div className="h-10 sm:h-11 bg-background border-b border-border flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button 
            onClick={() => window.history.back()}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-muted rounded transition-colors" 
            data-testid="button-back"
            title="Go back"
          >
            <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
          <button 
            onClick={() => window.history.forward()}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-muted rounded transition-colors" 
            data-testid="button-forward"
            title="Go forward"
          >
            <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-muted rounded transition-colors" 
            data-testid="button-reload"
            title="Reload"
          >
            <RotateCw size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-border hidden sm:block"></div>

        <button 
          onClick={() => {
            setShowDashboard(!showDashboard);
            setDeveloperMode(false);
            toast({
              title: showDashboard ? "Home" : "Dashboard",
              description: showDashboard ? "Returned to Human Design" : "Opening consciousness dashboard",
            });
          }}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-muted rounded transition-colors" 
          data-testid="button-home"
          title={showDashboard ? "Home" : "Dashboard"}
        >
          <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>

        <div className="flex-1 flex items-center gap-1.5 sm:gap-2 h-7 sm:h-8 px-2 sm:px-4 bg-muted rounded-full">
          <Search size={12} className="sm:w-3.5 sm:h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={addressBarValue}
            onChange={(e) => setAddressBarValue(e.target.value)}
            placeholder="Search or enter address"
            className="flex-1 bg-transparent text-xs sm:text-sm text-foreground outline-none placeholder:text-muted-foreground"
            data-testid="input-address-bar"
          />
          <Star size={12} className="sm:w-3.5 sm:h-3.5 text-muted-foreground cursor-pointer hidden sm:block" />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <PlatformIndicator />
          
          <div className="relative">
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              className="px-2 sm:px-3 h-7 sm:h-8 flex items-center gap-1 sm:gap-2 hover:bg-muted rounded text-xs sm:text-sm text-foreground font-medium"
              data-testid="button-theme"
            >
              <Palette size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Theme</span>
            </button>
            {themeMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setThemeMenuOpen(false)}></div>
                <div className="absolute right-0 top-8 sm:top-10 w-40 sm:w-48 bg-card border border-border rounded-lg shadow-xl z-50 py-2">
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => { setCurrentTheme(key as keyof typeof themes); setThemeMenuOpen(false); }}
                      className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-muted flex items-center gap-2 sm:gap-3 ${
                        currentTheme === key ? 'text-foreground font-medium' : 'text-muted-foreground'
                      }`}
                      data-testid={`button-theme-${key}`}
                    >
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: t.color }}></div>
                      {t.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-muted rounded" 
              data-testid="button-menu"
            >
              <MoreVertical size={14} className="sm:w-4 sm:h-4" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
                <div className="absolute right-0 top-8 sm:top-10 w-56 sm:w-64 bg-card border border-border rounded-lg shadow-xl z-50 py-2">
                  <button onClick={addTab} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-new-tab">
                    <Plus size={14} className="sm:w-4 sm:h-4" />
                    New tab
                  </button>
                  <div className="border-t border-border my-1.5 sm:my-2"></div>
                  <button className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-history">
                    <History size={14} className="sm:w-4 sm:h-4" />
                    History
                  </button>
                  <button className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-downloads">
                    <Download size={14} className="sm:w-4 sm:h-4" />
                    Downloads
                  </button>
                  <button className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-bookmarks">
                    <Bookmark size={14} className="sm:w-4 sm:h-4" />
                    Bookmarks
                  </button>
                  <div className="border-t border-border my-1.5 sm:my-2"></div>
                  <button className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-share">
                    <Share2 size={14} className="sm:w-4 sm:h-4" />
                    Share...
                  </button>
                  <button className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-find">
                    <FileSearch size={14} className="sm:w-4 sm:h-4" />
                    Find in page
                  </button>
                  <button className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-translate">
                    <Languages size={14} className="sm:w-4 sm:h-4" />
                    Translate...
                  </button>
                  <div className="border-t border-border my-1.5 sm:my-2"></div>
                  <button className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-desktop-site">
                    <Monitor size={14} className="sm:w-4 sm:h-4" />
                    Desktop site
                  </button>
                  <button className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-clear-data">
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                    Delete browsing data
                  </button>
                  <button onClick={() => { setShowSettings(true); setMenuOpen(false); }} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-foreground hover:bg-muted flex items-center gap-2 sm:gap-3" data-testid="menu-settings">
                    <Settings size={14} className="sm:w-4 sm:h-4" />
                    Settings
                  </button>
                  <div className="border-t border-border my-1.5 sm:my-2"></div>
                  <button onClick={openDeveloperSettings} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-cyan-400 hover:bg-cyan-500/10 flex items-center gap-2 sm:gap-3 font-medium" data-testid="menu-developer-settings">
                    <Code size={14} className="sm:w-4 sm:h-4" />
                    Developer Settings
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {!developerMode && !showDashboard && (
          <div className="flex-1 bg-background overflow-y-auto">
            <HumanDesignHome />
          </div>
        )}

        {!developerMode && showDashboard && (
          <DashboardContent />
        )}

        {developerMode && (
          <div className="flex-1 flex flex-col bg-background">
            <div className="h-9 sm:h-10 border-b border-border flex items-center justify-between px-2 sm:px-3 bg-muted/30">
              <div className="flex items-center gap-2 sm:gap-3">
                <Code size={14} className="sm:w-4 sm:h-4 text-cyan-400" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">YOUNIVERSE Developer Studio</span>
              </div>
              <button
                onClick={() => setDeveloperMode(false)}
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-red-500/20 rounded text-muted-foreground hover:text-red-400 transition-all duration-200"
                data-testid="button-close-dev-panel"
              >
                <X size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              <div className="w-10 sm:w-12 bg-muted/50 border-r border-border flex flex-col items-center py-1.5 sm:py-2 gap-1.5 sm:gap-2">
                <button
                  onClick={() => setDevActiveTab('system')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'system' ? 'bg-red-500/20 text-red-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-system"
                  title="System Control"
                >
                  <Cpu size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('ide')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'ide' ? 'bg-cyan-500/20 text-cyan-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-ide"
                  title="IDE"
                >
                  <FileCode size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('3d')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === '3d' ? 'bg-pink-500/20 text-pink-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-3d"
                  title="3D Platform"
                >
                  <Box size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('agent')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'agent' ? 'bg-purple-500/20 text-purple-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-agent"
                  title="Agent Builder"
                >
                  <Bot size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('game')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'game' ? 'bg-emerald-500/20 text-emerald-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-game"
                  title="Game Maker"
                >
                  <Gamepad2 size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('templates')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'templates' ? 'bg-orange-500/20 text-orange-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-templates"
                  title="Templates"
                >
                  <LayoutTemplate size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('git')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'git' ? 'bg-blue-500/20 text-blue-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-git"
                  title="Git"
                >
                  <GitBranch size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('deploy')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'deploy' ? 'bg-pink-500/20 text-pink-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-deploy"
                  title="Deploy"
                >
                  <Upload size={16} className="sm:w-5 sm:h-5" />
                </button>
                <div className="h-px bg-border my-1 sm:my-2" />
                <button
                  onClick={() => setDevActiveTab('modules')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'modules' ? 'bg-yellow-500/20 text-yellow-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-modules"
                  title="Module Builder & Voting"
                >
                  <Blocks size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('terminal')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'terminal' ? 'bg-green-500/20 text-green-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-terminal"
                  title="Bash Terminal"
                >
                  <Terminal size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('chat')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'chat' ? 'bg-cyan-500/20 text-cyan-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-chat"
                  title="AI Chat Assistant"
                >
                  <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setDevActiveTab('llm-trainer')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'llm-trainer' ? 'bg-purple-500/20 text-purple-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-llm-trainer"
                  title="LLM Trainer"
                >
                  <Brain size={20} />
                </button>
                <button
                  onClick={() => setDevActiveTab('gan-trainer')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'gan-trainer' ? 'bg-pink-500/20 text-pink-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-gan-trainer"
                  title="GAN Trainer"
                >
                  <Zap size={16} className="sm:w-5 sm:h-5" />
                </button>
                <div className="h-px bg-border my-1 sm:my-2" />
                <button
                  onClick={() => setDevActiveTab('workspaces')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-colors ${
                    devActiveTab === 'workspaces' ? 'bg-teal-500/20 text-teal-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid="button-dev-workspaces"
                  title="Workspaces"
                >
                  <Folder size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {devActiveTab === 'system' && (
                  <DevSystemPanel activePanel={systemPanel} onPanelChange={setSystemPanel} />
                )}

                {devActiveTab === 'ide' && (
                  <>
                    {/* Explorer Panel - Hidden on mobile unless selected */}
                    <div className={`w-56 bg-card border-r border-border flex-col animate-fade-in ${showExplorer ? 'flex' : 'hidden sm:flex'}`}>
                      <div className="h-9 px-3 flex items-center justify-between border-b border-border">
                        <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Explorer</span>
                        <button
                          onClick={() => setShowExplorer(false)}
                          className="sm:hidden w-6 h-6 flex items-center justify-center hover:bg-red-500/20 rounded transition-all duration-200 text-muted-foreground hover:text-red-400"
                          data-testid="button-close-explorer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-2">
                        <div>
                          <button
                            onClick={() => setFilesExpanded(!filesExpanded)}
                            className="w-full flex items-center gap-1 px-2 py-1 hover:bg-muted rounded text-sm text-foreground transition-all duration-200 hover:translate-x-1"
                          >
                            <div className={`transition-transform duration-200 ${filesExpanded ? 'rotate-0' : '-rotate-90'}`}>
                              <ChevronDown size={14} />
                            </div>
                            <Folder size={14} className="text-cyan-400" />
                            <span>my-website</span>
                          </button>
                          {filesExpanded && (
                            <div className="ml-4 mt-1 space-y-0.5">
                              {fileTree.map((file, index) => {
                                const Icon = file.icon;
                                return (
                                  <div
                                    key={file.name}
                                    className="group relative animate-slide-in"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                  >
                                    <button
                                      onClick={() => file.type === 'file' && setSelectedFile(file.name)}
                                      className={`w-full flex items-center gap-2 px-2 py-1 hover:bg-muted rounded text-sm transition-all duration-200 hover:translate-x-1 ${
                                        selectedFile === file.name ? 'bg-muted text-foreground' : 'text-muted-foreground'
                                      }`}
                                    >
                                      <Icon size={14} className={file.type === 'folder' ? 'text-cyan-400' : 'text-muted-foreground'} />
                                      <span className="flex-1 text-left truncate">{file.name}</span>
                                    </button>
                                    {file.type === 'file' && (
                                      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDuplicateFile(file.name);
                                          }}
                                          className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
                                          title="Duplicate"
                                          data-testid={`button-duplicate-${file.name}`}
                                        >
                                          <Copy size={12} className="text-cyan-400" />
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteFile(file.name);
                                          }}
                                          className="p-1 hover:bg-red-500/20 rounded transition-colors"
                                          title="Delete"
                                          data-testid={`button-delete-${file.name}`}
                                        >
                                          <Trash2 size={12} className="text-red-400" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Editor Area */}
                    <div className="flex-1 flex flex-col bg-background animate-fade-in">
                      <div className="h-9 bg-muted/30 border-b border-border flex items-center px-2 gap-1">
                        <div className="flex items-center gap-2 px-3 py-1 bg-background border-t-2 border-cyan-400 text-sm transition-all duration-200">
                          <FileCode size={14} className="text-cyan-400" />
                          <span className="text-foreground">{selectedFile}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col p-4">
                        <textarea
                          value={codeContent}
                          onChange={(e) => setCodeContent(e.target.value)}
                          className="flex-1 w-full bg-muted/30 border border-border rounded-lg p-4 font-mono text-sm text-foreground resize-none outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 focus:border-cyan-500/50"
                          placeholder={`<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My Website</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <script src="script.js"></script>\n  </body>\n</html>`}
                          data-testid="textarea-code-editor"
                        />
                        <div className="flex items-center justify-between mt-3 animate-slide-in" style={{ animationDelay: '100ms' }}>
                          <div className="text-xs text-muted-foreground">HTML • UTF-8 • LF</div>
                          <div className="flex gap-2">
                            <button onClick={handleSaveCode} className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95" data-testid="button-save-code">Save</button>
                            <button onClick={handleRunCode} disabled={codeRunning} className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded text-sm font-medium flex items-center gap-2 disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95" data-testid="button-run-code">
                              <Play size={14} />
                              {codeRunning ? 'Running...' : 'Run Code'}
                            </button>
                            <button onClick={() => setShowLivePreview(true)} className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95" data-testid="button-live-preview">
                              <ExternalLink size={14} />
                              Live Preview
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mobile Bottom Navigation - Only on Phone */}
                      <div className="sm:hidden h-14 bg-muted border-t border-border flex items-center justify-around px-2">
                        <button
                          onClick={() => setShowExplorer(true)}
                          className={`flex flex-col items-center justify-center flex-1 py-2 rounded transition-colors ${
                            showExplorer ? 'bg-cyan-500/20 text-cyan-400' : 'text-muted-foreground'
                          }`}
                          data-testid="button-mobile-explorer"
                        >
                          <Folder size={20} />
                          <span className="text-[10px] mt-1">Explorer</span>
                        </button>
                        <button
                          onClick={() => setShowExplorer(false)}
                          className={`flex flex-col items-center justify-center flex-1 py-2 rounded transition-colors ${
                            !showExplorer ? 'bg-cyan-500/20 text-cyan-400' : 'text-muted-foreground'
                          }`}
                          data-testid="button-mobile-code"
                        >
                          <FileCode size={20} />
                          <span className="text-[10px] mt-1">Code</span>
                        </button>
                        <button
                          onClick={() => setShowLivePreview(true)}
                          className="flex flex-col items-center justify-center flex-1 py-2 rounded text-muted-foreground transition-colors hover:text-purple-400"
                          data-testid="button-mobile-preview"
                        >
                          <ExternalLink size={20} />
                          <span className="text-[10px] mt-1">Preview</span>
                        </button>
                        <button
                          onClick={() => setDevActiveTab('game')}
                          className="flex flex-col items-center justify-center flex-1 py-2 rounded text-muted-foreground transition-colors hover:text-emerald-400"
                          data-testid="button-mobile-game"
                        >
                          <Gamepad2 size={20} />
                          <span className="text-[10px] mt-1">Game</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {devActiveTab === 'agent' && (
                  <div className="flex-1 p-6 overflow-y-auto bg-background">
                    <div className="max-w-4xl mx-auto space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Agent Builder</h2>
                        <p className="text-sm text-muted-foreground">Create consciousness-aware AI agents</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card border border-border rounded-lg p-4">
                          <label className="block text-sm font-medium text-foreground mb-2">Agent Name</label>
                          <input type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="e.g., HeartSync Assistant" className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" data-testid="input-agent-name" />
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4">
                          <label className="block text-sm font-medium text-foreground mb-2">Agent Type</label>
                          <select value={agentType} onChange={(e) => setAgentType(e.target.value)} className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" data-testid="select-agent-type">
                            <option>Personal Assistant</option>
                            <option>Code Helper</option>
                            <option>Oracle</option>
                            <option>Field Guide</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4">
                        <label className="block text-sm font-medium text-foreground mb-2">AI Model Backend</label>
                        <select 
                          value={agentAIModel} 
                          onChange={(e) => setAgentAIModel(e.target.value)} 
                          className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" 
                          data-testid="select-agent-ai-model"
                        >
                          <option value="openai">OpenAI (GPT-4)</option>
                          <option value="anthropic">Anthropic (Claude)</option>
                          <option value="gemini">Google Gemini</option>
                          <option value="mistral">Mistral AI</option>
                          <option value="minimax">MiniMax-2</option>
                          <option value="llama">Meta Llama 3</option>
                          <option value="huggingface">Hugging Face</option>
                          <option value="local">Local Model</option>
                          <option value="custom">Custom Endpoint</option>
                        </select>
                        {agentAIModel === 'minimax' && (
                          <p className="text-xs text-yellow-400 mt-2">🚀 MiniMax-2 - Advanced Chinese AI model with strong reasoning</p>
                        )}
                        {agentAIModel === 'huggingface' && (
                          <p className="text-xs text-orange-400 mt-2">🤗 Hugging Face - Access thousands of open-source models</p>
                        )}
                        {agentAIModel === 'custom' && (
                          <input 
                            type="text" 
                            placeholder="https://api.example.com/v1/chat"
                            className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-xs mt-2"
                            data-testid="input-custom-agent-endpoint"
                          />
                        )}
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4">
                        <label className="block text-sm font-medium text-foreground mb-2">System Prompt</label>
                        <textarea value={agentPrompt} onChange={(e) => setAgentPrompt(e.target.value)} rows={6} placeholder="You are a consciousness-aware assistant..." className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm resize-none" data-testid="textarea-agent-prompt" />
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4">
                        <label className="block text-sm font-medium text-foreground mb-2">Field Alignment</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['zer', 'mind', 'body', 'heart', 'soul', 'spirit'].map(field => (
                            <label key={field} className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={fieldAlignment.includes(field)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFieldAlignment([...fieldAlignment, field]);
                                  } else {
                                    setFieldAlignment(fieldAlignment.filter(f => f !== field));
                                  }
                                }}
                                className="rounded accent-cyan-400" 
                              />
                              <span className="text-sm text-foreground capitalize">{field}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button onClick={handleTestAgent} className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded text-sm font-medium" data-testid="button-test-agent">Test Agent</button>
                        <button onClick={handleSaveAgent} className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded text-sm font-medium" data-testid="button-save-agent">Save as Personal</button>
                        <button onClick={handleProposeAgent} className="px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-400 rounded text-sm font-medium" data-testid="button-propose-agent">Propose Public</button>
                      </div>
                    </div>
                  </div>
                )}

                {devActiveTab === 'game' && (
                  <div className="flex-1 p-6 overflow-y-auto bg-background">
                    <div className="max-w-4xl mx-auto space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Game Maker</h2>
                        <p className="text-sm text-muted-foreground">Build consciousness-aware games</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onClick={() => handleSelectGameType("2D Platformer")} className="bg-card border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors text-left" data-testid="button-game-platformer">
                          <Gamepad2 size={24} className="text-emerald-400 mb-3" />
                          <h3 className="text-sm font-semibold text-foreground mb-1">2D Platformer</h3>
                          <p className="text-xs text-muted-foreground">Jump, run, collect</p>
                        </button>
                        <button onClick={() => handleSelectGameType("Puzzle Game")} className="bg-card border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors text-left" data-testid="button-game-puzzle">
                          <Gamepad2 size={24} className="text-cyan-400 mb-3" />
                          <h3 className="text-sm font-semibold text-foreground mb-1">Puzzle Game</h3>
                          <p className="text-xs text-muted-foreground">Match, solve, think</p>
                        </button>
                        <button onClick={() => handleSelectGameType("Custom Game")} className="bg-card border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors text-left" data-testid="button-game-custom">
                          <Gamepad2 size={24} className="text-purple-400 mb-3" />
                          <h3 className="text-sm font-semibold text-foreground mb-1">Custom Game</h3>
                          <p className="text-xs text-muted-foreground">Build from scratch</p>
                        </button>
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Game Settings</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">Game Title</label>
                            <input type="text" value={gameTitle} onChange={(e) => setGameTitle(e.target.value)} placeholder="My Awesome Game" className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" data-testid="input-game-title" />
                          </div>
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">Field Integration</label>
                            <select value={gameField} onChange={(e) => setGameField(e.target.value)} className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" data-testid="select-game-field">
                              <option>None</option>
                              <option>Heart - Emotional Gameplay</option>
                              <option>Mind - Puzzle Mechanics</option>
                              <option>Body - Physical Reflexes</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button onClick={handleCreateGame} className="w-full px-4 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 rounded text-sm font-medium" data-testid="button-create-game">Create Game</button>
                    </div>
                  </div>
                )}

                {devActiveTab === 'templates' && (
                  <div className="flex-1 p-6 overflow-y-auto bg-background">
                    <div className="max-w-6xl mx-auto space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Templates</h2>
                        <p className="text-sm text-muted-foreground">Professional starter templates</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-card border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                          <LayoutTemplate size={32} className="text-orange-400 mb-3" />
                          <h3 className="text-sm font-semibold text-foreground mb-1">Portfolio</h3>
                          <p className="text-xs text-muted-foreground mb-3">Showcase your work</p>
                          <button onClick={() => handleUseTemplate("Portfolio")} className="w-full px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-400 rounded text-xs" data-testid="button-use-portfolio">Use Template</button>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                          <LayoutTemplate size={32} className="text-cyan-400 mb-3" />
                          <h3 className="text-sm font-semibold text-foreground mb-1">Landing Page</h3>
                          <p className="text-xs text-muted-foreground mb-3">Convert visitors</p>
                          <button onClick={() => handleUseTemplate("Landing Page")} className="w-full px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded text-xs" data-testid="button-use-landing">Use Template</button>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                          <LayoutTemplate size={32} className="text-purple-400 mb-3" />
                          <h3 className="text-sm font-semibold text-foreground mb-1">Blog</h3>
                          <p className="text-xs text-muted-foreground mb-3">Share your thoughts</p>
                          <button onClick={() => handleUseTemplate("Blog")} className="w-full px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded text-xs" data-testid="button-use-blog">Use Template</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {devActiveTab === 'git' && (
                  <div className="flex-1 p-6 overflow-y-auto bg-background">
                    <div className="max-w-4xl mx-auto space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Git Integration</h2>
                        <p className="text-sm text-muted-foreground">Version control & collaboration</p>
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4">
                        <label className="block text-sm font-medium text-foreground mb-2">Repository URL</label>
                        <input type="text" value={gitRepo} onChange={(e) => setGitRepo(e.target.value)} placeholder="https://github.com/username/repo" className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" data-testid="input-git-repo" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={handleGitClone} className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded text-sm font-medium" data-testid="button-git-clone">Clone Repo</button>
                        <button onClick={handleGitPull} className="px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded text-sm font-medium" data-testid="button-git-pull">Pull Changes</button>
                        <button onClick={handleGitCommit} className="px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded text-sm font-medium" data-testid="button-git-commit">Commit</button>
                        <button onClick={handleGitPush} className="px-4 py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-400 rounded text-sm font-medium" data-testid="button-git-push">Push</button>
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Recent Commits</h3>
                        <div className="space-y-2">
                          {gitCommits.map((commit, index) => (
                            <div key={index} className="flex items-center gap-3 text-xs">
                              <div className="w-2 h-2 rounded-full bg-green-400"></div>
                              <span className="text-foreground">{commit.message}</span>
                              <span className="text-muted-foreground ml-auto">{commit.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {devActiveTab === 'deploy' && (
                  <div className="flex-1 p-6 overflow-y-auto bg-background">
                    <div className="max-w-4xl mx-auto space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Deploy</h2>
                        <p className="text-sm text-muted-foreground">Ship your app to the world</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-card border border-border rounded-lg p-6">
                          <Upload size={32} className="text-cyan-400 mb-3" />
                          <h3 className="text-sm font-semibold text-foreground mb-1">Netlify</h3>
                          <p className="text-xs text-muted-foreground mb-3">Free hosting</p>
                          <button onClick={() => handleDeploy("Netlify")} className="w-full px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded text-xs" data-testid="button-deploy-netlify">Deploy</button>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-6">
                          <Upload size={32} className="text-purple-400 mb-3" />
                          <h3 className="text-sm font-semibold text-foreground mb-1">Vercel</h3>
                          <p className="text-xs text-muted-foreground mb-3">Edge network</p>
                          <button onClick={() => handleDeploy("Vercel")} className="w-full px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded text-xs" data-testid="button-deploy-vercel">Deploy</button>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-6">
                          <Upload size={32} className="text-pink-400 mb-3" />
                          <h3 className="text-sm font-semibold text-foreground mb-1">GitHub Pages</h3>
                          <p className="text-xs text-muted-foreground mb-3">Static hosting</p>
                          <button onClick={() => handleDeploy("GitHub Pages")} className="w-full px-3 py-1.5 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-400 rounded text-xs" data-testid="button-deploy-gh">Deploy</button>
                        </div>
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Deployment Status</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          <span className="text-foreground">Live at:</span>
                          <a href="#" className="text-cyan-400 hover:underline">youniverse.app</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {devActiveTab === '3d' && !show3DBuilder && (
                  <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto bg-background">
                    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2">3D Platform</h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">Create immersive 3D experiences</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <button 
                          onClick={() => setShow3DBuilder('world')}
                          className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:bg-muted/50 transition-colors text-left" 
                          data-testid="button-3d-world"
                        >
                          <Box size={24} className="sm:w-8 sm:h-8 text-pink-400 mb-2 sm:mb-3" />
                          <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-0.5 sm:mb-1">3D World Builder</h3>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">Build interactive environments</p>
                        </button>
                        <button 
                          onClick={() => setShow3DBuilder('vr')}
                          className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:bg-muted/50 transition-colors text-left" 
                          data-testid="button-3d-vr"
                        >
                          <Box size={24} className="sm:w-8 sm:h-8 text-cyan-400 mb-2 sm:mb-3" />
                          <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-0.5 sm:mb-1">VR Experience</h3>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">Create virtual reality apps</p>
                        </button>
                      </div>

                      <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
                        <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Scene Settings</h3>
                        <div className="space-y-2 sm:space-y-3">
                          <div>
                            <label className="block text-[10px] sm:text-xs text-muted-foreground mb-1">Camera Type</label>
                            <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-muted border border-border rounded text-foreground text-xs sm:text-sm" data-testid="select-3d-camera">
                              <option>Perspective</option>
                              <option>Orthographic</option>
                              <option>VR</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs text-muted-foreground mb-1">Physics Engine</label>
                            <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-muted border border-border rounded text-foreground text-xs sm:text-sm" data-testid="select-3d-physics">
                              <option>Cannon.js</option>
                              <option>Ammo.js</option>
                              <option>None</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button onClick={() => toast({ title: "3D Editor", description: "Use the World Builder or VR Experience buttons above to start creating." })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-400 rounded text-xs sm:text-sm font-medium" data-testid="button-launch-3d">Launch 3D Editor</button>
                    </div>
                  </div>
                )}

                {devActiveTab === '3d' && show3DBuilder === 'world' && (
                  <div className="flex-1 flex flex-col bg-background">
                    <div className="h-10 sm:h-12 border-b border-border flex items-center justify-between px-3 sm:px-6 bg-muted/30">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Box size={16} className="sm:w-5 sm:h-5 text-pink-400" />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">3D World Builder</span>
                      </div>
                      <button
                        onClick={() => setShow3DBuilder(null)}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                        data-testid="button-close-world-builder"
                      >
                        Back
                      </button>
                    </div>
                    
                    <div className="flex-1 flex">
                      {/* Toolbar */}
                      <div className="w-12 sm:w-16 bg-muted/50 border-r border-border flex flex-col items-center py-2 sm:py-3 gap-2 sm:gap-3">
                        <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground" title="Cube" data-testid="button-add-cube">
                          <Box size={16} className="sm:w-5 sm:h-5" />
                        </button>
                        <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground" title="Sphere" data-testid="button-add-sphere">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-current"></div>
                        </button>
                        <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground" title="Light" data-testid="button-add-light">
                          <Sparkles size={16} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>

                      {/* 3D Viewport */}
                      <div className="flex-1 bg-muted/30 flex items-center justify-center">
                        <div className="text-center space-y-2 sm:space-y-3">
                          <Box size={48} className="sm:w-16 sm:h-16 mx-auto text-muted-foreground" />
                          <p className="text-xs sm:text-sm text-muted-foreground">3D Viewport</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">Click toolbar to add objects</p>
                        </div>
                      </div>

                      {/* Properties Panel */}
                      <div className="w-48 sm:w-64 bg-card border-l border-border p-2 sm:p-4 overflow-y-auto">
                        <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Properties</h3>
                        <div className="space-y-2 sm:space-y-3">
                          <div>
                            <label className="block text-[10px] sm:text-xs text-muted-foreground mb-1">Object Name</label>
                            <input type="text" placeholder="Cube" className="w-full px-2 py-1 sm:px-3 sm:py-1.5 bg-muted border border-border rounded text-foreground text-xs" data-testid="input-object-name" />
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs text-muted-foreground mb-1">Position</label>
                            <div className="grid grid-cols-3 gap-1">
                              <input type="number" placeholder="X" className="w-full px-1.5 py-1 sm:px-2 sm:py-1.5 bg-muted border border-border rounded text-foreground text-xs" data-testid="input-pos-x" />
                              <input type="number" placeholder="Y" className="w-full px-1.5 py-1 sm:px-2 sm:py-1.5 bg-muted border border-border rounded text-foreground text-xs" data-testid="input-pos-y" />
                              <input type="number" placeholder="Z" className="w-full px-1.5 py-1 sm:px-2 sm:py-1.5 bg-muted border border-border rounded text-foreground text-xs" data-testid="input-pos-z" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs text-muted-foreground mb-1">Material Color</label>
                            <input type="color" className="w-full h-8 sm:h-10 bg-muted border border-border rounded" data-testid="input-color" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {devActiveTab === '3d' && show3DBuilder === 'vr' && (
                  <div className="flex-1 flex flex-col bg-background">
                    <div className="h-10 sm:h-12 border-b border-border flex items-center justify-between px-3 sm:px-6 bg-muted/30">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Box size={16} className="sm:w-5 sm:h-5 text-cyan-400" />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">VR Experience Builder</span>
                      </div>
                      <button
                        onClick={() => setShow3DBuilder(null)}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                        data-testid="button-close-vr-builder"
                      >
                        Back
                      </button>
                    </div>
                    
                    <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto">
                      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
                        <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
                          <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">VR Settings</h3>
                          <div className="space-y-2 sm:space-y-3">
                            <div>
                              <label className="block text-[10px] sm:text-xs text-muted-foreground mb-1">Experience Type</label>
                              <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-muted border border-border rounded text-foreground text-xs sm:text-sm" data-testid="select-vr-type">
                                <option>360° Video</option>
                                <option>Interactive Scene</option>
                                <option>Virtual Gallery</option>
                                <option>Meditation Space</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs text-muted-foreground mb-1">Field Integration</label>
                              <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-muted border border-border rounded text-foreground text-xs sm:text-sm" data-testid="select-vr-field">
                                <option>Heart - Emotional Journey</option>
                                <option>Spirit - Transcendence</option>
                                <option>Mind - Cognitive Challenge</option>
                                <option>Body - Physical Presence</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
                          <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Environment</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                            <button className="p-2 sm:p-3 bg-muted hover:bg-muted/70 border border-border rounded text-left" data-testid="button-env-forest">
                              <div className="text-[10px] sm:text-xs font-medium text-foreground">Forest</div>
                            </button>
                            <button className="p-2 sm:p-3 bg-muted hover:bg-muted/70 border border-border rounded text-left" data-testid="button-env-ocean">
                              <div className="text-[10px] sm:text-xs font-medium text-foreground">Ocean</div>
                            </button>
                            <button className="p-2 sm:p-3 bg-muted hover:bg-muted/70 border border-border rounded text-left" data-testid="button-env-space">
                              <div className="text-[10px] sm:text-xs font-medium text-foreground">Space</div>
                            </button>
                            <button className="p-2 sm:p-3 bg-muted hover:bg-muted/70 border border-border rounded text-left" data-testid="button-env-mountain">
                              <div className="text-[10px] sm:text-xs font-medium text-foreground">Mountain</div>
                            </button>
                            <button className="p-2 sm:p-3 bg-muted hover:bg-muted/70 border border-border rounded text-left" data-testid="button-env-abstract">
                              <div className="text-[10px] sm:text-xs font-medium text-foreground">Abstract</div>
                            </button>
                            <button className="p-2 sm:p-3 bg-muted hover:bg-muted/70 border border-border rounded text-left" data-testid="button-env-custom">
                              <div className="text-[10px] sm:text-xs font-medium text-foreground">Custom</div>
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-2 sm:gap-3">
                          <button className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded text-xs sm:text-sm font-medium" data-testid="button-preview-vr">
                            Preview in VR
                          </button>
                          <button className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-400 rounded text-xs sm:text-sm font-medium" data-testid="button-publish-vr">
                            Publish Experience
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {devActiveTab === 'modules' && (
                  <div className="flex-1 flex flex-col bg-background">
                    <div className="h-12 border-b border-border flex items-center justify-between px-6 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Blocks size={20} className="text-yellow-400" />
                        <span className="text-sm font-semibold text-foreground">Module Builder & Governance</span>
                      </div>
                      <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-400 rounded text-sm font-medium flex items-center gap-2" data-testid="button-new-module">
                        <Plus size={16} />
                        New Module
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="max-w-6xl mx-auto space-y-6">
                        
                        {/* Tabs */}
                        <div className="flex gap-2 border-b border-border">
                          <button 
                            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                              moduleActiveTab === 'proposals' 
                                ? 'border-yellow-400 text-yellow-400' 
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                            onClick={() => setModuleActiveTab('proposals')}
                            data-testid="tab-proposals"
                          >
                            Proposals
                          </button>
                          <button 
                            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                              moduleActiveTab === 'my-modules' 
                                ? 'border-yellow-400 text-yellow-400' 
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                            onClick={() => setModuleActiveTab('my-modules')}
                            data-testid="tab-my-modules"
                          >
                            My Modules
                          </button>
                          <button 
                            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                              moduleActiveTab === 'create' 
                                ? 'border-yellow-400 text-yellow-400' 
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                            onClick={() => setModuleActiveTab('create')}
                            data-testid="tab-create"
                          >
                            Create
                          </button>
                          <button 
                            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                              moduleActiveTab === 'upload' 
                                ? 'border-yellow-400 text-yellow-400' 
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                            onClick={() => setModuleActiveTab('upload')}
                            data-testid="tab-upload"
                          >
                            <div className="flex items-center gap-2">
                              <Upload size={16} />
                              Upload & Analyze
                            </div>
                          </button>
                        </div>

                        {/* Proposals Tab */}
                        {moduleActiveTab === 'proposals' && (
                          <>
                            {/* Filters */}
                            <div className="flex gap-3">
                              <select className="px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" data-testid="select-filter-status">
                                <option>All Status</option>
                                <option>Concept (0-9 votes)</option>
                                <option>Preview (10-29 votes)</option>
                                <option>Development (30-99 votes)</option>
                                <option>Public (100+ votes)</option>
                              </select>
                              <select className="px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" data-testid="select-filter-category">
                                <option>All Categories</option>
                                <option>Tools</option>
                                <option>Modules</option>
                                <option>Features</option>
                                <option>Experiments</option>
                              </select>
                              <select className="px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" data-testid="select-sort">
                                <option>Sort: Most Votes</option>
                                <option>Sort: Trending</option>
                                <option>Sort: Coherence</option>
                                <option>Sort: Recent</option>
                              </select>
                            </div>

                            {/* Proposal Cards */}
                            <div className="space-y-4">
                          
                          {/* Example Proposal 1 */}
                          <div className="bg-card border border-border rounded-lg overflow-hidden hover:bg-muted/30 transition-colors">
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-foreground mb-2">Lunar Cycle Dream Tracker</h3>
                                  <p className="text-sm text-muted-foreground">Track dreams aligned with moon phases and automatically detect pattern correlations</p>
                                </div>
                                <div className="ml-4 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-xs font-semibold flex items-center gap-1">
                                  <Eye size={12} />
                                  PREVIEW
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm mb-4">
                                <div className="flex items-center gap-2">
                                  <ThumbsUp size={16} className="text-cyan-400" />
                                  <span className="text-foreground font-medium">15</span>
                                  <span className="text-muted-foreground">votes</span>
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <div className="flex items-center gap-2">
                                  <TrendingUp size={16} className="text-green-400" />
                                  <span className="text-green-400 font-medium">+3</span>
                                  <span className="text-muted-foreground">today</span>
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <div className="flex items-center gap-2">
                                  <Sparkles size={16} className="text-purple-400" />
                                  <span className="text-foreground font-medium">89%</span>
                                  <span className="text-muted-foreground">coherence</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs text-muted-foreground">Fields:</span>
                                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">soul</span>
                                <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs">spirit</span>
                              </div>

                              <div className="mb-4">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                  <span>15 weighted votes</span>
                                  <span>Next: Development (30 votes)</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                  <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2" style={{ width: '50%' }} />
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 text-cyan-400 rounded font-medium transition-all text-sm" data-testid="button-vote-proposal-1">
                                  <ThumbsUp size={16} />
                                  Vote
                                </button>
                                <button className="px-4 py-2 bg-muted hover:bg-muted/50 rounded text-muted-foreground text-sm" data-testid="button-details-1">
                                  Details
                                </button>
                                <button className="p-2 hover:bg-muted rounded transition-colors" data-testid="button-comment-1">
                                  <MessageCircle size={16} className="text-muted-foreground" />
                                </button>
                                <button className="p-2 hover:bg-muted rounded transition-colors" data-testid="button-share-1">
                                  <Share2 size={16} className="text-muted-foreground" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Example Proposal 2 */}
                          <div className="bg-card border border-border rounded-lg overflow-hidden hover:bg-muted/30 transition-colors">
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-foreground mb-2">HRV Coherence Trainer</h3>
                                  <p className="text-sm text-muted-foreground">Real-time heart rate variability training with field-specific protocols</p>
                                </div>
                                <div className="ml-4 px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                                  <Unlock size={12} />
                                  PUBLIC
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm mb-4">
                                <div className="flex items-center gap-2">
                                  <ThumbsUp size={16} className="text-cyan-400" />
                                  <span className="text-foreground font-medium">142</span>
                                  <span className="text-muted-foreground">votes</span>
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <div className="flex items-center gap-2">
                                  <TrendingUp size={16} className="text-green-400" />
                                  <span className="text-green-400 font-medium">+12</span>
                                  <span className="text-muted-foreground">today</span>
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <div className="flex items-center gap-2">
                                  <Sparkles size={16} className="text-purple-400" />
                                  <span className="text-foreground font-medium">92%</span>
                                  <span className="text-muted-foreground">coherence</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs text-muted-foreground">Fields:</span>
                                <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs">heart</span>
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">body</span>
                              </div>

                              <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded font-medium cursor-not-allowed text-sm" disabled data-testid="button-voted-2">
                                  <ThumbsUp size={16} />
                                  Voted
                                </button>
                                <button className="px-4 py-2 bg-muted hover:bg-muted/50 rounded text-muted-foreground text-sm" data-testid="button-details-2">
                                  Details
                                </button>
                                <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded font-medium text-sm" data-testid="button-install-2">
                                  Install Module
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Example Proposal 3 - Concept */}
                          <div className="bg-card border border-border rounded-lg overflow-hidden hover:bg-muted/30 transition-colors">
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-foreground mb-2">AI Dream Interpreter</h3>
                                  <p className="text-sm text-muted-foreground">Upload dreams and get archetypal interpretations using consciousness fields</p>
                                </div>
                                <div className="ml-4 px-3 py-1 bg-gray-500/20 border border-gray-500/30 text-gray-400 rounded-full text-xs font-semibold flex items-center gap-1">
                                  <Lock size={12} />
                                  CONCEPT
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm mb-4">
                                <div className="flex items-center gap-2">
                                  <ThumbsUp size={16} className="text-cyan-400" />
                                  <span className="text-foreground font-medium">7</span>
                                  <span className="text-muted-foreground">votes</span>
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <div className="flex items-center gap-2">
                                  <TrendingUp size={16} className="text-red-400" />
                                  <span className="text-red-400 font-medium">-1</span>
                                  <span className="text-muted-foreground">today</span>
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <div className="flex items-center gap-2">
                                  <Sparkles size={16} className="text-purple-400" />
                                  <span className="text-foreground font-medium">75%</span>
                                  <span className="text-muted-foreground">coherence</span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                  <span>7 weighted votes</span>
                                  <span>Next: Preview (10 votes)</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                  <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2" style={{ width: '70%' }} />
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 text-cyan-400 rounded font-medium transition-all text-sm" data-testid="button-vote-proposal-3">
                                  <ThumbsUp size={16} />
                                  Vote
                                </button>
                                <button className="px-4 py-2 bg-muted hover:bg-muted/50 rounded text-muted-foreground text-sm" data-testid="button-details-3">
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>

                            </div>
                          </>
                        )}

                        {/* Upload & Analyze Tab */}
                        {moduleActiveTab === 'upload' && (
                          <div className="max-w-4xl mx-auto">
                            <div className="bg-card border border-border rounded-lg p-8">
                              <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-4">
                                  <Upload size={32} className="text-yellow-400" />
                                </div>
                                <h3 className="text-2xl font-semibold text-foreground mb-2">Upload & Analyze Module</h3>
                                <p className="text-muted-foreground">
                                  The Spot Agent will analyze your module structure, check resonance compatibility, and provide assembly feedback
                                </p>
                              </div>

                              <input 
                                type="file" 
                                accept=".zip" 
                                className="hidden" 
                                id="module-upload"
                                onChange={handleModuleUpload}
                                disabled={uploadLoading}
                                data-testid="input-module-upload"
                              />
                              <label 
                                htmlFor="module-upload" 
                                className={`block border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-yellow-400/50 transition-colors ${uploadLoading ? 'cursor-wait' : 'cursor-pointer'}`}
                              >
                                <div className="flex flex-col items-center gap-3">
                                  {uploadLoading ? (
                                    <>
                                      <div className="animate-spin">
                                        <Upload size={48} className="text-yellow-400" />
                                      </div>
                                      <p className="text-yellow-400 font-medium">Analyzing module...</p>
                                    </>
                                  ) : (
                                    <>
                                      <Upload size={48} className="text-muted-foreground" />
                                      <div>
                                        <p className="text-foreground font-medium mb-1">Drop module ZIP here or click to browse</p>
                                        <p className="text-sm text-muted-foreground">Must include: manifest.json, resonance_map.json</p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </label>

                              {uploadError && (
                                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                                  <p className="text-red-400 text-sm">{uploadError}</p>
                                </div>
                              )}

                              {uploadedModule && (
                                <div className="mt-6 space-y-4">
                                  <div className={`p-6 rounded-lg border-2 ${
                                    uploadedModule.status === 'compatible' ? 'bg-green-500/10 border-green-500/30' :
                                    uploadedModule.status === 'partial' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                    uploadedModule.status === 'requires_update' ? 'bg-orange-500/10 border-orange-500/30' :
                                    'bg-red-500/10 border-red-500/30'
                                  }`}>
                                    <div className="flex items-start justify-between mb-4">
                                      <div>
                                        <h4 className="text-xl font-semibold text-foreground mb-1">{uploadedModule.moduleName}</h4>
                                        <p className="text-sm text-muted-foreground">ID: {uploadedModule.moduleId}</p>
                                      </div>
                                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        uploadedModule.status === 'compatible' ? 'bg-green-500/20 text-green-400' :
                                        uploadedModule.status === 'partial' ? 'bg-yellow-500/20 text-yellow-400' :
                                        uploadedModule.status === 'requires_update' ? 'bg-orange-500/20 text-orange-400' :
                                        'bg-red-500/20 text-red-400'
                                      }`}>
                                        {uploadedModule.status.toUpperCase()}
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                      <div className="text-center">
                                        <div className="text-2xl font-bold text-foreground">{(uploadedModule.compatibilityScore * 100).toFixed(0)}%</div>
                                        <div className="text-xs text-muted-foreground">Compatibility</div>
                                      </div>
                                      <div className="text-center">
                                        <div className="text-2xl font-bold text-foreground">{(uploadedModule.resonanceMatch * 100).toFixed(0)}%</div>
                                        <div className="text-xs text-muted-foreground">Resonance Match</div>
                                      </div>
                                      <div className="text-center">
                                        <div className="text-2xl font-bold text-foreground">{uploadedModule.activatedGates.length}</div>
                                        <div className="text-xs text-muted-foreground">Gates Activated</div>
                                      </div>
                                    </div>

                                    <p className="text-foreground mb-4">{uploadedModule.feedback}</p>

                                    {uploadedModule.warnings && uploadedModule.warnings.length > 0 && (
                                      <div className="mb-4">
                                        <h5 className="text-sm font-semibold text-yellow-400 mb-2">⚠️ Warnings:</h5>
                                        <ul className="list-disc list-inside space-y-1">
                                          {uploadedModule.warnings.map((warning: string, i: number) => (
                                            <li key={i} className="text-sm text-muted-foreground">{warning}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {uploadedModule.suggestions && uploadedModule.suggestions.length > 0 && (
                                      <div>
                                        <h5 className="text-sm font-semibold text-cyan-400 mb-2">💡 Suggestions:</h5>
                                        <ul className="list-disc list-inside space-y-1">
                                          {uploadedModule.suggestions.map((suggestion: string, i: number) => (
                                            <li key={i} className="text-sm text-muted-foreground">{suggestion}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                  <Sparkles size={16} className="text-yellow-400" />
                                  Expected Module Structure
                                </h4>
                                <div className="text-sm text-muted-foreground space-y-1 font-mono">
                                  <div>├── meta/</div>
                                  <div>│   └── manifest.json</div>
                                  <div>├── config/</div>
                                  <div>│   └── resonance_map.json</div>
                                  <div>├── ui/</div>
                                  <div>│   └── *.jsx</div>
                                  <div>└── logic/</div>
                                  <div>    └── *.js</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {devActiveTab === 'terminal' && (
                  <BashTerminal />
                )}

                {devActiveTab === 'chat' && (
                  <AIChat />
                )}

                {devActiveTab === 'llm-trainer' && (
                  <LLMTrainer />
                )}

                {devActiveTab === 'gan-trainer' && (
                  <GANTrainer />
                )}

                {devActiveTab === 'workspaces' && (
                  <div className="flex-1 p-6 overflow-y-auto bg-background">
                    <div className="max-w-6xl mx-auto space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Workspaces</h2>
                        <p className="text-sm text-muted-foreground">Manage your projects and development environments</p>
                      </div>

                      {/* Create New Workspace */}
                      <div className="bg-card border border-border rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Create New Workspace</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">Workspace Name</label>
                            <input 
                              type="text" 
                              value={newWorkspaceName}
                              onChange={(e) => setNewWorkspaceName(e.target.value)}
                              placeholder="My New Project" 
                              className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" 
                              data-testid="input-workspace-name" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">Project Type</label>
                            <select 
                              value={newWorkspaceType}
                              onChange={(e) => setNewWorkspaceType(e.target.value)}
                              className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm" 
                              data-testid="select-workspace-type"
                            >
                              <option>website</option>
                              <option>game</option>
                              <option>app</option>
                              <option>api</option>
                              <option>ai-project</option>
                            </select>
                          </div>
                        </div>
                        <button 
                          onClick={handleCreateWorkspace}
                          className="mt-4 px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 text-teal-400 rounded text-sm font-medium" 
                          data-testid="button-create-workspace"
                        >
                          Create Workspace
                        </button>
                      </div>

                      {/* Current Workspaces */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Your Workspaces</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {workspaces.map((workspace) => (
                            <div 
                              key={workspace.id}
                              className={`bg-card border rounded-lg p-4 hover:bg-muted/50 transition-colors ${
                                currentWorkspace === workspace.id ? `border-${workspace.color}-500` : 'border-border'
                              }`}
                              data-testid={`workspace-card-${workspace.id}`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className={`w-10 h-10 rounded-lg bg-${workspace.color}-500/20 flex items-center justify-center`}>
                                  <Folder className={`text-${workspace.color}-400`} size={20} />
                                </div>
                                {currentWorkspace === workspace.id && (
                                  <span className={`px-2 py-0.5 text-[10px] rounded bg-${workspace.color}-500/20 text-${workspace.color}-400 font-medium`}>ACTIVE</span>
                                )}
                              </div>
                              <h4 className="text-sm font-semibold text-foreground mb-1">{workspace.name}</h4>
                              <p className="text-xs text-muted-foreground mb-3 capitalize">{workspace.type}</p>
                              <div className="text-[10px] text-muted-foreground mb-3">Last modified: {workspace.lastModified}</div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleSwitchWorkspace(workspace.id)}
                                  disabled={currentWorkspace === workspace.id}
                                  className={`flex-1 px-3 py-1.5 bg-${workspace.color}-500/20 hover:bg-${workspace.color}-500/30 border border-${workspace.color}-500/30 text-${workspace.color}-400 rounded text-xs font-medium disabled:opacity-50`}
                                  data-testid={`button-switch-workspace-${workspace.id}`}
                                >
                                  {currentWorkspace === workspace.id ? 'Current' : 'Switch'}
                                </button>
                                <button 
                                  onClick={() => handleDeleteWorkspace(workspace.id)}
                                  className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded text-xs font-medium"
                                  data-testid={`button-delete-workspace-${workspace.id}`}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-red-500/20 rounded transition-colors text-muted-foreground hover:text-red-400"
                  data-testid="button-close-settings"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {/* Appearance */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Appearance</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">Theme</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {(Object.keys(themes) as Array<keyof typeof themes>).map((themeKey) => (
                          <button
                            key={themeKey}
                            onClick={() => setCurrentTheme(themeKey)}
                            className={`px-3 py-2 rounded border text-xs font-medium transition-colors ${
                              currentTheme === themeKey
                                ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                                : 'border-border bg-card text-foreground hover:bg-muted'
                            }`}
                            data-testid={`theme-${themeKey}`}
                          >
                            {themes[themeKey].name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy & Security */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Privacy & Security</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-card border border-border rounded">
                      <div>
                        <div className="text-xs font-medium text-foreground">Block Third-Party Cookies</div>
                        <div className="text-xs text-muted-foreground">Prevent websites from tracking you</div>
                      </div>
                      <button
                        onClick={() => setBlockCookies(!blockCookies)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          blockCookies ? 'bg-cyan-500' : 'bg-muted'
                        }`}
                        data-testid="toggle-block-cookies"
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          blockCookies ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card border border-border rounded">
                      <div>
                        <div className="text-xs font-medium text-foreground">Send "Do Not Track" Request</div>
                        <div className="text-xs text-muted-foreground">Ask websites not to track you</div>
                      </div>
                      <button
                        onClick={() => setDoNotTrack(!doNotTrack)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          doNotTrack ? 'bg-cyan-500' : 'bg-muted'
                        }`}
                        data-testid="toggle-do-not-track"
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          doNotTrack ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Default Browser */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Default Browser</h3>
                  <button className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded text-sm font-medium">
                    Make YOUNIVERSE Your Default Browser
                  </button>
                </div>

                {/* Advanced */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Advanced</h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 text-left text-xs bg-card hover:bg-muted border border-border rounded text-foreground flex items-center justify-between">
                      <span>Clear Browsing Data</span>
                      <Trash2 size={14} />
                    </button>
                    <button className="w-full px-3 py-2 text-left text-xs bg-card hover:bg-muted border border-border rounded text-foreground flex items-center justify-between">
                      <span>Reset All Settings</span>
                      <RotateCw size={14} />
                    </button>
                  </div>
                </div>

                {/* About */}
                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">About YOUNIVERSE</h3>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Version: 1.0.0</p>
                    <p>Consciousness-Aware Browser & Development Platform</p>
                    <p className="text-cyan-400 mt-2">© 2025 YOUNIVERSE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Preview Modal */}
        {showLivePreview && (
          <LivePreview
            html={codeContent}
            onClose={() => setShowLivePreview(false)}
          />
        )}
      </div>
    </div>
  );
}
