import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Trash2, Settings, Plus, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ChatConversation, ChatMessage, AIProvider } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";

const MODEL_OPTIONS = {
  openai: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
  claude: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
  ollama: ["llama2", "mistral", "codellama", "neural-chat"],
};

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState<AIProvider>("openai");
  const [model, setModel] = useState("gpt-4");
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { data: conversations = [] } = useQuery<ChatConversation[]>({
    queryKey: ["/api/conversations"],
  });

  const { data: activeConversation } = useQuery<ChatConversation>({
    queryKey: ["/api/conversations", activeConversationId],
    enabled: !!activeConversationId,
  });

  const createConversationMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/conversations", {
        title: `Chat ${new Date().toLocaleTimeString()}`,
        messages: [],
        provider,
        model,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return await res.json() as ChatConversation;
    },
    onSuccess: (newConv) => {
      setActiveConversationId(newConv.id);
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
      toast({
        title: "New Conversation",
        description: "Started a new chat conversation",
      });
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!activeConversationId) throw new Error("No active conversation");
      
      const res = await apiRequest("POST", `/api/conversations/${activeConversationId}/messages`, {
        role: "user",
        content,
        timestamp: Date.now(),
        provider,
        model,
      });
      return await res.json() as ChatMessage;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/conversations", activeConversationId] });
      
      setTimeout(async () => {
        if (!activeConversationId) return;
        await apiRequest("POST", `/api/conversations/${activeConversationId}/messages`, {
          role: "assistant",
          content: "I'm a simulated AI response. To enable real AI responses, please configure your API key in settings and integrate with actual AI providers.",
          timestamp: Date.now(),
          provider,
          model,
        });
        queryClient.invalidateQueries({ queryKey: ["/api/conversations", activeConversationId] });
      }, 1000);
      
      setMessage("");
    },
  });

  const handleSend = () => {
    if (!message.trim()) return;
    if (!activeConversationId) {
      toast({
        title: "No Conversation",
        description: "Please start a new conversation first",
        variant: "destructive",
      });
      return;
    }
    if (!apiKey && provider !== "ollama") {
      toast({
        title: "API Key Required",
        description: `Please configure your ${provider.toUpperCase()} API key in settings`,
        variant: "destructive",
      });
      return;
    }
    sendMessageMutation.mutate(message);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  useEffect(() => {
    setModel(MODEL_OPTIONS[provider][0]);
  }, [provider]);

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-background">
      <div className="w-full md:w-64 bg-card border-r border-border flex flex-col">
        <div className="p-3 md:p-4 border-b border-border">
          <Button
            onClick={() => createConversationMutation.mutate()}
            disabled={createConversationMutation.isPending}
            className="w-full h-9"
            data-testid="button-new-conversation"
          >
            <Plus size={16} className="mr-2" />
            New Chat
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeConversationId === conv.id
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-muted text-foreground"
                }`}
                data-testid={`button-conversation-${conv.id}`}
              >
                <div className="font-medium truncate">{conv.title}</div>
                <div className="text-xs text-muted-foreground">{conv.messages.length} messages</div>
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
            className="w-full h-9"
            data-testid="button-toggle-settings"
          >
            <Settings size={16} className="mr-2" />
            {showSettings ? "Hide" : "Show"} Settings
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {showSettings && (
          <Card className="m-4 p-4 space-y-4 bg-muted/30">
            <h3 className="text-sm font-semibold text-foreground">AI Configuration</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  AI Provider
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as AIProvider)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                  data-testid="select-ai-provider"
                >
                  <option value="openai">OpenAI (GPT)</option>
                  <option value="claude">Anthropic (Claude)</option>
                  <option value="ollama">Ollama (Local)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                  data-testid="select-ai-model"
                >
                  {MODEL_OPTIONS[provider].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                API Key {provider !== "ollama" && <span className="text-red-400">*</span>}
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter your ${provider.toUpperCase()} API key`}
                className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                data-testid="input-api-key"
                disabled={provider === "ollama"}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {provider === "ollama" 
                  ? "Ollama runs locally and doesn't require an API key"
                  : "Your API key is stored locally and never sent to our servers"}
              </p>
            </div>
          </Card>
        )}

        {!activeConversationId && (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  AI Chat Assistant
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start a new conversation with AI
                </p>
                <Button
                  onClick={() => createConversationMutation.mutate()}
                  disabled={createConversationMutation.isPending}
                  data-testid="button-start-chat"
                >
                  <Sparkles size={16} className="mr-2" />
                  Start Chatting
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeConversationId && (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-4xl mx-auto space-y-4">
                {activeConversation?.messages.map((msg, idx) => (
                  <div
                    key={msg.id || idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <Card
                      className={`max-w-[85%] p-3 ${
                        msg.role === "user"
                          ? "bg-primary/20 border-primary/30"
                          : "bg-muted/50"
                      }`}
                    >
                      <div className="text-xs text-muted-foreground mb-1 font-medium">
                        {msg.role === "user" ? "You" : "AI"}
                      </div>
                      <div className="text-sm text-foreground whitespace-pre-wrap break-words">
                        {msg.content}
                      </div>
                    </Card>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <div className="max-w-4xl mx-auto flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50"
                  data-testid="input-chat-message"
                  disabled={sendMessageMutation.isPending}
                />
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  className="h-10"
                  data-testid="button-send-message"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
