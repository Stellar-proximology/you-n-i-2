import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { SynthAssembler } from "./synthAssembler";
import type { ModuleAssembly, UserResonanceProfile } from "@shared/schema";
import { decodeHD, sentence } from "./lib/hd-lookup";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Module Assembly Routes

  // Get user's resonance profile
  app.get("/api/resonance-profile", async (req, res) => {
    try {
      // For now, return mock profile - later connect to real user data
      const profile = SynthAssembler.getMockResonanceProfile();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to get resonance profile" 
      });
    }
  });

  // Upload and analyze a module
  app.post("/api/upload-module", upload.single("module"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No module file provided" });
      }

      // Get user's resonance profile
      const profile = SynthAssembler.getMockResonanceProfile();
      
      // Analyze the module
      const assembler = new SynthAssembler(profile);
      const assembly = await assembler.analyzeModule(req.file.buffer);

      // Store the assembly result
      const stored = storage.addAssembly(assembly);

      res.json(stored);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Module analysis failed" 
      });
    }
  });

  // Get all analyzed assemblies
  app.get("/api/assemblies", async (req, res) => {
    try {
      const assemblies = storage.getAssemblies();
      res.json(assemblies);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to get assemblies" 
      });
    }
  });

  // Get specific assembly by ID
  app.get("/api/assemblies/:id", async (req, res) => {
    try {
      const assembly = storage.getAssemblyById(req.params.id);
      if (!assembly) {
        return res.status(404).json({ error: "Assembly not found" });
      }
      res.json(assembly);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to get assembly" 
      });
    }
  });

  // AI Chat Routes
  app.post("/api/conversations", async (req, res) => {
    try {
      const conversation = storage.createConversation(req.body);
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create conversation" });
    }
  });

  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = storage.getConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to get conversations" });
    }
  });

  app.get("/api/conversations/:id", async (req, res) => {
    try {
      const conversation = storage.getConversation(req.params.id);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to get conversation" });
    }
  });

  app.post("/api/conversations/:id/messages", async (req, res) => {
    try {
      const message = storage.addMessageToConversation(req.params.id, req.body);
      if (!message) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to add message" });
    }
  });

  app.delete("/api/conversations/:id", async (req, res) => {
    try {
      const deleted = storage.deleteConversation(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to delete conversation" });
    }
  });

  // Terminal Routes
  app.post("/api/terminal/sessions", async (req, res) => {
    try {
      const session = storage.createTerminalSession(req.body);
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create terminal session" });
    }
  });

  app.get("/api/terminal/sessions", async (req, res) => {
    try {
      const sessions = storage.getTerminalSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to get terminal sessions" });
    }
  });

  app.get("/api/terminal/sessions/:id", async (req, res) => {
    try {
      const session = storage.getTerminalSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to get session" });
    }
  });

  app.post("/api/terminal/sessions/:id/commands", async (req, res) => {
    try {
      const command = storage.addCommandToSession(req.params.id, req.body);
      if (!command) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(command);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to add command" });
    }
  });

  // LLM Training Routes
  app.post("/api/llm-training", async (req, res) => {
    try {
      const config = storage.createLLMTraining(req.body);
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create LLM training" });
    }
  });

  app.get("/api/llm-training", async (req, res) => {
    try {
      const trainings = storage.getLLMTrainings();
      res.json(trainings);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to get LLM trainings" });
    }
  });

  app.get("/api/llm-training/:id", async (req, res) => {
    try {
      const training = storage.getLLMTraining(req.params.id);
      if (!training) {
        return res.status(404).json({ error: "Training not found" });
      }
      res.json(training);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to get training" });
    }
  });

  app.patch("/api/llm-training/:id", async (req, res) => {
    try {
      const updated = storage.updateLLMTraining(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Training not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to update training" });
    }
  });

  // GAN Training Routes
  app.post("/api/gan-training", async (req, res) => {
    try {
      const config = storage.createGANTraining(req.body);
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create GAN training" });
    }
  });

  app.get("/api/gan-training", async (req, res) => {
    try {
      const trainings = storage.getGANTrainings();
      res.json(trainings);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to get GAN trainings" });
    }
  });

  app.get("/api/gan-training/:id", async (req, res) => {
    try {
      const training = storage.getGANTraining(req.params.id);
      if (!training) {
        return res.status(404).json({ error: "Training not found" });
      }
      res.json(training);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to get training" });
    }
  });

  app.patch("/api/gan-training/:id", async (req, res) => {
    try {
      const updated = storage.updateGANTraining(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Training not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to update training" });
    }
  });

  // Human Design Interpretation Endpoint
  app.post("/api/hd-meaning", async (req, res) => {
    try {
      const { gate, line, color, tone, base } = req.body;

      if (!gate || !line || !color || !tone || !base) {
        return res.status(400).json({ error: "Missing HD coordinates (gate, line, color, tone, base)" });
      }

      const data = decodeHD({ gate, line, color, tone, base });
      const assembled = sentence({ gate, line, color, tone, base });

      res.json({
        ...data,
        sentence: assembled
      });
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to decode HD meaning" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
