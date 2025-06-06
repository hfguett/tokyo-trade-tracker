
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Activity, DollarSign, Globe, Zap, AlertTriangle, RefreshCw } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { gsap } from 'gsap';

interface MarketOverviewProps {
  accentColor: 'mint' | 'purple';
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ accentColor }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (pageRef.current) {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    if (cardsRef.current?.children) {
      gsap.from(cardsRef.current.children, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3
      });
    }
  }, []);

  // Mock market data - in real app this would come from WebSocket
  const marketData = [
    {
      symbol: 'BTC/USD',
      price: 45234.50,
      change: 1234.50,
      changePercent: 2.8,
      volume: '2.4B',
      marketCap: '890B',
      high24h: 46500,
      low24h: 43800,
      chartData: Array.from({ length: 24 }, (_, i) => ({
        time: i,
        price: 45000 + Math.random() * 2000 - 1000
      }))
    },
    {
      symbol: 'ETH/USD',
      price: 3456.78,
      change: -123.45,
      changePercent: -3.4,
      volume: '1.8B',
      marketCap: '415B',
      high24h: 3600,
      low24h: 3400,
      chartData: Array.from({ length: 24 }, (_, i) => ({
        time: i,
        price: 3500 + Math.random() * 200 - 100
      }))
    },
    {
      symbol: 'ADA/USD',
      price: 1.23,
      change: 0.045,
      changePercent: 3.8,
      volume: '890M',
      marketCap: '41B',
      high24h: 1.28,
      low24h: 1.18,
      chartData: Array.from({ length: 24 }, (_, i) => ({
        time: i,
        price: 1.2 + Math.random() * 0.1 - 0.05
      }))
    },
    {
      symbol: 'SOL/USD',
      price: 98.76,
      change: 4.32,
      changePercent: 4.6,
      volume: '650M',
      marketCap: '44B',
      high24h: 102,
      low24h: 94,
      chartData: Array.from({ length: 24 }, (_, i) => ({
        time: i,
        price: 98 + Math.random() * 8 - 4
      }))
    },
    {
      symbol: 'DOT/USD',
      price: 7.45,
      change: -0.32,
      changePercent: -4.1,
      volume: '320M',
      marketCap: '9.2B',
      high24h: 7.8,
      low24h: 7.1,
      chartData: Array.from({ length: 24 }, (_, i) => ({
        time: i,
        price: 7.5 + Math.random() * 0.8 - 0.4
      }))
    },
    {
      symbol: 'AVAX/USD',
      price: 38.92,
      change: 2.15,
      changePercent: 5.8,
      volume: '450M',
      marketCap: '15B',
      high24h: 40.5,
      low24h: 36.8,
      chartData: Array.from({ length: 24 }, (_, i) => ({
        time: i,
        price: 39 + Math.random() * 4 - 2
      }))
    }
  ];

  const marketStats = {
    totalMarketCap: '2.1T',
    volume24h: '89.2B',
    btcDominance: 52.3,
    fearGreedIndex: 72,
    activeCoins: 24567
  };

  const handleRefresh = () => {
    setLastUpdate(new Date());
    // In real app, this would trigger WebSocket reconnection or API refresh
  };

  return (
    <div ref={pageRef} className="p-4 lg:p-8 ml-0 lg:ml-72 min-h-screen trading-gradient">
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Market Overview</h1>
            <p className="text-gray-400 text-sm lg:text-base">Real-time cryptocurrency market data and trends</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="text-xs lg:text-sm text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <Button 
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="border-trading-mint/30 text-white hover:bg-trading-mint/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Market Stats - Mobile Optimized */}
      <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <Card className="trading-card">
          <CardHeader className="p-3 lg:p-6 pb-2 lg:pb-3">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <Globe className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-lg lg:text-2xl font-bold text-white">
              ${marketStats.totalMarketCap}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Total
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-3 lg:p-6 pb-2 lg:pb-3">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <Activity className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-lg lg:text-2xl font-bold text-white">
              ${marketStats.volume24h}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Trading
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-3 lg:p-6 pb-2 lg:pb-3">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <DollarSign className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              BTC Dom
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-lg lg:text-2xl font-bold text-white">
              {marketStats.btcDominance}%
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Dominance
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-3 lg:p-6 pb-2 lg:pb-3">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <Zap className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Fear & Greed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-lg lg:text-2xl font-bold text-green-400">
              {marketStats.fearGreedIndex}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Greed
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="p-3 lg:p-6 pb-2 lg:pb-3">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-300 flex items-center">
              <AlertTriangle className={`h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Active
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6 pt-0">
            <div className="text-lg lg:text-2xl font-bold text-white">
              {marketStats.activeCoins.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Coins
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Data Grid - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {marketData.map((asset) => (
          <Card key={asset.symbol} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 hover:scale-105">
            <CardHeader className="p-4 lg:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-lg lg:text-xl font-bold">{asset.symbol}</CardTitle>
                  <div className="text-xs lg:text-sm text-gray-400 mt-1">
                    Vol: {asset.volume} • MCap: {asset.marketCap}
                  </div>
                </div>
                <Badge
                  variant={asset.change >= 0 ? 'default' : 'destructive'}
                  className={`${asset.change >= 0 ? 
                    `${accentColor === 'mint' ? 'bg-trading-profit' : 'bg-purple-600'} shadow-lg` : 
                    'bg-trading-loss shadow-lg'
                  } text-xs lg:text-sm`}
                >
                  {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 lg:p-6 pt-0">
              <div className="space-y-4">
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">
                    ${asset.price.toLocaleString()}
                  </div>
                  <div className={`flex items-center space-x-2 mt-1 ${
                    asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {asset.change >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-semibold">
                      {asset.change >= 0 ? '+' : ''}${asset.change.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="h-16 lg:h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={asset.chartData}>
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={asset.change >= 0 ? '#10b981' : '#ef4444'} 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                        formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* 24h High/Low */}
                <div className="grid grid-cols-2 gap-4 text-xs lg:text-sm">
                  <div>
                    <div className="text-gray-400">24h High</div>
                    <div className="text-white font-semibold">${asset.high24h.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">24h Low</div>
                    <div className="text-white font-semibold">${asset.low24h.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;
