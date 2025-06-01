
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Calendar, Target, BarChart3, DollarSign, Activity, Shield, Zap, Award, TrendingDown, PenTool, Globe, Camera, Brain } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onAccessClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccessClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 75; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 25 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
        particlesRef.current.appendChild(particle);
      }
    }

    // Enhanced GSAP Animations with ScrollTrigger
    const tl = gsap.timeline();

    // Hero animations
    tl.from(heroRef.current?.querySelector('.hero-icon'), {
      scale: 0,
      rotation: -180,
      duration: 1.2,
      ease: "back.out(2)"
    })
    .from(heroRef.current?.querySelector('.hero-title'), {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .from(heroRef.current?.querySelector('.hero-subtitle'), {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.4")
    .from(heroRef.current?.querySelector('.hero-button'), {
      scale: 0.7,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(2)"
    }, "-=0.3");

    // Feature cards scroll-triggered animation
    gsap.from(featuresRef.current?.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Benefits section animation
    gsap.from(benefitsRef.current?.children, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: benefitsRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    // Stats animation
    gsap.from(statsRef.current?.children, {
      scale: 0.3,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="min-h-screen trading-gradient relative overflow-hidden">
      {/* Enhanced Floating Particles */}
      <div ref={particlesRef} className="floating-particles"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div ref={heroRef} className="text-center max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="hero-icon relative">
              <Brain className="h-16 w-16 lg:h-24 lg:w-24 text-trading-mint mr-4 drop-shadow-2xl animate-pulse" />
              <div className="absolute inset-0 bg-trading-mint/30 rounded-full blur-2xl animate-pulse"></div>
            </div>
            <h1 className="hero-title text-5xl lg:text-8xl font-bold text-white">
              Smart
              <span className="text-trading-mint bg-gradient-to-r from-trading-mint via-emerald-400 to-teal-300 bg-clip-text text-transparent glow-text"> Journal</span>
            </h1>
          </div>
          
          <p className="hero-subtitle text-xl lg:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            The most advanced trading intelligence platform. Powered by AI insights, real-time market data, 
            OCR trade import, and professional-grade analytics for serious traders.
          </p>

          <div className="hero-button-container mb-16">
            <Button 
              onClick={onAccessClick}
              className="hero-button bg-gradient-to-r from-teal-600 via-trading-mint to-emerald-500 hover:from-emerald-600 hover:via-teal-500 hover:to-trading-mint transform transition-all duration-500 text-white font-bold px-12 lg:px-20 py-6 lg:py-8 text-lg lg:text-xl rounded-2xl shadow-2xl hover:shadow-trading-mint/40 relative overflow-hidden group border-2 border-trading-mint/50 hover:border-trading-mint hover:scale-110"
            >
              <span className="relative z-10 flex items-center">
                <Zap className="h-5 w-5 lg:h-6 lg:w-6 mr-3 animate-pulse" />
                Launch Smart Journal
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </div>

          {/* What is Smart Journal Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 glow-text">What is Smart Journal?</h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Smart Journal is the ultimate trading intelligence platform designed for professional traders across all markets. 
              From crypto to forex, stocks to commodities - we provide the tools, insights, and analytics you need to 
              elevate your trading performance and build consistent profitability.
            </p>
          </div>
        </div>

        {/* Enhanced Feature Cards with New Features */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 max-w-7xl mx-auto">
          <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group cursor-pointer">
            <CardContent className="p-6 lg:p-8 text-center">
              <div className="mb-6 relative">
                <PenTool className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-trading-mint/30 rounded-full blur-xl group-hover:bg-trading-mint/50 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">Excalidraw Integration</h3>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">Draw, annotate charts, and visualize your trading ideas with integrated Excalidraw tools</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group cursor-pointer">
            <CardContent className="p-6 lg:p-8 text-center">
              <div className="mb-6 relative">
                <Camera className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-trading-mint/30 rounded-full blur-xl group-hover:bg-trading-mint/50 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">OCR Trade Import</h3>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">Upload screenshots from any exchange and automatically extract trade data with OCR technology</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group cursor-pointer">
            <CardContent className="p-6 lg:p-8 text-center">
              <div className="mb-6 relative">
                <Globe className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-trading-mint/30 rounded-full blur-xl group-hover:bg-trading-mint/50 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">Global Market Intelligence</h3>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">Real-time news, world clock, and market session tracking for global trading opportunities</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/70 transition-all duration-500 hover:scale-105 group cursor-pointer">
            <CardContent className="p-6 lg:p-8 text-center">
              <div className="mb-6 relative">
                <Target className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-trading-mint/30 rounded-full blur-xl group-hover:bg-trading-mint/50 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">Advanced Risk Management</h3>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">Sophisticated risk controls, position sizing, and automated alerts to protect your capital</p>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div ref={benefitsRef} className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-12 text-center glow-text">Why Choose Smart Journal?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-trading-mint/20 p-3 rounded-full mr-4 flex-shrink-0">
                  <Shield className="h-6 w-6 text-trading-mint" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Professional Grade Security</h4>
                  <p className="text-gray-300">Bank-level security for your trading data and sensitive information</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-trading-mint/20 p-3 rounded-full mr-4 flex-shrink-0">
                  <Activity className="h-6 w-6 text-trading-mint" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Real-Time Analytics</h4>
                  <p className="text-gray-300">Live performance tracking and instant insights into your trading patterns</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-trading-mint/20 p-3 rounded-full mr-4 flex-shrink-0">
                  <Brain className="h-6 w-6 text-trading-mint" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">AI-Powered Insights</h4>
                  <p className="text-gray-300">Machine learning algorithms analyze your trades to identify improvement opportunities</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-trading-mint/20 p-3 rounded-full mr-4 flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-trading-mint" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Comprehensive Analytics</h4>
                  <p className="text-gray-300">Deep dive into your performance with advanced metrics and visualizations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-trading-mint/20 p-3 rounded-full mr-4 flex-shrink-0">
                  <Award className="h-6 w-6 text-trading-mint" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Proven Results</h4>
                  <p className="text-gray-300">Used by professional traders to improve consistency and profitability</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-trading-mint/20 p-3 rounded-full mr-4 flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-trading-mint" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Multi-Asset Support</h4>
                  <p className="text-gray-300">Trade crypto, forex, stocks, and commodities all in one platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mt-20 max-w-6xl mx-auto">
          <div className="text-center glass-effect rounded-xl p-4 lg:p-6 stats-glow hover:scale-105 transition-transform duration-300">
            <DollarSign className="h-8 w-8 lg:h-10 lg:w-10 text-trading-mint mx-auto mb-3 animate-pulse" />
            <div className="text-2xl lg:text-3xl font-bold text-white">PnL</div>
            <div className="text-gray-300 text-sm">Analytics</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-4 lg:p-6 stats-glow hover:scale-105 transition-transform duration-300">
            <Activity className="h-8 w-8 lg:h-10 lg:w-10 text-trading-mint mx-auto mb-3 animate-pulse" />
            <div className="text-2xl lg:text-3xl font-bold text-white">Live</div>
            <div className="text-gray-300 text-sm">Market</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-4 lg:p-6 stats-glow hover:scale-105 transition-transform duration-300">
            <Shield className="h-8 w-8 lg:h-10 lg:w-10 text-trading-mint mx-auto mb-3 animate-pulse" />
            <div className="text-2xl lg:text-3xl font-bold text-white">Risk</div>
            <div className="text-gray-300 text-sm">Management</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-4 lg:p-6 stats-glow hover:scale-105 transition-transform duration-300">
            <Brain className="h-8 w-8 lg:h-10 lg:w-10 text-trading-mint mx-auto mb-3 animate-pulse" />
            <div className="text-2xl lg:text-3xl font-bold text-white">AI</div>
            <div className="text-gray-300 text-sm">Insights</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-4 lg:p-6 stats-glow hover:scale-105 transition-transform duration-300">
            <Camera className="h-8 w-8 lg:h-10 lg:w-10 text-trading-mint mx-auto mb-3 animate-pulse" />
            <div className="text-2xl lg:text-3xl font-bold text-white">OCR</div>
            <div className="text-gray-300 text-sm">Import</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-4 lg:p-6 stats-glow hover:scale-105 transition-transform duration-300">
            <Globe className="h-8 w-8 lg:h-10 lg:w-10 text-trading-mint mx-auto mb-3 animate-pulse" />
            <div className="text-2xl lg:text-3xl font-bold text-white">Global</div>
            <div className="text-gray-300 text-sm">Markets</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 glow-text">Ready to Transform Your Trading?</h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of professional traders who use Smart Journal to analyze, optimize, and scale their trading performance.
          </p>
          <Button 
            onClick={onAccessClick}
            className="bg-gradient-to-r from-teal-600 via-trading-mint to-emerald-500 hover:from-emerald-600 hover:via-teal-500 hover:to-trading-mint transform transition-all duration-500 text-white font-bold px-12 lg:px-16 py-4 lg:py-6 text-lg rounded-2xl shadow-2xl hover:shadow-trading-mint/40 border-2 border-trading-mint/50 hover:border-trading-mint hover:scale-105"
          >
            <Zap className="h-5 w-5 mr-3 animate-pulse" />
            Start Your Trading Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
