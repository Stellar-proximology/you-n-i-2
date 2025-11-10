import { useState } from "react";
import { Sparkles, Upload, Play, Image as ImageIcon, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { GANTrainingConfig } from "@shared/schema";

export default function GANTrainer() {
  const [trainingName, setTrainingName] = useState("");
  const [architecture, setArchitecture] = useState<"dcgan" | "stylegan" | "wgan">("dcgan");
  const [imageSize, setImageSize] = useState(256);
  const [latentDim, setLatentDim] = useState(128);
  const [epochs, setEpochs] = useState(100);
  const [batchSize, setBatchSize] = useState(16);
  const [learningRate, setLearningRate] = useState(0.0002);
  const { toast } = useToast();

  const { data: trainings = [] } = useQuery<GANTrainingConfig[]>({
    queryKey: ["/api/gan-training"],
  });

  const createTrainingMutation = useMutation({
    mutationFn: async () => {
      if (!trainingName.trim()) {
        throw new Error("Please provide a training name");
      }
      
      const res = await apiRequest("POST", "/api/gan-training", {
        name: trainingName,
        architecture,
        imageSize,
        latentDim,
        epochs,
        batchSize,
        learningRate,
        status: "pending",
        progress: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return await res.json() as GANTrainingConfig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gan-training"] });
      toast({
        title: "GAN Training Created",
        description: "Your GAN training configuration has been saved",
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
            <Sparkles className="text-pink-400" size={24} />
            GAN Trainer
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Train Generative Adversarial Networks for image generation
          </p>
        </div>

        <Card className="border-pink-500/20">
          <CardHeader>
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Zap size={18} className="text-pink-400" />
              New GAN Training Configuration
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Configure your custom GAN training session
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
                  placeholder="My GAN Model"
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-sm"
                  data-testid="input-gan-training-name"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Architecture
                </label>
                <select
                  value={architecture}
                  onChange={(e) => setArchitecture(e.target.value as "dcgan" | "stylegan" | "wgan")}
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-sm"
                  data-testid="select-gan-architecture"
                >
                  <option value="dcgan">DCGAN (Deep Convolutional)</option>
                  <option value="stylegan">StyleGAN (Style-based)</option>
                  <option value="wgan">WGAN (Wasserstein)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Image Size: {imageSize}x{imageSize}
                </label>
                <input
                  type="range"
                  min="64"
                  max="1024"
                  step="64"
                  value={imageSize}
                  onChange={(e) => setImageSize(parseInt(e.target.value))}
                  className="w-full"
                  data-testid="input-image-size"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>64</span>
                  <span>1024</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Latent Dimension: {latentDim}
                </label>
                <input
                  type="range"
                  min="64"
                  max="512"
                  step="64"
                  value={latentDim}
                  onChange={(e) => setLatentDim(parseInt(e.target.value))}
                  className="w-full"
                  data-testid="input-latent-dim"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>64</span>
                  <span>512</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Epochs: {epochs}
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={epochs}
                  onChange={(e) => setEpochs(parseInt(e.target.value))}
                  className="w-full"
                  data-testid="input-gan-epochs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Batch Size: {batchSize}
                </label>
                <input
                  type="range"
                  min="4"
                  max="64"
                  step="4"
                  value={batchSize}
                  onChange={(e) => setBatchSize(parseInt(e.target.value))}
                  className="w-full"
                  data-testid="input-gan-batch-size"
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
                  data-testid="input-gan-learning-rate"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Training Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-pink-500/20 file:text-pink-400"
                  data-testid="input-gan-images"
                />
              </div>
            </div>

            <Button
              onClick={() => createTrainingMutation.mutate()}
              disabled={createTrainingMutation.isPending || !trainingName.trim()}
              className="w-full sm:w-auto"
              data-testid="button-start-gan-training"
            >
              <Play size={16} className="mr-2" />
              Start GAN Training
            </Button>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-4">GAN Training History</h3>
          <div className="grid grid-cols-1 gap-4">
            {trainings.map((training) => (
              <Card key={training.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{training.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {training.architecture.toUpperCase()} | {training.imageSize}x{training.imageSize} | 
                        {training.epochs} epochs
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
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Training Progress</span>
                        <span className="text-foreground font-medium">{training.progress}%</span>
                      </div>
                      <Progress value={training.progress} className="h-2" />
                    </div>
                  )}

                  {training.generatedSamples && training.generatedSamples.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <div className="text-xs font-medium text-foreground">Generated Samples</div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {training.generatedSamples.slice(0, 6).map((sample, idx) => (
                          <div
                            key={idx}
                            className="aspect-square bg-muted rounded border border-border flex items-center justify-center"
                          >
                            <ImageIcon size={20} className="text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {training.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                      {training.metrics.generatorLoss !== undefined && (
                        <div>
                          <div className="text-xs text-muted-foreground">Generator Loss</div>
                          <div className="text-sm font-medium text-foreground">
                            {training.metrics.generatorLoss.toFixed(4)}
                          </div>
                        </div>
                      )}
                      {training.metrics.discriminatorLoss !== undefined && (
                        <div>
                          <div className="text-xs text-muted-foreground">Discriminator Loss</div>
                          <div className="text-sm font-medium text-foreground">
                            {training.metrics.discriminatorLoss.toFixed(4)}
                          </div>
                        </div>
                      )}
                      {training.metrics.fid !== undefined && (
                        <div>
                          <div className="text-xs text-muted-foreground">FID Score</div>
                          <div className="text-sm font-medium text-foreground">
                            {training.metrics.fid.toFixed(2)}
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
                <Sparkles size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No GAN training sessions yet. Create your first GAN configuration above.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
