// File System Types
export interface FileNode {
  path: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified?: string;
  children?: FileNode[];
}

export interface TabFile {
  path: string;
  name: string;
  content: string;
  isDirty: boolean;
  type: 'code' | 'text' | 'json' | 'image';
  language?: string;
}

// Agent Types
export interface AgentTask {
  id: string;
  prompt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  steps: AgentStep[];
  result?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentStep {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  details?: string;
  output?: string;
  error?: string;
}

// Chat Types
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'file-list' | 'error' | 'success' | 'code';
}

// LLM Types
export interface LLMProvider {
  name: 'openai' | 'anthropic' | 'google';
  model: string;
  apiKey: string;
}

export interface LLMRequest {
  prompt: string;
  context?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface LLMResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Terminal Types
export interface TerminalSession {
  id: string;
  workingDirectory: string;
  status: 'active' | 'closed';
  createdAt: Date;
}

export interface TerminalCommand {
  command: string;
  output: string;
  exitCode: number;
  timestamp: Date;
}

// Git Types
export interface GitStatus {
  branch: string;
  ahead: number;
  behind: number;
  modified: string[];
  staged: string[];
  untracked: string[];
}

export interface GitCommit {
  hash: string;
  author: string;
  date: Date;
  message: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
