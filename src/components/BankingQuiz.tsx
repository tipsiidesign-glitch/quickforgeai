import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { bankingQuestions } from "@/data/bankingQuestions";
import { shuffleBankingQuestions } from "@/lib/shuffleUtils";
import { QuizCard } from "@/components/QuizCard";
import { ProgressBar } from "@/components/ProgressBar";
import { QuizNavigation } from "@/components/QuizNavigation";
import { QuizResults } from "@/components/QuizResults";
import { useQuizAudio } from "@/hooks/useQuizAudio";
import { ArrowLeft, Banknote } from "lucide-react";

export const BankingQuiz = () => {
  const { playCorrectSound, playWrongSound } = useQuizAudio();
  
  const [questions] = useState(() => shuffleBankingQuestions(bankingQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowAnswer(true);
    
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleBackToHome = () => {
    window.location.reload();
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen space-background">
        <div className="container mx-auto px-4 py-8">
          <QuizResults
            score={score}
            total={questions.length}
            onRestart={handleRestart}
          />
          
          <div className="text-center mt-8">
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="transition-smooth text-card-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quiz Selection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Banknote className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-card-foreground">
              Banking & Finance Quiz
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Test your knowledge of banking concepts, payment systems, and financial instruments
          </p>
          
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            className="mt-4 text-muted-foreground hover:text-primary transition-smooth"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quiz Selection
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar
            current={currentQuestion + 1}
            total={questions.length}
            score={score}
          />
        </div>

        {/* Quiz Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Question Card */}
          <QuizCard
            question={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            showAnswer={showAnswer}
            onAnswerSelect={handleAnswerSelect}
          />

          {/* Navigation */}
          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswer}
            showAnswer={showAnswer}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmitAnswer={handleSubmitAnswer}
            onFinishQuiz={handleFinishQuiz}
          />
        </div>

        {/* Quiz Info */}
        <div className="text-center mt-12">
          <Card className="inline-block p-6 bg-muted/50 border-muted">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>📊 {questions.length} Questions</span>
              <span>🏦 Banking & Finance Topics</span>
              <span>⏱️ No Time Limit</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};