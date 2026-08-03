export const SCORING_VERSION = 'v1';

export const SCORE_ACTION = {
  EXCLUDE: 'exclude',
  STRONG_PENALTY: 'strongPenalty',
  SCORE: 'score'
};

export const SCORE_LEVEL = {
  high: 100,
  midHigh: 80,
  mid: 60,
  low: 35,
  veryLow: 15
};

const s = score => ({ action:SCORE_ACTION.SCORE, score });
const x = () => ({ action:SCORE_ACTION.EXCLUDE, score:0 });
const p = (score=15) => ({ action:SCORE_ACTION.STRONG_PENALTY, score });
const neutral = (targets, score=80) => Object.fromEntries(targets.map(key => [key, s(score)]));

export const MATCH_SCORE_CONFIG = {
  version: SCORING_VERSION,
  totalScore: 100,
  maxDisplayPercent: 99,
  minimumRecommendScore: 80,
  recommendationRule: {
    mode: 'mutualThreshold',
    threshold: 80,
    requireBothDirections: true,
    displayScore: 'viewerScore',
    note: '雙方各自看對方都達 80 分以上才推薦；畫面顯示目前使用者看對方的契合度，最高 99%。'
  },
  quizMaxScore: 85,
  profileBonusMaxScore: 15,
  priorityWeighting: {
    enabledCategories: ['lifestyle', 'future', 'relationship', 'communication', 'money'],
    labels: {
      lifestyle: '生活習慣',
      future: '未來規劃',
      relationship: '相處模式',
      communication: '溝通方式',
      money: '金錢觀'
    },
    rankMultipliers: [1.35, 1.2, 1.1],
    fixedCategories: ['appearance', 'smoking', 'drinking'],
    note: '外型固定計分；抽菸與飲酒走硬性規則，不參與使用者偏好排序加權。'
  },
  profileBonus: {
    tagOverlapPerTag: 2,
    tagOverlapMax: 12,
    sameJob: 3,
    ignoredFields: ['city', 'age', 'height'],
    note: '地區與年齡放配對頁篩選；身高不計分。'
  }
};

