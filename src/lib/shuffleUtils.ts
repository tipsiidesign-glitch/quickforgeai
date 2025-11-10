import { QuizQuestion } from "@/data/quizQuestions";
import { MathQuestion } from "@/data/mathQuestions";
import { AdvertisingQuestion } from "@/data/advertisingQuestions";
import { BankingQuestion } from "@/data/bankingQuestions";
import { HealthQuestion } from "@/data/healthQuestions";

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Shuffle questions and their options while maintaining correct answer tracking
export const shuffleQuizQuestions = (questions: QuizQuestion[]): QuizQuestion[] => {
  const shuffledQuestions = shuffleArray(questions);
  
  return shuffledQuestions.map(question => {
    const originalOptions = [...question.options];
    const correctOption = originalOptions[question.correctAnswer];
    
    // Shuffle options
    const shuffledOptions = shuffleArray(originalOptions);
    
    // Find new index of correct answer
    const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    };
  });
};

// Shuffle math questions and their options while maintaining correct answer tracking  
export const shuffleMathQuestions = (questions: MathQuestion[]): MathQuestion[] => {
  const shuffledQuestions = shuffleArray(questions);
  
  return shuffledQuestions.map(question => {
    const originalOptions = [...question.options];
    const correctOption = originalOptions[question.correctAnswer];
    
    // Shuffle options
    const shuffledOptions = shuffleArray(originalOptions);
    
    // Find new index of correct answer
    const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    };
  });
};

// Shuffle advertising questions and their options while maintaining correct answer tracking  
export const shuffleAdvertisingQuestions = (questions: AdvertisingQuestion[]): AdvertisingQuestion[] => {
  const shuffledQuestions = shuffleArray(questions);
  
  return shuffledQuestions.map(question => {
    const originalOptions = [...question.options];
    const correctOption = originalOptions[question.correctAnswer];
    
    // Shuffle options
    const shuffledOptions = shuffleArray(originalOptions);
    
    // Find new index of correct answer
    const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    };
  });
};

// Shuffle banking questions and their options while maintaining correct answer tracking  
export const shuffleBankingQuestions = (questions: BankingQuestion[]): BankingQuestion[] => {
  const shuffledQuestions = shuffleArray(questions);
  
  return shuffledQuestions.map(question => {
    const originalOptions = [...question.options];
    const correctOption = originalOptions[question.correctAnswer];
    
    // Shuffle options
    const shuffledOptions = shuffleArray(originalOptions);
    
    // Find new index of correct answer
    const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    };
  });
};

// Shuffle health questions and their options while maintaining correct answer tracking  
export const shuffleHealthQuestions = (questions: HealthQuestion[]): HealthQuestion[] => {
  const shuffledQuestions = shuffleArray(questions);
  
  return shuffledQuestions.map(question => {
    const originalOptions = [...question.options];
    const correctOption = originalOptions[question.correctAnswer];
    
    // Shuffle options
    const shuffledOptions = shuffleArray(originalOptions);
    
    // Find new index of correct answer
    const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    };
  });
};