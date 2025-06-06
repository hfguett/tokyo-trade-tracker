
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, Zap, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';
import TradingChart from './TradingChart';

interface EnhancedDashboardProps {
  accentColor: 'mint' | 'purple';
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ accentColor }) => {
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

  const mockPortfolioData = {
    totalValue: 125430.50,
    totalPnL: 8430.50,
    totalPnLPercent: 7.2,
    todayPnL: 1250.30,
    todayPnLPercent: 1.1
  };

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
    <div className="ml-0 lg:ml-72 p-6 lg:p-10 min-h-screen trading-gradient space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        <div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 glow-text">
            Smart Trading Hub
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
            Professional trading platform with real-time market data and advanced analytics
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
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
            <span className="text-sm font-medium capitalize">{connectionStatus}</span>
          </div>
          
          <Button className={`${accentClass} hover:scale-105 transition-all duration-300 px-8 py-6 text-lg`}>
            <Zap className="h-5 w-5 mr-2" />
            Live Trading
          </Button>
        </div>
      </div>

      {/* Enhanced Portfolio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-trading-mint/20 rounded-2xl group-hover:bg-trading-mint/30 transition-colors">
                <DollarSign className="h-8 w-8 text-trading-mint" />
              </div>
              <ArrowUpRight className="h-6 w-6 text-green-400" />
            </div>
            <div className="space-y-3">
              <p className="text-gray-400 text-lg font-medium">Portfolio Value</p>
              <p className="text-4xl lg:text-5xl font-bold text-white glow-text">
                ${mockPortfolioData.totalValue.toLocaleString()}
              </p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-semibold text-lg">
                  +${mockPortfolioData.totalPnL.toLocaleString()} ({mockPortfolioData.totalPnLPercent}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-green-600/20 rounded-2xl group-hover:bg-green-600/30 transition-colors">
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
              <span className="text-2xl">📈</span>
            </div>
            <div className="space-y-3">
              <p className="text-gray-400 text-lg font-medium">Today's P&L</p>
              <p className="text-4xl lg:text-5xl font-bold text-green-400 glow-text">
                +${mockPortfolioData.todayPnL.toLocaleString()}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-green-400 font-semibold text-lg">
                  +{mockPortfolioData.todayPnLPercent}% today
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-blue-600/20 rounded-2xl group-hover:bg-blue-600/30 transition-colors">
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="space-y-3">
              <p className="text-gray-400 text-lg font-medium">Active Positions</p>
              <p className="text-4xl lg:text-5xl font-bold text-white glow-text">
                12
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 font-semibold text-lg">
                  8 profitable
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-purple-600/20 rounded-2xl group-hover:bg-purple-600/30 transition-colors">
                <Target className="h-8 w-8 text-purple-400" />
              </div>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="space-y-3">
              <p className="text-gray-400 text-lg font-medium">Win Rate</p>
              <p className="text-4xl lg:text-5xl font-bold text-white glow-text">
                73.5%
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400 font-semibold text-lg">
                  Above target
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Trading Chart */}
      <div className="space-y-8">
        <TradingChart
          symbol={selectedSymbol}
          data={chartData}
          currentPrice={chartData[chartData.length - 1]?.close}
          change={1234.50}
          changePercent={2.8}
          height={500}
        />
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="trading-card border-trading-mint/30">
            <CardHeader className="p-8">
              <CardTitle className="text-white text-2xl lg:text-3xl font-bold flex items-center">
                <BarChart3 className="h-8 w-8 mr-4 text-trading-mint" />
                Top Performing Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-6">
                {topAssets.map((asset, index) => (
                  <div
                    key={asset.symbol}
                    className="flex items-center justify-between p-6 bg-trading-blue/30 rounded-xl hover:bg-trading-blue/50 transition-all duration-300 cursor-pointer border border-trading-mint/10 hover:border-trading-mint/30"
                    onClick={() => setSelectedSymbol(asset.symbol)}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="text-2xl font-bold text-gray-400">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">{asset.symbol}</div>
                        <div className="text-gray-400">Vol: {asset.volume}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        ${asset.price.toLocaleString()}
                      </div>
                      <div className={`flex items-center space-x-2 justify-end ${
                        asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {asset.change >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-semibold">
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
            <CardHeader className="p-8">
              <CardTitle className="text-white text-2xl font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <Button 
                className={`w-full ${accentClass} hover:scale-105 transition-all duration-300 py-6 text-lg`}
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Place Trade
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-trading-mint/30 text-white hover:bg-trading-mint/20 py-6 text-lg"
              >
                <Activity className="h-5 w-5 mr-2" />
                View Analytics
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-trading-mint/30 text-white hover:bg-trading-mint/20 py-6 text-lg"
              >
                <Target className="h-5 w-5 mr-2" />
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
