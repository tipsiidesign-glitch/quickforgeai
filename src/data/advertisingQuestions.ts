export interface AdvertisingQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export const advertisingQuestions: AdvertisingQuestion[] = [
  {
    id: 1,
    question: "What is not a type of advertising?",
    options: [
      "Institutional advertising",
      "Persuasive advertising", 
      "Informative advertising",
      "Political propaganda"
    ],
    correctAnswer: 3,
    category: "Types of Advertising"
  },
  {
    id: 2,
    question: "Which type of advertising is mainly used for fast-moving consumer goods?",
    options: [
      "Trade advertising",
      "Consumer advertising",
      "Institutional advertising", 
      "Industrial advertising"
    ],
    correctAnswer: 1,
    category: "Types of Advertising"
  },
  {
    id: 3,
    question: "Advertising facilitates marketing by:",
    options: [
      "Controlling inflation",
      "Informing and persuading customers",
      "Minimizing competition",
      "Controlling employee turnover"
    ],
    correctAnswer: 1,
    category: "Marketing"
  },
  {
    id: 4,
    question: "The key purpose of IMC is to:",
    options: [
      "Maintain inconsistent messages",
      "Provide a unified brand message",
      "Increase production",
      "Focus only on personal selling"
    ],
    correctAnswer: 1,
    category: "IMC"
  },
  {
    id: 5,
    question: "Media planning primarily deals with:",
    options: [
      "Distribution channels",
      "Selection of advertising media",
      "HR management",
      "Pricing policies"
    ],
    correctAnswer: 1,
    category: "Media Planning"
  },
  {
    id: 6,
    question: "A person who decides where ads should be placed is known as:",
    options: [
      "Copywriter",
      "Media planner",
      "Creative director",
      "Production manager"
    ],
    correctAnswer: 1,
    category: "Career"
  },
  {
    id: 7,
    question: "A key element of advertising media strategy is:",
    options: [
      "Pricing",
      "Media selection and scheduling",
      "HR recruitment",
      "Packaging"
    ],
    correctAnswer: 1,
    category: "Media Strategy"
  },
  {
    id: 8,
    question: "Noise in communication refers to:",
    options: [
      "Competitor's message or distraction",
      "Background music in ads",
      "Audience appreciation",
      "Sales promotion"
    ],
    correctAnswer: 0,
    category: "Communication"
  },
  {
    id: 9,
    question: "An advertising agency is paid mainly through:",
    options: [
      "Commission and fees",
      "Government subsidies",
      "Employee salaries",
      "Consumer discounts"
    ],
    correctAnswer: 0,
    category: "Agency Management"
  },
  {
    id: 10,
    question: "A pulsing strategy combines:",
    options: [
      "Continuous & flighting advertising",
      "Sales promotion & personal selling",
      "Outdoor & digital advertising",
      "Reminder & informative advertising"
    ],
    correctAnswer: 0,
    category: "Media Strategy"
  },
  {
    id: 11,
    question: "Comparative advertising refers to:",
    options: [
      "Advertising without mentioning competitors",
      "Comparing two or more competing brands",
      "Advertising only for industrial goods",
      "Public relations campaigns"
    ],
    correctAnswer: 1,
    category: "Types of Advertising"
  },
  {
    id: 12,
    question: "Advertising done by wholesalers and retailers is termed:",
    options: [
      "National advertising",
      "Trade advertising",
      "Industrial advertising",
      "Cooperative advertising"
    ],
    correctAnswer: 1,
    category: "Types of Advertising"
  },
  {
    id: 13,
    question: "One of the economic roles of advertising is:",
    options: [
      "Raising barriers to entry",
      "Reducing demand",
      "Encouraging competition",
      "Increasing unemployment"
    ],
    correctAnswer: 2,
    category: "Economics"
  },
  {
    id: 14,
    question: "Which is a tool of Integrated marketing communication?",
    options: [
      "Logistics management",
      "Direct marketing",
      "Operations management",
      "Financial accounting"
    ],
    correctAnswer: 1,
    category: "IMC"
  },
  {
    id: 15,
    question: "The main objective of media planning is:",
    options: [
      "Minimize advertising cost",
      "Reach the right audience at the right time",
      "Eliminate advertising completely",
      "Reduce competition"
    ],
    correctAnswer: 1,
    category: "Media Planning"
  },
  {
    id: 16,
    question: "What is not a career in advertising?",
    options: [
      "Market researcher",
      "HR recruiter",
      "Creative director",
      "Account planner"
    ],
    correctAnswer: 1,
    category: "Career"
  },
  {
    id: 17,
    question: "Which is the most measurable form of advertising media?",
    options: [
      "Newspaper",
      "Television",
      "Online media",
      "Outdoor hoardings"
    ],
    correctAnswer: 2,
    category: "Media"
  },
  {
    id: 18,
    question: "In advertising communication, decoding is done by:",
    options: [
      "Advertiser",
      "Media",
      "Consumer",
      "Ad agency"
    ],
    correctAnswer: 2,
    category: "Communication"
  },
  {
    id: 19,
    question: "Specialized agencies usually focus on:",
    options: [
      "Retail sales",
      "Particular media or industries",
      "Political elections",
      "Employee training"
    ],
    correctAnswer: 1,
    category: "Agency Management"
  },
  {
    id: 20,
    question: "Media scheduling ensures:",
    options: [
      "Randomized advertising",
      "Optimal use of budget and timing",
      "Production increase",
      "Employee retention"
    ],
    correctAnswer: 1,
    category: "Media Planning"
  },
  {
    id: 21,
    question: "Advertising is primarily a form of:",
    options: [
      "Personal communication",
      "Mass communication",
      "Direct selling",
      "Internal communication"
    ],
    correctAnswer: 1,
    category: "Communication"
  },
  {
    id: 22,
    question: "Public service advertising is mainly aimed at:",
    options: [
      "Profit generation",
      "Government policy promotion",
      "Social awareness",
      "Attracting investors"
    ],
    correctAnswer: 2,
    category: "Types of Advertising"
  },
  {
    id: 23,
    question: "A key role of advertising in marketing is to:",
    options: [
      "Reduce distribution cost",
      "Build brand awareness",
      "Increase taxation",
      "Improve product design"
    ],
    correctAnswer: 1,
    category: "Marketing"
  },
  {
    id: 24,
    question: "IMC stands for:",
    options: [
      "Integrated Market Communication",
      "Integrated Marketing Communication",
      "Internal Marketing Communication",
      "Interactive Media Campaign"
    ],
    correctAnswer: 1,
    category: "IMC"
  },
  {
    id: 25,
    question: "The first step in media planning is:",
    options: [
      "Scheduling",
      "Budget allocation",
      "Identifying target audience",
      "Media evaluation"
    ],
    correctAnswer: 2,
    category: "Media Planning"
  },
  {
    id: 26,
    question: "Which career in advertising focuses on managing client relationships?",
    options: [
      "Account executive",
      "Art director",
      "Media buyer",
      "Research analyst"
    ],
    correctAnswer: 0,
    category: "Career"
  },
  {
    id: 27,
    question: "Outdoor advertising includes:",
    options: [
      "Magazines",
      "Hoardings and billboards",
      "Television",
      "Radio"
    ],
    correctAnswer: 1,
    category: "Media"
  },
  {
    id: 28,
    question: "The feedback in advertising is measured through:",
    options: [
      "Employee surveys",
      "Consumer response & sales data",
      "Government policies",
      "Media contracts"
    ],
    correctAnswer: 1,
    category: "Communication"
  },
  {
    id: 29,
    question: "Which department of an ad agency handles visual design?",
    options: [
      "Account management",
      "Creative department",
      "Media buying",
      "Research division"
    ],
    correctAnswer: 1,
    category: "Agency Management"
  },
  {
    id: 30,
    question: "A continuous scheduling strategy is most useful for:",
    options: [
      "Seasonal products",
      "Frequently purchased products",
      "Luxury goods",
      "Industrial machines"
    ],
    correctAnswer: 1,
    category: "Media Strategy"
  }
];