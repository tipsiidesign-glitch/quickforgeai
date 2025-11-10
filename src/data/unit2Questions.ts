export interface Unit2Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const unit2Questions: Unit2Question[] = [
  {
    id: 1,
    question: "Which nutrient is considered the body's main source of energy?",
    options: ["Protein", "Fat", "Vitamin", "Carbohydrate"],
    correctAnswer: 3,
    explanation: "Carbohydrates are the body's main source of energy.",
    category: "Nutrition"
  },
  {
    id: 2,
    question: "The Mediterranean diet is primarily associated with a lower risk of:",
    options: ["Kidney stones", "Cardiovascular disease", "Tuberculosis", "Asthma"],
    correctAnswer: 1,
    explanation: "The Mediterranean diet is associated with lower cardiovascular disease risk.",
    category: "Diet Patterns"
  },
  {
    id: 3,
    question: "Which organization recommends limiting free sugar intake to less than 10% of total calories?",
    options: ["WHO", "FAO", "UNESCO", "UNICEF"],
    correctAnswer: 0,
    explanation: "WHO recommends limiting free sugar intake to less than 10% of total calories.",
    category: "Nutrition Guidelines"
  },
  {
    id: 4,
    question: "Fiber in the diet mainly contributes to:",
    options: ["Faster muscle growth", "Improved digestion", "Increased cholesterol", "Reduced protein absorption"],
    correctAnswer: 1,
    explanation: "Fiber mainly contributes to improved digestion and gut health.",
    category: "Nutrition"
  },
  {
    id: 5,
    question: "Excessive intake of processed foods mainly increases the risk of:",
    options: ["Tuberculosis", "Chronic lifestyle diseases", "Malaria", "Seasonal flu"],
    correctAnswer: 1,
    explanation: "Processed foods increase the risk of chronic lifestyle diseases.",
    category: "Processed Foods"
  },
  {
    id: 6,
    question: "Which micronutrient is especially known for its antioxidant properties?",
    options: ["Vitamin C", "Calcium", "Iron", "Phosphorus"],
    correctAnswer: 0,
    explanation: "Vitamin C is known for its antioxidant properties.",
    category: "Vitamins"
  },
  {
    id: 7,
    question: "Cruciferous vegetables like broccoli are protective against cancer because they contain:",
    options: ["Glucosinolates", "Gluten", "Starch", "Cholesterol"],
    correctAnswer: 0,
    explanation: "Cruciferous vegetables contain glucosinolates that protect against cancer.",
    category: "Cancer Prevention"
  },
  {
    id: 8,
    question: "Lycopene, which may reduce prostate cancer risk, is found in:",
    options: ["Tomatoes", "Bananas", "Onions", "Spinach"],
    correctAnswer: 0,
    explanation: "Lycopene is found in tomatoes and may reduce prostate cancer risk.",
    category: "Cancer Prevention"
  },
  {
    id: 9,
    question: "Processed meats are classified by the WHO as:",
    options: ["Group 3 carcinogens", "Group 1 carcinogens", "Group 2A carcinogens", "Not carcinogenic"],
    correctAnswer: 1,
    explanation: "Processed meats are classified as Group 1 carcinogens by WHO.",
    category: "Cancer Risk"
  },
  {
    id: 10,
    question: "Green tea is considered protective because it contains:",
    options: ["Caffeine", "Catechins", "Gluten", "Lactose"],
    correctAnswer: 1,
    explanation: "Green tea contains catechins which have protective health benefits.",
    category: "Functional Foods"
  },
  {
    id: 11,
    question: "Which diet pattern is most associated with cancer prevention?",
    options: ["Mediterranean diet", "High-sugar diet", "Fast-food diet", "Ketogenic diet"],
    correctAnswer: 0,
    explanation: "Mediterranean diet is most associated with cancer prevention.",
    category: "Cancer Prevention"
  },
  {
    id: 12,
    question: "Excess alcohol intake is strongly linked to which cancer?",
    options: ["Liver", "Thyroid", "Bone", "Skin"],
    correctAnswer: 0,
    explanation: "Excess alcohol intake is strongly linked to liver cancer.",
    category: "Cancer Risk"
  },
  {
    id: 13,
    question: "The DASH diet is designed primarily to manage:",
    options: ["Asthma", "Kidney stones", "Osteoporosis", "Hypertension"],
    correctAnswer: 3,
    explanation: "The DASH diet is designed to manage hypertension.",
    category: "Diet Patterns"
  },
  {
    id: 14,
    question: "Glycemic Index (GI) measures:",
    options: ["Protein quality", "Vitamin absorption", "Fat digestion", "Speed of blood sugar rise"],
    correctAnswer: 3,
    explanation: "Glycemic Index measures the speed of blood sugar rise after eating.",
    category: "Nutrition Metrics"
  },
  {
    id: 15,
    question: "A key dietary factor in obesity is:",
    options: ["Excess calorie intake", "Vitamin deficiency", "Low water consumption", "High protein intake"],
    correctAnswer: 0,
    explanation: "Excess calorie intake is a key dietary factor in obesity.",
    category: "Obesity"
  },
  {
    id: 16,
    question: "Which mineral helps balance sodium and lower blood pressure?",
    options: ["Calcium", "Potassium", "Magnesium", "Zinc"],
    correctAnswer: 1,
    explanation: "Potassium helps balance sodium and lower blood pressure.",
    category: "Minerals"
  },
  {
    id: 17,
    question: "Trans fats are harmful because they:",
    options: ["Increase LDL cholesterol", "Increase vitamin absorption", "Improve bone density", "Lower triglycerides"],
    correctAnswer: 0,
    explanation: "Trans fats increase LDL cholesterol which is harmful to health.",
    category: "Fats"
  },
  {
    id: 18,
    question: "Whole grains are recommended for diabetes because they:",
    options: ["Have low glycemic index", "Are high in sugar", "Contain no fiber", "Increase insulin resistance"],
    correctAnswer: 0,
    explanation: "Whole grains have a low glycemic index, beneficial for diabetes management.",
    category: "Diabetes Management"
  },
  {
    id: 19,
    question: "Sugar-sweetened beverages increase the risk of:",
    options: ["Type 2 diabetes", "Arthritis", "Osteoporosis", "Vision loss"],
    correctAnswer: 0,
    explanation: "Sugar-sweetened beverages increase the risk of Type 2 diabetes.",
    category: "Diabetes Risk"
  },
  {
    id: 20,
    question: "Which oil is a staple in the Mediterranean diet?",
    options: ["Mustard oil", "Olive oil", "Coconut oil", "Palm oil"],
    correctAnswer: 1,
    explanation: "Olive oil is a staple in the Mediterranean diet.",
    category: "Diet Patterns"
  },
  {
    id: 21,
    question: "Fiber intake reduces:",
    options: ["Cholesterol", "Bone density", "Muscle mass", "Oxygen capacity"],
    correctAnswer: 0,
    explanation: "Fiber intake helps reduce cholesterol levels.",
    category: "Nutrition"
  },
  {
    id: 22,
    question: "Which population-based study highlighted diet's role in CVD?",
    options: ["Framingham Study", "Seven Countries Study", "Nurses' Health Study", "EPIC Study"],
    correctAnswer: 1,
    explanation: "The Seven Countries Study highlighted diet's role in cardiovascular disease.",
    category: "Research Studies"
  },
  {
    id: 23,
    question: "Portion control is particularly important in:",
    options: ["Obesity prevention", "Bone growth", "Hair health", "Vision improvement"],
    correctAnswer: 0,
    explanation: "Portion control is particularly important in obesity prevention.",
    category: "Obesity Prevention"
  },
  {
    id: 24,
    question: "A common protective factor across chronic diseases is:",
    options: ["Excess sugar", "Fried foods", "Balanced diet", "Sedentary lifestyle"],
    correctAnswer: 2,
    explanation: "A balanced diet is a common protective factor across chronic diseases.",
    category: "Disease Prevention"
  },
  {
    id: 25,
    question: "Functional foods such as probiotics are beneficial mainly for:",
    options: ["Bone strength", "Gut health", "Lung capacity", "Skin color"],
    correctAnswer: 1,
    explanation: "Probiotics are beneficial for gut health.",
    category: "Functional Foods"
  },
  {
    id: 26,
    question: "Which of these is a functional food with anti-inflammatory properties?",
    options: ["Turmeric", "Sugar", "White bread", "Red meat"],
    correctAnswer: 0,
    explanation: "Turmeric has anti-inflammatory properties.",
    category: "Functional Foods"
  },
  {
    id: 27,
    question: "Flexibility is measured by:",
    options: ["Joint range of motion", "Muscle size", "BMI", "Heart rate"],
    correctAnswer: 0,
    explanation: "Flexibility is measured by joint range of motion.",
    category: "Physical Fitness"
  },
  {
    id: 28,
    question: "Body composition refers to the ratio of:",
    options: ["Fat to lean body mass", "Protein to carbs", "Water to electrolytes", "Muscles to bones"],
    correctAnswer: 0,
    explanation: "Body composition refers to the ratio of fat to lean body mass.",
    category: "Body Composition"
  },
  {
    id: 29,
    question: "A test commonly used for muscular endurance is:",
    options: ["Sit-up test", "Sprint test", "Blood sugar test", "Vision test"],
    correctAnswer: 0,
    explanation: "The sit-up test is commonly used for muscular endurance.",
    category: "Fitness Testing"
  },
  {
    id: 30,
    question: "Which dimension of fitness is improved by yoga?",
    options: ["Muscular strength", "Lung size", "Flexibility", "Bone density"],
    correctAnswer: 2,
    explanation: "Yoga improves flexibility as a primary fitness dimension.",
    category: "Exercise Types"
  },
  {
    id: 31,
    question: "Mindful eating mainly helps with:",
    options: ["Satiety and portion control", "Faster metabolism only", "Higher protein absorption", "Stronger bones"],
    correctAnswer: 0,
    explanation: "Mindful eating helps with satiety and portion control.",
    category: "Eating Behaviors"
  },
  {
    id: 32,
    question: "Cardiorespiratory endurance refers to:",
    options: ["Strength of bones", "Efficiency of the heart and lungs", "Muscle size", "Joint flexibility"],
    correctAnswer: 1,
    explanation: "Cardiorespiratory endurance refers to the efficiency of the heart and lungs.",
    category: "Physical Fitness"
  },
  {
    id: 33,
    question: "Which is considered a health benefit of physical fitness?",
    options: ["Higher fat storage", "Reduced flexibility", "Increased illness", "Lower risk of chronic diseases"],
    correctAnswer: 3,
    explanation: "Physical fitness lowers the risk of chronic diseases.",
    category: "Exercise Benefits"
  },
  {
    id: 34,
    question: "Which chronic disease is least influenced by exercise?",
    options: ["Diabetes", "Malaria", "Cardiovascular disease", "Obesity"],
    correctAnswer: 1,
    explanation: "Malaria is least influenced by exercise as it's an infectious disease.",
    category: "Disease Management"
  },
  {
    id: 35,
    question: "Exercise improves diabetes management by:",
    options: ["Increasing insulin sensitivity", "Reducing hemoglobin", "Increasing cholesterol", "Raising blood sugar"],
    correctAnswer: 0,
    explanation: "Exercise improves diabetes management by increasing insulin sensitivity.",
    category: "Diabetes Management"
  },
  {
    id: 36,
    question: "An easy way to integrate activity into daily life is:",
    options: ["Sleeping more", "Taking stairs instead of elevators", "Driving short distances", "Using gadgets continuously"],
    correctAnswer: 1,
    explanation: "Taking stairs instead of elevators integrates activity into daily life.",
    category: "Physical Activity"
  },
  {
    id: 37,
    question: "WHO recommends adults do at least how many minutes of moderate aerobic activity weekly?",
    options: ["100", "60", "150", "200"],
    correctAnswer: 2,
    explanation: "WHO recommends at least 150 minutes of moderate aerobic activity weekly.",
    category: "Exercise Guidelines"
  },
  {
    id: 38,
    question: "Which type of exercise is most linked to reduced blood pressure?",
    options: ["Aerobic exercise", "Eye exercises", "Finger stretching", "Typing"],
    correctAnswer: 0,
    explanation: "Aerobic exercise is most linked to reduced blood pressure.",
    category: "Exercise Types"
  },
  {
    id: 39,
    question: "Tai Chi is especially known for improving:",
    options: ["Balance", "Cholesterol", "Appetite", "Vision"],
    correctAnswer: 0,
    explanation: "Tai Chi is especially known for improving balance.",
    category: "Exercise Types"
  },
  {
    id: 40,
    question: "Which mental health condition can exercise help alleviate?",
    options: ["Depression", "Malaria", "Arthritis", "Cataract"],
    correctAnswer: 0,
    explanation: "Exercise can help alleviate depression.",
    category: "Mental Health"
  },
  {
    id: 41,
    question: "Strength training is recommended at least:",
    options: ["2 days per week", "Daily", "Once per month", "Never"],
    correctAnswer: 0,
    explanation: "Strength training is recommended at least 2 days per week.",
    category: "Exercise Guidelines"
  },
  {
    id: 42,
    question: "A sedentary lifestyle is primarily associated with:",
    options: ["Obesity", "Height increase", "Malaria", "Improved lung health"],
    correctAnswer: 0,
    explanation: "A sedentary lifestyle is primarily associated with obesity.",
    category: "Lifestyle Factors"
  },
  {
    id: 43,
    question: "Which lifestyle change reduces musculoskeletal pain in office workers?",
    options: ["Skipping meals", "Extra screen time", "Regular stretching breaks", "Late-night gaming"],
    correctAnswer: 2,
    explanation: "Regular stretching breaks reduce musculoskeletal pain in office workers.",
    category: "Workplace Health"
  },
  {
    id: 44,
    question: "Pilates mainly strengthens:",
    options: ["Core muscles", "Eyes", "Skin", "Hair"],
    correctAnswer: 0,
    explanation: "Pilates mainly strengthens core muscles.",
    category: "Exercise Types"
  },
  {
    id: 45,
    question: "Spirituality differs from religion in being:",
    options: ["Rule-oriented only", "Institutional only", "Community-based only", "Personal and experiential"],
    correctAnswer: 3,
    explanation: "Spirituality is personal and experiential, unlike institutional religion.",
    category: "Spirituality"
  },
  {
    id: 46,
    question: "Which practice is most associated with reducing stress and anxiety?",
    options: ["Watching TV", "Eating fast food", "Mindfulness meditation", "High caffeine intake"],
    correctAnswer: 2,
    explanation: "Mindfulness meditation is associated with reducing stress and anxiety.",
    category: "Stress Management"
  },
  {
    id: 47,
    question: "Gratitude practices are linked to:",
    options: ["Better emotional regulation", "Poor sleep", "Increased cholesterol", "Reduced memory"],
    correctAnswer: 0,
    explanation: "Gratitude practices are linked to better emotional regulation.",
    category: "Mental Health"
  },
  {
    id: 48,
    question: "The biopsychosocial-spiritual model includes which additional factor beyond biology, psychology, and social aspects?",
    options: ["Financial wealth", "Technological support", "Spiritual dimension", "Government policy"],
    correctAnswer: 2,
    explanation: "The biopsychosocial-spiritual model includes the spiritual dimension.",
    category: "Health Models"
  },
  {
    id: 49,
    question: "Which program combines yoga and meditation for stress reduction?",
    options: ["Mindfulness-Based Stress Reduction (MBSR)", "Weight Watchers", "Ketogenic Plan", "Atkins Program"],
    correctAnswer: 0,
    explanation: "MBSR combines yoga and meditation for stress reduction.",
    category: "Stress Management"
  },
  {
    id: 50,
    question: "An example of integrative health is:",
    options: ["Smoking therapy", "Eating fast food", "Combining nutrition, counselling, and yoga", "Ignoring stress"],
    correctAnswer: 2,
    explanation: "Integrative health combines nutrition, counselling, and yoga.",
    category: "Holistic Health"
  },
  {
    id: 51,
    question: "In Blue Zones, longer life expectancy is associated with:",
    options: ["Community and social connections", "Extreme isolation", "High sugar diet", "Sedentary work"],
    correctAnswer: 0,
    explanation: "Blue Zones show longer life expectancy with strong community and social connections.",
    category: "Longevity"
  },
  {
    id: 52,
    question: "A common breathing-based practice in spirituality is:",
    options: ["Pranayama", "Sprinting", "Snacking", "Weightlifting"],
    correctAnswer: 0,
    explanation: "Pranayama is a breathing-based practice in spirituality.",
    category: "Spirituality"
  },
  {
    id: 53,
    question: "WHO defines health as:",
    options: ["Ability to work only", "Emotional happiness only", "A complete state of physical, mental, and social well-being", "Absence of disease only"],
    correctAnswer: 2,
    explanation: "WHO defines health as a complete state of physical, mental, and social well-being.",
    category: "Health Basics"
  },
  {
    id: 54,
    question: "Designing a personal holistic wellness plan should include:",
    options: ["Diet, activity, stress management, and spiritual practice", "Junk food, stress, and inactivity", "Work only", "Financial targets"],
    correctAnswer: 0,
    explanation: "A holistic wellness plan includes diet, activity, stress management, and spiritual practice.",
    category: "Wellness Planning"
  },
  {
    id: 55,
    question: "Omega-3 fatty acids are primarily found in:",
    options: ["Red meat", "Fish", "White bread", "Candy"],
    correctAnswer: 1,
    explanation: "Omega-3 fatty acids are primarily found in fish.",
    category: "Nutrition"
  },
  {
    id: 56,
    question: "Which vitamin is crucial for bone health?",
    options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin B12"],
    correctAnswer: 1,
    explanation: "Vitamin D is crucial for bone health and calcium absorption.",
    category: "Vitamins"
  },
  {
    id: 57,
    question: "Regular physical activity helps maintain:",
    options: ["High blood pressure", "Healthy body weight", "Low energy levels", "Poor sleep quality"],
    correctAnswer: 1,
    explanation: "Regular physical activity helps maintain healthy body weight.",
    category: "Exercise Benefits"
  },
  {
    id: 58,
    question: "Which nutrient is essential for muscle repair?",
    options: ["Carbohydrates", "Protein", "Fiber", "Water"],
    correctAnswer: 1,
    explanation: "Protein is essential for muscle repair and growth.",
    category: "Nutrition"
  },
  {
    id: 59,
    question: "Adequate hydration is important for:",
    options: ["All body functions", "Only digestion", "Only temperature regulation", "Only waste removal"],
    correctAnswer: 0,
    explanation: "Adequate hydration is important for all body functions.",
    category: "Hydration"
  },
  {
    id: 60,
    question: "Which lifestyle factor has the most significant impact on overall health?",
    options: ["Genetics only", "Environment only", "Personal choices and behaviors", "Age only"],
    correctAnswer: 2,
    explanation: "Personal choices and behaviors have the most significant impact on overall health.",
    category: "Lifestyle Factors"
  }
];
