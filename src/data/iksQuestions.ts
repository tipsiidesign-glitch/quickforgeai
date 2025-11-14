export interface IKSQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export const iksQuestions: IKSQuestion[] = [
  {
    id: 1,
    question: "The word Ayurveda is derived from two Sanskrit words, 'ayu' and 'veda', meaning.",
    options: [
      "Longevity and knowledge",
      "Health and cure",
      "Mind and spirit",
      "Body and medicine"
    ],
    correctAnswer: 0,
    category: "Ayurveda"
  },
  {
    id: 2,
    question: "Which of the following is not one of the three doshas in Ayurveda?",
    options: [
      "Vata",
      "Pitta",
      "Soma",
      "Kapha"
    ],
    correctAnswer: 2,
    category: "Ayurveda"
  },
  {
    id: 3,
    question: "The two principal objectives of Ayurveda are:",
    options: [
      "To enrich wealth and prosperity",
      "To prolong life and eradicate disease",
      "To ensure moral conduct and devotion",
      "To provide food and shelter"
    ],
    correctAnswer: 1,
    category: "Ayurveda"
  },
  {
    id: 4,
    question: "Ayurveda is primarily derived from which of the following Vedas?",
    options: [
      "Rigveda",
      "Samaveda",
      "Atharvaveda",
      "Yajurveda"
    ],
    correctAnswer: 2,
    category: "Ayurveda"
  },
  {
    id: 5,
    question: "Who is traditionally associated with the text 'Charaka Samhita'?",
    options: [
      "Sushruta",
      "Vagbhata",
      "Charaka",
      "Patanjali"
    ],
    correctAnswer: 2,
    category: "Ayurveda"
  },
  {
    id: 6,
    question: "The Sushruta Samhita is best known for its contributions to which field?",
    options: [
      "Psychiatry",
      "Surgery",
      "Pharmacology",
      "Astrology"
    ],
    correctAnswer: 1,
    category: "Ayurveda"
  },
  {
    id: 7,
    question: "The concept of Ayurveda focuses on:",
    options: [
      "Only physical healing",
      "Intellectual education",
      "Economic prosperity",
      "Physical, mental, social, and spiritual health"
    ],
    correctAnswer: 3,
    category: "Ayurveda"
  },
  {
    id: 8,
    question: "In modern times, Ayurveda is recognized for its focus on:",
    options: [
      "Personalized and preventive healthcare",
      "Synthetic medicine",
      "Mechanical treatment",
      "Purely surgical methods"
    ],
    correctAnswer: 0,
    category: "Ayurveda"
  },
  {
    id: 9,
    question: "The main goal of alchemy in ancient practice was to:",
    options: [
      "Develop poisons",
      "Transform base metals into gold and achieve immortality",
      "Create perfumes",
      "Study astronomy"
    ],
    correctAnswer: 1,
    category: "Alchemy"
  },
  {
    id: 10,
    question: "The \"Philosopher's Stone\" in alchemical tradition was believed to:",
    options: [
      "Cure blindness",
      "Turn stone into fire",
      "Grant immortality and transform metals",
      "Produce rain"
    ],
    correctAnswer: 2,
    category: "Alchemy"
  },
  {
    id: 11,
    question: "Rasaśāstra in Indian tradition mainly deals with:",
    options: [
      "Herbal therapies only",
      "Use of mercury and metals in medicine",
      "Astrology and divination",
      "Sculpture and design"
    ],
    correctAnswer: 1,
    category: "Alchemy"
  },
  {
    id: 12,
    question: "Which ancient practice is often considered the forerunner of modern chemistry?",
    options: [
      "Yoga",
      "Astrology",
      "Ayurveda",
      "Alchemy"
    ],
    correctAnswer: 3,
    category: "Alchemy"
  },
  {
    id: 13,
    question: "In India, alchemy was closely associated with:",
    options: [
      "Astronomy and law",
      "Ayurveda and Tantrism",
      "Grammar and logic",
      "Agriculture and trade"
    ],
    correctAnswer: 1,
    category: "Alchemy"
  },
  {
    id: 14,
    question: "In Indian alchemy, the concept of 'prana' refers to:",
    options: [
      "The breath or life force",
      "The mind",
      "The digestive fire",
      "The body's physical structure"
    ],
    correctAnswer: 0,
    category: "Alchemy"
  },
  {
    id: 15,
    question: "The primary philosophical goal of Rasaśāstra was:",
    options: [
      "Political power",
      "Transformation of self and attainment of higher consciousness",
      "Entertainment",
      "Economic trade"
    ],
    correctAnswer: 1,
    category: "Alchemy"
  },
  {
    id: 16,
    question: "Ayurveda influenced alchemy by:",
    options: [
      "Emphasizing mechanical production",
      "Encouraging chemical warfare",
      "Promoting balance and rejuvenation",
      "Replacing all metals with herbs"
    ],
    correctAnswer: 2,
    category: "Alchemy"
  },
  {
    id: 17,
    question: "The invention of zero and the decimal system originated in:",
    options: [
      "Greece",
      "India",
      "Egypt",
      "China"
    ],
    correctAnswer: 1,
    category: "Mathematics"
  },
  {
    id: 18,
    question: "Which ancient Indian text contains early forms of the Pythagorean theorem?",
    options: [
      "Sulbasutras",
      "Arthashastra",
      "Rigveda",
      "Upanishads"
    ],
    correctAnswer: 0,
    category: "Mathematics"
  },
  {
    id: 19,
    question: "Who among the following formalized the use of zero and negative numbers?",
    options: [
      "Aryabhata",
      "Bhaskara II",
      "Brahmagupta",
      "Varahamihira"
    ],
    correctAnswer: 2,
    category: "Mathematics"
  },
  {
    id: 20,
    question: "The concept of sine (jya) and cosine (khojya) was introduced by:",
    options: [
      "Aryabhata",
      "Patanjali",
      "Chanakya",
      "Nagarjuna"
    ],
    correctAnswer: 0,
    category: "Mathematics"
  },
  {
    id: 21,
    question: "Bhaskara II is best known for his early work on:",
    options: [
      "Algebra and arithmetic",
      "Metallurgy",
      "Music theory",
      "Medicine"
    ],
    correctAnswer: 0,
    category: "Mathematics"
  },
  {
    id: 22,
    question: "The global influence of Indian mathematics spread to Europe through:",
    options: [
      "The Greek colonies",
      "The Islamic civilization",
      "Buddhist monasteries",
      "The Roman Empire"
    ],
    correctAnswer: 1,
    category: "Mathematics"
  },
  {
    id: 23,
    question: "In Indian philosophy, 'Pramaṇa' means:",
    options: [
      "Debate",
      "Perception",
      "Valid means of knowledge",
      "Proof of divinity"
    ],
    correctAnswer: 2,
    category: "Philosophy"
  },
  {
    id: 24,
    question: "The Nyaya school of thought primarily focuses on:",
    options: [
      "Rituals and sacrifices",
      "Logical reasoning and epistemology",
      "Meditation and yoga",
      "Ethics and devotion"
    ],
    correctAnswer: 1,
    category: "Philosophy"
  },
  {
    id: 25,
    question: "Who among the following Buddhist philosophers contributed to the theory of apoha (exclusion)?",
    options: [
      "Dignaga and Dharmakirti",
      "Nagarjuna",
      "Patanjali and Kanada",
      "Aryadeva and Vasubandhu"
    ],
    correctAnswer: 0,
    category: "Philosophy"
  },
  {
    id: 26,
    question: "Jaina logic emphasizes which principle?",
    options: [
      "Anekantavada",
      "Karyahetu",
      "Karma",
      "Dharma"
    ],
    correctAnswer: 0,
    category: "Philosophy"
  },
  {
    id: 27,
    question: "The Nyaya syllogism consists of how many parts?",
    options: [
      "Three",
      "Four",
      "Five",
      "Six"
    ],
    correctAnswer: 2,
    category: "Philosophy"
  },
  {
    id: 28,
    question: "Who authored the Arthashastra?",
    options: [
      "Patanjali",
      "Kautilya (Chanakya)",
      "Panini",
      "Aryabhata"
    ],
    correctAnswer: 1,
    category: "Governance"
  },
  {
    id: 29,
    question: "The Arthashastra was primarily concerned with:",
    options: [
      "Literature and poetry",
      "Agriculture and crafts",
      "Spiritual liberation",
      "Statecraft, economics, and governance"
    ],
    correctAnswer: 3,
    category: "Governance"
  },
  {
    id: 30,
    question: "Which of the following best explains the relevance of the Arthashastra today?",
    options: [
      "Its economic and political principles remain applicable to modern governance",
      "It promotes only military conquest",
      "It focuses on astrology and divination",
      "It discourages diplomacy and trade"
    ],
    correctAnswer: 0,
    category: "Governance"
  },
  {
    id: 31,
    question: "The cities of Harappa and Mohenjo-Daro are best known for their:",
    options: [
      "Wooden architecture",
      "Grid-patterned streets and drainage systems",
      "Circular city layouts",
      "Stepwells and rock-cut caves"
    ],
    correctAnswer: 1,
    category: "Urban Planning"
  },
  {
    id: 32,
    question: "During which period did organized town planning in India decline before reviving with the Mahajanapadas?",
    options: [
      "Vedic period",
      "Gupta period",
      "Mauryan period",
      "Mughal period"
    ],
    correctAnswer: 0,
    category: "Urban Planning"
  },
  {
    id: 33,
    question: "Which text guided ancient Indian city layouts and zoning principles?",
    options: [
      "Arthashastra",
      "Rigveda",
      "Yajurveda",
      "Manusmriti"
    ],
    correctAnswer: 0,
    category: "Urban Planning"
  },
  {
    id: 34,
    question: "What was a key feature of water management in the Indus Valley Civilization?",
    options: [
      "Underground tunnels",
      "Elaborate drainage systems and public baths",
      "Step pyramids",
      "Wooden cisterns"
    ],
    correctAnswer: 1,
    category: "Urban Planning"
  },
  {
    id: 35,
    question: "What principle from ancient Indian town planning is still applied in modern smart cities?",
    options: [
      "Centralized monarchy",
      "Defensive moats",
      "Monumental sculptures",
      "Environmental harmony and efficient zoning"
    ],
    correctAnswer: 3,
    category: "Urban Planning"
  },
  {
    id: 36,
    question: "Sacred groves in ancient Indian towns mainly served to:",
    options: [
      "Mark territorial boundaries",
      "Maintain ecological and spiritual balance",
      "Serve as military training grounds",
      "Store grain reserves"
    ],
    correctAnswer: 1,
    category: "Urban Planning"
  },
  {
    id: 37,
    question: "Who authored the Natyashastra?",
    options: [
      "Patanjali",
      "Chanakya",
      "Sage Valmiki",
      "Sage Bharata"
    ],
    correctAnswer: 3,
    category: "Performing Arts"
  },
  {
    id: 38,
    question: "The Natyashastra primarily deals with:",
    options: [
      "Astronomy",
      "Architecture",
      "Performing arts",
      "Law"
    ],
    correctAnswer: 2,
    category: "Performing Arts"
  },
  {
    id: 39,
    question: "Which of the following is NOT one of the nine Rasas mentioned in the Natyashastra?",
    options: [
      "Shringar (Love)",
      "Veera (Heroism)",
      "Bhakti (Devotion)",
      "Hasya (Humor)"
    ],
    correctAnswer: 2,
    category: "Performing Arts"
  },
  {
    id: 40,
    question: "How many chapters and verses approximately make up the Natyashastra?",
    options: [
      "18 chapters, 2,000 verses",
      "24 chapters, 4,000 verses",
      "36 chapters, 6,000 verses",
      "50 chapters, 10,000 verses"
    ],
    correctAnswer: 2,
    category: "Performing Arts"
  },
  {
    id: 41,
    question: "Which type of Abhinaya involves costumes and makeup?",
    options: [
      "Angika",
      "Aharya",
      "Vachika",
      "Sattvika"
    ],
    correctAnswer: 1,
    category: "Performing Arts"
  },
  {
    id: 42,
    question: "The Rasa theory aims to evoke:",
    options: [
      "Moral judgments",
      "Emotional experiences",
      "Historical awareness",
      "Logical reasoning"
    ],
    correctAnswer: 1,
    category: "Performing Arts"
  },
  {
    id: 43,
    question: "What is the spiritual essence of performance according to Natyashastra?",
    options: [
      "Entertainment value",
      "Ritual enactment for divine connection",
      "Political messaging",
      "Display of wealth"
    ],
    correctAnswer: 1,
    category: "Performing Arts"
  },
  {
    id: 44,
    question: "The Natyashastra was written between:",
    options: [
      "5th–1st century BCE",
      "2nd century BCE – 2nd century CE",
      "6th–9th century CE",
      "10th–12th century CE"
    ],
    correctAnswer: 1,
    category: "Performing Arts"
  },
  {
    id: 45,
    question: "Malla Yuddha in ancient India refers to:",
    options: [
      "Archery",
      "Chariot racing",
      "Board games",
      "Wrestling"
    ],
    correctAnswer: 3,
    category: "Sports"
  },
  {
    id: 46,
    question: "Which sport from ancient India was the precursor to modern chess?",
    options: [
      "Pachisi",
      "Dhanurvidya",
      "Chaturanga",
      "Kalaripayattu"
    ],
    correctAnswer: 2,
    category: "Sports"
  },
  {
    id: 47,
    question: "Kalaripayattu originated in which Indian state?",
    options: [
      "Tamil Nadu",
      "Kerala",
      "Maharashtra",
      "Odisha"
    ],
    correctAnswer: 1,
    category: "Sports"
  },
  {
    id: 48,
    question: "The weapon used in Vajra Mushti was known as:",
    options: [
      "Katar",
      "Chakra",
      "Talwar",
      "Vajra"
    ],
    correctAnswer: 1,
    category: "Sports"
  },
  {
    id: 49,
    question: "Which ancient Indian text mentions athletic contests and horse riding?",
    options: [
      "Rigveda",
      "Arthashastra",
      "Yajurveda",
      "Bhagavad Gita"
    ],
    correctAnswer: 0,
    category: "Sports"
  },
  {
    id: 50,
    question: "Which of the following modern games evolved from Pachisi?",
    options: [
      "Chess",
      "Ludo",
      "Snakes and Ladders",
      "Carrom"
    ],
    correctAnswer: 1,
    category: "Sports"
  },
  {
    id: 51,
    question: "Which of the following is an example of rock-cut architecture?",
    options: [
      "Ajanta Caves",
      "Khajuraho Temple",
      "Chilka lake",
      "Konark Temple"
    ],
    correctAnswer: 0,
    category: "Architecture"
  },
  {
    id: 52,
    question: "What was the primary material used in early Indian architecture?",
    options: [
      "Steel",
      "Brick and stone",
      "Concrete",
      "Marble"
    ],
    correctAnswer: 1,
    category: "Architecture"
  },
  {
    id: 53,
    question: "The Sanchi Stupa belongs to which religious tradition?",
    options: [
      "Jainism",
      "Buddhism",
      "Hinduism",
      "Zoroastrianism"
    ],
    correctAnswer: 1,
    category: "Architecture"
  },
  {
    id: 54,
    question: "The tall spire or tower above a Hindu temple is called a:",
    options: [
      "Mandapa",
      "Gopuram",
      "Shikhara",
      "Vimana"
    ],
    correctAnswer: 2,
    category: "Architecture"
  },
  {
    id: 55,
    question: "What key architectural concept from ancient India informs modern eco-friendly design?",
    options: [
      "Use of marble and gold",
      "Alignment with natural elements and ventilation",
      "Monumental scale",
      "Decorative pillars"
    ],
    correctAnswer: 1,
    category: "Architecture"
  },
  {
    id: 56,
    question: "Which period saw the rise of rock-cut temples?",
    options: [
      "Mauryan period",
      "Gupta period",
      "Vedic period",
      "Mughal period"
    ],
    correctAnswer: 1,
    category: "Architecture"
  },
  {
    id: 57,
    question: "Which of the following ports was a major center of maritime trade in ancient India?",
    options: [
      "Calicut",
      "Surat",
      "Mumbai",
      "Lothal"
    ],
    correctAnswer: 3,
    category: "Trade & Commerce"
  },
  {
    id: 58,
    question: "Guilds in ancient India were known as:",
    options: [
      "Panchayats",
      "Shrenis",
      "Sabha",
      "Sanghas"
    ],
    correctAnswer: 1,
    category: "Trade & Commerce"
  },
  {
    id: 59,
    question: "Which good was commonly exported from ancient India to Rome?",
    options: [
      "Wine",
      "Silk",
      "Spices and textiles",
      "Horses"
    ],
    correctAnswer: 2,
    category: "Trade & Commerce"
  },
  {
    id: 60,
    question: "Ancient Indian routes like Uttarapatha and Dakshinapatha primarily facilitated:",
    options: [
      "Military campaigns",
      "Pilgrimage routes",
      "Internal and international trade",
      "Agricultural development"
    ],
    correctAnswer: 2,
    category: "Trade & Commerce"
  }
];
