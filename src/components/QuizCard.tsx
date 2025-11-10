import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { QuizQuestion } from "@/data/quizQuestions";

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  showAnswer: boolean;
  onAnswerSelect: (answerIndex: number) => void;
}

export const QuizCard = ({ question, selectedAnswer, showAnswer, onAnswerSelect }: QuizCardProps) => {
  const getOptionClass = (index: number) => {
    let baseClass = "quiz-option text-left w-full justify-start h-auto min-h-[60px] whitespace-normal transition-all duration-300";
    
    if (showAnswer) {
      if (index === question.correctAnswer) {
        baseClass += " quiz-option-correct animate-pulse";
      } else if (index === selectedAnswer && index !== question.correctAnswer) {
        baseClass += " quiz-option-incorrect animate-shake";
      }
    } else if (index === selectedAnswer) {
      baseClass += " quiz-option-selected transform scale-[1.02]";
    }
    
    return baseClass;
  };

  const getOptionIcon = (index: number) => {
    if (!showAnswer) return null;
    
    if (index === question.correctAnswer) {
      return <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />;
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />;
    }
    return null;
  };

  return (
    <Card className="space-card shadow-medium p-8 animate-in fade-in-50 duration-500">
      {/* Question Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-primary bg-primary/20 px-3 py-1 rounded-full">
            {question.category}
          </span>
          <span className="text-sm text-muted-foreground">
            Question {question.id}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-card-foreground leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="ghost"
            className={getOptionClass(index)}
            onClick={() => !showAnswer && onAnswerSelect(index)}
            disabled={showAnswer}
          >
            <div className="flex items-start gap-3 w-full">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-muted-foreground text-sm font-medium flex items-center justify-center mt-1">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-card-foreground flex-1 text-left leading-relaxed">
                {option}
              </span>
              {getOptionIcon(index)}
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};