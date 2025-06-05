
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Target, 
  BookOpen, 
  Settings, 
  PieChart,
  Brain,
  Shield,
  Newspaper,
  Activity,
  Menu,
  X,
  Globe,
  Camera,
  Wallet
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
    { id: 'wallet', label: 'Wallet Tracker', icon: Wallet },
    { id: 'market', label: 'Market Overview', icon: Activity },
    { id: 'news', label: 'Market Intelligence', icon: Newspaper },
    { id: 'journal', label: 'Smart Journal', icon: BookOpen },
    { id: 'risk', label: 'Risk Management', icon: Shield },
    { id: 'goals', label: 'Goals & Inspiration', icon: Target },
    { id: 'worldclock', label: 'World Clock', icon: Globe },
    { id: 'ocr', label: 'OCR Import', icon: Camera },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

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
          className="bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-trading-mint/40 text-white hover:bg-trading-mint/20 hover:border-trading-mint/70 shadow-lg hover:shadow-trading-mint/30 transition-all duration-300"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <nav className={`
        w-72 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r-2 border-trading-mint/30 fixed left-0 top-0 z-40 transform transition-transform duration-300 shadow-2xl flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center mb-6 p-6 flex-shrink-0">
          <div className="relative">
            <Brain className="h-10 w-10 mr-4 text-trading-mint glow-effect animate-pulse" />
            <div className="absolute inset-0 bg-trading-mint/30 rounded-full blur-lg"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white glow-text">Smart Journal</h2>
            <p className="text-xs text-trading-mint/70">Trading Intelligence</p>
          </div>
        </div>
        
        {/* Scrollable Menu Items */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2 pb-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full justify-start text-left p-4 h-auto transition-all duration-300 group relative overflow-hidden ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-2 border-trading-mint text-white shadow-lg shadow-trading-mint/40' 
                      : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 border-2 border-transparent hover:border-trading-mint/40 hover:shadow-lg hover:shadow-trading-mint/20'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-4 transition-transform duration-300 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-pulse"></div>
                  )}
                </Button>
              );
            })}
          </div>
        </ScrollArea>

        {/* Mobile Footer */}
        <div className="lg:hidden p-4 flex-shrink-0">
          <div className="text-xs text-gray-500 text-center">
            Smart Journal v3.0 - Professional Trading Intelligence
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
