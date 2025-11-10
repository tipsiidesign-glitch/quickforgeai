import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "./QuizCard";
import { QuizResults } from "./QuizResults";
import { ProgressBar } from "./ProgressBar";
import { QuizNavigation } from "./QuizNavigation";
import { healthQuestions } from "@/data/healthQuestions";
import { shuffleHealthQuestions } from "@/lib/shuffleUtils";
import { ArrowLeft, Brain } from "lucide-react";
import { toast } from "sonner";

export const HealthQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(healthQuestions);

  // Shuffle questions when component mounts
  useEffect(() => {
    setShuffledQuestions(shuffleHealthQuestions(healthQuestions));
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showAnswer) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      setShowAnswer(true);
      const isCorrect = selectedAnswer === shuffledQuestions[currentQuestion].correctAnswer;
      
      if (isCorrect) {
        setScore(score + 1);
        toast.success("Correct! Well done! 🎉", {
          duration: 2000,
        });
      } else {
        toast.error("Incorrect. Keep learning! 📚", {
          duration: 2000,
        });
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
    toast.success("Quiz completed! 🏆", {
      duration: 3000,
    });
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
    setShuffledQuestions(shuffleHealthQuestions(healthQuestions));
    toast.info("Quiz restarted! Good luck! 🚀", {
      duration: 2000,
    });
  };

  const handleBackToHome = () => {
    window.location.reload();
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen space-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              className="mb-6 transition-smooth hover:scale-105 text-card-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quiz Selection
            </Button>
            
            <QuizResults
              score={score}
              total={shuffledQuestions.length}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              className="transition-smooth hover:scale-105 text-card-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quiz Selection
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-card-foreground">
                Health & Wellness Quiz
              </h1>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 animate-fade-in">
            <ProgressBar 
              current={currentQuestion + (showAnswer ? 1 : 0)} 
              total={shuffledQuestions.length} 
              score={score}
            />
          </div>

          {/* Quiz Card */}
          <div className="mb-8 animate-scale-in">
            <QuizCard
              question={shuffledQuestions[currentQuestion]}
              selectedAnswer={selectedAnswer}
              showAnswer={showAnswer}
              onAnswerSelect={handleAnswerSelect}
            />
          </div>

          {/* Navigation */}
          <div className="animate-slide-up">
            <QuizNavigation
              currentQuestion={currentQuestion}
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
    </div>
  );
};