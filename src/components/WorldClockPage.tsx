
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Clock, TrendingUp, CircleDot } from 'lucide-react';

interface WorldClockPageProps {
  accentColor: 'mint' | 'purple';
}

interface MarketSession {
  name: string;
  timezone: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  nextAction: string;
  flag: string;
}

const WorldClockPage: React.FC<WorldClockPageProps> = ({ accentColor }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isMarketOpen = (openTime: string, closeTime: string, timezone: string): boolean => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      timeZone: timezone, 
      hour12: false 
    });
    const currentHour = parseInt(timeString.split(':')[0]);
    const openHour = parseInt(openTime.split(':')[0]);
    const closeHour = parseInt(closeTime.split(':')[0]);
    
    if (openHour < closeHour) {
      return currentHour >= openHour && currentHour < closeHour;
    } else {
      return currentHour >= openHour || currentHour < closeHour;
    }
  };

  const getNextAction = (openTime: string, closeTime: string, timezone: string, isOpen: boolean): string => {
    if (isOpen) {
      return `Closes at ${closeTime}`;
    } else {
      return `Opens at ${openTime}`;
    }
  };

  const marketSessions: MarketSession[] = [
    {
      name: 'New York',
      timezone: 'America/New_York',
      openTime: '09:30',
      closeTime: '16:00',
      isOpen: isMarketOpen('09:30', '16:00', 'America/New_York'),
      nextAction: '',
      flag: '🇺🇸'
    },
    {
      name: 'London',
      timezone: 'Europe/London',
      openTime: '08:00',
      closeTime: '16:30',
      isOpen: isMarketOpen('08:00', '16:30', 'Europe/London'),
      nextAction: '',
      flag: '🇬🇧'
    },
    {
      name: 'Tokyo',
      timezone: 'Asia/Tokyo',
      openTime: '09:00',
      closeTime: '15:00',
      isOpen: isMarketOpen('09:00', '15:00', 'Asia/Tokyo'),
      nextAction: '',
      flag: '🇯🇵'
    },
    {
      name: 'Sydney',
      timezone: 'Australia/Sydney',
      openTime: '10:00',
      closeTime: '16:00',
      isOpen: isMarketOpen('10:00', '16:00', 'Australia/Sydney'),
      nextAction: '',
      flag: '🇦🇺'
    },
    {
      name: 'Frankfurt',
      timezone: 'Europe/Berlin',
      openTime: '09:00',
      closeTime: '17:30',
      isOpen: isMarketOpen('09:00', '17:30', 'Europe/Berlin'),
      nextAction: '',
      flag: '🇩🇪'
    },
    {
      name: 'Hong Kong',
      timezone: 'Asia/Hong_Kong',
      openTime: '09:30',
      closeTime: '16:00',
      isOpen: isMarketOpen('09:30', '16:00', 'Asia/Hong_Kong'),
      nextAction: '',
      flag: '🇭🇰'
    }
  ].map(session => ({
    ...session,
    nextAction: getNextAction(session.openTime, session.closeTime, session.timezone, session.isOpen)
  }));

  const cryptoMarkets = [
    { name: 'Bitcoin', symbol: 'BTC', status: '24/7 Open', flag: '₿' },
    { name: 'Ethereum', symbol: 'ETH', status: '24/7 Open', flag: 'Ξ' },
    { name: 'Binance', symbol: 'BNB', status: '24/7 Open', flag: '🟡' },
    { name: 'Solana', symbol: 'SOL', status: '24/7 Open', flag: '🔮' }
  ];

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <Globe className="h-8 w-8 text-trading-mint mr-4 animate-pulse" />
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white glow-text">World Clock & Market Sessions</h1>
            <p className="text-gray-400">Global trading hours and market status</p>
          </div>
        </div>
      </div>

      {/* Current Time Display */}
      <Card className="trading-card mb-8 border-trading-mint/40 hover:border-trading-mint/60 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-6 w-6 mr-3 text-trading-mint animate-pulse" />
            Current UTC Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-trading-mint glow-text">
            {currentTime.toUTCString()}
          </div>
        </CardContent>
      </Card>

      {/* Traditional Market Sessions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-trading-mint" />
          Traditional Market Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketSessions.map((session) => (
            <Card key={session.name} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{session.flag}</span>
                    {session.name}
                  </div>
                  <div className={`flex items-center ${session.isOpen ? 'text-trading-mint' : 'text-red-400'}`}>
                    <CircleDot className={`h-4 w-4 mr-2 ${session.isOpen ? 'animate-pulse' : ''}`} />
                    {session.isOpen ? 'OPEN' : 'CLOSED'}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">
                    {currentTime.toLocaleTimeString('en-US', { 
                      timeZone: session.timezone,
                      hour12: false
                    })}
                  </div>
                  <div className="text-sm text-gray-400">
                    Trading Hours: {session.openTime} - {session.closeTime}
                  </div>
                  <div className={`text-sm font-medium ${session.isOpen ? 'text-trading-mint' : 'text-yellow-400'}`}>
                    {session.nextAction}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cryptocurrency Markets */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <CircleDot className="h-6 w-6 mr-3 text-trading-mint animate-pulse" />
          Cryptocurrency Markets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cryptoMarkets.map((crypto) => (
            <Card key={crypto.symbol} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{crypto.flag}</div>
                <h3 className="text-xl font-bold text-white mb-2">{crypto.name}</h3>
                <div className="text-sm text-gray-400 mb-3">{crypto.symbol}</div>
                <div className="flex items-center justify-center text-trading-mint font-medium">
                  <CircleDot className="h-4 w-4 mr-2 animate-pulse" />
                  {crypto.status}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Market Overlap Information */}
      <Card className="trading-card mt-8 border-trading-mint/30">
        <CardHeader>
          <CardTitle className="text-white">Market Session Overlaps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-trading-mint mb-3">High Volatility Periods</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• London + New York: 13:30-16:00 UTC</li>
                <li>• Tokyo + Sydney: 23:00-06:00 UTC</li>
                <li>• London + Frankfurt: 08:00-16:30 UTC</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-trading-mint mb-3">Best Trading Times</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• EUR/USD: London-NY overlap</li>
                <li>• USD/JPY: Tokyo-London overlap</li>
                <li>• GBP/USD: London session</li>
                <li>• AUD/USD: Sydney-Tokyo overlap</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorldClockPage;
