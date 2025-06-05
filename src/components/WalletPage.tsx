
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Wallet, Plus, TrendingUp, TrendingDown, Eye, EyeOff, RefreshCw, DollarSign } from 'lucide-react';

interface WalletPageProps {
  accentColor: 'mint' | 'purple';
}

interface WalletAccount {
  id: string;
  name: string;
  exchange: string;
  balance: number;
  balanceUSD: number;
  change24h: number;
  isConnected: boolean;
}

const WalletPage: React.FC<WalletPageProps> = ({ accentColor }) => {
  const [wallets, setWallets] = useState<WalletAccount[]>([
    {
      id: '1',
      name: 'Trading Account',
      exchange: 'Binance',
      balance: 0.5432,
      balanceUSD: 23456.78,
      change24h: 5.67,
      isConnected: true
    },
    {
      id: '2',
      name: 'DeFi Wallet',
      exchange: 'MetaMask',
      balance: 12.3456,
      balanceUSD: 15678.90,
      change24h: -2.34,
      isConnected: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [hideBalances, setHideBalances] = useState(false);
  const [newWallet, setNewWallet] = useState({
    name: '',
    exchange: '',
    apiKey: '',
    secretKey: ''
  });

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balanceUSD, 0);
  const totalChange = wallets.reduce((sum, wallet) => sum + (wallet.balanceUSD * wallet.change24h / 100), 0);
  const totalChangePercent = totalBalance > 0 ? (totalChange / totalBalance) * 100 : 0;

  const handleAddWallet = () => {
    if (newWallet.name && newWallet.exchange) {
      const wallet: WalletAccount = {
        id: Date.now().toString(),
        name: newWallet.name,
        exchange: newWallet.exchange,
        balance: Math.random() * 10,
        balanceUSD: Math.random() * 50000,
        change24h: (Math.random() - 0.5) * 20,
        isConnected: true
      };
      setWallets(prev => [...prev, wallet]);
      setNewWallet({ name: '', exchange: '', apiKey: '', secretKey: '' });
      setShowAddForm(false);
    }
  };

  const handleRefreshWallets = () => {
    setWallets(prev => prev.map(wallet => ({
      ...wallet,
      balance: wallet.balance * (1 + (Math.random() - 0.5) * 0.1),
      balanceUSD: wallet.balanceUSD * (1 + (Math.random() - 0.5) * 0.1),
      change24h: (Math.random() - 0.5) * 20
    })));
  };

  const accentClass = accentColor === 'mint' ? 'bg-gradient-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Wallet Tracker</h1>
            <p className="text-gray-400">Monitor your trading wallets and portfolio balance</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => setHideBalances(!hideBalances)}
              variant="outline"
              className="border-trading-mint/40 hover:bg-trading-mint/20 text-white"
            >
              {hideBalances ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              {hideBalances ? 'Show' : 'Hide'} Balances
            </Button>
            <Button 
              onClick={handleRefreshWallets}
              variant="outline"
              className="border-trading-mint/40 hover:bg-trading-mint/20 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              onClick={() => setShowAddForm(true)}
              className={`${accentClass} hover:scale-105 transform transition-all duration-300 shadow-lg glow-effect`}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Wallet
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-trading-mint" />
                Total Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white glow-text">
                {hideBalances ? '****' : `$${totalBalance.toFixed(2)}`}
              </div>
              <div className={`text-sm mt-1 flex items-center ${totalChangePercent >= 0 ? 'text-trading-mint' : 'text-red-400'}`}>
                {totalChangePercent >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <Wallet className="h-4 w-4 mr-2 text-trading-mint" />
                Connected Wallets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white glow-text">
                {wallets.filter(w => w.isConnected).length}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Total: {wallets.length} wallets
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-trading-mint" />
                24h Change
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold glow-text ${totalChange >= 0 ? 'text-trading-mint' : 'text-red-400'}`}>
                {hideBalances ? '****' : `${totalChange >= 0 ? '+' : ''}$${totalChange.toFixed(2)}`}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Wallet Form */}
      {showAddForm && (
        <Card className="trading-card mb-8 border-trading-mint/30">
          <CardHeader>
            <CardTitle className="text-white">Connect New Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Wallet Name</Label>
                <Input
                  value={newWallet.name}
                  onChange={(e) => setNewWallet(prev => ({ ...prev, name: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="My Trading Wallet"
                />
              </div>
              <div>
                <Label className="text-gray-300">Exchange/Platform</Label>
                <select
                  value={newWallet.exchange}
                  onChange={(e) => setNewWallet(prev => ({ ...prev, exchange: e.target.value }))}
                  className="w-full p-2 rounded-md border border-trading-mint/30 bg-trading-blue/50 text-white"
                >
                  <option value="">Select Exchange</option>
                  <option value="Binance">Binance</option>
                  <option value="Coinbase">Coinbase</option>
                  <option value="MetaMask">MetaMask</option>
                  <option value="Kraken">Kraken</option>
                  <option value="Bybit">Bybit</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">API Key (Optional)</Label>
                <Input
                  type="password"
                  value={newWallet.apiKey}
                  onChange={(e) => setNewWallet(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="Your API Key"
                />
              </div>
              <div>
                <Label className="text-gray-300">Secret Key (Optional)</Label>
                <Input
                  type="password"
                  value={newWallet.secretKey}
                  onChange={(e) => setNewWallet(prev => ({ ...prev, secretKey: e.target.value }))}
                  className="border-trading-mint/30 bg-trading-blue/50 text-white"
                  placeholder="Your Secret Key"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleAddWallet} className={`flex-1 ${accentClass}`}>
                Connect Wallet
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1 border-trading-mint/30 text-white">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wallet List */}
      <div className="space-y-6">
        {wallets.map((wallet) => (
          <Card key={wallet.id} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-2 lg:space-y-0">
                <div>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-trading-mint" />
                    {wallet.name}
                  </CardTitle>
                  <div className="text-sm text-gray-400 mt-1">
                    {wallet.exchange} • {wallet.isConnected ? 'Connected' : 'Disconnected'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {hideBalances ? '****' : `$${wallet.balanceUSD.toFixed(2)}`}
                  </div>
                  <div className={`text-sm flex items-center justify-end ${wallet.change24h >= 0 ? 'text-trading-mint' : 'text-red-400'}`}>
                    {wallet.change24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {wallet.change24h >= 0 ? '+' : ''}{wallet.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Balance</div>
                  <div className="text-white font-medium">
                    {hideBalances ? '****' : `${wallet.balance.toFixed(4)} BTC`}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">24h Change</div>
                  <div className={`font-medium ${wallet.change24h >= 0 ? 'text-trading-mint' : 'text-red-400'}`}>
                    {hideBalances ? '****' : `${wallet.change24h >= 0 ? '+' : ''}$${(wallet.balanceUSD * wallet.change24h / 100).toFixed(2)}`}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Status</div>
                  <div className={`font-medium ${wallet.isConnected ? 'text-trading-mint' : 'text-red-400'}`}>
                    {wallet.isConnected ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Last Updated</div>
                  <div className="text-white font-medium text-xs">
                    Just now
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {wallets.length === 0 && (
          <Card className="trading-card">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">💼</div>
              <div className="text-xl text-gray-300 mb-2">No wallets connected</div>
              <div className="text-sm text-gray-400">Connect your first wallet to start tracking</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
