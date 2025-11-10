import { useState } from 'react';
import { MessageSquare, Code2, History, Puzzle, ChevronRight, ChevronLeft, X, Send, Sparkles, Presentation } from 'lucide-react';
import AgentPresentation, { PresentationSlide } from './AgentPresentation';

interface BrowserSideToolsProps {
  visible: boolean;
  onClose: () => void;
}

export default function BrowserSideTools({ visible, onClose }: BrowserSideToolsProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'source' | 'history' | 'extensions'>('chat');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showPresentation, setShowPresentation] = useState(false);
  const [viewSourceCode, setViewSourceCode] = useState('<html>\n  <head>\n    <title>YOUNIVERSE Browser</title>\n  </head>\n  <body>\n    <h1>Welcome to YOUNIVERSE</h1>\n  </body>\n</html>');
  
  const [historyItems] = useState([
    { url: 'https://youniverse.browser/home', title: 'YOUNIVERSE Home', time: '2 mins ago' },
    { url: 'https://example.com', title: 'Example Domain', time: '15 mins ago' },
    { url: 'https://consciousness.portal', title: 'Consciousness Portal', time: '1 hour ago' },
  ]);

  const [extensions] = useState([
    { name: 'Consciousness Tracker', enabled: true, version: '1.0.0' },
    { name: 'Field Visualizer', enabled: true, version: '2.3.1' },
    { name: 'Ad Blocker', enabled: false, version: '3.2.0' },
  ]);

  // Demo presentation slides
  const demoSlides: PresentationSlide[] = [
    {
      id: '1',
      type: 'intro',
      title: 'Your Self-Cultivation Journey',
      content: 'Welcome! I\'ve analyzed your consciousness profile and prepared a personalized plan.',
      agentNote: 'This presentation is tailored to your current resonance state.'
    },
    {
      id: '2',
      type: 'insight',
      title: 'Current State Analysis',
      content: 'Based on your field coherence and active gates, here\'s what I\'ve discovered:',
      bullets: [
        'Your Heart field is at 80% resonance - strong emotional intelligence',
        'Mind field at 70% - balanced analytical capacity',
        'Body field at 50% - opportunity for grounding practices',
      ],
      agentNote: 'Your strongest activation is Gate 1 - Creative Expression'
    },
    {
      id: '3',
      type: 'plan',
      title: 'Recommended Growth Path',
      content: 'I suggest focusing on these three areas over the next 30 days:',
      bullets: [
        'Daily coherence calibration exercises (10 mins)',
        'Activate Gates 12 and 35 through creative projects',
        'Strengthen Body field through movement practices',
      ]
    },
    {
      id: '4',
      type: 'action',
      title: 'Immediate Next Steps',
      content: 'Start your transformation today with these actionable items:',
      bullets: [
        'Install the "HeartSync" agent module',
        'Complete your first field calibration session',
        'Set up daily consciousness tracking',
      ],
      agentNote: 'These steps are compatible with your current 72% coherence level'
    },
    {
      id: '5',
      type: 'summary',
      title: 'Your Path Forward',
      content: 'You have everything you need to evolve. Trust your inner guidance and take consistent action.',
      agentNote: 'I\'ll be here to support you every step of the way. Let\'s build your consciousness together! ✨'
    }
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.toLowerCase();
    let response = 'I understand. Let me help you with that.';
    
    // Trigger presentation for certain keywords
    if (userMessage.includes('plan') || userMessage.includes('present') || userMessage.includes('show me')) {
      response = 'I\'ve prepared a presentation for you! Click the "View Presentation" button below to see your personalized self-cultivation plan.';
    }
    
    setChatMessages([...chatMessages, 
      { role: 'user', content: chatInput },
      { role: 'assistant', content: response }
    ]);
    setChatInput('');
  };

  const handleOpenPresentation = () => {
    setShowPresentation(true);
  };

  if (!visible) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-80 sm:w-96 bg-background border-l border-border shadow-2xl flex flex-col z-50 animate-slide-in-right">
      {/* Header */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-muted/30">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-cyan-400" />
          <h3 className="text-sm font-semibold text-foreground">Browser Tools</h3>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded transition-colors"
          data-testid="button-close-side-tools"
        >
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border flex bg-background">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 px-3 py-2 text-xs flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'chat' 
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-500' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          data-testid="tab-chat"
        >
          <MessageSquare size={14} />
          Chat
        </button>
        <button
          onClick={() => setActiveTab('source')}
          className={`flex-1 px-3 py-2 text-xs flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'source' 
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-500' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          data-testid="tab-source"
        >
          <Code2 size={14} />
          Source
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-3 py-2 text-xs flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'history' 
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-500' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          data-testid="tab-history"
        >
          <History size={14} />
          History
        </button>
        <button
          onClick={() => setActiveTab('extensions')}
          className={`flex-1 px-3 py-2 text-xs flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'extensions' 
              ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-500' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          data-testid="tab-extensions"
        >
          <Puzzle size={14} />
          Extensions
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      msg.role === 'user'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 bg-muted border border-border rounded text-sm text-foreground"
                  data-testid="input-chat-message"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded"
                  data-testid="button-send-message"
                >
                  <Send size={16} />
                </button>
              </div>
              <button
                onClick={handleOpenPresentation}
                className="w-full px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded text-xs font-medium flex items-center justify-center gap-2"
                data-testid="button-agent-presentation"
              >
                <Presentation size={14} />
                View Agent Presentation
              </button>
            </div>
          </div>
        )}

        {activeTab === 'source' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-xs font-semibold text-foreground">Page Source Code</h4>
              <button className="text-xs text-cyan-400 hover:underline">Copy</button>
            </div>
            <pre className="bg-muted border border-border rounded p-3 text-xs text-foreground overflow-x-auto">
              <code>{viewSourceCode}</code>
            </pre>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-xs font-semibold text-foreground mb-3">Browsing History</h4>
            <div className="space-y-2">
              {historyItems.map((item, i) => (
                <div key={i} className="bg-muted border border-border rounded p-3">
                  <div className="text-sm text-foreground font-medium mb-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground mb-1">{item.url}</div>
                  <div className="text-xs text-purple-400">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'extensions' && (
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-xs font-semibold text-foreground mb-3">Installed Extensions</h4>
            <div className="space-y-2">
              {extensions.map((ext, i) => (
                <div key={i} className="bg-muted border border-border rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-foreground font-medium">{ext.name}</div>
                    <div className={`w-10 h-5 rounded-full transition-colors ${
                      ext.enabled ? 'bg-green-500' : 'bg-gray-500'
                    } relative`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        ext.enabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}></div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">v{ext.version}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Agent Presentation Modal */}
      {showPresentation && (
        <AgentPresentation
          slides={demoSlides}
          agentName="Consciousness Guide"
          onClose={() => setShowPresentation(false)}
        />
      )}
    </div>
  );
}
