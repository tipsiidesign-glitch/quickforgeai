import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Check, RotateCcw, Trophy, Award, Target } from "lucide-react";
import { iksQuestions } from "@/data/iksQuestions";
import { shuffleIKSQuestions } from "@/lib/shuffleUtils";
import { useQuizAudio } from "@/hooks/useQuizAudio";
import { useNavigate } from "react-router-dom";

export const IKSQuiz = () => {
  const navigate = useNavigate();
  const { playCorrectSound, playWrongSound } = useQuizAudio();
  
  const shuffledQuestions = useMemo(() => shuffleIKSQuestions(iksQuestions), []);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(shuffledQuestions.length).fill(null)
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (showAnswer ? 1 : 0)) / shuffledQuestions.length) * 100;
  const accuracy = currentQuestionIndex > 0 ? (score / (currentQuestionIndex + (showAnswer ? 1 : 0))) * 100 : 0;

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
    setQuizCompleted(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(shuffledQuestions.length).fill(null));
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getOptionClass = (index: number) => {
    let baseClass = "quiz-option text-left w-full justify-start h-auto min-h-[60px] whitespace-normal transition-all duration-300";
    
    if (showAnswer) {
      if (index === currentQuestion.correctAnswer) {
        baseClass += " quiz-option-correct animate-pulse";
      } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
        baseClass += " quiz-option-incorrect animate-shake";
      }
    } else if (index === selectedAnswer) {
      baseClass += " quiz-option-selected transform scale-[1.02]";
    }
    
    return baseClass;
  };

  const getOptionIcon = (index: number) => {
    if (!showAnswer) return null;
    
    if (index === currentQuestion.correctAnswer) {
      return <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />;
    } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />;
    }
    return null;
  };

  const getGrade = () => {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    if (percentage >= 90) return { grade: "A+", color: "text-success", icon: Trophy };
    if (percentage >= 80) return { grade: "A", color: "text-success", icon: Award };
    if (percentage >= 70) return { grade: "B", color: "text-primary", icon: Target };
    if (percentage >= 60) return { grade: "C", color: "text-warning", icon: Target };
    return { grade: "F", color: "text-destructive", icon: Target };
  };

  const getEncouragement = () => {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    if (percentage >= 90) return "Outstanding! You're an IKS expert! 🎓";
    if (percentage >= 80) return "Excellent work! You have a strong grasp of Indian Knowledge Systems!";
    if (percentage >= 70) return "Great job! You're well on your way to mastering IKS!";
    if (percentage >= 60) return "Good effort! Keep practicing to improve your IKS knowledge!";
    return "Don't give up! Review the concepts and try again!";
  };

  if (quizCompleted) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    const { grade, color, icon: Icon } = getGrade();

    return (
      <div className="min-h-screen space-background flex items-center justify-center p-4">
        <Card className="space-card shadow-large p-8 w-full max-w-2xl text-center animate-in zoom-in-50 duration-700">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Icon className={`w-12 h-12 ${color}`} />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-card-foreground mb-4">
              Quiz Complete!
            </h1>
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">
                {percentage}%
              </div>
              <div className="text-2xl font-semibold text-card-foreground">
                Grade: <span className={color}>{grade}</span>
              </div>
              <p className="text-lg text-muted-foreground">
                You got <span className="font-bold text-success">{score}</span> out of{" "}
                <span className="font-bold text-card-foreground">{shuffledQuestions.length}</span> questions correct
              </p>
            </div>
          </div>

          <div className="mb-8 p-6 bg-primary/10 rounded-lg">
            <p className="text-lg font-medium text-card-foreground">
              {getEncouragement()}
            </p>
          </div>

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
                {shuffledQuestions.length - score}
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

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={handleRestart}
              size="lg"
              className="space-button font-semibold px-8 py-3 transition-bounce"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Take Quiz Again
            </Button>
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="font-semibold px-8 py-3 transition-smooth text-card-foreground hover:text-primary"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Quiz Selection
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mb-4 text-card-foreground hover:text-primary"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Quiz Selection
          </Button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              SEM 1 IKS MCQ
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Test your knowledge with {shuffledQuestions.length} comprehensive questions
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-card-foreground">
                    Progress: {currentQuestionIndex + (showAnswer ? 1 : 0)} of {shuffledQuestions.length}
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

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-success font-medium">
                    Correct: {score}
                  </span>
                  <span className="text-destructive font-medium">
                    Wrong: {(currentQuestionIndex + (showAnswer ? 1 : 0)) - score}
                  </span>
                </div>
                {(currentQuestionIndex > 0 || showAnswer) && (
                  <span className="text-primary font-medium">
                    Accuracy: {Math.round(accuracy)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="space-card shadow-medium p-8 animate-in fade-in-50 duration-500">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-primary bg-primary/20 px-3 py-1 rounded-full">
                  {currentQuestion.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion.id}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-card-foreground leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={getOptionClass(index)}
                  onClick={() => !showAnswer && handleAnswerSelect(index)}
                  disabled={showAnswer}
                >
                  <div className="flex items-start gap-3 w-full">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-card-foreground text-sm font-medium flex items-center justify-center mt-1">
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
          
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="transition-smooth text-card-foreground hover:text-primary"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-3">
              {!showAnswer && selectedAnswer !== null && (
                <Button
                  onClick={handleSubmitAnswer}
                  className="gradient-primary text-white font-medium px-6 transition-bounce hover:shadow-glow"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Submit Answer
                </Button>
              )}
              
              {showAnswer && (
                <Button
                  onClick={currentQuestionIndex === shuffledQuestions.length - 1 ? handleFinishQuiz : handleNext}
                  className="gradient-primary text-white font-medium px-6 transition-bounce hover:shadow-glow"
                >
                  {currentQuestionIndex === shuffledQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                  {currentQuestionIndex !== shuffledQuestions.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
