import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Bell, Shield, User, Database, Smartphone } from 'lucide-react';
import { gsap } from 'gsap';

interface SettingsPageProps {
  accentColor: 'mint' | 'purple';
  onAccentColorChange: (color: 'mint' | 'purple') => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ accentColor, onAccentColorChange }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(pageRef.current, {
      opacity: 0,
      x: -100,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(sectionsRef.current?.children, {
      y: 60,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.3
    });
  }, []);

  return (
    <div ref={pageRef} className="p-8 ml-64 min-h-screen trading-gradient">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings & Preferences</h1>
        <p className="text-gray-400">Customize your trading platform experience</p>
      </div>

      <div ref={sectionsRef} className="space-y-6 max-w-4xl">
        {/* Theme Settings */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Palette className={`h-5 w-5 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Theme & Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white text-lg">Accent Color</Label>
              <div className="flex space-x-4">
                <Button
                  variant={accentColor === 'mint' ? 'default' : 'outline'}
                  onClick={() => onAccentColorChange('mint')}
                  className={accentColor === 'mint' ? 
                    'bg-gradient-mint shadow-lg' : 
                    'border-trading-mint/30 text-white hover:bg-trading-mint/20'
                  }
                >
                  Mint Green
                </Button>
                <Button
                  variant={accentColor === 'purple' ? 'default' : 'outline'}
                  onClick={() => onAccentColorChange('purple')}
                  className={accentColor === 'purple' ? 
                    'bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg' : 
                    'border-purple-500/30 text-white hover:bg-purple-500/20'
                  }
                >
                  Dark Purple (Recommended)
                </Button>
              </div>
              <p className="text-gray-400 text-sm">
                Choose your preferred accent color. Purple theme provides a more professional trading experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Dark Mode</Label>
                  <p className="text-gray-400 text-sm">Professional dark theme</p>
                </div>
                <Switch checked={true} disabled />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Animations</Label>
                  <p className="text-gray-400 text-sm">GSAP smooth transitions</p>
                </div>
                <Switch checked={true} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className={`h-5 w-5 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Notifications & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Trade Alerts</Label>
                  <p className="text-gray-400 text-sm">P&L threshold notifications</p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Goal Progress</Label>
                  <p className="text-gray-400 text-sm">Monthly/yearly goal updates</p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Risk Warnings</Label>
                  <p className="text-gray-400 text-sm">Risk management alerts</p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email Reports</Label>
                  <p className="text-gray-400 text-sm">Weekly performance summaries</p>
                </div>
                <Switch checked={false} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Preferences */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className={`h-5 w-5 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Trading Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white">Default Risk per Trade (%)</Label>
                <Input 
                  type="number" 
                  defaultValue="2" 
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Max Portfolio Risk (%)</Label>
                <Input 
                  type="number" 
                  defaultValue="20" 
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Default Position Size</Label>
                <Input 
                  type="number" 
                  defaultValue="100" 
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Stop Loss (%)</Label>
                <Input 
                  type="number" 
                  defaultValue="5" 
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className={`h-5 w-5 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white">Display Name</Label>
                <Input 
                  defaultValue="Professional Trader" 
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Email</Label>
                <Input 
                  type="email" 
                  defaultValue="trader@example.com" 
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Trading Experience</Label>
                <select className="w-full p-2 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white">
                  <option>Professional (5+ years)</option>
                  <option>Intermediate (2-5 years)</option>
                  <option>Beginner (&lt; 2 years)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Timezone</Label>
                <select className="w-full p-2 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white">
                  <option>UTC-5 (Eastern)</option>
                  <option>UTC-8 (Pacific)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className={`h-5 w-5 mr-2 ${accentColor === 'mint' ? 'text-trading-mint' : 'text-purple-400'}`} />
              Data & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Auto-backup Data</Label>
                  <p className="text-gray-400 text-sm">Automatically backup trades to cloud</p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Analytics Collection</Label>
                  <p className="text-gray-400 text-sm">Help improve the platform</p>
                </div>
                <Switch checked={false} />
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20">
                Export All Data
              </Button>
              <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20 ml-4">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <Button 
            className={accentColor === 'mint' ? 
              'bg-gradient-mint hover:scale-105 transform transition-all duration-300 shadow-lg' :
              'bg-gradient-to-r from-purple-600 to-purple-700 hover:scale-105 transform transition-all duration-300 shadow-lg'
            }
          >
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