export const QUIZ_SCORING_RULES = {
  version: SCORING_VERSION,
  config: MATCH_SCORE_CONFIG,
  rules: [
    {
      id: 'appearance_acceptance_to_appearance',
      expectationOrder: 16,
      targetOrder: 1,
      dimension: 'appearance',
      priorityCategory: null,
      weight: 5,
      matrix: {
        A: { A:s(80), B:s(100), C:s(90), D:s(70) },
        B: { A:s(80), B:s(80),  C:s(100), D:s(55) },
        C: { A:s(100),B:s(70),  C:s(80),  D:p(35) },
        D: neutral(['A','B','C','D'])
      }
    },
    {
      id: 'rhythm_acceptance_to_rhythm',
      expectationOrder: 17,
      targetOrder: 2,
      dimension: 'rhythm',
      priorityCategory: 'lifestyle',
      weight: 5,
      matrix: {
        A: { A:s(100), B:s(80), C:p(25), D:s(40) },
        B: { A:s(75),  B:s(100),C:s(60), D:s(60) },
        C: { A:s(50),  B:s(70), C:s(100),D:s(75) },
        D: { A:s(70),  B:s(80), C:s(80), D:s(100) },
        E: neutral(['A','B','C','D'])
      }
    },
    {
      id: 'schedule_acceptance_to_schedule',
      expectationOrder: 18,
      targetOrder: 3,
      dimension: 'schedule',
      priorityCategory: 'lifestyle',
      weight: 5,
      matrix: {
        A: { A:s(100), B:s(35), C:p(25), D:s(60) },
        B: { A:s(70),  B:s(100),C:s(60), D:s(75) },
        C: { A:s(65),  B:s(70), C:s(100),D:s(75) },
        D: { A:s(70),  B:s(80), C:s(75), D:s(100) },
        E: neutral(['A','B','C','D'])
      }
    },
    {
      id: 'smoking_acceptance_to_smoking',
      expectationOrder: 19,
      targetOrder: 4,
      dimension: 'smoking',
      priorityCategory: null,
      hardRule: true,
      weight: 8,
      matrix: {
        A: { A:s(100), B:x(),    C:x(),    D:p(20), E:p(30) },
        B: { A:s(95),  B:p(20), C:p(25), D:s(100),E:s(80) },
        C: { A:s(95),  B:p(20), C:s(100),D:s(60), E:s(60) },
        D: { A:s(85),  B:s(100),C:s(90), D:s(90), E:s(80) },
        E: { A:s(90),  B:p(25), C:p(30), D:s(75), E:s(100) },
        F: neutral(['A','B','C','D','E'])
      }
    },
    {
      id: 'drinking_acceptance_to_drinking',
      expectationOrder: 20,
      targetOrder: 5,
      dimension: 'drinking',
      priorityCategory: null,
      hardRule: true,
      weight: 4,
      matrix: {
        A: { A:s(100), B:s(80), C:s(60), D:p(25), E:p(10) },
        B: { A:s(95),  B:s(100),C:s(80), D:s(55), E:p(20) },
        C: { A:s(80),  B:s(95), C:s(100),D:s(60), E:p(20) },
        D: { A:s(60),  B:s(80), C:s(90), D:s(100),E:s(55) },
        E: { A:s(60),  B:s(75), C:s(80), D:s(90), E:s(100) },
        F: neutral(['A','B','C','D','E'])
      }
    },
    {
      id: 'weekend_acceptance_to_weekend',
      expectationOrder: 21,
      targetOrder: 6,
      dimension: 'weekend',
      priorityCategory: 'relationship',
      weight: 5,
      matrix: {
        A: { A:s(100), B:s(35), C:s(80), D:p(30) },
        B: { A:s(55),  B:s(100),C:s(80), D:s(55) },
        C: { A:s(80),  B:s(80), C:s(100),D:s(65) },
        D: { A:s(60),  B:s(60), C:s(75), D:s(100) },
        E: neutral(['A','B','C','D'])
      }
    },
    {
      id: 'dating_food_acceptance_to_dating_food',
      expectationOrder: 22,
      targetOrder: 7,
      dimension: 'dating_food',
      priorityCategory: 'lifestyle',
      weight: 4,
      matrix: {
        A: { A:s(100), B:s(70), C:s(45), D:s(80) },
        B: { A:s(70),  B:s(100),C:s(60), D:s(80) },
        C: { A:s(45),  B:s(60), C:s(100),D:s(80) },
        D: neutral(['A','B','C','D'])
      }
    },
    {
      id: 'social_circle_acceptance_to_social_circle',
      expectationOrder: 23,
      targetOrder: 8,
      dimension: 'social_circle',
      priorityCategory: 'relationship',
      weight: 6,
      matrix: {
        A: { A:p(25), B:s(100),C:s(55), D:s(90) },
        B: { A:s(60), B:s(85), C:s(100),D:s(80) },
        C: { A:s(100),B:s(65), C:s(90), D:s(60) },
        D: neutral(['A','B','C','D'])
      }
    },
    {
      id: 'assets_acceptance_to_assets_plan',
      expectationOrder: 24,
      targetOrder: 10,
      dimension: 'money',
      priorityCategory: 'money',
      weight: 7,
      matrix: {
        A: { A:s(100), B:s(55), C:p(25), D:p(15) },
        B: { A:s(90),  B:s(100),C:s(70), D:s(45) },
        C: { A:s(80),  B:s(90), C:s(100),D:s(75) },
        D: neutral(['A','B','C','D'])
      }
    },
    {
      id: 'communication_dealbreaker_to_communication',
      expectationOrder: 25,
      targetOrder: 12,
      dimension: 'communication',
      priorityCategory: 'communication',
      weight: 8,
      matrix: {
        A: { A:s(85), B:s(80), C:s(75), D:s(85), E:s(75), F:x() },
        B: { A:s(80), B:s(80), C:s(80), D:s(80), E:s(80), F:s(80) },
        C: { A:s(80), B:s(85), C:p(25),D:s(90), E:s(80), F:s(60) },
        D: { A:s(85), B:p(35),C:s(75), D:s(85), E:s(70), F:s(55) },
        E: neutral(['A','B','C','D','E','F'])
      }
    },
    {
      id: 'repair_pace_to_communication',
      expectationOrder: 26,
      targetOrder: 12,
      dimension: 'repair_pace',
      priorityCategory: 'communication',
      weight: 6,
      matrix: {
        A: { A:s(100), B:s(80), C:s(80), D:s(70), E:s(60), F:p(20) },
        B: { A:s(80),  B:s(70), C:s(85), D:s(100),E:s(70), F:s(40) },
        C: { A:s(60),  B:s(80), C:s(60), D:s(80), E:s(100),F:s(70) },
        D: { A:s(40),  B:s(60), C:s(50), D:s(60), E:s(80), F:s(100) },
        E: neutral(['A','B','C','D','E','F'])
      }
    },
    {
      id: 'family_expectation_to_family_boundary',
      expectationOrder: 27,
      targetOrder: 14,
      dimension: 'family_boundary',
      priorityCategory: 'future',
      weight: 5,
      matrix: {
        A: { A:s(100), B:s(80), C:s(50), D:p(30) },
        B: { A:s(70),  B:s(100),C:s(80), D:s(60) },
        C: { A:s(45),  B:s(80), C:s(100),D:s(80) },
        D: neutral(['A','B','C','D'])
      }
    },
    {
      id: 'intimacy_to_intimacy',
      expectationOrder: 28,
      targetOrder: 28,
      dimension: 'intimacy',
      priorityCategory: 'relationship',
      weight: 6,
      symmetric: true,
      matrix: {
        A: { A:s(100), B:s(75), C:p(25), D:s(80) },
        B: { A:s(75),  B:s(100),C:s(60), D:s(80) },
        C: { A:p(25), B:s(60), C:s(100),D:s(80) },
        D: neutral(['A','B','C','D'])
      }
    },
    {
      id: 'future_family_to_future_family',
      expectationOrder: 29,
      targetOrder: 29,
      dimension: 'future_family',
      priorityCategory: 'future',
      weight: 8,
      symmetric: true,
      matrix: {
        A: { A:s(100), B:s(75), C:p(10), D:s(50), E:s(80) },
        B: { A:s(75),  B:s(100),C:p(25), D:s(60), E:s(85) },
        C: { A:p(10), B:p(25), C:s(100),D:s(70), E:s(80) },
        D: { A:s(50), B:s(60), C:s(70), D:s(100),E:s(80) },
        E: neutral(['A','B','C','D','E'])
      }
    },
    {
      id: 'relationship_goal_to_relationship_goal',
      expectationOrder: 30,
      targetOrder: 30,
      dimension: 'relationship_goal',
      priorityCategory: 'future',
      weight: 9,
      symmetric: true,
      matrix: {
        A: { A:s(100), B:s(80), C:s(40), D:p(10), E:s(75) },
        B: { A:s(80),  B:s(100),C:s(70), D:s(35), E:s(80) },
        C: { A:s(40),  B:s(70), C:s(100),D:s(75), E:s(80) },
        D: { A:p(10), B:s(35), C:s(75), D:s(100),E:s(80) },
        E: neutral(['A','B','C','D','E'])
      }
    }
  ]
};

