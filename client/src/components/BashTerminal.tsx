import { useState, useRef, useEffect } from "react";
import { Terminal, Play, Trash2, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { TerminalSession, TerminalCommand } from "@shared/schema";

export default function BashTerminal() {
  const [command, setCommand] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { data: sessions = [] } = useQuery<TerminalSession[]>({
    queryKey: ["/api/terminal/sessions"],
  });

  const { data: currentSession } = useQuery<TerminalSession>({
    queryKey: ["/api/terminal/sessions", sessionId],
    enabled: !!sessionId,
  });

  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/terminal/sessions", {
        name: `Session ${new Date().toLocaleTimeString()}`,
        commands: [],
        createdAt: Date.now(),
        isActive: true,
      });
      return await res.json() as TerminalSession;
    },
    onSuccess: (newSession) => {
      setSessionId(newSession.id);
      queryClient.invalidateQueries({ queryKey: ["/api/terminal/sessions"] });
      toast({
        title: "Session Created",
        description: "New terminal session started",
      });
    },
  });

  const executeCommandMutation = useMutation({
    mutationFn: async (cmd: string) => {
      if (!sessionId) throw new Error("No active session");
      
      const res = await apiRequest("POST", `/api/terminal/sessions/${sessionId}/commands`, {
        command: cmd,
        output: `Mock output for: ${cmd}\n(Terminal execution is simulated in demo mode)`,
        exitCode: 0,
        timestamp: Date.now(),
      });
      return await res.json() as TerminalCommand;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/terminal/sessions", sessionId] });
      setCommand("");
    },
  });

  const handleExecute = () => {
    if (!command.trim()) return;
    if (!sessionId) {
      toast({
        title: "No Session",
        description: "Please create a terminal session first",
        variant: "destructive",
      });
      return;
    }
    executeCommandMutation.mutate(command);
  };

  const handleClear = () => {
    setCommand("");
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.commands]);

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-background">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
              <Terminal className="text-green-400" size={24} />
              Bash Terminal
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">Execute shell commands</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => createSessionMutation.mutate()}
              disabled={createSessionMutation.isPending}
              className="h-8"
              data-testid="button-create-session"
            >
              <Play size={14} className="mr-1.5" />
              New Session
            </Button>
            {sessionId && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleClear}
                className="h-8"
                data-testid="button-clear-terminal"
              >
                <Trash2 size={14} className="mr-1.5" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {!sessionId && (
          <Card className="p-6 md:p-8 text-center">
            <Terminal size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
              No Active Session
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">
              Create a new terminal session to start executing commands
            </p>
            <Button
              onClick={() => createSessionMutation.mutate()}
              disabled={createSessionMutation.isPending}
              data-testid="button-start-session"
            >
              <Play size={16} className="mr-2" />
              Start Terminal
            </Button>
          </Card>
        )}

        {sessionId && (
          <>
            <Card className="bg-black/60 border-green-500/30">
              <div className="p-3 md:p-4 space-y-1 font-mono text-xs md:text-sm max-h-96 overflow-y-auto">
                {currentSession?.commands.map((cmd, idx) => (
                  <div key={cmd.id || idx} className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">$</span>
                      <span className="text-foreground flex-1 break-all">{cmd.command}</span>
                    </div>
                    {cmd.output && (
                      <div className="text-muted-foreground pl-4 whitespace-pre-wrap break-words">
                        {cmd.output}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 bg-black/60 border border-green-500/30 rounded-lg px-3 py-2">
                <span className="text-green-400 font-mono text-sm">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExecute()}
                  placeholder="Enter command..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-xs md:text-sm placeholder:text-muted-foreground"
                  data-testid="input-terminal-command"
                />
              </div>
              <Button
                onClick={handleExecute}
                disabled={!command.trim() || executeCommandMutation.isPending}
                className="h-10"
                data-testid="button-execute-command"
              >
                <Play size={16} className="mr-2" />
                Execute
              </Button>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/30 border border-border rounded-lg p-3">
              <strong className="text-foreground">Note:</strong> This is a simulated terminal for demo purposes. 
              Commands are logged but not actually executed on the server.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
