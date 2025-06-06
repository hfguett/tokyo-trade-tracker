import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Calendar, Target, BarChart3, DollarSign, Activity, Shield, Zap, Award, TrendingDown, PenTool, Globe, Camera, Brain, Star, Users, BookOpen, LineChart, Palette, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TradingChart from './TradingChart';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onAccessClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccessClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const chartDemoRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Mock chart data for demo
  const demoChartData = Array.from({ length: 30 }, (_, i) => ({
    timestamp: Date.now() - (29 - i) * 300000,
    open: 45000 + Math.random() * 3000,
    high: 46000 + Math.random() * 3000,
    low: 44000 + Math.random() * 2000,
    close: 45000 + Math.random() * 3000,
    volume: Math.random() * 1000000
  }));

  useEffect(() => {
    // Create enhanced floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${Math.random() * 20 + 15}s linear infinite;
          animation-delay: ${Math.random() * 20}s;
          pointer-events: none;
          z-index: 1;
        `;
        particlesRef.current.appendChild(particle);
      }
    }

    // Enhanced GSAP Animations with more dynamic effects
    const masterTimeline = gsap.timeline();

    // Hero animations with more sophisticated effects
    masterTimeline
      .from(heroRef.current?.querySelector('.hero-icon'), {
        scale: 0,
        rotation: -720,
        duration: 2,
        ease: "elastic.out(1, 0.3)",
      })
      .from(heroRef.current?.querySelector('.hero-title'), {
        y: 150,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      }, "-=1.2")
      .from(heroRef.current?.querySelector('.hero-subtitle'), {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8")
      .from(heroRef.current?.querySelector('.hero-features'), {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")
      .from(heroRef.current?.querySelector('.hero-button'), {
        scale: 0.3,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.4");

    // Chart demo animation
    gsap.from(chartDemoRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: chartDemoRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Scroll-triggered animations
    gsap.from(featuresRef.current?.children, {
      y: 120,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(benefitsRef.current?.children, {
      x: -120,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: benefitsRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(testimonialsRef.current?.children, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(pricingRef.current?.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: pricingRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(statsRef.current?.children, {
      scale: 0.3,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(3)",
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

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Professional Day Trader",
      content: "Smart Journal transformed my trading. The WebSocket integration with live data and drawing tools helped me identify patterns I never noticed before. My win rate improved by 35%.",
      avatar: "💼",
      pnl: "+$45,230"
    },
    {
      name: "Sarah Rodriguez", 
      role: "Crypto Portfolio Manager",
      content: "The real-time charts and professional analytics are incredible. The Go backend integration works flawlessly with multiple exchanges. This is the future of trading platforms.",
      avatar: "🚀",
      pnl: "+$127,890"
    },
    {
      name: "Marcus Thompson",
      role: "Algorithmic Trader",
      content: "Best trading platform I've ever used. The WebSocket feeds are lightning fast, and the chart analysis tools are professional-grade. Revenue increased 3x since switching.",
      avatar: "📈",
      pnl: "+$89,450"
    }
  ];

  return (
    <div className="min-h-screen trading-gradient relative overflow-hidden">
      {/* Enhanced Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden"></div>
      
      {/* Hero Section with Enhanced Design */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 lg:px-8">
        <div ref={heroRef} className="text-center max-w-8xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center mb-16 space-y-12 lg:space-y-0 lg:space-x-16">
            <div className="hero-icon relative">
              <Brain className="h-32 w-32 lg:h-48 lg:w-48 text-trading-mint drop-shadow-2xl animate-pulse" />
              <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <div className="text-left">
              <h1 className="hero-title text-7xl lg:text-[8rem] font-bold text-white leading-none">
                Smart
                <span className="block text-trading-mint bg-gradient-to-r from-trading-mint via-emerald-400 to-teal-300 bg-clip-text text-transparent glow-text">Journal</span>
              </h1>
              <div className="text-2xl lg:text-4xl text-gray-300 mt-6 font-light">
                Professional Trading Intelligence Platform
              </div>
            </div>
          </div>
          
          <p className="hero-subtitle text-3xl lg:text-5xl text-gray-300 mb-12 leading-relaxed max-w-6xl mx-auto font-light">
            Transform your trading with <span className="text-trading-mint font-semibold">AI-powered insights</span>, 
            real-time WebSocket data feeds, professional chart analysis, and advanced risk management.
          </p>

          {/* Feature Highlights */}
          <div className="hero-features grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 max-w-6xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 lg:p-8 border border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-500">
              <Activity className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4" />
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Live Data</h3>
              <p className="text-gray-300 text-sm lg:text-base">Real-time WebSocket feeds from all major exchanges</p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 lg:p-8 border border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-500">
              <Palette className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4" />
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Pro Charts</h3>
              <p className="text-gray-300 text-sm lg:text-base">TradingView-style charts with drawing tools</p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 lg:p-8 border border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-500">
              <Brain className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4" />
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">AI Analytics</h3>
              <p className="text-gray-300 text-sm lg:text-base">Machine learning pattern recognition</p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 lg:p-8 border border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-500">
              <Globe className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4" />
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Multi-Exchange</h3>
              <p className="text-gray-300 text-sm lg:text-base">Connect to Binance, Coinbase, FTX & more</p>
            </div>
          </div>

          <div className="hero-button-container">
            <Button 
              onClick={onAccessClick}
              className="hero-button bg-gradient-to-r from-teal-600 via-trading-mint to-emerald-500 hover:from-emerald-600 hover:via-teal-500 hover:to-trading-mint transform transition-all duration-700 text-white font-bold px-20 lg:px-32 py-8 lg:py-12 text-2xl lg:text-3xl rounded-3xl shadow-2xl hover:shadow-trading-mint/50 relative overflow-hidden group border-2 border-trading-mint/60 hover:border-trading-mint hover:scale-110"
            >
              <span className="relative z-10 flex items-center">
                <Zap className="h-8 w-8 lg:h-10 lg:w-10 mr-4 animate-pulse" />
                Launch Smart Journal Pro
                <Star className="h-8 w-8 lg:h-10 lg:w-10 ml-4 animate-spin" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </div>
        </div>

        {/* Live Chart Demo Section */}
        <div ref={chartDemoRef} className="relative z-10 py-24 px-4 lg:px-8">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 glow-text">Live Trading Dashboard</h2>
              <p className="text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Professional-grade charts with real-time data feeds and advanced drawing tools
              </p>
            </div>
            
            <div className="mb-16">
              <TradingChart
                symbol="BTC/USD"
                data={demoChartData}
                currentPrice={demoChartData[demoChartData.length - 1]?.close}
                change={1234.50}
                changePercent={2.8}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Feature Showcase */}
      <div className="relative z-10 py-24 px-4 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 glow-text">Professional Trading Tools</h2>
            <p className="text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Everything you need for professional trading with seamless Go backend integration
            </p>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 lg:p-12 text-center relative z-10">
                <div className="mb-8 relative">
                  <Activity className="h-20 w-20 lg:h-24 lg:w-24 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">WebSocket Feeds</h3>
                <p className="text-gray-300 leading-relaxed text-lg lg:text-xl">Lightning-fast real-time data from multiple exchanges with your Go backend integration. Zero latency trading signals.</p>
              </CardContent>
            </Card>

            <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 lg:p-12 text-center relative z-10">
                <div className="mb-8 relative">
                  <Layers className="h-20 w-20 lg:h-24 lg:w-24 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Professional Charts</h3>
                <p className="text-gray-300 leading-relaxed text-lg lg:text-xl">TradingView-style charts with advanced indicators, multiple timeframes, and professional drawing tools for technical analysis.</p>
              </CardContent>
            </Card>

            <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 lg:p-12 text-center relative z-10">
                <div className="mb-8 relative">
                  <PenTool className="h-20 w-20 lg:h-24 lg:w-24 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Drawing Tools</h3>
                <p className="text-gray-300 leading-relaxed text-lg lg:text-xl">Professional Excalidraw integration with templates for support/resistance, trend lines, Fibonacci retracements, and pattern analysis.</p>
              </CardContent>
            </Card>

            <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 lg:p-12 text-center relative z-10">
                <div className="mb-8 relative">
                  <Brain className="h-20 w-20 lg:h-24 lg:w-24 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">AI Analytics</h3>
                <p className="text-gray-300 leading-relaxed text-lg lg:text-xl">Machine learning algorithms analyze your trading patterns, identify market opportunities, and provide actionable insights for performance optimization.</p>
              </CardContent>
            </Card>

            <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 lg:p-12 text-center relative z-10">
                <div className="mb-8 relative">
                  <Shield className="h-20 w-20 lg:h-24 lg:w-24 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Risk Management</h3>
                <p className="text-gray-300 leading-relaxed text-lg lg:text-xl">Advanced risk controls, position sizing calculators, real-time portfolio monitoring, and automated alerts to protect your capital.</p>
              </CardContent>
            </Card>

            <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 lg:p-12 text-center relative z-10">
                <div className="mb-8 relative">
                  <Globe className="h-20 w-20 lg:h-24 lg:w-24 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Multi-Exchange</h3>
                <p className="text-gray-300 leading-relaxed text-lg lg:text-xl">Seamless integration with Binance, Coinbase Pro, Kraken, FTX, and more. Unified portfolio tracking across all your exchange accounts.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 py-24 px-4 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 text-center glow-text">Trusted by Professionals</h2>
          <p className="text-2xl lg:text-3xl text-gray-300 text-center mb-20 max-w-5xl mx-auto leading-relaxed">
            Join thousands of successful traders who use Smart Journal to optimize their performance and connect their Go backends
          </p>
          
          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="trading-card border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-500 hover:scale-105">
                <CardContent className="p-10 lg:p-12">
                  <div className="text-8xl mb-8 text-center">{testimonial.avatar}</div>
                  <p className="text-gray-300 text-xl leading-relaxed mb-8 italic">"{testimonial.content}"</p>
                  <div className="border-t border-trading-mint/20 pt-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white text-xl">{testimonial.name}</div>
                        <div className="text-trading-mint text-base">{testimonial.role}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{testimonial.pnl}</div>
                        <div className="text-sm text-gray-400">This year</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="relative z-10 py-24 px-4 lg:px-8">
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 max-w-8xl mx-auto">
          <div className="text-center glass-effect rounded-2xl p-8 lg:p-10 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <DollarSign className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto mb-6 animate-pulse" />
            <div className="text-4xl lg:text-5xl font-bold text-white">95%</div>
            <div className="text-gray-300 text-base lg:text-lg mt-2">Win Rate</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-8 lg:p-10 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <Users className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto mb-6 animate-pulse" />
            <div className="text-4xl lg:text-5xl font-bold text-white">100K+</div>
            <div className="text-gray-300 text-base lg:text-lg mt-2">Active Traders</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-8 lg:p-10 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <Activity className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto mb-6 animate-pulse" />
            <div className="text-4xl lg:text-5xl font-bold text-white">5M+</div>
            <div className="text-gray-300 text-base lg:text-lg mt-2">Trades Tracked</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-8 lg:p-10 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <BookOpen className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto mb-6 animate-pulse" />
            <div className="text-4xl lg:text-5xl font-bold text-white">2M+</div>
            <div className="text-gray-300 text-base lg:text-lg mt-2">Journal Entries</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-8 lg:p-10 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <Globe className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto mb-6 animate-pulse" />
            <div className="text-4xl lg:text-5xl font-bold text-white">50+</div>
            <div className="text-gray-300 text-base lg:text-lg mt-2">Exchanges</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-8 lg:p-10 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <Star className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto mb-6 animate-pulse" />
            <div className="text-4xl lg:text-5xl font-bold text-white">4.9/5</div>
            <div className="text-gray-300 text-base lg:text-lg mt-2">User Rating</div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 py-32 px-4 lg:px-8 text-center">
        <h2 className="text-5xl lg:text-7xl font-bold text-white mb-12 glow-text">Ready to Transform Your Trading?</h2>
        <p className="text-2xl lg:text-3xl text-gray-300 mb-16 max-w-6xl mx-auto leading-relaxed">
          Join the elite community of professional traders who use Smart Journal with real-time WebSocket data, advanced AI analytics, and seamless Go backend integration.
        </p>
        <Button 
          onClick={onAccessClick}
          className="bg-gradient-to-r from-teal-600 via-trading-mint to-emerald-500 hover:from-emerald-600 hover:via-teal-500 hover:to-trading-mint transform transition-all duration-700 text-white font-bold px-24 lg:px-32 py-8 lg:py-12 text-2xl lg:text-3xl rounded-3xl shadow-2xl hover:shadow-trading-mint/50 border-2 border-trading-mint/60 hover:border-trading-mint hover:scale-110 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            <Zap className="h-8 w-8 lg:h-10 lg:w-10 mr-4 animate-pulse" />
            Start Your Professional Journey
            <Award className="h-8 w-8 lg:h-10 lg:w-10 ml-4" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