export function getScoringRules(){
  return JSON.parse(JSON.stringify(QUIZ_SCORING_RULES));
}

export function getDisplayPercent(rawScore){
  const rounded = Math.max(0, Math.round(rawScore || 0));
  return Math.min(MATCH_SCORE_CONFIG.maxDisplayPercent, rounded);
}

export function getPriorityMultiplier(priorityCategory, matchPriorities=[]){
  const config = MATCH_SCORE_CONFIG.priorityWeighting;
  if(!priorityCategory || !config.enabledCategories.includes(priorityCategory)) return 1;

  const rank = Array.isArray(matchPriorities) ? matchPriorities.indexOf(priorityCategory) : -1;
  if(rank < 0 || rank >= config.rankMultipliers.length) return 1;
  return config.rankMultipliers[rank];
}

export function getAnswerByOrder(answers={}, order){
  const padded = String(order).padStart(2, '0');
  const directKeys = [`q${padded}`, `q${order}`];
  for(const key of directKeys){
    if(answers[key] !== undefined) return answers[key];
  }

  const suffix = `_q${padded}`;
  const matchedKey = Object.keys(answers).find(key => key.endsWith(suffix));
  return matchedKey ? answers[matchedKey] : undefined;
}

export function getProfileBonus(viewer={}, target={}){
  const config = MATCH_SCORE_CONFIG.profileBonus;
  const viewerTags = Array.isArray(viewer.tags) ? viewer.tags : [];
  const targetTags = Array.isArray(target.tags) ? target.tags : [];
  const tagOverlap = viewerTags.filter(tag => targetTags.includes(tag)).length;
  const tagBonus = Math.min(config.tagOverlapMax, tagOverlap * config.tagOverlapPerTag);
  const jobBonus = viewer.job && target.job && viewer.job === target.job ? config.sameJob : 0;

  return {
    tagOverlap,
    tagBonus,
    jobBonus,
    total: Math.min(MATCH_SCORE_CONFIG.profileBonusMaxScore, tagBonus + jobBonus)
  };
}

