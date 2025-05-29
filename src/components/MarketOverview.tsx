
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { gsap } from 'gsap';

interface MarketOverviewProps {
  accentColor: 'mint' | 'purple';
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ accentColor }) => {
  const overviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(overviewRef.current?.children, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });
  }, []);

  const marketData = [
    { symbol: 'S&P 500', price: 4235.45, change: 23.45, changePercent: 0.56, volume: '3.2B' },
    { symbol: 'NASDAQ', price: 13145.23, change: -45.67, changePercent: -0.35, volume: '2.8B' },
    { symbol: 'DOW JONES', price: 34567.89, change: 156.23, changePercent: 0.45, volume: '1.9B' },
    { symbol: 'BITCOIN', price: 43250.00, change: 1250.00, changePercent: 2.98, volume: '28.5B' },
    { symbol: 'ETHEREUM', price: 2634.50, change: -85.30, changePercent: -3.14, volume: '15.2B' },
    { symbol: 'GOLD', price: 1875.60, change: 12.40, changePercent: 0.66, volume: '142M' }
  ];

  return (
    <div className="ml-64 p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Market Overview</h1>
        <p className="text-gray-400">Real-time market data and indices</p>
      </div>

      <div ref={overviewRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketData.map((item, index) => (
          <Card key={index} className="trading-card hover:border-purple-500/50 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between">
                <span>{item.symbol}</span>
                {item.change >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">
                  ${item.price.toLocaleString()}
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  item.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} 
                  <span className="ml-1">
                    ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Activity className="h-4 w-4 mr-1" />
                  Vol: {item.volume}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Economic Calendar */}
      <Card className="trading-card mt-8">
        <CardHeader>
          <CardTitle className="text-white">Economic Calendar - Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '09:30', event: 'GDP Growth Rate', impact: 'High', country: 'USD' },
              { time: '11:00', event: 'Unemployment Rate', impact: 'Medium', country: 'EUR' },
              { time: '14:30', event: 'Consumer Price Index', impact: 'High', country: 'USD' },
              { time: '16:00', event: 'Fed Chair Speech', impact: 'High', country: 'USD' }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-trading-blue/30 rounded-lg">
                <div className="flex items-center">
                  <div className="text-purple-400 font-bold mr-4">{event.time}</div>
                  <div>
                    <div className="text-white font-medium">{event.event}</div>
                    <div className="text-gray-400 text-sm">{event.country}</div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  event.impact === 'High' ? 'bg-red-600' : 
                  event.impact === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                }`}>
                  {event.impact}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;
