export type ViewType =
  | 'dashboard'
  | 'idolManagement'
  | 'contentManagement'
  | 'chatManagement'
  | 'billing'
  | 'liveManagement'
  | 'settings';

export type GroupRank = 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

export interface IdolGroup {
  id: string;
  name: string;
  imageUrl: string;
  status: 'active' | 'inactive';
  description: string;
  memberCount: number;
  debutDate: string;
  concept: string;
  rank: GroupRank;
  rankPoints: number;
  ranking: number;
}

export const rankConfig: Record<GroupRank, {
  color: string;
  label: string;
  maxRanking: number;
}> = {
  SS: { color: '#DAA520', label: 'エリートグループ', maxRanking: 3 },
  S: { color: '#8C8C8C', label: 'レギュラーグループ', maxRanking: 10 },
  A: { color: '#DC143C', label: 'ルーキーグループ', maxRanking: 50 },
  B: { color: '#4169E1', label: '研修生グループ', maxRanking: 100 },
  C: { color: '#2E8B57', label: '認定グループ', maxRanking: 1000 },
  D: { color: '#696969', label: '一般グループ', maxRanking: Infinity },
  E: { color: '#A9A9A9', label: '作成中グループ', maxRanking: Infinity }
} as const;

export interface Member {
  id: string;
  name: string;
  nickname: string;
  birthDate: string;
  birthPlace: string;
  height: number;
  zodiacSign: string;
  bloodType: string;
  hobbies: string[];
  specialSkills: string[];
  voiceModel: string;
  memberColor?: string;
  position?: 'select' | 'under';
  customPrompt?: string;
}