export interface FinalExamHealthQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const finalExamHealthQuestions: FinalExamHealthQuestion[] = [
  // Level 1: Identify, Define, Recall, Recognize, List (Q1-20)
  {
    id: 1,
    question: "Identify the type of conflict that occurs within a person.",
    options: ["Interpersonal conflict", "Intergroup conflict", "Intrapersonal conflict", "Intragroup conflict"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Recall the lowest level in Maslow's hierarchy.",
    options: ["Esteem needs", "Safety needs", "Physiological needs", "Self-actualization"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Define stress as:",
    options: ["A leisure activity", "The body's response to pressure", "A type of conflict", "A relaxation method"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Recognize the substance that contains nicotine.",
    options: ["Alcohol", "Cigarette", "Coffee", "Syrup"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Identify the method that involves a neutral third party.",
    options: ["Competition", "Avoidance", "Mediation", "Withdrawal"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Recall which need includes security and protection.",
    options: ["Esteem", "Safety", "Belongingness", "Growth"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Recognize the stage representing personal growth in Maslow's model.",
    options: ["Safety", "Love", "Esteem", "Self-actualization"],
    correctAnswer: 3
  },
  {
    id: 8,
    question: "List the conflict style where one party gives in.",
    options: ["Collaboration", "Competition", "Accommodation", "Mediation"],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "Identify the process of removing harmful substances from the body.",
    options: ["Rehabilitation", "Detoxification", "Counselling", "Prevention"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "Recall which organ is mainly damaged by long-term alcohol abuse.",
    options: ["Liver", "Skin", "Hair", "Nails"],
    correctAnswer: 0
  },
  {
    id: 11,
    question: "Identify the need related to friendship and affection.",
    options: ["Physiological", "Belongingness", "Safety", "Esteem"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "Recognize a healthy coping strategy.",
    options: ["Substance use", "Meditation", "Aggression", "Isolation"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Recall the conflict style aimed at mutual benefit.",
    options: ["Competition", "Avoidance", "Collaboration", "Withdrawal"],
    correctAnswer: 2
  },
  {
    id: 14,
    question: "Identify a physical symptom of stress.",
    options: ["Fatigue", "Creativity", "Confidence", "Achievement"],
    correctAnswer: 0
  },
  {
    id: 15,
    question: "Recognize the term for conflict between two groups.",
    options: ["Interpersonal", "Intragroup", "Intergroup", "Internal"],
    correctAnswer: 2
  },
  {
    id: 16,
    question: "Recall what esteem needs mainly develop.",
    options: ["Hunger", "Shelter", "Confidence", "Security"],
    correctAnswer: 2
  },
  {
    id: 17,
    question: "Identify the binding decision-making method.",
    options: ["Mediation", "Negotiation", "Arbitration", "Dialogue"],
    correctAnswer: 2
  },
  {
    id: 18,
    question: "Recognize a psychological effect of substance abuse.",
    options: ["Improved memory", "Anxiety", "Strong immunity", "High stamina"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "Recall what rehabilitation focuses on.",
    options: ["Punishment", "Reintegration", "Isolation", "Competition"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "Identify the coping method that focuses on solving the problem.",
    options: ["Emotion-focused coping", "Avoidance coping", "Problem-focused coping", "Withdrawal coping"],
    correctAnswer: 2
  },

  // Level 2: Explain, Summarize, Describe, Interpret, Classify (Q21-40)
  {
    id: 21,
    question: "Explain why intrapersonal conflict can cause stress.",
    options: ["It creates internal confusion", "It improves confidence", "It builds harmony", "It removes pressure"],
    correctAnswer: 0
  },
  {
    id: 22,
    question: "Describe why safety needs must be satisfied before esteem needs.",
    options: ["Basic security supports higher growth", "Esteem comes first", "Growth ignores safety", "Hunger depends on respect"],
    correctAnswer: 0
  },
  {
    id: 23,
    question: "Summarize the purpose of peacebuilding.",
    options: ["Increase rivalry", "Promote long-term harmony", "Encourage dominance", "Suppress voices"],
    correctAnswer: 1
  },
  {
    id: 24,
    question: "Interpret why peer pressure contributes to substance abuse.",
    options: ["It strengthens discipline", "It increases confidence", "It influences risky decisions", "It promotes health"],
    correctAnswer: 2
  },
  {
    id: 25,
    question: "Classify collaboration as a conflict style that:",
    options: ["Produces win-lose results", "Encourages shared solutions", "Avoids communication", "Enforces one-sided decisions"],
    correctAnswer: 1
  },
  {
    id: 26,
    question: "Explain why role conflict may increase personal stress.",
    options: ["It reduces responsibilities", "It creates confusion between duties", "It improves time management", "It builds confidence"],
    correctAnswer: 1
  },
  {
    id: 27,
    question: "Describe how emotion-focused coping helps during stressful situations.",
    options: ["It removes the problem completely", "It manages emotional reactions", "It increases conflict", "It ignores feelings"],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "Interpret why intragroup conflict can weaken team performance.",
    options: ["It improves cooperation", "It creates internal divisions", "It strengthens unity", "It increases productivity"],
    correctAnswer: 1
  },
  {
    id: 29,
    question: "Summarize the main idea of Maslow's hierarchy of needs.",
    options: ["Human needs progress from basic to higher levels", "Wealth determines happiness", "Power is the main motivator", "Competition ensures growth"],
    correctAnswer: 0
  },
  {
    id: 30,
    question: "Explain why physiological needs must be satisfied before self-actualization.",
    options: ["Growth replaces hunger", "Basic survival supports higher development", "Esteem is more important than food", "Creativity removes fatigue"],
    correctAnswer: 1
  },
  {
    id: 31,
    question: "Describe a characteristic of a self-actualized person.",
    options: ["Fearful and dependent", "Creative and self-aware", "Aggressive and competitive", "Withdrawn and isolated"],
    correctAnswer: 1
  },
  {
    id: 32,
    question: "Classify negotiation as a method of conflict resolution that involves:",
    options: ["Third-party judgment", "Direct discussion between parties", "Violence", "Complete withdrawal"],
    correctAnswer: 1
  },
  {
    id: 33,
    question: "Interpret how collaboration differs from competition in resolving conflict.",
    options: ["It seeks mutual benefit", "It promotes domination", "It avoids communication", "It enforces one-sided decisions"],
    correctAnswer: 0
  },
  {
    id: 34,
    question: "Summarize the purpose of peacebuilding efforts in society.",
    options: ["To strengthen rivalry", "To promote justice and harmony", "To delay disputes", "To isolate communities"],
    correctAnswer: 1
  },
  {
    id: 35,
    question: "Explain why dialogue is important in reducing social conflicts.",
    options: ["It increases misunderstandings", "It promotes understanding", "It avoids responsibility", "It encourages silence"],
    correctAnswer: 1
  },
  {
    id: 36,
    question: "Describe how peer pressure can influence substance abuse.",
    options: ["It promotes healthy behavior", "It encourages risky experimentation", "It prevents addiction", "It builds resilience"],
    correctAnswer: 1
  },
  {
    id: 37,
    question: "Interpret the role of counselling in addiction recovery.",
    options: ["It promotes dependency", "It supports emotional and behavioral change", "It isolates individuals", "It increases stress"],
    correctAnswer: 1
  },
  {
    id: 38,
    question: "Classify detoxification as a stage of de-addiction that:",
    options: ["Provides job training", "Removes harmful substances from the body", "Encourages substance use", "Focuses only on social skills"],
    correctAnswer: 1
  },
  {
    id: 39,
    question: "Explain how unhealthy coping mechanisms can worsen stress.",
    options: ["They build resilience", "They create additional physical and emotional harm", "They eliminate conflict", "They improve mental clarity"],
    correctAnswer: 1
  },
  {
    id: 40,
    question: "Summarize the relationship between stress management and substance abuse prevention.",
    options: ["Managing stress reduces risk of addiction", "Stress has no effect on addiction", "Substance use improves stress management", "Addiction prevents stress"],
    correctAnswer: 0
  },

  // Level 3: Demonstrate, Use, Implement, Solve, Practice (Q41-60)
  {
    id: 41,
    question: "Demonstrate a healthy way to manage exam stress.",
    options: ["Smoking", "Deep breathing", "Avoiding study", "Isolation"],
    correctAnswer: 1
  },
  {
    id: 42,
    question: "Use negotiation to solve a workplace disagreement by:",
    options: ["Forcing agreement", "Discussing directly", "Ignoring the issue", "Competing strongly"],
    correctAnswer: 1
  },
  {
    id: 43,
    question: "Implement a coping strategy when feeling overwhelmed by:",
    options: ["Substance use", "Time management", "Withdrawal", "Aggression"],
    correctAnswer: 1
  },
  {
    id: 44,
    question: "Solve a minor group dispute using:",
    options: ["Collaboration", "Violence", "Suppression", "Avoidance only"],
    correctAnswer: 0
  },
  {
    id: 45,
    question: "A college student feeling anxious before presentations starts practicing deep breathing daily. Apply the coping strategy shown.",
    options: ["Avoidance coping", "Emotion-focused coping", "Aggressive coping", "Substance-based coping"],
    correctAnswer: 1
  },
  {
    id: 46,
    question: "Two neighbors settle a dispute by sitting together and discussing their concerns directly. Use the conflict resolution method illustrated.",
    options: ["Arbitration", "Negotiation", "Suppression", "Withdrawal"],
    correctAnswer: 1
  },
  {
    id: 47,
    question: "An employee overwhelmed by workload prioritizes tasks and sets deadlines. Implement the appropriate stress-management strategy.",
    options: ["Problem-focused coping", "Emotion suppression", "Isolation", "Substance use"],
    correctAnswer: 0
  },
  {
    id: 48,
    question: "A community invites a respected elder to help resolve tension between groups without forcing a decision. Demonstrate the method being applied.",
    options: ["Competition", "Mediation", "Arbitration", "Avoidance"],
    correctAnswer: 1
  },
  {
    id: 49,
    question: "A person in recovery attends weekly counselling sessions to address emotional triggers. Apply the recovery approach used.",
    options: ["Detoxification only", "Behavioral counselling", "Punishment therapy", "Social withdrawal"],
    correctAnswer: 1
  },
  {
    id: 50,
    question: "A worker ensures stable income and safe housing before pursuing creative hobbies. Use Maslow's principle reflected here.",
    options: ["Higher needs replace lower needs", "Basic needs support higher development", "Esteem precedes safety", "Creativity eliminates insecurity"],
    correctAnswer: 1
  },
  {
    id: 51,
    question: "During a team conflict, both sides adjust expectations to reach a middle ground. Demonstrate the style of conflict management used.",
    options: ["Collaboration", "Compromise", "Competition", "Avoidance"],
    correctAnswer: 1
  },
  {
    id: 52,
    question: "A school introduces life skills education to reduce student involvement in drugs. Implement the prevention strategy shown.",
    options: ["Rehabilitation", "Preventive education", "Detention", "Isolation"],
    correctAnswer: 1
  },
  {
    id: 53,
    question: "A teenager feeling peer pressure firmly declines an offer to smoke. Practice the life skill illustrated.",
    options: ["Dependence", "Assertiveness", "Withdrawal", "Aggression"],
    correctAnswer: 1
  },
  {
    id: 54,
    question: "A company encourages employees to share ideas openly to avoid misunderstandings. Apply the peacebuilding principle involved.",
    options: ["Silence", "Dialogue", "Suppression", "Rivalry"],
    correctAnswer: 1
  },
  {
    id: 55,
    question: "A recovering alcoholic joins a support group to maintain sobriety. Use the appropriate rehabilitation support method.",
    options: ["Isolation strategy", "Peer support", "Competitive approach", "Avoidance coping"],
    correctAnswer: 1
  },
  {
    id: 56,
    question: "A teacher publicly appreciates a student's achievement to boost morale. Demonstrate which need is being addressed.",
    options: ["Physiological need", "Safety need", "Esteem need", "Belongingness need"],
    correctAnswer: 2
  },
  {
    id: 57,
    question: "A local government organizes intercultural events to reduce social tensions. Implement the peacebuilding strategy shown.",
    options: ["Exclusion", "Inclusive participation", "Competition", "Suppression"],
    correctAnswer: 1
  },
  {
    id: 58,
    question: "An individual identifies work overload as the cause of stress and delegates tasks. Apply the correct coping method.",
    options: ["Emotion-focused coping", "Problem-focused coping", "Withdrawal coping", "Substance coping"],
    correctAnswer: 1
  },
  {
    id: 59,
    question: "A mediator helps two employees understand each other's perspectives without giving a final verdict. Demonstrate the approach being used.",
    options: ["Arbitration", "Mediation", "Competition", "Avoidance"],
    correctAnswer: 1
  },
  {
    id: 60,
    question: "A person replaces smoking with regular exercise to manage tension. Practice the coping strategy illustrated.",
    options: ["Maladaptive behavior", "Healthy substitution", "Relapse behavior", "Withdrawal reaction"],
    correctAnswer: 1
  },

  // Level 4: Differentiate, Compare, Examine, Distinguish, Analyze (Q61-79)
  {
    id: 61,
    question: "Differentiate between problem-focused and emotion-focused coping.",
    options: ["One solves problems, the other manages feelings", "Both increase stress", "Both avoid issues", "Both ignore emotions"],
    correctAnswer: 0
  },
  {
    id: 62,
    question: "Compare mediation and arbitration by identifying which gives a binding decision.",
    options: ["Mediation", "Arbitration", "Negotiation", "Dialogue"],
    correctAnswer: 1
  },
  {
    id: 63,
    question: "Analyze why unmet physiological needs hinder self-actualization.",
    options: ["Higher needs depend on basic needs", "Creativity increases hunger", "Security reduces growth", "Esteem replaces food"],
    correctAnswer: 0
  },
  {
    id: 64,
    question: "A student feeling overwhelmed by multiple assignments decides to create a study timetable. Apply the appropriate coping strategy illustrated here.",
    options: ["Emotion-focused coping", "Avoidance coping", "Problem-focused coping", "Aggressive coping"],
    correctAnswer: 2
  },
  {
    id: 65,
    question: "Two community leaders hold a meeting to openly discuss misunderstandings between their groups. Demonstrate the conflict resolution method they are using.",
    options: ["Arbitration", "Dialogue", "Competition", "Withdrawal"],
    correctAnswer: 1
  },
  {
    id: 66,
    question: "A person who recently lost a job begins practicing meditation to manage anxiety. Use the correct type of coping mechanism shown.",
    options: ["Maladaptive coping", "Healthy emotion-focused coping", "Substance-based coping", "Avoidance"],
    correctAnswer: 1
  },
  {
    id: 67,
    question: "A manager invites a neutral expert to help settle a workplace dispute without imposing a decision. Implement the appropriate resolution method.",
    options: ["Arbitration", "Mediation", "Competition", "Suppression"],
    correctAnswer: 1
  },
  {
    id: 68,
    question: "A recovering addict joins a peer support group to share experiences and stay motivated. Apply the correct recovery strategy.",
    options: ["Isolation", "Relapse", "Group therapy", "Avoidance"],
    correctAnswer: 2
  },
  {
    id: 69,
    question: "A hungry individual prioritizes buying food before planning career goals. Demonstrate the level of need being addressed.",
    options: ["Esteem need", "Self-actualization need", "Physiological need", "Belongingness need"],
    correctAnswer: 2
  },
  {
    id: 70,
    question: "Two colleagues both adjust their demands to reach a workable agreement. Use the appropriate conflict-handling style.",
    options: ["Competition", "Compromise", "Avoidance", "Domination"],
    correctAnswer: 1
  },
  {
    id: 71,
    question: "A school organizes awareness workshops about the harmful effects of drugs. Implement the correct prevention strategy.",
    options: ["Rehabilitation", "Punishment", "Preventive education", "Withdrawal"],
    correctAnswer: 2
  },
  {
    id: 72,
    question: "A counselor helps an individual identify emotional triggers that lead to substance use. Apply the appropriate relapse-prevention approach.",
    options: ["Ignoring triggers", "Recognizing triggers", "Encouraging stress", "Avoiding therapy"],
    correctAnswer: 1
  },
  {
    id: 73,
    question: "A person feeling stressed chooses to go for a run instead of smoking. Demonstrate the coping response selected.",
    options: ["Maladaptive coping", "Healthy behavioral coping", "Aggressive coping", "Withdrawal coping"],
    correctAnswer: 1
  },
  {
    id: 74,
    question: "A company ensures employees feel safe and secure before encouraging innovation. Apply Maslow's principle illustrated here.",
    options: ["Higher needs replace lower needs", "Basic needs support higher growth", "Esteem needs precede safety", "Growth eliminates security"],
    correctAnswer: 1
  },
  {
    id: 75,
    question: "A village forms a peace committee including members from different communities. Implement the peacebuilding principle shown.",
    options: ["Exclusion", "Inclusive participation", "Competition", "Suppression"],
    correctAnswer: 1
  },
  {
    id: 76,
    question: "A judge listens to both sides and delivers a final legally binding decision. Use the correct conflict resolution method.",
    options: ["Mediation", "Arbitration", "Negotiation", "Dialogue"],
    correctAnswer: 1
  },
  {
    id: 77,
    question: "A teacher praises a student publicly for good performance, increasing the student's confidence. Apply the appropriate level of Maslow's hierarchy.",
    options: ["Physiological need", "Safety need", "Esteem need", "Self-actualization need"],
    correctAnswer: 2
  },
  {
    id: 78,
    question: "A person under peer pressure refuses to try cigarettes and chooses healthier friends. Demonstrate the life skill being practiced.",
    options: ["Poor decision-making", "Assertiveness", "Withdrawal", "Dependence"],
    correctAnswer: 1
  },
  {
    id: 79,
    question: "During a family conflict, members agree to listen without interrupting before responding. Apply the communication strategy illustrated.",
    options: ["Aggressive reaction", "Active listening", "Avoidance", "Competition"],
    correctAnswer: 1
  },

  // Level 5: Assess, Justify, Critique, Defend, Recommend (Q80-84)
  {
    id: 80,
    question: "Assess which conflict style best preserves relationships.",
    options: ["Competition", "Collaboration", "Aggression", "Domination"],
    correctAnswer: 1
  },
  {
    id: 81,
    question: "Justify why meditation is preferable to substance use for stress relief.",
    options: ["It improves coping skills", "It increases addiction", "It suppresses emotion", "It creates dependency"],
    correctAnswer: 0
  },
  {
    id: 82,
    question: "Recommend the most effective approach for long-term peace in communities.",
    options: ["Dialogue and inclusion", "Forceful control", "Isolation", "Avoidance"],
    correctAnswer: 0
  },
  {
    id: 83,
    question: "Defend the importance of counselling in addiction recovery.",
    options: ["It guides behavioral change", "It promotes relapse", "It isolates individuals", "It delays recovery"],
    correctAnswer: 0
  },
  {
    id: 84,
    question: "Critique the use of avoidance in serious conflicts.",
    options: ["It resolves permanently", "It may delay resolution", "It builds trust", "It ensures fairness"],
    correctAnswer: 1
  }
];
