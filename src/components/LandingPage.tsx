
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Calendar, Target, BarChart3, DollarSign, Activity, Shield, Zap, Award, TrendingDown } from 'lucide-react';
import { gsap } from 'gsap';

interface LandingPageProps {
  onAccessClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccessClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesRef.current.appendChild(particle);
      }
    }

    // GSAP Animations
    const tl = gsap.timeline();

    // Hero animations
    tl.from(heroRef.current?.querySelector('.hero-icon'), {
      scale: 0,
      rotation: -180,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .from(heroRef.current?.querySelector('.hero-title'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .from(heroRef.current?.querySelector('.hero-subtitle'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3")
    .from(heroRef.current?.querySelector('.hero-button'), {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.2");

    // Feature cards stagger animation
    gsap.from(featuresRef.current?.children, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 1.2
    });

    // Stats animation
    gsap.from(statsRef.current?.children, {
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 2
    });

    return () => {
      // Cleanup particles
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="min-h-screen trading-gradient relative overflow-hidden">
      {/* Floating Particles */}
      <div ref={particlesRef} className="floating-particles"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div ref={heroRef} className="text-center max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="hero-icon">
              <TrendingUp className="h-20 w-20 text-trading-mint mr-4 drop-shadow-2xl" />
            </div>
            <h1 className="hero-title text-7xl font-bold text-white">
              TradePro
              <span className="text-trading-mint bg-gradient-to-r from-trading-mint to-emerald-400 bg-clip-text text-transparent"> Elite</span>
            </h1>
          </div>
          
          <p className="hero-subtitle text-2xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto">
            Advanced trading analytics platform with AI-powered insights, real-time market data, 
            and professional-grade portfolio management tools.
          </p>

          <Button 
            onClick={onAccessClick}
            className="hero-button bg-gradient-mint hover:scale-110 transform transition-all duration-500 text-white font-bold px-16 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-mint-500/25 relative overflow-hidden group"
          >
            <span className="relative z-10">Access Elite Dashboard</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>

        {/* Enhanced Feature Cards */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-7xl mx-auto">
          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-500 hover:scale-105 group">
            <CardContent className="p-8 text-center">
              <div className="mb-6 relative">
                <Calendar className="h-16 w-16 text-trading-mint mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-trading-mint/20 rounded-full blur-xl group-hover:bg-trading-mint/30 transition-all duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Calendar</h3>
              <p className="text-gray-300 leading-relaxed">AI-enhanced trading calendar with pattern recognition and market event integration</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-500 hover:scale-105 group">
            <CardContent className="p-8 text-center">
              <div className="mb-6 relative">
                <BarChart3 className="h-16 w-16 text-trading-mint mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-trading-mint/20 rounded-full blur-xl group-hover:bg-trading-mint/30 transition-all duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Advanced Analytics</h3>
              <p className="text-gray-300 leading-relaxed">Real-time performance metrics with machine learning-powered trend analysis</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-500 hover:scale-105 group">
            <CardContent className="p-8 text-center">
              <div className="mb-6 relative">
                <Target className="h-16 w-16 text-trading-mint mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-trading-mint/20 rounded-full blur-xl group-hover:bg-trading-mint/30 transition-all duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Goal Optimization</h3>
              <p className="text-gray-300 leading-relaxed">Dynamic goal setting with risk management and position sizing algorithms</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-20 max-w-6xl mx-auto">
          <div className="text-center glass-effect rounded-xl p-6 stats-glow">
            <DollarSign className="h-10 w-10 text-trading-mint mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">PnL</div>
            <div className="text-gray-300">Analytics</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-6 stats-glow">
            <Activity className="h-10 w-10 text-trading-mint mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">Live</div>
            <div className="text-gray-300">Market</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-6 stats-glow">
            <Shield className="h-10 w-10 text-trading-mint mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">Risk</div>
            <div className="text-gray-300">Management</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-6 stats-glow">
            <Zap className="h-10 w-10 text-trading-mint mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">AI</div>
            <div className="text-gray-300">Insights</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-6 stats-glow">
            <Award className="h-10 w-10 text-trading-mint mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">Elite</div>
            <div className="text-gray-300">Tools</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-6 stats-glow">
            <TrendingDown className="h-10 w-10 text-trading-mint mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">Risk</div>
            <div className="text-gray-300">Control</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
