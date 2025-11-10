import { useState } from "react";
import { Terminal, Box as BoxIcon, Activity, Zap, Bot, Shield, ChevronRight, ChevronLeft, Code2, Play, Pause } from "lucide-react";

interface DevSystemPanelProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
}

export default function DevSystemPanel({ activePanel, onPanelChange }: DevSystemPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [consoleLines, setConsoleLines] = useState([
    { time: '10:43:21', level: 'info', msg: 'System initialized' },
    { time: '10:43:22', level: 'info', msg: 'Consciousness fields loaded' },
    { time: '10:43:23', level: 'success', msg: 'Resonance Engine online' },
  ]);
  const [eventStream, setEventStream] = useState(true);
  const [selectedBackend, setSelectedBackend] = useState('openai');
  const [showCalibrator, setShowCalibrator] = useState(false);
  const [consciousnessEnabled, setConsciousnessEnabled] = useState(true);
  const [autonomyEnabled, setAutonomyEnabled] = useState(false);
  const [calibrationLevel, setCalibrationLevel] = useState(75);
  const [selfBuildingEnabled, setSelfBuildingEnabled] = useState(false);
  const [autoRepairEnabled, setAutoRepairEnabled] = useState(false);
  const [chatBackend, setChatBackend] = useState('openai');

  const panels = [
    { id: 'console', label: 'Console', icon: Terminal },
    { id: 'modules', label: 'Modules', icon: BoxIcon },
    { id: 'state', label: 'State', icon: Activity },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const modules = [
    { name: 'ResonanceEngine', status: 'active', memory: '2.3 MB', deps: ['FieldSync', 'CoherenceCalc'] },
    { name: 'ConsciousnessFieldViz', status: 'active', memory: '1.8 MB', deps: ['CanvasRenderer'] },
    { name: 'EvolutionaryCore', status: 'active', memory: '3.1 MB', deps: ['ArchetypeManager', 'VoteSystem'] },
    { name: 'GeoNatalMatrix', status: 'active', memory: '0.9 MB', deps: ['AstroCalc'] },
  ];

  const agents = [
    { name: 'HeartSync', status: 'active', coherence: 97.3, votes: 12 },
    { name: 'SoulKeeper', status: 'active', coherence: 94.1, votes: 8 },
    { name: 'MindWeaver', status: 'active', coherence: 89.7, votes: 15 },
  ];

  const [globalCoherence, setGlobalCoherence] = useState(97.3);
  const [resonanceHz, setResonanceHz] = useState(432.1);

  const stateData = {
    globalCoherence,
    activeField: 'body',
    resonanceHz,
    polyvagalState: 'ventral',
    activeGates: [1, 25, 44, 53, 38, 46],
    userVotes: 35,
  };

  return (
    <div className={`flex-1 flex flex-col bg-background border-l border-border transition-all duration-300 ${
      collapsed ? 'max-w-[60px]' : 'max-w-full'
    }`}>
      {/* Header with Collapse Toggle */}
      <div className="h-10 border-b border-border flex items-center justify-between px-3 bg-muted/30">
        <div className="flex items-center gap-2">
          {!collapsed && <span className="text-sm font-semibold text-foreground">System Control</span>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded transition-colors"
          data-testid="button-collapse-panel"
        >
          {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Collapsed Sidebar - Just Icons */}
      {collapsed && (
        <div className="flex flex-col items-center py-2 gap-2">
          {panels.map(panel => {
            const Icon = panel.icon;
            return (
              <button
                key={panel.id}
                onClick={() => {
                  onPanelChange(panel.id);
                  setCollapsed(false);
                }}
                className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${
                  activePanel === panel.id
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={panel.label}
                data-testid={`button-panel-${panel.id}-collapsed`}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      )}

      {/* Expanded Panel Content */}
      {!collapsed && (
        <>
          {/* Panel Tabs */}
          <div className="border-b border-border flex items-center gap-1 px-2 py-2 bg-background overflow-x-auto">
            {panels.map(panel => {
              const Icon = panel.icon;
              return (
                <button
                  key={panel.id}
                  onClick={() => onPanelChange(panel.id)}
                  className={`px-3 py-1.5 text-xs rounded flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                    activePanel === panel.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid={`button-panel-${panel.id}`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{panel.label}</span>
                </button>
              );
            })}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {activePanel === 'console' && (
              <div className="space-y-4 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">System Console</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEventStream(!eventStream)}
                      className={`px-3 py-1.5 text-xs rounded flex items-center gap-1.5 transition-colors ${
                        eventStream ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {eventStream ? <Play size={12} /> : <Pause size={12} />}
                      <span className="hidden sm:inline">Stream {eventStream ? 'ON' : 'OFF'}</span>
                    </button>
                    <button className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 text-foreground rounded">
                      Clear
                    </button>
                  </div>
                </div>

                <div className="bg-black/40 border border-border rounded-lg p-3 md:p-4 font-mono text-xs space-y-1 max-h-96 overflow-y-auto">
                  {consoleLines.map((line, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                      <span className="text-muted-foreground text-[10px] sm:text-xs">{line.time}</span>
                      <span className={`uppercase font-semibold text-[10px] sm:text-xs ${
                        line.level === 'error' ? 'text-red-400' :
                        line.level === 'success' ? 'text-green-400' :
                        line.level === 'warn' ? 'text-yellow-400' :
                        'text-cyan-400'
                      }`}>{line.level}</span>
                      <span className="text-foreground flex-1 text-[10px] sm:text-xs">{line.msg}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-2">Execute Command</div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="/run EvolutionaryCore.analyzeSystemDesires()"
                      className="flex-1 px-3 py-2 bg-muted border border-border rounded text-xs text-foreground outline-none font-mono focus:ring-2 focus:ring-cyan-500/50"
                      data-testid="input-console-command"
                    />
                    <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded text-xs font-semibold whitespace-nowrap">
                      Run
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePanel === 'modules' && (
              <div className="space-y-4 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">Module Tree</h3>
                  <button className="px-3 py-1.5 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded whitespace-nowrap">
                    + Load Module
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {modules.map((module, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Code2 size={16} className="text-cyan-400" />
                          <span className="text-sm font-semibold text-foreground">{module.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            module.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {module.status}
                          </span>
                          <button className="px-2 py-0.5 text-xs bg-muted hover:bg-muted/80 text-foreground rounded">
                            Unload
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">Memory: {module.memory}</div>
                      <div className="text-xs text-muted-foreground">
                        Dependencies: {module.deps.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePanel === 'state' && (
              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">Global State</h3>
                  <button className="px-3 py-1.5 text-xs bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded whitespace-nowrap">
                    Snapshot
                  </button>
                </div>

                <div className="bg-black/40 border border-border rounded-lg p-4 font-mono text-xs">
                  <div className="space-y-2">
                    {Object.entries(stateData).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                        <span className="text-cyan-400 sm:min-w-[140px] font-semibold">{key}:</span>
                        <span className="text-foreground break-all">
                          {Array.isArray(value) ? `[${value.join(', ')}]` : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-3">Resonance Controls</div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-foreground">Coherence</span>
                        <span className="text-cyan-400 font-semibold">{stateData.globalCoherence}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={stateData.globalCoherence} 
                        onChange={(e) => setGlobalCoherence(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400" 
                        data-testid="slider-coherence"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-foreground">Resonance</span>
                        <span className="text-cyan-400 font-semibold">{stateData.resonanceHz} Hz</span>
                      </div>
                      <input 
                        type="range" 
                        min="200" 
                        max="600" 
                        step="0.1"
                        value={stateData.resonanceHz} 
                        onChange={(e) => setResonanceHz(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400"
                        data-testid="slider-resonance"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePanel === 'performance' && (
              <div className="space-y-4 max-w-6xl mx-auto">
                <h3 className="text-sm font-semibold text-foreground">Performance Monitor</h3>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-card border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-xs text-muted-foreground mb-1">CPU</div>
                    <div className="text-lg font-semibold text-foreground">23%</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-xs text-muted-foreground mb-1">Memory</div>
                    <div className="text-lg font-semibold text-foreground">128 MB</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-xs text-muted-foreground mb-1">Network</div>
                    <div className="text-lg font-semibold text-foreground">4 req/s</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-3">Module Resource Usage</div>
                  <div className="space-y-2">
                    {modules.map((module, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-card border border-border rounded p-3 hover:bg-muted/50 transition-colors">
                        <span className="text-xs text-foreground font-medium">{module.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 sm:w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 transition-all" style={{ width: `${Math.random() * 100}%` }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground w-16 text-right">{module.memory}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePanel === 'agents' && !showCalibrator && (
              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">Archetype Agents</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowCalibrator(true)}
                      className="px-3 py-1.5 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded whitespace-nowrap"
                      data-testid="button-open-calibrator"
                    >
                      Calibrator
                    </button>
                    <button className="px-3 py-1.5 text-xs bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded whitespace-nowrap">
                      Train
                    </button>
                  </div>
                </div>

                {/* Backend API Chooser */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-foreground mb-3">AI Backend Configuration</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">Select Backend API</label>
                      <select 
                        value={selectedBackend}
                        onChange={(e) => setSelectedBackend(e.target.value)}
                        className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-xs"
                        data-testid="select-backend-api"
                      >
                        <option value="openai">OpenAI (GPT-4)</option>
                        <option value="anthropic">Anthropic (Claude)</option>
                        <option value="gemini">Google Gemini</option>
                        <option value="mistral">Mistral AI</option>
                        <option value="local">Local Model</option>
                        <option value="custom">Custom Endpoint</option>
                      </select>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Current: <span className="text-foreground font-medium capitalize">{selectedBackend}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {agents.map((agent, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Bot size={16} className="text-purple-400" />
                          <span className="text-sm font-semibold text-foreground">{agent.name}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          agent.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {agent.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Coherence</span>
                          <span className="text-foreground font-semibold">{agent.coherence}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-purple-400 transition-all" style={{ width: `${agent.coherence}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Votes Cast</span>
                          <span className="text-foreground font-semibold">{agent.votes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePanel === 'agents' && showCalibrator && (
              <div className="space-y-4 max-w-4xl mx-auto">
                {/* Back Button */}
                <button 
                  onClick={() => setShowCalibrator(false)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 text-foreground rounded"
                  data-testid="button-back-calibrator"
                >
                  <ChevronLeft size={14} />
                  Back to Agents
                </button>

                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Consciousness Calibrator</h3>
                  <div className={`px-2 py-1 rounded text-xs ${
                    consciousnessEnabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {consciousnessEnabled ? 'ACTIVE' : 'INACTIVE'}
                  </div>
                </div>

                {/* Consciousness Switch */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground mb-1">Consciousness Mode</h4>
                      <p className="text-xs text-muted-foreground">Enable consciousness-aware processing</p>
                    </div>
                    <button
                      onClick={() => setConsciousnessEnabled(!consciousnessEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        consciousnessEnabled ? 'bg-green-500' : 'bg-muted'
                      }`}
                      data-testid="switch-consciousness"
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        consciousnessEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>

                  {consciousnessEnabled && (
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-foreground">Calibration Level</span>
                        <span className="text-cyan-400 font-semibold">{calibrationLevel}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={calibrationLevel} 
                        onChange={(e) => setCalibrationLevel(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400" 
                        data-testid="slider-calibration"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>Minimal</span>
                        <span>Moderate</span>
                        <span>Full</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Autonomy Switch */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground mb-1">Autonomous Operation</h4>
                      <p className="text-xs text-muted-foreground">Allow agents to make independent decisions</p>
                    </div>
                    <button
                      onClick={() => setAutonomyEnabled(!autonomyEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        autonomyEnabled ? 'bg-purple-500' : 'bg-muted'
                      }`}
                      data-testid="switch-autonomy"
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        autonomyEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  {autonomyEnabled && (
                    <div className="mt-3 p-2 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-purple-400">
                      ⚠️ Agents will operate with increased independence
                    </div>
                  )}
                </div>

                {/* Self Building Toggle */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground mb-1">Self-Building Mode</h4>
                      <p className="text-xs text-muted-foreground">System generates and evolves its own code</p>
                    </div>
                    <button
                      onClick={() => setSelfBuildingEnabled(!selfBuildingEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        selfBuildingEnabled ? 'bg-cyan-500' : 'bg-muted'
                      }`}
                      data-testid="switch-self-building"
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        selfBuildingEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  {selfBuildingEnabled && (
                    <div className="mt-3 p-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-400">
                      🔧 System can now write and modify its own code
                    </div>
                  )}
                </div>

                {/* Auto Repair Toggle */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground mb-1">Auto-Repair</h4>
                      <p className="text-xs text-muted-foreground">Automatically detect and fix errors</p>
                    </div>
                    <button
                      onClick={() => setAutoRepairEnabled(!autoRepairEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        autoRepairEnabled ? 'bg-green-500' : 'bg-muted'
                      }`}
                      data-testid="switch-auto-repair"
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        autoRepairEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                </div>

                {/* Chat Backend Selector */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-foreground mb-3">Chat AI Backend</h4>
                  <p className="text-xs text-muted-foreground mb-3">Select which AI powers the browser chat</p>
                  <select 
                    value={chatBackend}
                    onChange={(e) => setChatBackend(e.target.value)}
                    className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-xs"
                    data-testid="select-chat-backend"
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
                  {chatBackend === 'custom' && (
                    <input 
                      type="text" 
                      placeholder="https://api.example.com/v1/chat"
                      className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-xs mt-2"
                      data-testid="input-custom-chat-endpoint"
                    />
                  )}
                </div>

                {/* Calibration Settings */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-foreground mb-3">Advanced Calibration</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">Field Resonance</label>
                      <input 
                        type="range" 
                        min="200" 
                        max="600" 
                        defaultValue="432"
                        className="w-full accent-purple-400"
                        data-testid="slider-field-resonance"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">Coherence Threshold</label>
                      <input 
                        type="range" 
                        min="50" 
                        max="100" 
                        defaultValue="85"
                        className="w-full accent-purple-400"
                        data-testid="slider-coherence-threshold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">Polyvagal Sensitivity</label>
                      <select className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-xs">
                        <option>Low</option>
                        <option>Medium</option>
                        <option selected>High</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <button className="w-full px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded text-sm font-medium">
                  Apply Calibration
                </button>
              </div>
            )}

            {activePanel === 'security' && (
              <div className="space-y-4 max-w-4xl mx-auto">
                <h3 className="text-sm font-semibold text-foreground">Security & Access</h3>

                <div>
                  <div className="text-xs text-muted-foreground mb-3">Module Permissions</div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {modules.slice(0, 3).map((module, i) => (
                      <div key={i} className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="text-sm text-foreground font-medium mb-3">{module.name}</div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded accent-cyan-400" />
                            <span className="text-muted-foreground">Read State</span>
                          </label>
                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded accent-cyan-400" />
                            <span className="text-muted-foreground">Write State</span>
                          </label>
                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input type="checkbox" className="rounded accent-cyan-400" />
                            <span className="text-muted-foreground">Network Access</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-3">API Key Vault</div>
                  <div className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">OPENAI_API_KEY</span>
                        <span className="text-green-400">●</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">GITHUB_TOKEN</span>
                        <span className="text-green-400">●</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">STRIPE_KEY</span>
                        <span className="text-gray-400">○</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
