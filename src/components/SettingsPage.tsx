
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings, Palette, Bell, Shield, Database, Globe, Moon, Sun, Smartphone } from 'lucide-react';
import { gsap } from 'gsap';

interface SettingsPageProps {
  accentColor: 'mint' | 'purple';
  onAccentColorChange: (color: 'mint' | 'purple') => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ accentColor, onAccentColorChange }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    soundEnabled: true,
    autoSave: true,
    privateMode: false,
    twoFactorAuth: false,
    dataSync: true,
    language: 'en',
    currency: 'USD',
    timezone: 'UTC',
    chartInterval: '1h',
    riskWarnings: true
  });

  useEffect(() => {
    if (pageRef.current) {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    if (cardsRef.current?.children) {
      gsap.from(cardsRef.current.children, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3
      });
    }
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div ref={pageRef} className="p-4 lg:p-8 ml-0 lg:ml-72 min-h-screen trading-gradient">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Settings</h1>
        <p className="text-gray-400 text-sm lg:text-base">Customize your trading platform experience</p>
      </div>

      <div ref={cardsRef} className="space-y-6 lg:space-y-8 max-w-4xl">
        {/* Appearance Settings */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Palette className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-trading-mint" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-4 lg:space-y-6">
            <div className="space-y-3 lg:space-y-4">
              <div>
                <Label className="text-white text-sm lg:text-base">Accent Color</Label>
                <div className="flex space-x-3 lg:space-x-4 mt-2">
                  <Button
                    variant={accentColor === 'mint' ? 'default' : 'outline'}
                    onClick={() => onAccentColorChange('mint')}
                    className={`${accentColor === 'mint' ? 'bg-trading-mint' : 'border-trading-mint/30'} text-white`}
                  >
                    Mint Green
                  </Button>
                  <Button
                    variant={accentColor === 'purple' ? 'default' : 'outline'}
                    onClick={() => onAccentColorChange('purple')}
                    className={`${accentColor === 'purple' ? 'bg-purple-600' : 'border-purple-500/30'} text-white`}
                  >
                    Purple
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
                <div>
                  <Label className="text-white text-sm lg:text-base">Theme</Label>
                  <p className="text-xs lg:text-sm text-gray-400 mt-1">Choose your preferred theme</p>
                </div>
                <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                  <SelectTrigger className="w-full lg:w-40 border-trading-mint/30 bg-trading-blue/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Bell className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-trading-mint" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-4 lg:space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div>
                <Label className="text-white text-sm lg:text-base">Push Notifications</Label>
                <p className="text-xs lg:text-sm text-gray-400 mt-1">Receive trading alerts and updates</p>
              </div>
              <Switch 
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div>
                <Label className="text-white text-sm lg:text-base">Sound Effects</Label>
                <p className="text-xs lg:text-sm text-gray-400 mt-1">Play sounds for important events</p>
              </div>
              <Switch 
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div>
                <Label className="text-white text-sm lg:text-base">Risk Warnings</Label>
                <p className="text-xs lg:text-sm text-gray-400 mt-1">Show risk alerts for high-leverage trades</p>
              </div>
              <Switch 
                checked={settings.riskWarnings}
                onCheckedChange={(checked) => handleSettingChange('riskWarnings', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Shield className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-trading-mint" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-4 lg:space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div>
                <Label className="text-white text-sm lg:text-base">Two-Factor Authentication</Label>
                <p className="text-xs lg:text-sm text-gray-400 mt-1">Add an extra layer of security</p>
              </div>
              <div className="flex items-center space-x-2">
                {settings.twoFactorAuth && <Badge variant="default" className="bg-green-600">Enabled</Badge>}
                <Switch 
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                />
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div>
                <Label className="text-white text-sm lg:text-base">Private Mode</Label>
                <p className="text-xs lg:text-sm text-gray-400 mt-1">Hide sensitive information</p>
              </div>
              <Switch 
                checked={settings.privateMode}
                onCheckedChange={(checked) => handleSettingChange('privateMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data & Storage */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Database className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-trading-mint" />
              Data & Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-4 lg:space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div>
                <Label className="text-white text-sm lg:text-base">Auto-Save</Label>
                <p className="text-xs lg:text-sm text-gray-400 mt-1">Automatically save your work</p>
              </div>
              <Switch 
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div>
                <Label className="text-white text-sm lg:text-base">Cloud Sync</Label>
                <p className="text-xs lg:text-sm text-gray-400 mt-1">Sync data across devices</p>
              </div>
              <Switch 
                checked={settings.dataSync}
                onCheckedChange={(checked) => handleSettingChange('dataSync', checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-3">
              <Button variant="outline" className="w-full border-blue-500/30 text-white hover:bg-blue-500/20">
                Export Data
              </Button>
              <Button variant="outline" className="w-full border-yellow-500/30 text-white hover:bg-yellow-500/20">
                Import Data
              </Button>
              <Button variant="outline" className="w-full border-red-500/30 text-white hover:bg-red-500/20">
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Globe className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-trading-mint" />
              Regional Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <Label className="text-white text-sm lg:text-base">Language</Label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white text-sm lg:text-base">Currency</Label>
                <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white text-sm lg:text-base">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">EST</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                    <SelectItem value="JST">JST</SelectItem>
                    <SelectItem value="CET">CET</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white text-sm lg:text-base">Chart Interval</Label>
                <Select value={settings.chartInterval} onValueChange={(value) => handleSettingChange('chartInterval', value)}>
                  <SelectTrigger className="border-trading-mint/30 bg-trading-blue/50 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 Minute</SelectItem>
                    <SelectItem value="5m">5 Minutes</SelectItem>
                    <SelectItem value="15m">15 Minutes</SelectItem>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="4h">4 Hours</SelectItem>
                    <SelectItem value="1d">1 Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="trading-card">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-white text-lg lg:text-xl flex items-center">
              <Settings className="h-5 w-5 lg:h-6 lg:w-6 mr-3 text-trading-mint" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Version</span>
              <Badge variant="outline" className="border-trading-mint/30 text-white">v2.1.0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Build</span>
              <span className="text-white text-sm lg:text-base">20241206</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm lg:text-base">Platform</span>
              <span className="text-white text-sm lg:text-base">Web</span>
            </div>
            <Separator className="bg-gray-700" />
            <div className="space-y-2">
              <Button variant="outline" className="w-full border-trading-mint/30 text-white hover:bg-trading-mint/20">
                Check for Updates
              </Button>
              <Button variant="outline" className="w-full border-trading-mint/30 text-white hover:bg-trading-mint/20">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
