import { type User, type InsertUser, type ModuleAssembly, type ChatConversation, type ChatMessage, type TerminalSession, type TerminalCommand, type LLMTrainingConfig, type GANTrainingConfig } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  addAssembly(assembly: ModuleAssembly): ModuleAssembly;
  getAssemblies(): ModuleAssembly[];
  getAssemblyById(id: string): ModuleAssembly | undefined;

  // AI Chat
  createConversation(conversation: Omit<ChatConversation, 'id'>): ChatConversation;
  getConversations(): ChatConversation[];
  getConversation(id: string): ChatConversation | undefined;
  updateConversation(id: string, updates: Partial<ChatConversation>): ChatConversation | undefined;
  deleteConversation(id: string): boolean;
  addMessageToConversation(conversationId: string, message: Omit<ChatMessage, 'id'>): ChatMessage | undefined;

  // Terminal
  createTerminalSession(session: Omit<TerminalSession, 'id'>): TerminalSession;
  getTerminalSessions(): TerminalSession[];
  getTerminalSession(id: string): TerminalSession | undefined;
  addCommandToSession(sessionId: string, command: Omit<TerminalCommand, 'id'>): TerminalCommand | undefined;

  // LLM Training
  createLLMTraining(config: Omit<LLMTrainingConfig, 'id'>): LLMTrainingConfig;
  getLLMTrainings(): LLMTrainingConfig[];
  getLLMTraining(id: string): LLMTrainingConfig | undefined;
  updateLLMTraining(id: string, updates: Partial<LLMTrainingConfig>): LLMTrainingConfig | undefined;

  // GAN Training
  createGANTraining(config: Omit<GANTrainingConfig, 'id'>): GANTrainingConfig;
  getGANTrainings(): GANTrainingConfig[];
  getGANTraining(id: string): GANTrainingConfig | undefined;
  updateGANTraining(id: string, updates: Partial<GANTrainingConfig>): GANTrainingConfig | undefined;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private assemblies: ModuleAssembly[];
  private conversations: Map<string, ChatConversation>;
  private terminalSessions: Map<string, TerminalSession>;
  private llmTrainings: Map<string, LLMTrainingConfig>;
  private ganTrainings: Map<string, GANTrainingConfig>;

  constructor() {
    this.users = new Map();
    this.assemblies = [];
    this.conversations = new Map();
    this.terminalSessions = new Map();
    this.llmTrainings = new Map();
    this.ganTrainings = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  addAssembly(assembly: ModuleAssembly): ModuleAssembly {
    this.assemblies.push(assembly);
    return assembly;
  }

  getAssemblies(): ModuleAssembly[] {
    return this.assemblies;
  }

  getAssemblyById(id: string): ModuleAssembly | undefined {
    return this.assemblies.find(a => a.moduleId === id);
  }

  // AI Chat methods
  createConversation(conversation: Omit<ChatConversation, 'id'>): ChatConversation {
    const id = randomUUID();
    const newConversation: ChatConversation = { ...conversation, id };
    this.conversations.set(id, newConversation);
    return newConversation;
  }

  getConversations(): ChatConversation[] {
    return Array.from(this.conversations.values());
  }

  getConversation(id: string): ChatConversation | undefined {
    return this.conversations.get(id);
  }

  updateConversation(id: string, updates: Partial<ChatConversation>): ChatConversation | undefined {
    const conversation = this.conversations.get(id);
    if (!conversation) return undefined;
    const updated = { ...conversation, ...updates, id };
    this.conversations.set(id, updated);
    return updated;
  }

  deleteConversation(id: string): boolean {
    return this.conversations.delete(id);
  }

  addMessageToConversation(conversationId: string, message: Omit<ChatMessage, 'id'>): ChatMessage | undefined {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return undefined;
    
    const newMessage: ChatMessage = { ...message, id: randomUUID() };
    conversation.messages.push(newMessage);
    conversation.updatedAt = Date.now();
    this.conversations.set(conversationId, conversation);
    return newMessage;
  }

  // Terminal methods
  createTerminalSession(session: Omit<TerminalSession, 'id'>): TerminalSession {
    const id = randomUUID();
    const newSession: TerminalSession = { ...session, id };
    this.terminalSessions.set(id, newSession);
    return newSession;
  }

  getTerminalSessions(): TerminalSession[] {
    return Array.from(this.terminalSessions.values());
  }

  getTerminalSession(id: string): TerminalSession | undefined {
    return this.terminalSessions.get(id);
  }

  addCommandToSession(sessionId: string, command: Omit<TerminalCommand, 'id'>): TerminalCommand | undefined {
    const session = this.terminalSessions.get(sessionId);
    if (!session) return undefined;
    
    const newCommand: TerminalCommand = { ...command, id: randomUUID() };
    session.commands.push(newCommand);
    this.terminalSessions.set(sessionId, session);
    return newCommand;
  }

  // LLM Training methods
  createLLMTraining(config: Omit<LLMTrainingConfig, 'id'>): LLMTrainingConfig {
    const id = randomUUID();
    const newConfig: LLMTrainingConfig = { ...config, id };
    this.llmTrainings.set(id, newConfig);
    return newConfig;
  }

  getLLMTrainings(): LLMTrainingConfig[] {
    return Array.from(this.llmTrainings.values());
  }

  getLLMTraining(id: string): LLMTrainingConfig | undefined {
    return this.llmTrainings.get(id);
  }

  updateLLMTraining(id: string, updates: Partial<LLMTrainingConfig>): LLMTrainingConfig | undefined {
    const config = this.llmTrainings.get(id);
    if (!config) return undefined;
    const updated = { ...config, ...updates, id };
    this.llmTrainings.set(id, updated);
    return updated;
  }

  // GAN Training methods
  createGANTraining(config: Omit<GANTrainingConfig, 'id'>): GANTrainingConfig {
    const id = randomUUID();
    const newConfig: GANTrainingConfig = { ...config, id };
    this.ganTrainings.set(id, newConfig);
    return newConfig;
  }

  getGANTrainings(): GANTrainingConfig[] {
    return Array.from(this.ganTrainings.values());
  }

  getGANTraining(id: string): GANTrainingConfig | undefined {
    return this.ganTrainings.get(id);
  }

  updateGANTraining(id: string, updates: Partial<GANTrainingConfig>): GANTrainingConfig | undefined {
    const config = this.ganTrainings.get(id);
    if (!config) return undefined;
    const updated = { ...config, ...updates, id };
    this.ganTrainings.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
