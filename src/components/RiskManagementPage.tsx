import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, TrendingDown, DollarSign, Percent, Target } from 'lucide-react';
import { Trade } from '@/types/Trade';

interface RiskManagementPageProps {
  trades: Trade[];
  accentColor: 'mint' | 'purple';
}

const RiskManagementPage: React.FC<RiskManagementPageProps> = ({ trades, accentColor }) => {
  // Risk calculations
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const lossingTrades = trades.filter(trade => trade.pnl < 0);
  const winningTrades = trades.filter(trade => trade.pnl > 0);
  const totalLoss = lossingTrades.reduce((sum, trade) => sum + Math.abs(trade.pnl), 0);
  const maxDrawdown = Math.min(...trades.map(t => t.pnl));
  const avgWin = winningTrades.length > 0 ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length : 0;
  const avgLoss = lossingTrades.length > 0 ? Math.abs(lossingTrades.reduce((sum, t) => sum + t.pnl, 0)) / lossingTrades.length : 0;
  const riskRewardRatio = avgLoss > 0 ? avgWin / avgLoss : 0;
  
  // Risk limits
  const dailyRiskLimit = 500;
  const weeklyRiskLimit = 2000;
  const monthlyRiskLimit = 5000;
  
  const dailyRiskUsed = Math.abs(totalLoss);
  const dailyRiskPercentage = Math.min((dailyRiskUsed / dailyRiskLimit) * 100, 100);

  return (
    <div className="ml-0 lg:ml-64 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Risk Management</h1>
        <p className="text-gray-400">Monitor and control your trading risk exposure</p>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-trading-mint" />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white glow-text">
              {dailyRiskPercentage < 30 ? 'Low' : dailyRiskPercentage < 70 ? 'Medium' : 'High'}
            </div>
            <div className={`text-sm mt-1 ${dailyRiskPercentage < 30 ? 'text-green-400' : dailyRiskPercentage < 70 ? 'text-yellow-400' : 'text-red-400'}`}>
              {dailyRiskPercentage.toFixed(1)}% of limit
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <TrendingDown className="h-4 w-4 mr-2 text-red-400" />
              Max Drawdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400 glow-text">
              ${Math.abs(maxDrawdown).toFixed(2)}
            </div>
            <div className="text-sm text-gray-400 mt-1">Largest single loss</div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Target className="h-4 w-4 mr-2 text-trading-mint" />
              Risk/Reward
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white glow-text">
              {riskRewardRatio.toFixed(2)}
            </div>
            <div className="text-sm text-gray-400 mt-1">Average ratio</div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Percent className="h-4 w-4 mr-2 text-trading-mint" />
              Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white glow-text">
              {trades.length > 0 ? ((winningTrades.length / trades.length) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-400 mt-1">{winningTrades.length} wins</div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Limits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="trading-card border-trading-mint/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
              Daily Risk Limits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Daily Loss Limit</span>
                <span className="text-white font-bold">${dailyRiskUsed.toFixed(2)} / ${dailyRiskLimit}</span>
              </div>
              <Progress value={dailyRiskPercentage} className="h-2" />
              <div className={`text-xs mt-1 ${dailyRiskPercentage < 30 ? 'text-green-400' : dailyRiskPercentage < 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                {(dailyRiskLimit - dailyRiskUsed).toFixed(2)} remaining
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Weekly Limit</span>
                <span className="text-white font-bold">${dailyRiskUsed.toFixed(2)} / ${weeklyRiskLimit}</span>
              </div>
              <Progress value={Math.min((dailyRiskUsed / weeklyRiskLimit) * 100, 100)} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Monthly Limit</span>
                <span className="text-white font-bold">${dailyRiskUsed.toFixed(2)} / ${monthlyRiskLimit}</span>
              </div>
              <Progress value={Math.min((dailyRiskUsed / monthlyRiskLimit) * 100, 100)} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-trading-mint" />
              Position Sizing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-trading-blue/50 p-4 rounded-lg">
                <div className="text-gray-300 text-sm">Avg Position</div>
                <div className="text-white font-bold text-xl">
                  ${trades.length > 0 ? (trades.reduce((sum, t) => sum + (t.entryPrice * t.quantity), 0) / trades.length).toFixed(0) : 0}
                </div>
              </div>
              <div className="bg-trading-blue/50 p-4 rounded-lg">
                <div className="text-gray-300 text-sm">Max Position</div>
                <div className="text-white font-bold text-xl">
                  ${trades.length > 0 ? Math.max(...trades.map(t => t.entryPrice * t.quantity)).toFixed(0) : 0}
                </div>
              </div>
            </div>
            
            <div className="border-t border-trading-mint/20 pt-4">
              <div className="text-sm text-gray-300 mb-2">Risk Per Trade Recommendations</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Conservative (1%)</span>
                  <span className="text-trading-mint">$100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Moderate (2%)</span>
                  <span className="text-trading-mint">$200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Aggressive (3%)</span>
                  <span className="text-yellow-400">$300</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Rules */}
      <Card className="trading-card border-trading-mint/30">
        <CardHeader>
          <CardTitle className="text-white">Risk Management Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-trading-mint font-semibold mb-3">Position Management</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-trading-mint rounded-full mr-3"></div>
                  Never risk more than 2% per trade
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-trading-mint rounded-full mr-3"></div>
                  Maximum 5 open positions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-trading-mint rounded-full mr-3"></div>
                  Stop loss on every trade
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-trading-mint rounded-full mr-3"></div>
                  Risk/Reward minimum 1:2
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-trading-mint font-semibold mb-3">Daily Limits</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Stop trading after $500 loss
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Maximum 10 trades per day
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Take profits at +$1000
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Review after 3 consecutive losses
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskManagementPage;
