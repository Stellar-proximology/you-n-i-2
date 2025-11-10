import { useState } from "react";
import { Brain, Upload, Play, Pause, TrendingUp, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { LLMTrainingConfig } from "@shared/schema";

export default function LLMTrainer() {
  const [trainingName, setTrainingName] = useState("");
  const [baseModel, setBaseModel] = useState("gpt-2");
  const [epochs, setEpochs] = useState(3);
  const [learningRate, setLearningRate] = useState(0.0001);
  const [batchSize, setBatchSize] = useState(8);
  const { toast } = useToast();

  const { data: trainings = [] } = useQuery<LLMTrainingConfig[]>({
    queryKey: ["/api/llm-training"],
  });

  const createTrainingMutation = useMutation({
    mutationFn: async () => {
      if (!trainingName.trim()) {
        throw new Error("Please provide a training name");
      }
      
      const res = await apiRequest("POST", "/api/llm-training", {
        name: trainingName,
        baseModel,
        datasetName: "custom-dataset",
        epochs,
        learningRate,
        batchSize,
        status: "pending",
        progress: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return await res.json() as LLMTrainingConfig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/llm-training"] });
      toast({
        title: "Training Created",
        description: "LLM training configuration saved successfully",
      });
      setTrainingName("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "training":
        return "text-blue-400 bg-blue-500/20";
      case "completed":
        return "text-green-400 bg-green-500/20";
      case "failed":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-yellow-400 bg-yellow-500/20";
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
            <Brain className="text-purple-400" size={24} />
            LLM Trainer
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Fine-tune language models with your datasets
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">New Training Configuration</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Configure parameters for LLM fine-tuning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Training Name
                </label>
                <input
                  type="text"
                  value={trainingName}
                  onChange={(e) => setTrainingName(e.target.value)}
                  placeholder="My Custom Model"
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-sm"
                  data-testid="input-training-name"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Base Model
                </label>
                <select
                  value={baseModel}
                  onChange={(e) => setBaseModel(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-sm"
                  data-testid="select-base-model"
                >
                  <option value="gpt-2">GPT-2</option>
                  <option value="gpt-2-medium">GPT-2 Medium</option>
                  <option value="llama-7b">LLaMA 7B</option>
                  <option value="llama-13b">LLaMA 13B</option>
                  <option value="mistral-7b">Mistral 7B</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Epochs: {epochs}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={epochs}
                  onChange={(e) => setEpochs(parseInt(e.target.value))}
                  className="w-full"
                  data-testid="input-epochs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Learning Rate
                </label>
                <input
                  type="number"
                  step="0.00001"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-sm"
                  data-testid="input-learning-rate"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Batch Size: {batchSize}
                </label>
                <input
                  type="range"
                  min="1"
                  max="128"
                  value={batchSize}
                  onChange={(e) => setBatchSize(parseInt(e.target.value))}
                  className="w-full"
                  data-testid="input-batch-size"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Dataset Upload
                </label>
                <input
                  type="file"
                  accept=".txt,.json,.csv"
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-primary/20 file:text-primary"
                  data-testid="input-dataset-upload"
                />
              </div>
            </div>

            <Button
              onClick={() => createTrainingMutation.mutate()}
              disabled={createTrainingMutation.isPending || !trainingName.trim()}
              className="w-full sm:w-auto"
              data-testid="button-start-training"
            >
              <Play size={16} className="mr-2" />
              Start Training
            </Button>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-4">Training History</h3>
          <div className="grid grid-cols-1 gap-4">
            {trainings.map((training) => (
              <Card key={training.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{training.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Model: {training.baseModel} | Epochs: {training.epochs}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        training.status
                      )}`}
                    >
                      {training.status.toUpperCase()}
                    </div>
                  </div>

                  {training.status === "training" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-medium">{training.progress}%</span>
                      </div>
                      <Progress value={training.progress} className="h-2" />
                    </div>
                  )}

                  {training.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                      {training.metrics.loss !== undefined && (
                        <div>
                          <div className="text-xs text-muted-foreground">Loss</div>
                          <div className="text-sm font-medium text-foreground">
                            {training.metrics.loss.toFixed(4)}
                          </div>
                        </div>
                      )}
                      {training.metrics.accuracy !== undefined && (
                        <div>
                          <div className="text-xs text-muted-foreground">Accuracy</div>
                          <div className="text-sm font-medium text-foreground">
                            {(training.metrics.accuracy * 100).toFixed(2)}%
                          </div>
                        </div>
                      )}
                      {training.metrics.perplexity !== undefined && (
                        <div>
                          <div className="text-xs text-muted-foreground">Perplexity</div>
                          <div className="text-sm font-medium text-foreground">
                            {training.metrics.perplexity.toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {trainings.length === 0 && (
              <Card className="p-8 text-center">
                <Cpu size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No training sessions yet. Create your first LLM training configuration above.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