export function calculateViewerScore(viewer={}, target={}){
  const details = [];
  let weightedScore = 0;
  let totalWeight = 0;
  let excluded = false;
  let excludeRule = null;

  QUIZ_SCORING_RULES.rules.forEach(rule => {
    const viewerAnswer = getAnswerByOrder(viewer.quizAnswers, rule.expectationOrder);
    const targetAnswer = getAnswerByOrder(target.quizAnswers, rule.targetOrder);
    if(viewerAnswer === undefined || targetAnswer === undefined) return;

    const result = rule.matrix?.[viewerAnswer]?.[targetAnswer];
    if(!result) return;

    const multiplier = getPriorityMultiplier(rule.priorityCategory, viewer.matchPriorities);
    const weight = rule.weight * multiplier;
    totalWeight += weight;
    weightedScore += result.score * weight;

    const detail = {
      id: rule.id,
      dimension: rule.dimension,
      priorityCategory: rule.priorityCategory,
      viewerAnswer,
      targetAnswer,
      action: result.action,
      score: result.score,
      baseWeight: rule.weight,
      multiplier,
      weight
    };
    details.push(detail);

    if(result.action === SCORE_ACTION.EXCLUDE && !excluded){
      excluded = true;
      excludeRule = detail;
    }
  });

  const quizRawPercent = totalWeight ? weightedScore / totalWeight : 0;
  const quizScore = excluded ? 0 : (quizRawPercent / 100) * MATCH_SCORE_CONFIG.quizMaxScore;
  const profileBonus = excluded ? { tagOverlap:0, tagBonus:0, jobBonus:0, total:0 } : getProfileBonus(viewer, target);
  const finalScore = excluded ? 0 : Math.min(MATCH_SCORE_CONFIG.totalScore, quizScore + profileBonus.total);

  return {
    score: Math.round(finalScore),
    rawScore: finalScore,
    displayPercent: getDisplayPercent(finalScore),
    quizScore,
    quizRawPercent,
    profileBonus,
    excluded,
    excludeRule,
    details
  };
}

export function calculateMutualMatch(userA={}, userB={}){
  const scoreForA = calculateViewerScore(userA, userB);
  const scoreForB = calculateViewerScore(userB, userA);
  const rule = MATCH_SCORE_CONFIG.recommendationRule;
  const recommended = !scoreForA.excluded &&
    !scoreForB.excluded &&
    scoreForA.rawScore >= rule.threshold &&
    scoreForB.rawScore >= rule.threshold;

  return {
    scoreForA,
    scoreForB,
    recommended,
    threshold: rule.threshold,
    avgScore: Math.round((scoreForA.rawScore + scoreForB.rawScore) / 2),
    scoringVersion: SCORING_VERSION
  };
}
