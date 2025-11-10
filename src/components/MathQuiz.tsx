import { useState, useMemo } from "react";
import { QuizCard } from "./QuizCard";
import { ProgressBar } from "./ProgressBar";
import { QuizNavigation } from "./QuizNavigation";
import { QuizResults } from "./QuizResults";
import { mathQuestions } from "@/data/mathQuestions";
import { shuffleMathQuestions } from "@/lib/shuffleUtils";

export const MathQuiz = () => {
  // Shuffle questions and options once when component mounts
  const shuffledQuestions = useMemo(() => shuffleMathQuestions(mathQuestions), []);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(shuffledQuestions.length).fill(null)
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowAnswer(true);
    
    // Update score if answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAnswer(selectedAnswers[currentQuestionIndex - 1] !== null);
    }
  };

  const handleFinishQuiz = () => {
    setIsComplete(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(shuffledQuestions.length).fill(null));
    setShowAnswer(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <QuizResults 
        score={score} 
        total={shuffledQuestions.length} 
        onRestart={handleRestart} 
      />
    );
  }

  return (
    <div className="min-h-screen space-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            Mathematics & Statistics Quiz
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Test your knowledge with {shuffledQuestions.length} comprehensive questions covering statistics, probability, data types, and calculus
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <ProgressBar 
              current={currentQuestionIndex + (showAnswer ? 1 : 0)}
              total={shuffledQuestions.length}
              score={score}
            />
          </div>
        </div>

        {/* Quiz Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <QuizCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showAnswer={showAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
          
          <QuizNavigation
            currentQuestion={currentQuestionIndex}
            totalQuestions={shuffledQuestions.length}
            selectedAnswer={selectedAnswer}
            showAnswer={showAnswer}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmitAnswer={handleSubmitAnswer}
            onFinishQuiz={handleFinishQuiz}
          />
        </div>
      </div>
    </div>
  );
};