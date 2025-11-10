import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmitAnswer: () => void;
  onFinishQuiz: () => void;
}

export const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  showAnswer,
  onPrevious,
  onNext,
  onSubmitAnswer,
  onFinishQuiz
}: QuizNavigationProps) => {
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  
  return (
    <div className="flex items-center justify-between w-full">
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="transition-smooth"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      {/* Submit/Continue Button */}
      <div className="flex gap-3">
        {!showAnswer && selectedAnswer !== null && (
          <Button
            onClick={onSubmitAnswer}
            className="gradient-primary text-white font-medium px-6 transition-bounce hover:shadow-glow"
          >
            <Check className="w-4 h-4 mr-2" />
            Submit Answer
          </Button>
        )}
        
        {showAnswer && (
          <Button
            onClick={isLastQuestion ? onFinishQuiz : onNext}
            className="gradient-primary text-white font-medium px-6 transition-bounce hover:shadow-glow"
          >
            {isLastQuestion ? "Finish Quiz" : "Next Question"}
            {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        )}
      </div>
    </div>
  );
};