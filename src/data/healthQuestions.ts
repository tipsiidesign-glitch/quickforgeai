export interface HealthQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const healthQuestions: HealthQuestion[] = [
  {
    id: 1,
    question: "Which organization defines health as a state of complete physical, mental, and social well-being?",
    options: ["UNESCO", "WHO", "UNDP", "ILO"],
    correctAnswer: 1,
    explanation: "WHO (World Health Organization) defines health as a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity.",
    category: "Health Basics"
  },
  {
    id: 2,
    question: "Health is commonly described as:",
    options: ["A journey towards happiness", "A state of complete well-being", "A financial condition", "A cultural practice"],
    correctAnswer: 1,
    explanation: "Health is commonly described as a state of complete well-being encompassing physical, mental, and social aspects.",
    category: "Health Basics"
  },
  {
    id: 3,
    question: "Mental health primarily refers to:",
    options: ["Nutrition and sleep habits", "Emotional and psychological well-being", "Educational achievements", "Economic productivity"],
    correctAnswer: 1,
    explanation: "Mental health primarily refers to emotional and psychological well-being, including how we think, feel, and behave.",
    category: "Mental Health"
  },
  {
    id: 4,
    question: "Wellness is best described as:",
    options: ["The absence of illness", "A dynamic process of healthy living", "A fixed medical condition", "A genetic condition"],
    correctAnswer: 1,
    explanation: "Wellness is a dynamic process of healthy living that involves making choices toward a healthy and fulfilling life.",
    category: "Wellness"
  },
  {
    id: 5,
    question: "The dimension of wellness that deals with coping effectively with life is:",
    options: ["Physical wellness", "Emotional wellness", "Social wellness", "Occupational wellness"],
    correctAnswer: 1,
    explanation: "Emotional wellness involves coping effectively with life and creating satisfying relationships.",
    category: "Wellness"
  },
  {
    id: 6,
    question: "A lifestyle approach to well-being that includes habits, choices, and purpose refers to:",
    options: ["Health", "Wellness", "Fitness", "Therapy"],
    correctAnswer: 1,
    explanation: "Wellness is a lifestyle approach that includes daily habits, choices, and having a sense of purpose.",
    category: "Wellness"
  },
  {
    id: 7,
    question: "The main difference between health and wellness is that:",
    options: ["Health is a journey, and wellness is a state", "Health is a state, and wellness is a journey", "Health is social, and wellness is mental", "Health is an objective, and wellness is irrelevant"],
    correctAnswer: 1,
    explanation: "Health is a state of being, while wellness is an active process of becoming aware of and making choices toward a healthy life.",
    category: "Health vs Wellness"
  },
  {
    id: 8,
    question: "Health and wellness education primarily equips individuals with:",
    options: ["Wealth creation skills", "Informed decision-making skills", "Political awareness", "Travel opportunities"],
    correctAnswer: 1,
    explanation: "Health and wellness education primarily equips individuals with knowledge and skills for informed decision-making about their health.",
    category: "Health Education"
  },
  {
    id: 9,
    question: "Promoting healthy lifestyle choices helps to prevent:",
    options: ["Inflation", "Obesity and diabetes", "Education dropout", "Air pollution"],
    correctAnswer: 1,
    explanation: "Promoting healthy lifestyle choices helps prevent chronic diseases like obesity and diabetes.",
    category: "Disease Prevention"
  },
  {
    id: 10,
    question: "Early health education reduces:",
    options: ["Income inequality", "Disease burden and healthcare costs", "Population growth", "Urbanization pressures"],
    correctAnswer: 1,
    explanation: "Early health education reduces disease burden and healthcare costs by promoting preventive care.",
    category: "Health Education"
  },
  {
    id: 11,
    question: "Mental health promotion in wellness education encourages:",
    options: ["Ignoring emotional issues", "Coping strategies and open discussions", "Denial of stress", "Solely medication reliance"],
    correctAnswer: 1,
    explanation: "Mental health promotion encourages healthy coping strategies and open discussions about mental health.",
    category: "Mental Health"
  },
  {
    id: 12,
    question: "Health education improves academic and work performance by:",
    options: ["Making students competitive", "Enhancing concentration and attendance", "Reducing leisure time", "Encouraging strict discipline"],
    correctAnswer: 1,
    explanation: "Health education improves performance by enhancing concentration, attendance, and overall well-being.",
    category: "Health Education"
  },
  {
    id: 13,
    question: "Life skills such as decision-making and stress management are fostered by:",
    options: ["Religious education", "Health and wellness education", "Agricultural training", "Financial literacy courses"],
    correctAnswer: 1,
    explanation: "Health and wellness education fosters important life skills including decision-making and stress management.",
    category: "Life Skills"
  },
  {
    id: 14,
    question: "Health and wellness education encourages social responsibility by:",
    options: ["Promoting isolation", "Supporting environmental awareness", "Discouraging civic engagement", "Increasing consumerism"],
    correctAnswer: 1,
    explanation: "Health and wellness education encourages social responsibility including environmental awareness and community health.",
    category: "Social Responsibility"
  },
  {
    id: 15,
    question: "One long-term benefit of health and wellness education is:",
    options: ["Temporary relief from stress", "Habits that continue into adulthood", "Reduction of income taxes", "Career advancement guarantees"],
    correctAnswer: 1,
    explanation: "Health and wellness education creates lasting healthy habits that continue into adulthood.",
    category: "Health Education"
  },
  {
    id: 16,
    question: "A culture of wellness in societies promotes:",
    options: ["Individual profit-making", "Holistic human development", "Economic dependency", "Technological isolation"],
    correctAnswer: 1,
    explanation: "A culture of wellness promotes holistic human development encompassing all aspects of well-being.",
    category: "Wellness Culture"
  },
  {
    id: 17,
    question: "Which of the following best summarizes health and wellness education?",
    options: ["Preventing illness only", "Empowering individuals to live balanced lives", "Teaching first aid exclusively", "Focus on sports training"],
    correctAnswer: 1,
    explanation: "Health and wellness education empowers individuals to make informed choices and live balanced, healthy lives.",
    category: "Health Education"
  },
  {
    id: 18,
    question: "Poor sanitation and lack of clean water can lead to:",
    options: ["Hypertension", "Typhoid and cholera", "Migraine", "Cancer"],
    correctAnswer: 1,
    explanation: "Poor sanitation and lack of clean water commonly lead to waterborne diseases like typhoid and cholera.",
    category: "Environmental Health"
  },
  {
    id: 19,
    question: "Air and noise pollution contribute primarily to:",
    options: ["Bone fractures", "Respiratory problems and stress", "Vitamin deficiencies", "Eye colour changes"],
    correctAnswer: 1,
    explanation: "Air and noise pollution primarily cause respiratory problems and stress-related health issues.",
    category: "Environmental Health"
  },
  {
    id: 20,
    question: "Which local issue affects timely access to health care?",
    options: ["Climate change", "Poor road connectivity", "Gender inequality", "Traditional medicine"],
    correctAnswer: 1,
    explanation: "Poor road connectivity affects timely access to healthcare facilities, especially in rural areas.",
    category: "Healthcare Access"
  },
  {
    id: 21,
    question: "Regional dietary patterns can be:",
    options: ["Always protective", "Protective or risk-inducing", "Irrelevant to health", "Globally standardized"],
    correctAnswer: 1,
    explanation: "Regional dietary patterns can either protect health or induce risk depending on their nutritional balance.",
    category: "Nutrition"
  },
  {
    id: 22,
    question: "Elderly and infants are more vulnerable due to:",
    options: ["Economic inequality", "Age-specific health needs", "Urbanization", "Occupational shifts"],
    correctAnswer: 1,
    explanation: "Elderly and infants have age-specific health needs that make them more vulnerable to health issues.",
    category: "Vulnerable Populations"
  },
  {
    id: 23,
    question: "Education strongly influences:",
    options: ["Climate conditions", "Health literacy and decisions", "Genetic mutations", "Access to clean air"],
    correctAnswer: 1,
    explanation: "Education strongly influences health literacy and the ability to make informed health decisions.",
    category: "Health Literacy"
  },
  {
    id: 24,
    question: "Occupations involving chemical exposure may affect:",
    options: ["Financial health", "Long-term wellness", "Voting patterns", "Religious beliefs"],
    correctAnswer: 1,
    explanation: "Occupations with chemical exposure can significantly affect long-term wellness and health outcomes.",
    category: "Occupational Health"
  },
  {
    id: 25,
    question: "Lack of affordable health insurance is a:",
    options: ["Cultural issue", "Societal factor", "Personal weakness", "Climate condition"],
    correctAnswer: 1,
    explanation: "Lack of affordable health insurance is a societal factor that affects healthcare access and outcomes.",
    category: "Healthcare Access"
  },
  {
    id: 26,
    question: "Cultural stigma around mental illness leads to:",
    options: ["More supportive care", "Hindrance in treatment-seeking", "Increase in healthcare insurance", "Improved mental health"],
    correctAnswer: 1,
    explanation: "Cultural stigma around mental illness creates barriers and hinders people from seeking treatment.",
    category: "Mental Health"
  },
  {
    id: 27,
    question: "Strong family and community ties promote:",
    options: ["Social isolation", "Emotional well-being", "Sedentary habits", "Anxiety"],
    correctAnswer: 1,
    explanation: "Strong family and community ties promote emotional well-being and social support.",
    category: "Social Health"
  },
  {
    id: 28,
    question: "Which nutrient is the main energy source for the body?",
    options: ["Protein", "Carbohydrate", "Fat", "Vitamin"],
    correctAnswer: 1,
    explanation: "Carbohydrates are the main energy source for the body, especially for brain and muscle function.",
    category: "Nutrition"
  },
  {
    id: 29,
    question: "Proteins are primarily needed for:",
    options: ["Energy storage", "Repair and building of tissues", "Brain functioning", "Hydration"],
    correctAnswer: 1,
    explanation: "Proteins are primarily needed for repair and building of tissues, as well as enzyme and hormone production.",
    category: "Nutrition"
  },
  {
    id: 30,
    question: "Which vitamin is water-soluble?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
    correctAnswer: 1,
    explanation: "Vitamin C is water-soluble and must be consumed regularly as the body cannot store it.",
    category: "Vitamins"
  },
  {
    id: 31,
    question: "Minerals are important for:",
    options: ["Entertainment", "Heart rhythm and bone health", "Food flavour", "Mental relaxation only"],
    correctAnswer: 1,
    explanation: "Minerals are crucial for heart rhythm, bone health, and various metabolic processes.",
    category: "Nutrition"
  },
  {
    id: 32,
    question: "Dietary fiber mainly helps in:",
    options: ["Enhancing memory", "Digestive health", "Building muscles", "Increasing blood sugar"],
    correctAnswer: 1,
    explanation: "Dietary fiber mainly helps with digestive health and maintaining healthy bowel movements.",
    category: "Nutrition"
  },
  {
    id: 33,
    question: "A Mediterranean diet is especially linked with reduced:",
    options: ["Tooth decay", "Heart disease and cognitive decline", "Seasonal flu", "Skin rashes"],
    correctAnswer: 1,
    explanation: "The Mediterranean diet is linked with reduced heart disease and cognitive decline due to its healthy fats and antioxidants.",
    category: "Diet Patterns"
  },
  {
    id: 34,
    question: "A traditional Indian diet focused on pulses and spices provides:",
    options: ["Empty calories", "Diverse nutrients", "Excess sugar", "Only proteins"],
    correctAnswer: 1,
    explanation: "Traditional Indian diets with pulses and spices provide diverse nutrients including proteins, fiber, and antioxidants.",
    category: "Diet Patterns"
  },
  {
    id: 35,
    question: "Which practice is considered unhealthy?",
    options: ["Balanced meal portions", "Skipping meals", "Mindful eating", "Seasonal food consumption"],
    correctAnswer: 1,
    explanation: "Skipping meals is unhealthy as it can lead to nutritional deficiencies and metabolic issues.",
    category: "Eating Habits"
  },
  {
    id: 36,
    question: "Simple carbohydrates provide:",
    options: ["Sustained energy", "Quick energy", "Muscle strength", "Vitamins"],
    correctAnswer: 1,
    explanation: "Simple carbohydrates provide quick energy but are rapidly absorbed and used by the body.",
    category: "Carbohydrates"
  },
  {
    id: 37,
    question: "Complex carbohydrates are important for:",
    options: ["Short bursts of energy", "Sustained energy and digestion", "Water absorption", "Blood clotting"],
    correctAnswer: 1,
    explanation: "Complex carbohydrates provide sustained energy and support healthy digestion due to their fiber content.",
    category: "Carbohydrates"
  },
  {
    id: 38,
    question: "Healthy fats include:",
    options: ["Trans fats", "Nuts, seeds, olive oil", "Excess saturated fats", "Processed oils"],
    correctAnswer: 1,
    explanation: "Healthy fats include those found in nuts, seeds, olive oil, and fish, which support heart and brain health.",
    category: "Fats"
  },
  {
    id: 39,
    question: "Vitamin A is especially important for:",
    options: ["Digestion", "Vision", "Hydration", "Bone density"],
    correctAnswer: 1,
    explanation: "Vitamin A is especially important for vision, immune function, and skin health.",
    category: "Vitamins"
  },
  {
    id: 40,
    question: "Iron is essential for:",
    options: ["Nerve impulse conduction", "Oxygen transport in blood", "Fat metabolism", "Skin elasticity"],
    correctAnswer: 1,
    explanation: "Iron is essential for oxygen transport in blood as a key component of hemoglobin.",
    category: "Minerals"
  },
  {
    id: 41,
    question: "Potassium helps in:",
    options: ["Bone development", "Nerve and muscle function", "Enhancing memory", "Increasing sugar levels"],
    correctAnswer: 1,
    explanation: "Potassium is crucial for nerve and muscle function, including heart muscle contraction.",
    category: "Minerals"
  },
  {
    id: 42,
    question: "Water regulates:",
    options: ["Vision and smell", "Temperature, waste removal, hydration", "Hormonal balance only", "Energy storage"],
    correctAnswer: 1,
    explanation: "Water regulates body temperature, helps remove waste products, and maintains proper hydration.",
    category: "Hydration"
  },
  {
    id: 43,
    question: "A balanced diet must be:",
    options: ["The same for everyone", "Diverse and tailored to needs", "Protein-heavy only", "Low in vitamins"],
    correctAnswer: 1,
    explanation: "A balanced diet must be diverse and tailored to individual needs, age, and activity level.",
    category: "Balanced Diet"
  },
  {
    id: 44,
    question: "The main role of dietary fiber is to:",
    options: ["Build muscle tissue", "Prevent constipation", "Increase blood sugar", "Store energy"],
    correctAnswer: 1,
    explanation: "The main role of dietary fiber is to prevent constipation and maintain digestive health.",
    category: "Fiber"
  },
  {
    id: 45,
    question: "Malnutrition is defined as:",
    options: ["Eating less food", "Imbalance in nutrient intake", "Obesity only", "Lack of exercise"],
    correctAnswer: 1,
    explanation: "Malnutrition is defined as an imbalance in nutrient intake, including both under-nutrition and over-nutrition.",
    category: "Malnutrition"
  },
  {
    id: 46,
    question: "Wasting is defined as:",
    options: ["Low height-for-age", "Low weight-for-height", "High weight-for-height", "Vitamin deficiency"],
    correctAnswer: 1,
    explanation: "Wasting is defined as low weight-for-height, indicating acute malnutrition.",
    category: "Malnutrition"
  },
  {
    id: 47,
    question: "Stunting reflects:",
    options: ["Acute undernutrition", "Chronic undernutrition (low height-for-age)", "Overnutrition", "Mineral excess"],
    correctAnswer: 1,
    explanation: "Stunting reflects chronic undernutrition and is measured as low height-for-age.",
    category: "Malnutrition"
  },
  {
    id: 48,
    question: "Micronutrient deficiencies may result from a lack of:",
    options: ["Proteins only", "Calcium, Vitamin A, Iron", "Water only", "Fats only"],
    correctAnswer: 1,
    explanation: "Micronutrient deficiencies result from lack of essential vitamins and minerals like calcium, vitamin A, and iron.",
    category: "Deficiencies"
  },
  {
    id: 49,
    question: "Overnutrition is mainly caused by:",
    options: ["Lack of food", "Excessive intake of calories, fats, and sugars", "Low metabolism only", "Climate conditions"],
    correctAnswer: 1,
    explanation: "Overnutrition is mainly caused by excessive intake of calories, fats, and sugars beyond body needs.",
    category: "Overnutrition"
  },
  {
    id: 50,
    question: "Overnutrition consequences include:",
    options: ["Better immunity", "Diabetes and cardiovascular disease", "Increased height", "Stronger bones"],
    correctAnswer: 1,
    explanation: "Overnutrition can lead to diabetes, cardiovascular disease, and other chronic health conditions.",
    category: "Overnutrition"
  },
  {
    id: 51,
    question: "Psychological effects of overnutrition include:",
    options: ["Improved self-esteem", "Low self-esteem and anxiety", "Happiness", "Stronger resilience"],
    correctAnswer: 1,
    explanation: "Overnutrition can lead to psychological effects including low self-esteem and anxiety.",
    category: "Mental Health"
  },
  {
    id: 52,
    question: "Addressing malnutrition requires:",
    options: ["Extreme dieting", "Balanced and adequate diet", "More packaged food", "Avoiding water"],
    correctAnswer: 1,
    explanation: "Addressing malnutrition requires a balanced and adequate diet with proper nutrients.",
    category: "Malnutrition"
  },
  {
    id: 53,
    question: "Highly processed foods often contain:",
    options: ["Fresh nutrients", "Added sugars, fats, preservatives", "Natural water", "Organic minerals only"],
    correctAnswer: 1,
    explanation: "Highly processed foods often contain added sugars, unhealthy fats, and preservatives.",
    category: "Processed Foods"
  },
  {
    id: 54,
    question: "Regular consumption of processed foods is linked to:",
    options: ["Improved immunity", "Obesity, hypertension, and diabetes", "Faster healing", "Reduced stress"],
    correctAnswer: 1,
    explanation: "Regular consumption of processed foods is linked to obesity, hypertension, and diabetes.",
    category: "Processed Foods"
  }
];