import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Award, Target, RotateCcw } from "lucide-react";

interface QuizResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export const QuizResults = ({ score, total, onRestart }: QuizResultsProps) => {
  const percentage = Math.round((score / total) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: "A+", color: "text-success", icon: Trophy };
    if (percentage >= 80) return { grade: "A", color: "text-success", icon: Award };
    if (percentage >= 70) return { grade: "B", color: "text-primary", icon: Target };
    if (percentage >= 60) return { grade: "C", color: "text-warning", icon: Target };
    return { grade: "F", color: "text-destructive", icon: Target };
  };

  const getEncouragement = () => {
    if (percentage >= 90) return "Outstanding! You're a Python expert! 🐍";
    if (percentage >= 80) return "Excellent work! You have a strong grasp of Python!";
    if (percentage >= 70) return "Great job! You're well on your way to mastering Python!";
    if (percentage >= 60) return "Good effort! Keep practicing to improve your Python skills!";
    return "Don't give up! Review the concepts and try again!";
  };

  const { grade, color, icon: Icon } = getGrade();

  return (
    <div className="min-h-screen gradient-background flex items-center justify-center p-4">
      <Card className="gradient-card shadow-large p-8 w-full max-w-2xl text-center animate-in zoom-in-50 duration-700">
        {/* Trophy Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className={`w-12 h-12 ${color}`} />
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Quiz Complete!
          </h1>
          <div className="space-y-4">
            <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent">
              {percentage}%
            </div>
            <div className="text-2xl font-semibold text-foreground">
              Grade: <span className={color}>{grade}</span>
            </div>
            <p className="text-lg text-muted-foreground">
              You got <span className="font-bold text-success">{score}</span> out of{" "}
              <span className="font-bold text-foreground">{total}</span> questions correct
            </p>
          </div>
        </div>

        {/* Encouragement */}
        <div className="mb-8 p-6 bg-muted/30 rounded-lg">
          <p className="text-lg font-medium text-foreground">
            {getEncouragement()}
          </p>
        </div>

        {/* Stats Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {score}
            </div>
            <div className="text-sm text-muted-foreground">
              Correct
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              {total - score}
            </div>
            <div className="text-sm text-muted-foreground">
              Wrong
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {percentage}%
            </div>
            <div className="text-sm text-muted-foreground">
              Accuracy
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={onRestart}
          size="lg"
          className="gradient-primary text-white font-semibold px-8 py-3 transition-bounce hover:shadow-glow"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Take Quiz Again
        </Button>
      </Card>
    </div>
  );
};