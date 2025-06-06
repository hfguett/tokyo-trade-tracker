
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, Zap, ArrowUpRight, ArrowDownRight, BarChart3, Plus } from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';
import TradingChart from './TradingChart';
import { Trade } from '@/types/Trade';

interface EnhancedDashboardProps {
  accentColor: 'mint' | 'purple';
  onAddTrade?: () => void;
  trades?: Trade[];
  onTradeClick?: (trade: Trade) => void;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ accentColor, onAddTrade, trades = [], onTradeClick }) => {
  const { connectionStatus, marketData, portfolioData, connect, subscribeToSymbols } = useWebSocket();
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USD');

  // Mock chart data for demonstration
  const [chartData, setChartData] = useState(() => {
    const now = Date.now();
    return Array.from({ length: 50 }, (_, i) => ({
      timestamp: now - (49 - i) * 60000,
      open: 45000 + Math.random() * 5000,
      high: 46000 + Math.random() * 5000,
      low: 44000 + Math.random() * 3000,
      close: 45000 + Math.random() * 5000,
      volume: Math.random() * 1000000
    }));
  });

  useEffect(() => {
    connect();
    subscribeToSymbols(['BTC/USD', 'ETH/USD', 'ADA/USD', 'SOL/USD']);
  }, []);

  // Mock real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newPoint = {
          timestamp: Date.now(),
          open: prev[prev.length - 1]?.close || 45000,
          high: 46000 + Math.random() * 5000,
          low: 44000 + Math.random() * 3000,
          close: 45000 + Math.random() * 5000,
          volume: Math.random() * 1000000
        };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate portfolio data from trades
  const portfolioValue = trades.reduce((sum, trade) => sum + (trade.quantity * trade.entryPrice), 0);
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalPnLPercent = portfolioValue > 0 ? (totalPnL / portfolioValue) * 100 : 0;
  const activeTrades = trades.filter(trade => trade.status === 'open').length;
  const winningTrades = trades.filter(trade => trade.pnl > 0).length;
  const winRate = trades.length > 0 ? (winningTrades / trades.length) * 100 : 0;

  const topAssets = [
    { symbol: 'BTC/USD', price: 45234.50, change: 1234.50, changePercent: 2.8, volume: '2.4B' },
    { symbol: 'ETH/USD', price: 3456.78, change: -123.45, changePercent: -3.4, volume: '1.8B' },
    { symbol: 'ADA/USD', price: 1.23, change: 0.045, changePercent: 3.8, volume: '890M' },
    { symbol: 'SOL/USD', price: 98.76, change: 4.32, changePercent: 4.6, volume: '650M' }
  ];

  const accentClass = accentColor === 'mint' 
    ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint' 
    : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-10 min-h-screen trading-gradient space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl lg:text-6xl font-bold text-white mb-2 lg:mb-4 glow-text">
            Smart Trading Hub
          </h1>
          <p className="text-lg lg:text-2xl text-gray-300 leading-relaxed">
            Professional trading platform with real-time market data and advanced analytics
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
          <div className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full ${
            connectionStatus === 'connected' 
              ? 'bg-green-600/20 text-green-400 border border-green-600/30'
              : connectionStatus === 'connecting'
              ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
              : 'bg-red-600/20 text-red-400 border border-red-600/30'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' : 
              connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
            }`} />
            <span className="text-xs lg:text-sm font-medium capitalize">{connectionStatus}</span>
          </div>
          
          <Button 
            onClick={onAddTrade}
            className={`${accentClass} hover:scale-105 transition-all duration-300 px-4 lg:px-8 py-3 lg:py-6 text-sm lg:text-lg`}
          >
            <Plus className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
            Add Trade
          </Button>
        </div>
      </div>

      {/* Enhanced Portfolio Cards - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group">
          <CardContent className="p-4 lg:p-8">
            <div className="flex items-center justify-between mb-3 lg:mb-6">
              <div className="p-2 lg:p-4 bg-trading-mint/20 rounded-2xl group-hover:bg-trading-mint/30 transition-colors">
                <DollarSign className="h-4 w-4 lg:h-8 lg:w-8 text-trading-mint" />
              </div>
              <ArrowUpRight className="h-3 w-3 lg:h-6 lg:w-6 text-green-400" />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <p className="text-gray-400 text-sm lg:text-lg font-medium">Portfolio Value</p>
              <p className="text-2xl lg:text-5xl font-bold text-white glow-text">
                ${portfolioValue.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1 lg:space-x-2">
                <TrendingUp className="h-3 w-3 lg:h-5 lg:w-5 text-green-400" />
                <span className="text-green-400 font-semibold text-xs lg:text-lg">
                  +${totalPnL.toLocaleString()} ({totalPnLPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group">
          <CardContent className="p-4 lg:p-8">
            <div className="flex items-center justify-between mb-3 lg:mb-6">
              <div className="p-2 lg:p-4 bg-green-600/20 rounded-2xl group-hover:bg-green-600/30 transition-colors">
                <TrendingUp className="h-4 w-4 lg:h-8 lg:w-8 text-green-400" />
              </div>
              <span className="text-lg lg:text-2xl">📈</span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <p className="text-gray-400 text-sm lg:text-lg font-medium">Today's P&L</p>
              <p className="text-2xl lg:text-5xl font-bold text-green-400 glow-text">
                +${totalPnL.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1 lg:space-x-2">
                <span className="text-green-400 font-semibold text-xs lg:text-lg">
                  +{totalPnLPercent.toFixed(1)}% today
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group">
          <CardContent className="p-4 lg:p-8">
            <div className="flex items-center justify-between mb-3 lg:mb-6">
              <div className="p-2 lg:p-4 bg-blue-600/20 rounded-2xl group-hover:bg-blue-600/30 transition-colors">
                <Activity className="h-4 w-4 lg:h-8 lg:w-8 text-blue-400" />
              </div>
              <span className="text-lg lg:text-2xl">⚡</span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <p className="text-gray-400 text-sm lg:text-lg font-medium">Active Positions</p>
              <p className="text-2xl lg:text-5xl font-bold text-white glow-text">
                {activeTrades}
              </p>
              <div className="flex items-center space-x-1 lg:space-x-2">
                <span className="text-blue-400 font-semibold text-xs lg:text-lg">
                  {winningTrades} profitable
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group">
          <CardContent className="p-4 lg:p-8">
            <div className="flex items-center justify-between mb-3 lg:mb-6">
              <div className="p-2 lg:p-4 bg-purple-600/20 rounded-2xl group-hover:bg-purple-600/30 transition-colors">
                <Target className="h-4 w-4 lg:h-8 lg:w-8 text-purple-400" />
              </div>
              <span className="text-lg lg:text-2xl">🎯</span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <p className="text-gray-400 text-sm lg:text-lg font-medium">Win Rate</p>
              <p className="text-2xl lg:text-5xl font-bold text-white glow-text">
                {winRate.toFixed(1)}%
              </p>
              <div className="flex items-center space-x-1 lg:space-x-2">
                <span className="text-purple-400 font-semibold text-xs lg:text-lg">
                  {winRate >= 60 ? 'Above target' : 'Below target'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trades - Mobile Optimized */}
      {trades.length > 0 && (
        <Card className="trading-card border-trading-mint/30">
          <CardHeader className="p-4 lg:p-8">
            <CardTitle className="text-white text-xl lg:text-3xl font-bold flex items-center">
              <BarChart3 className="h-6 w-6 lg:h-8 lg:w-8 mr-3 lg:mr-4 text-trading-mint" />
              Recent Trades
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-8 pt-0">
            <div className="space-y-3 lg:space-y-4">
              {trades.slice(-5).reverse().map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-3 lg:p-4 bg-trading-blue/30 rounded-xl hover:bg-trading-blue/50 transition-all duration-300 cursor-pointer border border-trading-mint/10 hover:border-trading-mint/30"
                  onClick={() => onTradeClick?.(trade)}
                >
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="text-lg lg:text-xl font-bold text-gray-400">
                      {trade.type === 'buy' ? '📈' : '📉'}
                    </div>
                    <div>
                      <div className="text-lg lg:text-xl font-bold text-white">{trade.symbol}</div>
                      <div className="text-xs lg:text-sm text-gray-400">{trade.exchange} • {trade.quantity} shares</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge
                      variant={trade.pnl >= 0 ? 'default' : 'destructive'}
                      className={`text-sm lg:text-base ${trade.pnl >= 0 ? 
                        `${accentColor === 'mint' ? 'bg-trading-profit' : 'bg-purple-600'} shadow-lg` : 
                        'bg-trading-loss shadow-lg'
                      }`}
                    >
                      ${trade.pnl.toFixed(2)}
                    </Badge>
                    <div className="text-xs lg:text-sm text-gray-400 mt-1">
                      {trade.date.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Trading Chart */}
      <div className="space-y-6 lg:space-y-8">
        <TradingChart
          symbol={selectedSymbol}
          data={chartData}
          currentPrice={chartData[chartData.length - 1]?.close}
          change={1234.50}
          changePercent={2.8}
          height={400}
        />
      </div>

      {/* Market Overview - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <Card className="trading-card border-trading-mint/30">
            <CardHeader className="p-4 lg:p-8">
              <CardTitle className="text-white text-xl lg:text-3xl font-bold flex items-center">
                <BarChart3 className="h-6 w-6 lg:h-8 lg:w-8 mr-3 lg:mr-4 text-trading-mint" />
                Top Performing Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-8 pt-0">
              <div className="space-y-4 lg:space-y-6">
                {topAssets.map((asset, index) => (
                  <div
                    key={asset.symbol}
                    className="flex items-center justify-between p-3 lg:p-6 bg-trading-blue/30 rounded-xl hover:bg-trading-blue/50 transition-all duration-300 cursor-pointer border border-trading-mint/10 hover:border-trading-mint/30"
                    onClick={() => setSelectedSymbol(asset.symbol)}
                  >
                    <div className="flex items-center space-x-3 lg:space-x-6">
                      <div className="text-lg lg:text-2xl font-bold text-gray-400">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="text-lg lg:text-xl font-bold text-white">{asset.symbol}</div>
                        <div className="text-xs lg:text-sm text-gray-400">Vol: {asset.volume}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg lg:text-2xl font-bold text-white">
                        ${asset.price.toLocaleString()}
                      </div>
                      <div className={`flex items-center space-x-1 lg:space-x-2 justify-end ${
                        asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {asset.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4" />
                        ) : (
                          <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4" />
                        )}
                        <span className="font-semibold text-sm lg:text-base">
                          {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="trading-card border-trading-mint/30">
            <CardHeader className="p-4 lg:p-8">
              <CardTitle className="text-white text-lg lg:text-2xl font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-8 pt-0 space-y-4 lg:space-y-6">
              <Button 
                onClick={onAddTrade}
                className={`w-full ${accentClass} hover:scale-105 transition-all duration-300 py-4 lg:py-6 text-sm lg:text-lg`}
              >
                <DollarSign className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                Place Trade
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-trading-mint/30 text-white hover:bg-trading-mint/20 py-4 lg:py-6 text-sm lg:text-lg"
              >
                <Activity className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                View Analytics
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-trading-mint/30 text-white hover:bg-trading-mint/20 py-4 lg:py-6 text-sm lg:text-lg"
              >
                <Target className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                Risk Manager
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
