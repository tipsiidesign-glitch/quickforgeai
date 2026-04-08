import { useState, useMemo } from "react";
import { QuizCard } from "./QuizCard";
import { ProgressBar } from "./ProgressBar";
import { QuizNavigation } from "./QuizNavigation";
import { QuizResults } from "./QuizResults";
import { Button } from "./ui/button";
import { finalExamHealthQuestions } from "@/data/finalExamHealthQuestions";
import type { QuizQuestion } from "@/data/quizQuestions";
import { shuffleArray } from "@/lib/shuffleUtils";
import { useQuizAudio } from "@/hooks/useQuizAudio";
import { ChevronLeft, GraduationCap } from "lucide-react";

interface FinalExamHealthQuizProps {
  onBack?: () => void;
}

const shuffleFinalExamHealthQuestions = (questions: typeof finalExamHealthQuestions) => {
  const shuffledQuestions = shuffleArray(questions);
  
  return shuffledQuestions.map(question => {
    const originalOptions = [...question.options];
    const correctOption = originalOptions[question.correctAnswer];
    
    const shuffledOptions = shuffleArray(originalOptions);
    const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    };
  });
};

export const FinalExamHealthQuiz = ({ onBack }: FinalExamHealthQuizProps) => {
  const { playCorrectSound, playWrongSound } = useQuizAudio();
  
  const shuffledQuestions = useMemo(() => shuffleFinalExamHealthQuestions(finalExamHealthQuestions), []);
  
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
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
      playCorrectSound();
    } else {
      playWrongSound();
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
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4 text-card-foreground hover:text-primary"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Quiz Selection
          </Button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-card-foreground">
                Final Exam Health and Wellness MCQ
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Test your knowledge with {shuffledQuestions.length} comprehensive questions on conflict resolution, Maslow's hierarchy, coping strategies, and substance abuse prevention
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <ProgressBar 
              current={currentQuestionIndex + (showAnswer ? 1 : 0)}
              total={shuffledQuestions.length}
              score={score}
            />
          </div>
        </div>

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
