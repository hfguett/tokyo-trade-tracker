
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Calendar, Target, BarChart3, DollarSign, Activity, Shield, Zap, Award, TrendingDown, PenTool, Globe, Camera, Brain, Star, Users, BookOpen } from 'lucide-react';
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
  const pricingRef = useRef<HTMLDivElement>(null);

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

    // Enhanced GSAP Animations
    const masterTimeline = gsap.timeline();

    // Hero animations with stagger
    masterTimeline
      .from(heroRef.current?.querySelector('.hero-icon'), {
        scale: 0,
        rotation: -360,
        duration: 1.5,
        ease: "back.out(3)",
      })
      .from(heroRef.current?.querySelector('.hero-title'), {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.8")
      .from(heroRef.current?.querySelector('.hero-subtitle'), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")
      .from(heroRef.current?.querySelector('.hero-button'), {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.4");

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
      content: "Smart Journal transformed my trading. The analytics and drawing tools helped me identify patterns I never noticed before. My win rate improved by 35%.",
      avatar: "💼"
    },
    {
      name: "Sarah Rodriguez",
      role: "Crypto Portfolio Manager",
      content: "The OCR import feature is a game-changer. I can quickly import trades from any exchange screenshot. The risk management tools are professional-grade.",
      avatar: "🚀"
    },
    {
      name: "Marcus Thompson",
      role: "Forex Trader",
      content: "Best trading journal I've ever used. The AI insights helped me spot emotional patterns in my trading. Worth every penny.",
      avatar: "📈"
    }
  ];

  return (
    <div className="min-h-screen trading-gradient relative overflow-hidden">
      {/* Enhanced Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden"></div>
      
      {/* Hero Section with Enhanced Design */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div ref={heroRef} className="text-center max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="hero-icon relative">
              <Brain className="h-20 w-20 lg:h-32 lg:w-32 text-trading-mint mr-6 drop-shadow-2xl animate-pulse" />
              <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="text-left">
              <h1 className="hero-title text-6xl lg:text-9xl font-bold text-white leading-none">
                Smart
                <span className="block text-trading-mint bg-gradient-to-r from-trading-mint via-emerald-400 to-teal-300 bg-clip-text text-transparent glow-text">Journal</span>
              </h1>
              <div className="text-xl lg:text-2xl text-gray-300 mt-4 font-light">
                Professional Trading Intelligence Platform
              </div>
            </div>
          </div>
          
          <p className="hero-subtitle text-2xl lg:text-4xl text-gray-300 mb-16 leading-relaxed max-w-5xl mx-auto font-light">
            Transform your trading with <span className="text-trading-mint font-semibold">AI-powered insights</span>, 
            professional chart analysis, OCR trade import, and advanced risk management for serious traders.
          </p>

          <div className="hero-button-container mb-20">
            <Button 
              onClick={onAccessClick}
              className="hero-button bg-gradient-to-r from-teal-600 via-trading-mint to-emerald-500 hover:from-emerald-600 hover:via-teal-500 hover:to-trading-mint transform transition-all duration-700 text-white font-bold px-16 lg:px-24 py-8 lg:py-12 text-xl lg:text-2xl rounded-3xl shadow-2xl hover:shadow-trading-mint/50 relative overflow-hidden group border-2 border-trading-mint/60 hover:border-trading-mint hover:scale-110"
            >
              <span className="relative z-10 flex items-center">
                <Zap className="h-6 w-6 lg:h-8 lg:w-8 mr-4 animate-pulse" />
                Launch Smart Journal Pro
                <Star className="h-6 w-6 lg:h-8 lg:w-8 ml-4 animate-spin" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </div>
        </div>

        {/* Enhanced Feature Showcase */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-8xl mx-auto">
          <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 lg:p-10 text-center relative z-10">
              <div className="mb-8 relative">
                <PenTool className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">Excalidraw Pro</h3>
              <p className="text-gray-300 leading-relaxed text-base lg:text-lg">Professional chart analysis with full Excalidraw integration. Draw, annotate, and visualize trading strategies with precision.</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 lg:p-10 text-center relative z-10">
              <div className="mb-8 relative">
                <Camera className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">Smart OCR Import</h3>
              <p className="text-gray-300 leading-relaxed text-base lg:text-lg">Upload screenshots from any exchange and automatically extract trade data with advanced OCR technology.</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 lg:p-10 text-center relative z-10">
              <div className="mb-8 relative">
                <Brain className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">AI Analytics</h3>
              <p className="text-gray-300 leading-relaxed text-base lg:text-lg">Machine learning algorithms analyze your trading patterns and provide actionable insights for improvement.</p>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/50 hover:border-trading-mint transition-all duration-700 hover:scale-110 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-trading-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 lg:p-10 text-center relative z-10">
              <div className="mb-8 relative">
                <Shield className="h-16 w-16 lg:h-20 lg:w-20 text-trading-mint mx-auto group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute inset-0 bg-trading-mint/40 rounded-full blur-2xl group-hover:bg-trading-mint/60 transition-all duration-500"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">Risk Management</h3>
              <p className="text-gray-300 leading-relaxed text-base lg:text-lg">Advanced risk controls, position sizing calculators, and automated alerts to protect your capital.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4 text-center glow-text">Trusted by Professionals</h2>
          <p className="text-xl lg:text-2xl text-gray-300 text-center mb-16 max-w-4xl mx-auto">
            Join thousands of successful traders who use Smart Journal to optimize their performance
          </p>
          
          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="trading-card border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 lg:p-10">
                  <div className="text-6xl mb-6">{testimonial.avatar}</div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                  <div className="border-t border-trading-mint/20 pt-6">
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-trading-mint text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="relative z-10 py-20 px-4">
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8 max-w-7xl mx-auto">
          <div className="text-center glass-effect rounded-2xl p-6 lg:p-8 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <DollarSign className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4 animate-pulse" />
            <div className="text-3xl lg:text-4xl font-bold text-white">95%</div>
            <div className="text-gray-300 text-sm lg:text-base">Win Rate</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-6 lg:p-8 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <Users className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4 animate-pulse" />
            <div className="text-3xl lg:text-4xl font-bold text-white">50K+</div>
            <div className="text-gray-300 text-sm lg:text-base">Active Users</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-6 lg:p-8 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <Activity className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4 animate-pulse" />
            <div className="text-3xl lg:text-4xl font-bold text-white">1M+</div>
            <div className="text-gray-300 text-sm lg:text-base">Trades Tracked</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-6 lg:p-8 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <BookOpen className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4 animate-pulse" />
            <div className="text-3xl lg:text-4xl font-bold text-white">500K+</div>
            <div className="text-gray-300 text-sm lg:text-base">Journal Entries</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-6 lg:p-8 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <Camera className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4 animate-pulse" />
            <div className="text-3xl lg:text-4xl font-bold text-white">99.9%</div>
            <div className="text-gray-300 text-sm lg:text-base">OCR Accuracy</div>
          </div>
          <div className="text-center glass-effect rounded-2xl p-6 lg:p-8 hover:scale-110 transition-transform duration-500 border border-trading-mint/30">
            <Star className="h-12 w-12 lg:h-16 lg:w-16 text-trading-mint mx-auto mb-4 animate-pulse" />
            <div className="text-3xl lg:text-4xl font-bold text-white">4.9/5</div>
            <div className="text-gray-300 text-sm lg:text-base">User Rating</div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 py-24 px-4 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 glow-text">Ready to Transform Your Trading?</h2>
        <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Join the elite community of professional traders who use Smart Journal to analyze, optimize, and scale their trading performance with cutting-edge AI technology.
        </p>
        <Button 
          onClick={onAccessClick}
          className="bg-gradient-to-r from-teal-600 via-trading-mint to-emerald-500 hover:from-emerald-600 hover:via-teal-500 hover:to-trading-mint transform transition-all duration-700 text-white font-bold px-16 lg:px-20 py-6 lg:py-8 text-xl lg:text-2xl rounded-3xl shadow-2xl hover:shadow-trading-mint/50 border-2 border-trading-mint/60 hover:border-trading-mint hover:scale-110 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            <Zap className="h-6 w-6 lg:h-8 lg:w-8 mr-4 animate-pulse" />
            Start Your Professional Journey
            <Award className="h-6 w-6 lg:h-8 lg:w-8 ml-4" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
