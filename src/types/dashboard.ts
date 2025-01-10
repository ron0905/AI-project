import { GroupRank } from './types';

export interface DashboardMetrics {
  // アイドル分析
  idols: {
    totalPlatformIdols: number;
    ownedIdols: Array<{
      id: string;
      name: string;
      imageUrl: string;
      rank: GroupRank;
      ranking: number;
      groupId?: string;
    }>;
    rankingCriteria: Record<GroupRank, { min: number; max: number }>;
  };
  
  // グループ分析
  groups: {
    totalPlatformGroups: number;
    ownedGroups: Array<{
      id: string;
      name: string;
      imageUrl: string;
      rank: GroupRank;
      ranking: number;
      memberCount: number;
      color?: string;
    }>;
    rankingCriteria: Record<GroupRank, { min: number; max: number }>;
  };
  
  // 活動分析
  activities: {
    totalSongs: number;
    totalLives: number;
    totalFanMeetings: number;
    totalPosts: number;
    monthlyActivities: Array<{
      month: string;
      songs: number;
      lives: number;
      fanMeetings: number;
      posts: number;
    }>;
  };

  // ファン分析
  fans: {
    total: number;
    monthlyGrowth: number;
    demographics: {
      age: Record<string, number>;
      gender: Record<string, number>;
      region: Record<string, number>;
    };
    topGroups: Array<{
      groupId: string;
      groupName: string;
      fanCount: number;
      monthlyGrowth: number;
    }>;
  };

  // 収益分析
  revenue: {
    total: number;
    monthly: number;
    breakdown: {
      subscription: number;
      virtualLive: number;
      merchandise: number;
      fanMeeting: number;
      other: number;
    };
    monthlyTrend: Array<{
      month: string;
      amount: number;
      breakdown: Record<string, number>;
    }>;
  };
} 