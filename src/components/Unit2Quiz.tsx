import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "./QuizCard";
import { QuizResults } from "./QuizResults";
import { ProgressBar } from "./ProgressBar";
import { QuizNavigation } from "./QuizNavigation";
import { unit2Questions } from "@/data/unit2Questions";
import { shuffleUnit2Questions } from "@/lib/shuffleUtils";
import { ArrowLeft, Rocket } from "lucide-react";
import { toast } from "sonner";

export const Unit2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(unit2Questions);
  
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setShuffledQuestions(shuffleUnit2Questions(unit2Questions));
    
    // Initialize audio elements
    correctSoundRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi6Fzva9dSQFKnzN8tyRPwoVYrXq6qRUFQk9lunzvnAhBS2E0PWveScGLYDQ9deCOAcZbrvo561fHAg5lNv0yXssBimBzvbQfTIG');
    wrongSoundRef.current = new Audio('data:audio/wav;base64,UklGRl8GAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQsGAAB/fn1+fn19fXx8e3t7enl5eHh3d3Z2dXV0dHNyc3Jxb3BvbW5sa2pobmlnZ2ZlZGNjYmFgX15dW1xaWVhXVlRTUlFRT05NTEtKSkhHRkVERENCP0A+PT07OTg3NjQzMjEwLywrKignJSQiISDg4N/e3dzb2tnY19bV1NPSz9DPzs3Ly8rJx8bFxMPCwL++vby7ubm4tre1tLOysK+urKqqqaikpKKioJ+dnJuZmJeVlJOSkI+OjIuJiYeGhIOCgH9+fXt6eXh2dXRzcnBvbm1ramloZWRjYV9eXFtZWFZUU1FQT01LSkdGRENBP0E9PDo5Nzg2NTMxMC8tKykpJyUkIiEfHhwaGRcWFBMREA8NDAsKCAgGBQQCAf/+/f379/v5+ff39PPz8fDv7u3s7Ozq6uno6Obl5OPj4uDh39/d3dzb2djY1tfV1NPS0dDQzs7My8rJyMfHxcTEwsLBv8C/vb28u7m5uLe2tbOzsrCwr66tq6qqqKempqSjoqGgoJ+enJybmpqYl5aVk5OSkZCPjo2Li4qJh4aFhIODgoCAf359fXx6enh4d3Z1dHNycXBvb21sbGtqaWhnaGZlZGNhYWBfXl1cW1pZWFhXVlRVU1NRT1BPTUxMSkpJR0ZGREVDQkFAPz49PDw6OTk4Njc1NTMzMjEwLy8tLC0rKikpJyYmJCMiISAfHh4cHBsaGhgYFxUWFBQSEhEQDw8NDAwKCQkHBwYEBQMCAQD/AAD+/fz8+vn6+Pj39vX09fPy8vHw7+/u7e3s7Orq6ejn6Obm5ePk4+Lh4N/f3d3c29rZ2djY1tbV09TT0tHQz8/Ozs3Ly8rKycjIx8bFxMTDwsLBwMC/vr69vLu7urm5uLe2trW0s7Kyr7CvrqytrKuqqqinp6Wlo6KioKCfnp2cm5qZmJiWlpWUk5KRj5CPjo2MioqJiIeGhYSDgoKBgIB+fXx8e3p5eHd3dnV0c3Jxb29ubWxramlpaGdmZWRjYmJhYF9eXV1cW1pZWFhXVlVUU1NRT1BOTUxLS0lJSEdGRURDQ0JBQD89PTw6Ojk4Nzc2NTQzMzEwLy4uLCsqKikpJyYlJCQiISAfHx0cGxsaGBgXFhUVExIREA8ODg0LCgkJBwYFBAQCAf/+//78+/r6+fj39vX09PPy8fDw7u3s7Orp6enn5ubk4+Pi4d/f3t3c29rZ2NfW1dTU09LS0M/OzczLysrJx8fGxcTDw8HBwL+/vb28u7q6uLe3trW0s7KysK+vra2sq6qqp6enpaWjoqGhn5+enZubmpqYmJeWlZWTk5GRkI+OjoyLi4mJiIaGhYSDg4GBgH9+fXx7enp5eHd2dXRzc3FwcG5ubWxramlpZ2ZlZGRiYmFgX15dXFtaWVlXV1ZVVFNSUVBPTk1MTEpJSUdHRkVEQ0JBQUBAPj08PDo6OTg3NzU0MzMyMDAvLS0sKikpJyYlJSMiIiAeHR0bGhkaGBcWFRQTExEREA8ODg0MCwoKCAcGBgQDAgEB//7+/Pv7+fj49/b19PTz8vDv7+3s7Ovp6ejn5uXk5OPi4eHf3t3c29rZ2NfW1tTU09HRz87Ny8rKycjHxsXExMLBwcC/vr28u7q6uLi3tra0s7Kysq+vrq2sq6qqp6alpKOioqCfn52dnJuamZiXl5WVlJOSko+Ojo2Mi4uJiIeHhYWDg4GBgH9+fXt7enl4d3Z1dXNzcXBvb21sbGppaWhnaGZlZGNiYmBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVDQkJAQD8+PTw7Ojk4Nzc1NDMzMTEwLi0tKyoqKCcmJSUjIyIgIB8eHBsbGRgXFxUVExISEA8PDgwMCgkJBwYFBQMCAQAA//3+/Pv6+fj49/b19PPy8vDv7u3s6+no5+fn5eTj4uHg39/d3Nvb2tnY19bU1NPSz87Ny8rJyMfGxcXDwsLBv769u7q5t7e2tbOysrCwrq2trKqpp6empaSjoqCfnp2cnJqZl5eWlJSTkZCQjo2MioqJh4aGhIODgYB/fX18enp4eHd1dXRyc3Fwb25tbGtqaWhnZ2VkY2JhYF9eXVxbWllYV1ZVVFNSU1BQT01MTEpJSEhGRURDQ0FBQD48Ozs6OTg3NjU0MzMyMS8vLSwtKiopJyYnJCUjISEfHh4cGxsaGRcXFhUTExEREA8NDQwKCwkIBwYFBQMDAf8A/v38/Pr6+Pj39fXz8vHw7+7t7Orq6Ojo5ubk4+Ph4N/e3dzb2tnY1tbU09LSz8/OzMvKycjHxsXExMPBwcC+vr27u7m5t7a2tLOysrCvr62trKuqqaikpKKhoJ+enZycm5mZl5aVlJOSko+Ojo2Li4qJh4aGhIOCgoB/fn18e3p4eHd2dXRzcXBwbm1sa2tpaGdmZWRjYmFgX15dXFtaWVhXVlVUU1NSUVBPTk1MS0pJSEdGRUREQkFAPz49PTs6OTg3NjU0MzIxMDAuLS0rKyopJycmJCMiISAfHh4cGxoZGBcXFRQTEhEQDg4NCwoKCAcGBgQDAgH//v78+/r5+Pf29fTz8vHw7+7s7Orp6Ofl5eTj4uHg397d3Nva2djX1tXU09LRz87Ny8rJyMfGxcPCwr++vby7urm4t7a1tLOysK+ura2rqqmnpqWko6GhoZ6dnZuamZiXlpWUk5KRkI+OjIyLioiIhoWEg4KBgH99fHx6eXh3dnV0c3JxcG9ubWxramlpZ2ZlZGNiYF9eXVxbWllYV1ZVVFNSUlBPTk1MS0pJR0dGREVDQT8+PTw6Ojk4NjY0MzMyMS8vLi0sKionJyUkIyIhIR8fHh0cGxoZGBcWFRQTEhEQDw4NDQwKCQgHBgYEAwIC//7+/Pv7+fj39/X08/Py8O/v7u3r6+rp6Ofm5uTk4+Li4N/e3dzb2tnY19bV09TR0M/OzczLycnHx8XFw8LBv7++vLu6ubm4tre1tLSysrGvr62sq6mnpqWko6Khn5+dnJuamZeXlpWUk5KRkI+OjIuKiYiHhoWEg4KBgH9+fXt6eXl3d3Z1c3Nyc3FwcG9tbWtqaWhnZmVkY2FgYF5dXFxaWVhXV1VVVFJRUFFOTUxLS0lISEZFREVCQUFAPz49PDs6Ojg3Njc1MzMxMTAuLi0rKykpJyYmJCMhIR8fHRwaGRgYFhYVExMRERAODQwLCgkIBwYFBAQCAf/+/fz7+vn4+Pf39PTy8vHw7+7t7evq6ejn5uXk4+Lh4N/e3dzc2trZ19fV1NPT0tDPzs7MysvJycfGxcTCwsC/vr28u7q4t7a2tLSysbCvr62sq6qpqKempaOjop+enp2cm5qYmJaVlZOSkI+Ojo2MiomIh4aFhIOCgYB+fn16enh4d3Z1dHNycXBvbm1sa2ppZ2dmZWRiYmFfXl1dW1pZWFdWVFRTUlBPTk1MSktJSUdGRURDQkA/Pj08PDo5ODc2NDQyMjEvLi4sKyopKCcmJSQjISAfHx4cHBsZGhgXFhYUExIREA8PDgwLCwoJCQcGBQQDAv8BAP/9/Pv6+vn39/b19PPy8fDv7u7s6+rp6Obm5eTj4uDf3t3c29rZ2NfW1dPS0dDP');
  }, []);

  const playCorrectSound = () => {
    if (correctSoundRef.current) {
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const playWrongSound = () => {
    if (wrongSoundRef.current) {
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

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
        playCorrectSound();
        toast.success("Correct! Well done! 🎉", {
          duration: 2000,
        });
      } else {
        playWrongSound();
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
    setShuffledQuestions(shuffleUnit2Questions(unit2Questions));
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
                <Rocket className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-card-foreground">
                Unit 2: Management of Health & Wellness
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
