import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Quiz } from "@/components/Quiz";
import { MathQuiz } from "@/components/MathQuiz";
import { AdvertisingQuiz } from "@/components/AdvertisingQuiz";
import { AdvertisementOE2Quiz } from "@/components/AdvertisementOE2Quiz";
import { CCHealthQuiz } from "@/components/CCHealthQuiz";
import { FinalExamHealthQuiz } from "@/components/FinalExamHealthQuiz";
import { BankingQuiz } from "@/components/BankingQuiz";
import { HealthQuiz } from "@/components/HealthQuiz";
import { Unit2Quiz } from "@/components/Unit2Quiz";
import { IKSQuiz } from "@/components/IKSQuiz";
import { Calculator, Code2, Megaphone, Banknote, Heart, Rocket, BookOpen } from "lucide-react";

const Index = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<'python' | 'math' | 'advertising' | 'advertisementOE2' | 'ccHealth' | 'finalExamHealth' | 'banking' | 'health' | 'unit2' | 'iks' | null>(null);

  if (selectedQuiz === 'python') {
    return <Quiz />;
  }

  if (selectedQuiz === 'math') {
    return <MathQuiz />;
  }

  if (selectedQuiz === 'advertising') {
    return <AdvertisingQuiz />;
  }

  if (selectedQuiz === 'advertisementOE2') {
    return <AdvertisementOE2Quiz onBack={() => setSelectedQuiz(null)} />;
  }

  if (selectedQuiz === 'ccHealth') {
    return <CCHealthQuiz onBack={() => setSelectedQuiz(null)} />;
  }

  if (selectedQuiz === 'finalExamHealth') {
    return <FinalExamHealthQuiz onBack={() => setSelectedQuiz(null)} />;
  }
  }

  if (selectedQuiz === 'banking') {
    return <BankingQuiz />;
  }

  if (selectedQuiz === 'health') {
    return <HealthQuiz />;
  }

  if (selectedQuiz === 'unit2') {
    return <Unit2Quiz />;
  }

  if (selectedQuiz === 'iks') {
    return <IKSQuiz />;
  }

  return (
    <div className="min-h-screen space-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-float">
            🚀 FYAI Learn 🌌
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose your quiz and explore the universe of knowledge
          </p>
        </div>

        {/* SEM2 Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            📚 SEM2
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Advertisement/OE2 Quiz Card */}
            <Card className="space-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">Advertisement/OE2</h3>
                  <p className="text-muted-foreground mb-6">
                    Master advertising concepts including copy writing, layout design, 
                    illustration, jingles, storyboards, and ad effectiveness testing.
                  </p>
                  <Button 
                    onClick={() => setSelectedQuiz('advertisementOE2')}
                    className="space-button font-medium px-8 py-3 transition-bounce"
                  >
                    Start Advertisement Quiz
                  </Button>
                </div>
              </div>
            </Card>

            {/* CC/Health & Wellness Quiz Card */}
            <Card className="space-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">CC/Health & Wellness</h3>
                  <p className="text-muted-foreground mb-6">
                    Test your knowledge on stress, socialization, values, ethics, 
                    stereotyping, prejudice, and conflict resolution with 60 MCQs.
                  </p>
                  <Button 
                    onClick={() => setSelectedQuiz('ccHealth')}
                    className="space-button font-medium px-8 py-3 transition-bounce"
                  >
                    Start Health Quiz
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-5xl mx-auto mb-8">
          <Separator className="bg-primary/30" />
        </div>

        {/* SEM1 Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            📖 SEM1
          </h2>
          {/* Quiz Selection Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Python Quiz Card */}
            <Card className="space-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">Python Programming</h3>
                  <p className="text-muted-foreground mb-6">
                    Test your Python knowledge with comprehensive questions covering data types, 
                    control flow, functions, and advanced concepts.
                  </p>
                  <Button 
                    onClick={() => setSelectedQuiz('python')}
                    className="space-button font-medium px-8 py-3 transition-bounce"
                  >
                    Start Python Quiz
                  </Button>
                </div>
              </div>
            </Card>

            {/* Math Quiz Card */}
            <Card className="space-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">Mathematics & Statistics</h3>
                  <p className="text-muted-foreground mb-6">
                    Challenge yourself with questions on statistics, probability, 
                    data types, and calculus concepts.
                  </p>
                  <Button 
                    onClick={() => setSelectedQuiz('math')}
                    className="space-button font-medium px-8 py-3 transition-bounce"
                  >
                    Start Math Quiz
                  </Button>
                </div>
              </div>
            </Card>

            {/* Advertising Quiz Card */}
            <Card className="space-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Megaphone className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">Advertising & Marketing</h3>
                  <p className="text-muted-foreground mb-6">
                    Master advertising concepts including media planning, communication, 
                    types of advertising, and career insights.
                  </p>
                  <Button 
                    onClick={() => setSelectedQuiz('advertising')}
                    className="space-button font-medium px-8 py-3 transition-bounce"
                  >
                    Start Advertising Quiz
                  </Button>
                </div>
              </div>
            </Card>

            {/* Banking Quiz Card */}
            <Card className="space-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Banknote className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">Banking & Finance</h3>
                  <p className="text-muted-foreground mb-6">
                    Master banking concepts including payment systems, cheques, cards, 
                    and financial instruments with detailed explanations.
                  </p>
                  <Button 
                    onClick={() => setSelectedQuiz('banking')}
                    className="space-button font-medium px-8 py-3 transition-bounce"
                  >
                    Start Banking Quiz
                  </Button>
                </div>
              </div>
            </Card>

            {/* Health Quiz Card - Unit 1 */}
            <Card className="space-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">Unit 1: Health & Wellness</h3>
                  <p className="text-muted-foreground mb-6">
                    Test your knowledge on health education, nutrition, wellness concepts, 
                    and mental health awareness with comprehensive questions.
                  </p>
                  <Button 
                    onClick={() => setSelectedQuiz('health')}
                    className="space-button font-medium px-8 py-3 transition-bounce"
                  >
                    Start Unit 1 Quiz
                  </Button>
                </div>
              </div>
            </Card>

            {/* Unit 2 Quiz Card */}
            <Card className="space-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">Unit 2: Management of Health</h3>
                  <p className="text-muted-foreground mb-6">
                    Master nutrition, exercise, chronic disease management, and holistic wellness 
                    strategies with 60 comprehensive MCQ questions.
                  </p>
                  <Button 
                    onClick={() => setSelectedQuiz('unit2')}
                    className="space-button font-medium px-8 py-3 transition-bounce"
                  >
                    Start Unit 2 Quiz
                  </Button>
                </div>
              </div>
            </Card>

            {/* IKS Quiz Card */}
            <Card className="space-card shadow-medium p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">SEM 1 IKS MCQ</h3>
                  <p className="text-muted-foreground mb-6">
                    Test your knowledge of Indian Knowledge Systems including Ayurveda, Alchemy, 
                    Mathematics, Philosophy, Architecture, and Trade with 60 comprehensive questions.
                  </p>
                  <Button 
                    onClick={() => setSelectedQuiz('iks')}
                    className="space-button font-medium px-8 py-3 transition-bounce"
                  >
                    Start IKS Quiz
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground animate-pulse">
            🌟 Select a quiz above to begin your cosmic journey of knowledge 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
