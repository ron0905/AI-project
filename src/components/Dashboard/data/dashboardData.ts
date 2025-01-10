import { DashboardMetrics } from '../../../types/dashboard';

export const dashboardData: DashboardMetrics = {
  idols: {
    totalPlatformIdols: 10000,
    ownedIdols: [
      {
        id: '1',
        name: '星野みらい',
        imageUrl: '/idols/mirai.png',
        rank: 'SS',
        ranking: 3
      },
      {
        id: '2',
        name: '月島そら',
        imageUrl: '/idols/sora.png',
        rank: 'S',
        ranking: 42
      },
      {
        id: '3',
        name: '桜木はな',
        imageUrl: '/idols/hana.png',
        rank: 'S',
        ranking: 48
      },
      {
        id: '4',
        name: '藤原ゆめ',
        imageUrl: '/idols/yume.png',
        rank: 'A',
        ranking: 156
      },
      {
        id: '5',
        name: '鈴木りん',
        imageUrl: '/idols/rin.png',
        rank: 'A',
        ranking: 187
      },
      {
        id: '6',
        name: '佐藤かなで',
        imageUrl: '/idols/kanade.png',
        rank: 'B',
        ranking: 255
      },
      {
        id: '7',
        name: '高橋めい',
        imageUrl: '/idols/mei.png',
        rank: 'B',
        ranking: 312
      },
      {
        id: '8',
        name: '中村ひより',
        imageUrl: '/idols/hiyori.png',
        rank: 'C',
        ranking: 723
      },
      {
        id: '9',
        name: '山田あおい',
        imageUrl: '/idols/aoi.png',
        rank: 'C',
        ranking: 891
      },
      {
        id: '10',
        name: '伊藤ななみ',
        imageUrl: '/idols/nanami.png',
        rank: 'D',
        ranking: 1245
      }
    ],
    rankingCriteria: {
      SS: { min: 1, max: 10 },
      S: { min: 11, max: 50 },
      A: { min: 51, max: 200 },
      B: { min: 201, max: 500 },
      C: { min: 501, max: 1000 },
      D: { min: 1001, max: 5000 },
      E: { min: 5001, max: Infinity }
    }
  },
  groups: {
    totalPlatformGroups: 500,
    ownedGroups: [
      {
        id: '1',
        name: '桜色スターライト',
        imageUrl: '/groups/sakura-starlight.png',
        rank: 'SS',
        ranking: 2,
        memberCount: 5
      },
      {
        id: '2',
        name: '虹色プリズム',
        imageUrl: '/groups/niji-prism.png',
        rank: 'S',
        ranking: 15,
        memberCount: 4
      }
    ],
    rankingCriteria: {
      SS: { min: 1, max: 10 },
      S: { min: 11, max: 50 },
      A: { min: 51, max: 200 },
      B: { min: 201, max: 500 },
      C: { min: 501, max: 1000 },
      D: { min: 1001, max: 5000 },
      E: { min: 5001, max: Infinity }
    }
  },
  activities: {
    totalSongs: 150,
    totalLives: 48,
    totalFanMeetings: 24,
    totalPosts: 1200,
    monthlyActivities: [
      {
        month: '2024-01',
        songs: 12,
        lives: 4,
        fanMeetings: 2,
        posts: 100
      },
      {
        month: '2024-02',
        songs: 15,
        lives: 5,
        fanMeetings: 3,
        posts: 120
      }
    ]
  },
  fans: {
    total: 50000,
    monthlyGrowth: 1500,
    demographics: {
      age: {
        '10代': 30,
        '20代': 40,
        '30代': 20,
        '40代以上': 10
      },
      gender: {
        '男性': 45,
        '女性': 52,
        'その他': 3
      },
      region: {
        '関東': 35,
        '関西': 25,
        '中部': 15,
        'その他': 25
      }
    },
    topGroups: [
      {
        groupId: '1',
        groupName: '桜色スターライト',
        fanCount: 15000,
        monthlyGrowth: 500
      },
      {
        groupId: '2',
        groupName: '虹色プリズム',
        fanCount: 12000,
        monthlyGrowth: 450
      }
    ]
  },
  revenue: {
    total: 25000000,
    monthly: 2500000,
    breakdown: {
      subscription: 1000000,
      virtualLive: 800000,
      merchandise: 400000,
      fanMeeting: 200000,
      other: 100000
    },
    monthlyTrend: [
      {
        month: '2024-01',
        amount: 2300000,
        breakdown: {
          subscription: 900000,
          virtualLive: 750000,
          merchandise: 350000,
          fanMeeting: 200000,
          other: 100000
        }
      },
      {
        month: '2024-02',
        amount: 2500000,
        breakdown: {
          subscription: 1000000,
          virtualLive: 800000,
          merchandise: 400000,
          fanMeeting: 200000,
          other: 100000
        }
      }
    ]
  }
}; 