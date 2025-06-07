import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Wallet, Plus, TrendingUp, TrendingDown, Eye, EyeOff, RefreshCw, DollarSign, Search, Link, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletPageProps {
  accentColor: 'mint' | 'purple';
}

interface SolanaWallet {
  id: string;
  address: string;
  nickname: string;
  balance: number;
  balanceUSD: number;
  tokens: SolanaToken[];
  pnl24h: number;
  pnl7d: number;
  pnl30d: number;
  lastUpdated: Date;
}

interface SolanaToken {
  symbol: string;
  name: string;
  amount: number;
  valueUSD: number;
  change24h: number;
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
  const { toast } = useToast();
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

  const [solanaWallets, setSolanaWallets] = useState<SolanaWallet[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSolanaForm, setShowSolanaForm] = useState(false);
  const [hideBalances, setHideBalances] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [newWallet, setNewWallet] = useState({
    name: '',
    exchange: '',
    apiKey: '',
    secretKey: ''
  });

  const [newSolanaWallet, setNewSolanaWallet] = useState({
    address: '',
    nickname: ''
  });

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balanceUSD, 0) + 
                     solanaWallets.reduce((sum, wallet) => sum + wallet.balanceUSD, 0);

  const totalChange = wallets.reduce((sum, wallet) => sum + (wallet.balanceUSD * wallet.change24h / 100), 0) +
                     solanaWallets.reduce((sum, wallet) => sum + wallet.pnl24h, 0);

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
      toast({
        title: "Wallet Added",
        description: "Your wallet has been successfully connected."
      });
    }
  };

  const handleAddSolanaWallet = async () => {
    if (!newSolanaWallet.address) {
      toast({
        title: "Error",
        description: "Please enter a valid Solana address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to fetch Solana wallet data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data - in real app, this would come from Solana RPC
      const mockTokens: SolanaToken[] = [
        { symbol: 'SOL', name: 'Solana', amount: 15.5, valueUSD: 1550, change24h: 3.5 },
        { symbol: 'USDC', name: 'USD Coin', amount: 2000, valueUSD: 2000, change24h: 0.1 },
        { symbol: 'RAY', name: 'Raydium', amount: 1000, valueUSD: 450, change24h: -2.1 }
      ];

      const wallet: SolanaWallet = {
        id: Date.now().toString(),
        address: newSolanaWallet.address,
        nickname: newSolanaWallet.nickname || `Wallet ${solanaWallets.length + 1}`,
        balance: 15.5,
        balanceUSD: 4000,
        tokens: mockTokens,
        pnl24h: 125.50,
        pnl7d: -89.30,
        pnl30d: 456.78,
        lastUpdated: new Date()
      };

      setSolanaWallets(prev => [...prev, wallet]);
      setNewSolanaWallet({ address: '', nickname: '' });
      setShowSolanaForm(false);
      
      toast({
        title: "Solana Wallet Added",
        description: "Successfully connected and retrieved wallet data."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch wallet data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Address copied to clipboard"
    });
  };

  const accentClass = accentColor === 'mint' ? 'bg-gradient-mint' : 'bg-gradient-to-r from-purple-600 to-purple-700';

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 glow-text">Wallet Tracker</h1>
            <p className="text-gray-400">Monitor your trading wallets and Solana addresses</p>
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
              onClick={() => setShowSolanaForm(true)}
              variant="outline"
              className="border-trading-mint/40 hover:bg-trading-mint/20 text-white"
            >
              <Link className="h-4 w-4 mr-2" />
              Add Solana
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
                {wallets.length + solanaWallets.length}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {solanaWallets.length} Solana • {wallets.length} Exchange
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

      {/* Add Solana Wallet Form */}
      {showSolanaForm && (
        <Card className="trading-card mb-8 border-trading-mint/30">
          <CardHeader>
            <CardTitle className="text-white">Connect Solana Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Solana Address</Label>
              <Input
                value={newSolanaWallet.address}
                onChange={(e) => setNewSolanaWallet(prev => ({ ...prev, address: e.target.value }))}
                className="border-trading-mint/30 bg-trading-blue/50 text-white"
                placeholder="Enter Solana wallet address..."
              />
            </div>
            <div>
              <Label className="text-gray-300">Nickname (Optional)</Label>
              <Input
                value={newSolanaWallet.nickname}
                onChange={(e) => setNewSolanaWallet(prev => ({ ...prev, nickname: e.target.value }))}
                className="border-trading-mint/30 bg-trading-blue/50 text-white"
                placeholder="My DeFi Wallet"
              />
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={handleAddSolanaWallet} 
                disabled={isLoading}
                className={`flex-1 ${accentClass}`}
              >
                {isLoading ? 'Fetching Data...' : 'Connect Wallet'}
              </Button>
              <Button variant="outline" onClick={() => setShowSolanaForm(false)} className="flex-1 border-trading-mint/30 text-white">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Solana Wallets */}
      {solanaWallets.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Solana Wallets</h2>
          <div className="space-y-6">
            {solanaWallets.map((wallet) => (
              <Card key={wallet.id} className="trading-card border-trading-mint/30 hover:border-trading-mint/50 transition-all duration-300 glow-hover">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-2 lg:space-y-0">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg flex items-center">
                        <Wallet className="h-5 w-5 mr-2 text-trading-mint" />
                        {wallet.nickname}
                      </CardTitle>
                      <div className="text-sm text-gray-400 mt-1 flex items-center">
                        <span className="mr-2">{wallet.address.slice(0, 8)}...{wallet.address.slice(-8)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(wallet.address)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {hideBalances ? '****' : `$${wallet.balanceUSD.toFixed(2)}`}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge className={wallet.pnl24h >= 0 ? 'bg-green-600' : 'bg-red-600'}>
                          24h: {wallet.pnl24h >= 0 ? '+' : ''}${wallet.pnl24h.toFixed(2)}
                        </Badge>
                        <Badge className={wallet.pnl7d >= 0 ? 'bg-green-600' : 'bg-red-600'}>
                          7d: {wallet.pnl7d >= 0 ? '+' : ''}${wallet.pnl7d.toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2">Token Holdings</h4>
                      <div className="space-y-2">
                        {wallet.tokens.map((token, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-trading-blue/20 rounded">
                            <div>
                              <div className="text-white font-medium">{token.symbol}</div>
                              <div className="text-xs text-gray-400">{token.name}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white">{hideBalances ? '****' : token.amount.toFixed(2)}</div>
                              <div className={`text-xs ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Wallets */}
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
