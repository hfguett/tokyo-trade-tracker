import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap, Shield, BarChart3, Users, Star, ArrowRight, Play, CheckCircle, Target, Rocket, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { gsap } from 'gsap';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const mockChartData = [
    { time: '9:00', price: 42000, volume: 1200 },
    { time: '9:30', price: 42500, volume: 1800 },
    { time: '10:00', price: 41800, volume: 2100 },
    { time: '10:30', price: 43200, volume: 1600 },
    { time: '11:00', price: 44100, volume: 2400 },
    { time: '11:30', price: 43800, volume: 1900 },
    { time: '12:00', price: 45200, volume: 2800 }
  ];

  const portfolioData = [
    { month: 'Jan', value: 10000 },
    { month: 'Feb', value: 12500 },
    { month: 'Mar', value: 11800 },
    { month: 'Apr', value: 15200 },
    { month: 'May', value: 18700 },
    { month: 'Jun', value: 22400 }
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(heroRef.current, {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power3.out"
    })
    .from(featuresRef.current, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .from(statsRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.4");

    // Animate benefits section
    gsap.from(benefitsRef.current, {
      opacity: 0,
      x: -100,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: benefitsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate pricing section
    gsap.from(pricingRef.current, {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: pricingRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
        
        <div className="container mx-auto text-center z-10">
          <Badge className="mb-6 bg-gradient-to-r from-trading-mint to-green-400 text-black px-6 py-2 text-lg font-semibold">
            Professional Trading Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-trading-mint to-blue-300 bg-clip-text text-transparent leading-tight">
            Trade Smarter,
            <br />
            <span className="text-trading-mint">Profit Better</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced trading platform with real-time analytics, risk management, and professional-grade tools 
            to maximize your trading performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-trading-mint to-green-400 hover:from-green-400 hover:to-trading-mint text-black font-bold px-8 py-4 text-lg hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Start Trading Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-trading-mint text-trading-mint hover:bg-trading-mint hover:text-black px-8 py-4 text-lg transition-all duration-300"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Live Chart Preview */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 border-trading-mint/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">BTC/USD</h3>
                    <p className="text-trading-mint text-xl font-semibold">$45,200.00 <span className="text-green-400">+5.2%</span></p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 px-4 py-2">LIVE</Badge>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockChartData}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }}/>
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }}/>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #10b981',
                        borderRadius: '8px' 
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fill="url(#priceGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Professional <span className="text-trading-mint">Trading Tools</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to trade like a professional, all in one powerful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-12 w-12 text-trading-mint" />,
                title: "Advanced Charts",
                description: "Professional-grade charting with 50+ technical indicators and drawing tools."
              },
              {
                icon: <Shield className="h-12 w-12 text-trading-mint" />,
                title: "Risk Management",
                description: "Comprehensive risk controls with position sizing and automated stop-losses."
              },
              {
                icon: <Zap className="h-12 w-12 text-trading-mint" />,
                title: "Real-Time Data",
                description: "Live market data from major exchanges with millisecond precision."
              },
              {
                icon: <Target className="h-12 w-12 text-trading-mint" />,
                title: "Portfolio Analytics",
                description: "Deep insights into your performance with advanced analytics and reporting."
              },
              {
                icon: <Users className="h-12 w-12 text-trading-mint" />,
                title: "Social Trading",
                description: "Follow successful traders and copy their strategies automatically."
              },
              {
                icon: <Globe className="h-12 w-12 text-trading-mint" />,
                title: "Multi-Exchange",
                description: "Trade across multiple exchanges from a single, unified interface."
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-trading-mint/30 hover:border-trading-mint/60 transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Active Traders" },
              { value: "$2.5B", label: "Volume Traded" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-trading-mint mb-2">{stat.value}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div ref={benefitsRef} className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why Choose <span className="text-trading-mint">TradePro</span>?
              </h2>
              
              <div className="space-y-6">
                {[
                  "Institutional-grade security with 256-bit encryption",
                  "Lightning-fast execution with sub-millisecond latency",
                  "Advanced order types including algorithmic strategies",
                  "Comprehensive educational resources and tutorials",
                  "24/7 customer support from trading experts"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <CheckCircle className="h-6 w-6 text-trading-mint flex-shrink-0" />
                    <span className="text-lg text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Card className="bg-gray-800/50 border-trading-mint/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }}/>
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }}/>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #10b981',
                          borderRadius: '8px' 
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div ref={pricingRef} className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="text-trading-mint">Plan</span>
            </h2>
            <p className="text-xl text-gray-300">Start free, upgrade when you're ready to scale</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for beginners",
                features: ["Basic charting", "Portfolio tracking", "Community access", "Email support"]
              },
              {
                name: "Pro",
                price: "$29/mo",
                description: "For serious traders",
                features: ["Advanced charts", "Risk management", "API access", "Priority support"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$99/mo",
                description: "For trading firms",
                features: ["All Pro features", "White-label solution", "Custom integrations", "Dedicated support"]
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-trading-mint border-2 scale-105' : 'border-gray-600'} bg-gray-800/50`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-trading-mint text-black px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <div className="text-4xl font-bold text-trading-mint mb-2">{plan.price}</div>
                  <p className="text-gray-300 mb-8">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-trading-mint" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-trading-mint to-green-400 text-black' : 'border border-trading-mint text-trading-mint hover:bg-trading-mint hover:text-black'}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div ref={testimonialsRef} className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What <span className="text-trading-mint">Traders</span> Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Professional Trader",
                content: "TradePro has revolutionized my trading. The risk management tools alone have saved me thousands.",
                rating: 5
              },
              {
                name: "Mike Rodriguez",
                role: "Hedge Fund Manager",
                content: "The best trading platform I've used. Lightning fast execution and incredible analytics.",
                rating: 5
              },
              {
                name: "Emily Johnson",
                role: "Day Trader",
                content: "Finally, a platform that understands what serious traders need. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-trading-mint/30">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-trading-mint text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-trading-mint/20 to-green-400/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start <span className="text-trading-mint">Trading</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful traders who trust TradePro for their trading needs.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-trading-mint to-green-400 hover:from-green-400 hover:to-trading-mint text-black font-bold px-12 py-6 text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
          >
            <Rocket className="mr-2 h-6 w-6" />
            Start Your Trading Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
