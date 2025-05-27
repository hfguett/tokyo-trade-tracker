
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Calendar, Target, BarChart3, DollarSign, Activity } from 'lucide-react';

interface LandingPageProps {
  onAccessClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccessClick }) => {
  return (
    <div className="min-h-screen trading-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="h-16 w-16 text-trading-mint mr-4" />
            <h1 className="text-6xl font-bold text-white">
              TradePro
              <span className="text-trading-mint"> Planner</span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Professional trading journal and analytics platform. Track your trades, 
            analyze performance, and achieve your trading goals with precision.
          </p>

          <Button 
            onClick={onAccessClick}
            className="bg-gradient-mint hover:scale-105 transform transition-all duration-300 text-white font-semibold px-12 py-6 text-lg rounded-xl shadow-2xl"
          >
            Access Trading Dashboard
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-6xl mx-auto animate-slide-up">
          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-trading-mint mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Trade Calendar</h3>
              <p className="text-gray-300">Interactive calendar with trade visualization and detailed analytics</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-trading-mint mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-gray-300">Real-time progress bars and charts for daily, weekly, and monthly goals</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/20 hover:border-trading-mint/40 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-trading-mint mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Goal Management</h3>
              <p className="text-gray-300">Set and track your trading objectives with intelligent insights</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
          <div className="text-center glass-effect rounded-lg p-4">
            <DollarSign className="h-8 w-8 text-trading-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">PnL</div>
            <div className="text-gray-300">Tracking</div>
          </div>
          <div className="text-center glass-effect rounded-lg p-4">
            <Activity className="h-8 w-8 text-trading-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Live</div>
            <div className="text-gray-300">Analytics</div>
          </div>
          <div className="text-center glass-effect rounded-lg p-4">
            <Calendar className="h-8 w-8 text-trading-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Smart</div>
            <div className="text-gray-300">Calendar</div>
          </div>
          <div className="text-center glass-effect rounded-lg p-4">
            <Target className="h-8 w-8 text-trading-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Goal</div>
            <div className="text-gray-300">Setting</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
