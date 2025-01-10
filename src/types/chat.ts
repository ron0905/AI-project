export interface ChatBotPrompt {
  id: string;
  idolId: string;
  idolName: string;
  groupName: string;
  imageUrl: string;
  personality: string;
  background: string;
  interests: string;
  skills: string;
  speaking_style: string;
  catchphrase: string;
  prompt: string;
  status: 'active' | 'inactive';
  lastModified: string;
}

export interface ChatAnalytics {
  totalChats: number;
  averageResponseTime: number;
  dailyActiveUsers: number;
  popularTopics: Array<{
    topic: string;
    count: number;
  }>;
  userSatisfaction: number;
}

export interface ChatSession {
  id: string;
  userId: string;
  idolId: string;
  startTime: string;
  endTime?: string;
  messageCount: number;
  satisfaction?: number;
}

export type ChatStatus = 'active' | 'inactive' | 'maintenance';

export interface ChatSettings {
  maxMessagesPerDay: number;
  responseDelay: number;
  aiModel: string;
  language: string;
  moderationLevel: 'low' | 'medium' | 'high';
} 