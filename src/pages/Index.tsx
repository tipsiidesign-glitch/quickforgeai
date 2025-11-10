import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/Quiz";
import { MathQuiz } from "@/components/MathQuiz";
import { AdvertisingQuiz } from "@/components/AdvertisingQuiz";
import { BankingQuiz } from "@/components/BankingQuiz";
import { HealthQuiz } from "@/components/HealthQuiz";
import { Calculator, Code2, Megaphone, Banknote, Heart } from "lucide-react";

const Index = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<'python' | 'math' | 'advertising' | 'banking' | 'health' | null>(null);

  if (selectedQuiz === 'python') {
    return <Quiz />;
  }

  if (selectedQuiz === 'math') {
    return <MathQuiz />;
  }

  if (selectedQuiz === 'advertising') {
    return <AdvertisingQuiz />;
  }

  if (selectedQuiz === 'banking') {
    return <BankingQuiz />;
  }

  if (selectedQuiz === 'health') {
    return <HealthQuiz />;
  }

  return (
    <div className="min-h-screen gradient-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Quiz Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose your quiz and test your knowledge
          </p>
        </div>

        {/* Quiz Selection Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {/* Python Quiz Card */}
          <Card className="gradient-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Python Programming</h3>
                <p className="text-muted-foreground mb-6">
                  Test your Python knowledge with comprehensive questions covering data types, 
                  control flow, functions, and advanced concepts.
                </p>
                <Button 
                  onClick={() => setSelectedQuiz('python')}
                  className="gradient-primary text-white font-medium px-8 py-3 transition-bounce hover:shadow-glow"
                >
                  Start Python Quiz
                </Button>
              </div>
            </div>
          </Card>

          {/* Math Quiz Card */}
          <Card className="gradient-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Mathematics & Statistics</h3>
                <p className="text-muted-foreground mb-6">
                  Challenge yourself with questions on statistics, probability, 
                  data types, and calculus concepts.
                </p>
                <Button 
                  onClick={() => setSelectedQuiz('math')}
                  className="gradient-primary text-white font-medium px-8 py-3 transition-bounce hover:shadow-glow"
                >
                  Start Math Quiz
                </Button>
              </div>
            </div>
          </Card>

          {/* Advertising Quiz Card */}
          <Card className="gradient-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Megaphone className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Advertising & Marketing</h3>
                <p className="text-muted-foreground mb-6">
                  Master advertising concepts including media planning, communication, 
                  types of advertising, and career insights.
                </p>
                <Button 
                  onClick={() => setSelectedQuiz('advertising')}
                  className="gradient-primary text-white font-medium px-8 py-3 transition-bounce hover:shadow-glow"
                >
                  Start Advertising Quiz
                </Button>
              </div>
            </div>
          </Card>

          {/* Banking Quiz Card */}
          <Card className="gradient-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Banknote className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Banking & Finance</h3>
                <p className="text-muted-foreground mb-6">
                  Master banking concepts including payment systems, cheques, cards, 
                  and financial instruments with detailed explanations.
                </p>
                <Button 
                  onClick={() => setSelectedQuiz('banking')}
                  className="gradient-primary text-white font-medium px-8 py-3 transition-bounce hover:shadow-glow"
                >
                  Start Banking Quiz
                </Button>
              </div>
            </div>
          </Card>

          {/* Health Quiz Card */}
          <Card className="gradient-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Health & Wellness</h3>
                <p className="text-muted-foreground mb-6">
                  Test your knowledge on health education, nutrition, wellness concepts, 
                  and mental health awareness with comprehensive questions.
                </p>
                <Button 
                  onClick={() => setSelectedQuiz('health')}
                  className="gradient-primary text-white font-medium px-8 py-3 transition-bounce hover:shadow-glow"
                >
                  Start Health Quiz
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Select a quiz above to begin testing your knowledge
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
