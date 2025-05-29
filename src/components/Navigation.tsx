
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Target, 
  BookOpen, 
  Settings, 
  PieChart,
  TrendingUp,
  Shield,
  Newspaper,
  Activity
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  accentColor: 'mint' | 'purple';
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange, accentColor }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'market', label: 'Market Overview', icon: Activity },
    { id: 'news', label: 'Market News', icon: Newspaper },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'risk', label: 'Risk Management', icon: Shield },
    { id: 'goals', label: 'Goals & Targets', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const accentClass = accentColor === 'mint' ? 'border-trading-mint bg-gradient-mint' : 'border-purple-500 bg-gradient-to-r from-purple-600 to-purple-700';
  const hoverClass = accentColor === 'mint' ? 'hover:border-trading-mint/50' : 'hover:border-purple-500/50';

  return (
    <nav className="w-64 h-screen bg-trading-dark-blue border-r border-purple-500/20 p-4 fixed left-0 top-0 z-40">
      <div className="flex items-center mb-8">
        <TrendingUp className={`h-8 w-8 mr-3 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
        <h2 className="text-xl font-bold text-white">TradePro</h2>
      </div>
      
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onPageChange(item.id)}
              className={`w-full justify-start text-left p-3 h-auto transition-all duration-300 ${
                isActive 
                  ? `${accentClass} text-white shadow-lg` 
                  : `text-gray-300 hover:text-white hover:bg-trading-blue/50 ${hoverClass}`
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
