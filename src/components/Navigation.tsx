
import React, { useState } from 'react';
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
  Activity,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  accentColor: 'mint' | 'purple';
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange, accentColor }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const accentClass = accentColor === 'mint' ? 'border-trading-mint bg-gradient-mint shadow-mint-500/25' : 'border-purple-500 bg-gradient-to-r from-purple-600 to-purple-700 shadow-purple-500/25';
  const hoverClass = accentColor === 'mint' ? 'hover:border-trading-mint/50 hover:shadow-mint-500/20' : 'hover:border-purple-500/50 hover:shadow-purple-500/20';

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-trading-dark-blue/90 border border-trading-mint/30 text-white hover:bg-trading-mint/20"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <nav className={`
        w-64 h-screen bg-trading-dark-blue border-r border-trading-mint/20 p-4 fixed left-0 top-0 z-40 transform transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center mb-8">
          <TrendingUp className={`h-8 w-8 mr-3 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'} glow-effect`} />
          <h2 className="text-xl font-bold text-white">TradePro Elite</h2>
        </div>
        
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavClick(item.id)}
                className={`w-full justify-start text-left p-3 h-auto transition-all duration-300 ${
                  isActive 
                    ? `${accentClass} text-white shadow-lg glow-effect` 
                    : `text-gray-300 hover:text-white hover:bg-trading-blue/50 ${hoverClass}`
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden absolute bottom-4 left-4 right-4">
          <div className="text-xs text-gray-500 text-center">
            TradePro Elite v2.0
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
