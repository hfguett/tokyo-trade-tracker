import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, CheckCircle, Circle } from 'lucide-react';
import { gsap } from 'gsap';
import { Trade } from '@/types/Trade';

interface GoalsPageProps {
  trades: Trade[];
  accentColor: 'mint' | 'purple';
}

const GoalsPage: React.FC<GoalsPageProps> = ({ trades, accentColor }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(pageRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(goalsRef.current?.children, {
      y: 80,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.3
    });
  }, []);

  // Calculate goals progress based on trades
  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.pnl > 0).length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);

  // Define trading goals
  const monthlyPnLGoal = 1000;
  const yearlyPnLGoal = 12000;
  const winRateGoal = 70;

  // Calculate progress towards goals
  const monthlyPnLProgress = Math.min((totalPnL / monthlyPnLGoal) * 100, 100);
  const yearlyPnLProgress = Math.min((totalPnL / yearlyPnLGoal) * 100, 100);
  const winRateProgress = Math.min(winRate, 100);

  return (
    <div ref={pageRef} className="p-4 lg:p-8 ml-0 lg:ml-72 min-h-screen trading-gradient">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Trading Goals</h1>
        <p className="text-gray-400 text-sm lg:text-base">Track your progress and stay motivated</p>
      </div>

      {/* Goals Section - Mobile Optimized */}
      <div ref={goalsRef} className="space-y-6 lg:space-y-8">
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Edit className="h-5 w-5 mr-2 text-trading-mint" />
              Monthly P&L Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-3 lg:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Progress</span>
              <span className="text-white text-sm lg:text-base">${totalPnL.toFixed(2)} / ${monthlyPnLGoal}</span>
            </div>
            <Progress value={monthlyPnLProgress} className="h-2" />
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Status</span>
              <span className={`font-bold ${monthlyPnLProgress >= 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                {monthlyPnLProgress >= 100 ? 'Achieved' : 'In Progress'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Edit className="h-5 w-5 mr-2 text-trading-mint" />
              Yearly P&L Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-3 lg:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Progress</span>
              <span className="text-white text-sm lg:text-base">${totalPnL.toFixed(2)} / ${yearlyPnLGoal}</span>
            </div>
            <Progress value={yearlyPnLProgress} className="h-2" />
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Status</span>
              <span className={`font-bold ${yearlyPnLProgress >= 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                {yearlyPnLProgress >= 100 ? 'Achieved' : 'In Progress'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Edit className="h-5 w-5 mr-2 text-trading-mint" />
              Win Rate Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-3 lg:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Progress</span>
              <span className="text-white text-sm lg:text-base">{winRate.toFixed(1)}% / {winRateGoal}%</span>
            </div>
            <Progress value={winRateProgress} className="h-2" />
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Status</span>
              <span className={`font-bold ${winRateProgress >= winRateGoal ? 'text-green-400' : 'text-yellow-400'}`}>
                {winRateProgress >= winRateGoal ? 'Achieved' : 'In Progress'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalsPage;
