
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';

interface TradingNewsProps {
  accentColor: 'mint' | 'purple';
}

const TradingNews: React.FC<TradingNewsProps> = ({ accentColor }) => {
  const newsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(newsRef.current?.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, []);

  const newsItems = [
    {
      id: 1,
      title: "Federal Reserve Announces Interest Rate Decision",
      summary: "The Fed maintains current rates but signals potential changes ahead",
      time: "2 hours ago",
      impact: "high",
      category: "Economic"
    },
    {
      id: 2,
      title: "Tech Stocks Rally on AI Breakthrough",
      summary: "Major technology companies see significant gains following new AI developments",
      time: "4 hours ago",
      impact: "medium",
      category: "Technology"
    },
    {
      id: 3,
      title: "Oil Prices Surge Amid Supply Concerns",
      summary: "Crude oil futures climb as geopolitical tensions affect global supply chains",
      time: "6 hours ago",
      impact: "high",
      category: "Commodities"
    },
    {
      id: 4,
      title: "Cryptocurrency Market Shows Mixed Signals",
      summary: "Bitcoin consolidates while altcoins experience varied performance",
      time: "8 hours ago",
      impact: "medium",
      category: "Crypto"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="ml-64 p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Market News & Analysis</h1>
        <p className="text-gray-400">Stay informed with the latest market developments</p>
      </div>

      <div ref={newsRef} className="space-y-6">
        {newsItems.map((news) => (
          <Card key={news.id} className="trading-card hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Badge className={getImpactColor(news.impact)}>
                      {news.impact.toUpperCase()} IMPACT
                    </Badge>
                    <Badge variant="outline" className="ml-2 border-purple-500/30 text-purple-400">
                      {news.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-300 mb-3">{news.summary}</p>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {news.time}
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors ml-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TradingNews;
