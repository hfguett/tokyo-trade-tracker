
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock, ExternalLink, Globe, Activity, DollarSign, AlertTriangle, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';

interface TradingNewsProps {
  accentColor: 'mint' | 'purple';
}

const TradingNews: React.FC<TradingNewsProps> = ({ accentColor }) => {
  const newsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    if (newsRef.current?.children) {
      gsap.from(newsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3
      });
    }
  }, []);

  const newsItems = [
    {
      id: 1,
      title: "Federal Reserve Announces Interest Rate Decision",
      summary: "The Fed maintains current rates but signals potential changes ahead as inflation metrics show mixed signals across different sectors",
      time: "2 hours ago",
      impact: "high",
      category: "Economic",
      source: "Reuters",
      trending: true
    },
    {
      id: 2,
      title: "Major Tech Stocks Rally on AI Breakthrough Announcement",
      summary: "Technology companies see significant gains following groundbreaking AI developments that could reshape the industry landscape",
      time: "4 hours ago",
      impact: "medium",
      category: "Technology",
      source: "Bloomberg",
      trending: false
    },
    {
      id: 3,
      title: "Oil Prices Surge Amid Global Supply Chain Concerns",
      summary: "Crude oil futures climb as geopolitical tensions affect global supply chains and trading routes worldwide",
      time: "6 hours ago",
      impact: "high",
      category: "Commodities",
      source: "CNBC",
      trending: true
    },
    {
      id: 4,
      title: "Cryptocurrency Market Shows Mixed Signals",
      summary: "Bitcoin consolidates while altcoins experience varied performance amid regulatory discussions in major markets",
      time: "8 hours ago",
      impact: "medium",
      category: "Crypto",
      source: "CoinDesk",
      trending: false
    },
    {
      id: 5,
      title: "European Markets Open Higher on Positive Economic Data",
      summary: "Strong manufacturing data from Germany and France boost investor confidence across European markets",
      time: "12 hours ago",
      impact: "low",
      category: "Economic",
      source: "Financial Times",
      trending: false
    }
  ];

  const marketStats = [
    { label: "Market Cap", value: "$2.1T", icon: Globe, change: "+2.4%" },
    { label: "24h Volume", value: "$89.2B", icon: Activity, change: "+5.7%" },
    { label: "Active Trades", value: "1.2M", icon: DollarSign, change: "+12.3%" },
    { label: "Volatility", value: "Medium", icon: AlertTriangle, change: "-1.2%" }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Economic': return DollarSign;
      case 'Technology': return Activity;
      case 'Commodities': return TrendingUp;
      case 'Crypto': return Globe;
      default: return AlertTriangle;
    }
  };

  const accentClass = accentColor === 'mint' ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      {/* Header Section */}
      <div ref={headerRef} className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 glow-text">Market Intelligence</h1>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
              Stay ahead with real-time market developments and analysis
            </p>
          </div>
          <Button 
            variant="outline"
            className="border-trading-mint/40 hover:bg-trading-mint/20 text-white self-start lg:self-auto"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh News
          </Button>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {marketStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 p-4">
                <CardHeader className="pb-2 p-0">
                  <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                    <Icon className="h-4 w-4 mr-2 text-trading-mint" />
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl lg:text-3xl font-bold text-white glow-text">
                    {stat.value}
                  </div>
                  <div className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-trading-mint' : 'text-red-400'}`}>
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* News Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-white glow-text">Latest News & Analysis</h2>
          <Badge className="bg-trading-mint/20 text-trading-mint border-trading-mint/40">
            Live Updates
          </Badge>
        </div>

        <div ref={newsRef} className="space-y-6">
          {newsItems.map((news) => {
            const CategoryIcon = getCategoryIcon(news.category);
            return (
              <Card 
                key={news.id} 
                className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-2xl hover:shadow-trading-mint/20"
              >
                <CardContent className="p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                    <div className="flex-1 lg:pr-6">
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={getImpactColor(news.impact)}>
                          {news.impact.toUpperCase()} IMPACT
                        </Badge>
                        <Badge variant="outline" className="border-trading-mint/30 text-trading-mint">
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {news.category}
                        </Badge>
                        {news.trending && (
                          <Badge className="bg-orange-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        <div className="text-xs text-gray-500">
                          {news.source}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-trading-mint transition-colors leading-tight">
                        {news.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-4">
                        {news.summary}
                      </p>

                      {/* Time */}
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        {news.time}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center lg:items-start">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-trading-mint transition-colors group-hover:scale-110 transform duration-300"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button 
            className={`${accentClass} hover:scale-105 transform transition-all duration-300 shadow-lg px-8 py-3`}
          >
            Load More News
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradingNews;
