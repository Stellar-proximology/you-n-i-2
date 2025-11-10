import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Module & Assembly Schemas for SynthAssembler Agent

export const consciousnessFieldSchema = z.enum([
  "zer",
  "mind", 
  "body",
  "heart",
  "soul",
  "spirit"
]);

export const moduleManifestSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  description: z.string(),
  author: z.string().optional(),
  type: z.enum(["component", "tool", "agent", "game", "template", "gate"]),
  gates: z.array(z.number()).optional(), // Which gates this activates (e.g., [42])
  requiredFields: z.array(consciousnessFieldSchema).optional(),
  dependencies: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const resonanceMapSchema = z.object({
  primaryField: consciousnessFieldSchema,
  fieldWeights: z.record(consciousnessFieldSchema, z.number().min(0).max(1)),
  coherenceThreshold: z.number().min(0).max(1),
  activationConditions: z.object({
    minCoherence: z.number().min(0).max(1).optional(),
    requiredGates: z.array(z.number()).optional(),
    blockedBy: z.array(z.string()).optional(),
  }).optional(),
});

export const userResonanceProfileSchema = z.object({
  userId: z.string(),
  coherence: z.number().min(0).max(1),
  activeFields: z.array(consciousnessFieldSchema),
  fieldLevels: z.record(consciousnessFieldSchema, z.number().min(0).max(1)),
  activeGates: z.array(z.number()),
  preferences: z.record(z.string(), z.any()).optional(),
});

export const moduleAssemblySchema = z.object({
  moduleId: z.string(),
  moduleName: z.string(),
  compatibilityScore: z.number().min(0).max(1),
  status: z.enum(["compatible", "partial", "incompatible", "requires_update"]),
  activatedGates: z.array(z.number()),
  resonanceMatch: z.number().min(0).max(1),
  components: z.object({
    ui: z.array(z.string()),
    logic: z.array(z.string()),
    config: z.array(z.string()),
  }),
  feedback: z.string(),
  warnings: z.array(z.string()).optional(),
  suggestions: z.array(z.string()).optional(),
});

export type ConsciousnessField = z.infer<typeof consciousnessFieldSchema>;
export type ModuleManifest = z.infer<typeof moduleManifestSchema>;
export type ResonanceMap = z.infer<typeof resonanceMapSchema>;
export type UserResonanceProfile = z.infer<typeof userResonanceProfileSchema>;
export type ModuleAssembly = z.infer<typeof moduleAssemblySchema>;

// AI Chat Assistant Schemas

export const aiProviderSchema = z.enum(["openai", "claude", "ollama"]);

export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  timestamp: z.number(),
  provider: aiProviderSchema.optional(),
  model: z.string().optional(),
});

export const chatConversationSchema = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(chatMessageSchema),
  provider: aiProviderSchema,
  model: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const aiConfigSchema = z.object({
  provider: aiProviderSchema,
  apiKey: z.string().optional(),
  model: z.string(),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().min(1).max(100000).optional(),
});

export type AIProvider = z.infer<typeof aiProviderSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatConversation = z.infer<typeof chatConversationSchema>;
export type AIConfig = z.infer<typeof aiConfigSchema>;

// LLM Training Schemas

export const llmTrainingConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  baseModel: z.string(),
  datasetName: z.string(),
  epochs: z.number().min(1).max(100).default(3),
  learningRate: z.number().min(0.00001).max(0.1).default(0.0001),
  batchSize: z.number().min(1).max(128).default(8),
  status: z.enum(["pending", "training", "completed", "failed"]),
  progress: z.number().min(0).max(100).default(0),
  createdAt: z.number(),
  updatedAt: z.number(),
  metrics: z.object({
    loss: z.number().optional(),
    accuracy: z.number().optional(),
    perplexity: z.number().optional(),
  }).optional(),
});

export type LLMTrainingConfig = z.infer<typeof llmTrainingConfigSchema>;

// GAN Training Schemas

export const ganTrainingConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  architecture: z.enum(["dcgan", "stylegan", "wgan"]),
  imageSize: z.number().min(64).max(1024).default(256),
  latentDim: z.number().min(64).max(512).default(128),
  epochs: z.number().min(1).max(1000).default(100),
  batchSize: z.number().min(1).max(64).default(16),
  learningRate: z.number().min(0.00001).max(0.01).default(0.0002),
  status: z.enum(["pending", "training", "completed", "failed"]),
  progress: z.number().min(0).max(100).default(0),
  createdAt: z.number(),
  updatedAt: z.number(),
  generatedSamples: z.array(z.string()).optional(),
  metrics: z.object({
    generatorLoss: z.number().optional(),
    discriminatorLoss: z.number().optional(),
    fid: z.number().optional(),
  }).optional(),
});

export type GANTrainingConfig = z.infer<typeof ganTrainingConfigSchema>;

// Terminal Session Schema

export const terminalCommandSchema = z.object({
  id: z.string(),
  command: z.string(),
  output: z.string(),
  exitCode: z.number().optional(),
  timestamp: z.number(),
});

export const terminalSessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  commands: z.array(terminalCommandSchema),
  createdAt: z.number(),
  isActive: z.boolean().default(true),
});

export type TerminalCommand = z.infer<typeof terminalCommandSchema>;
export type TerminalSession = z.infer<typeof terminalSessionSchema>;
