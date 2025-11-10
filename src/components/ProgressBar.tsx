import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export const ProgressBar = ({ current, total, score }: ProgressBarProps) => {
  const progress = (current / total) * 100;
  const accuracy = current > 0 ? (score / current) * 100 : 0;

  return (
    <div className="w-full space-y-4">
      {/* Main Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-card-foreground">
            Progress: {current} of {total}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress 
          value={progress} 
          className="h-2 bg-muted"
        />
      </div>

      {/* Score Display */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-success font-medium">
            Correct: {score}
          </span>
          <span className="text-destructive font-medium">
            Wrong: {current - score}
          </span>
        </div>
        {current > 0 && (
          <span className="text-primary font-medium">
            Accuracy: {Math.round(accuracy)}%
          </span>
        )}
      </div>
    </div>
  );
};