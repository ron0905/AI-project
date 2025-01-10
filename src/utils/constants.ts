import { GroupRank } from '../types/types';

interface RankConfig {
  color: string;
  label: string;
}

export const rankConfig: Record<GroupRank, RankConfig> = {
  SS: { color: '#FFD700', label: 'スーパースター' },
  S: { color: '#C0C0C0', label: 'トップスター' },
  A: { color: '#CD7F32', label: 'スター' },
  B: { color: '#4169E1', label: 'メジャー' },
  C: { color: '#2E8B57', label: 'レギュラー' },
  D: { color: '#8B4513', label: 'ルーキー' },
  E: { color: '#808080', label: 'ニューフェイス' }
};
