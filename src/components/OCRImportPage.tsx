
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Upload, CheckCircle, AlertCircle, Zap } from 'lucide-react';

interface OCRImportPageProps {
  accentColor: 'mint' | 'purple';
}

interface ExtractedData {
  exchange: string;
  symbol: string;
  entryPrice: string;
  exitPrice: string;
  quantity: string;
  pnl: string;
  timestamp: string;
  leverage: string;
  fees: string;
}

const OCRImportPage: React.FC<OCRImportPageProps> = ({ accentColor }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateOCRProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateOCRProcessing = () => {
    setIsProcessing(true);
    // Simulate OCR processing time
    setTimeout(() => {
      setExtractedData({
        exchange: 'Binance',
        symbol: 'BTC/USDT',
        entryPrice: '42,350.50',
        exitPrice: '43,125.75',
        quantity: '0.5',
        pnl: '+387.63',
        timestamp: '2024-01-15 14:30:22',
        leverage: '3x',
        fees: '12.45'
      });
      setIsProcessing(false);
    }, 3000);
  };

  const handleDataEdit = (field: keyof ExtractedData, value: string) => {
    if (extractedData) {
      setExtractedData({
        ...extractedData,
        [field]: value
      });
    }
  };

  const handleImportTrade = () => {
    if (extractedData) {
      // Here you would normally integrate with your trade management system
      alert('Trade imported successfully to your trading journal!');
      setUploadedImage(null);
      setExtractedData(null);
      setIsEditing(false);
    }
  };

  return (
    <div className="ml-0 lg:ml-72 p-4 lg:p-8 min-h-screen trading-gradient">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <Camera className="h-8 w-8 text-trading-mint mr-4 animate-pulse" />
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white glow-text">OCR Trade Import</h1>
            <p className="text-gray-400">Upload exchange screenshots and automatically extract trade data</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      {!uploadedImage && (
        <Card className="trading-card border-trading-mint/40 hover:border-trading-mint/60 transition-all duration-300 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Upload className="h-6 w-6 mr-3 text-trading-mint" />
              Upload Trade Screenshot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div 
                className="border-2 border-dashed border-trading-mint/40 rounded-xl p-12 hover:border-trading-mint/60 transition-all duration-300 cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-16 w-16 text-trading-mint mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-white mb-2">Upload Screenshot</h3>
                <p className="text-gray-400 mb-4">
                  Supports screenshots from Binance, Coinbase, Kraken, and other major exchanges
                </p>
                <Button className="bg-gradient-to-r from-teal-600 via-trading-mint to-emerald-500 hover:scale-105 transition-transform duration-300">
                  <Upload className="h-5 w-5 mr-2" />
                  Choose File
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Section */}
      {uploadedImage && isProcessing && (
        <Card className="trading-card border-trading-mint/40 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-trading-mint"></div>
              <div className="text-white text-lg">Processing screenshot with OCR technology...</div>
            </div>
            <div className="mt-4 text-center text-gray-400">
              This may take a few seconds
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Image and Extracted Data */}
      {uploadedImage && !isProcessing && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Uploaded Image */}
          <Card className="trading-card border-trading-mint/30">
            <CardHeader>
              <CardTitle className="text-white">Uploaded Screenshot</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={uploadedImage} 
                alt="Uploaded trade screenshot" 
                className="w-full rounded-lg shadow-lg max-h-96 object-cover"
              />
              <Button 
                variant="outline" 
                onClick={() => {
                  setUploadedImage(null);
                  setExtractedData(null);
                  setIsEditing(false);
                }}
                className="mt-4 w-full border-trading-mint/30 text-white hover:bg-trading-mint/20"
              >
                Upload Different Image
              </Button>
            </CardContent>
          </Card>

          {/* Extracted Data */}
          {extractedData && (
            <Card className="trading-card border-trading-mint/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 mr-3 text-trading-mint" />
                    Extracted Trade Data
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-trading-mint/30 text-trading-mint hover:bg-trading-mint/20"
                  >
                    {isEditing ? 'Done' : 'Edit'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-gray-300">Exchange</Label>
                    {isEditing ? (
                      <Input
                        value={extractedData.exchange}
                        onChange={(e) => handleDataEdit('exchange', e.target.value)}
                        className="border-trading-mint/30 bg-trading-blue/50 text-white"
                      />
                    ) : (
                      <div className="text-white font-medium">{extractedData.exchange}</div>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">Symbol</Label>
                    {isEditing ? (
                      <Input
                        value={extractedData.symbol}
                        onChange={(e) => handleDataEdit('symbol', e.target.value)}
                        className="border-trading-mint/30 bg-trading-blue/50 text-white"
                      />
                    ) : (
                      <div className="text-white font-medium">{extractedData.symbol}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Entry Price</Label>
                      {isEditing ? (
                        <Input
                          value={extractedData.entryPrice}
                          onChange={(e) => handleDataEdit('entryPrice', e.target.value)}
                          className="border-trading-mint/30 bg-trading-blue/50 text-white"
                        />
                      ) : (
                        <div className="text-white font-medium">${extractedData.entryPrice}</div>
                      )}
                    </div>
                    <div>
                      <Label className="text-gray-300">Exit Price</Label>
                      {isEditing ? (
                        <Input
                          value={extractedData.exitPrice}
                          onChange={(e) => handleDataEdit('exitPrice', e.target.value)}
                          className="border-trading-mint/30 bg-trading-blue/50 text-white"
                        />
                      ) : (
                        <div className="text-white font-medium">${extractedData.exitPrice}</div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Quantity</Label>
                      {isEditing ? (
                        <Input
                          value={extractedData.quantity}
                          onChange={(e) => handleDataEdit('quantity', e.target.value)}
                          className="border-trading-mint/30 bg-trading-blue/50 text-white"
                        />
                      ) : (
                        <div className="text-white font-medium">{extractedData.quantity}</div>
                      )}
                    </div>
                    <div>
                      <Label className="text-gray-300">Leverage</Label>
                      {isEditing ? (
                        <Input
                          value={extractedData.leverage}
                          onChange={(e) => handleDataEdit('leverage', e.target.value)}
                          className="border-trading-mint/30 bg-trading-blue/50 text-white"
                        />
                      ) : (
                        <div className="text-white font-medium">{extractedData.leverage}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300">P&L</Label>
                    {isEditing ? (
                      <Input
                        value={extractedData.pnl}
                        onChange={(e) => handleDataEdit('pnl', e.target.value)}
                        className="border-trading-mint/30 bg-trading-blue/50 text-white"
                      />
                    ) : (
                      <div className={`font-bold text-lg ${extractedData.pnl.startsWith('+') ? 'text-trading-mint' : 'text-red-400'}`}>
                        ${extractedData.pnl}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">Timestamp</Label>
                    {isEditing ? (
                      <Input
                        value={extractedData.timestamp}
                        onChange={(e) => handleDataEdit('timestamp', e.target.value)}
                        className="border-trading-mint/30 bg-trading-blue/50 text-white"
                      />
                    ) : (
                      <div className="text-white font-medium">{extractedData.timestamp}</div>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">Fees</Label>
                    {isEditing ? (
                      <Input
                        value={extractedData.fees}
                        onChange={(e) => handleDataEdit('fees', e.target.value)}
                        className="border-trading-mint/30 bg-trading-blue/50 text-white"
                      />
                    ) : (
                      <div className="text-white font-medium">${extractedData.fees}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center p-4 bg-trading-mint/10 rounded-lg border border-trading-mint/30">
                  <AlertCircle className="h-5 w-5 text-trading-mint mr-3" />
                  <div className="text-sm text-gray-300">
                    Please verify the extracted data before importing to your journal
                  </div>
                </div>

                <Button 
                  onClick={handleImportTrade}
                  className="w-full bg-gradient-to-r from-teal-600 via-trading-mint to-emerald-500 hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Import Trade to Journal
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Instructions */}
      <Card className="trading-card border-trading-mint/30 mt-8">
        <CardHeader>
          <CardTitle className="text-white">How to Use OCR Import</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-trading-mint mb-3">Supported Exchanges</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Binance (Spot & Futures)</li>
                <li>• Coinbase Pro</li>
                <li>• Kraken</li>
                <li>• KuCoin</li>
                <li>• Bybit</li>
                <li>• BitMEX</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-trading-mint mb-3">Tips for Best Results</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Use high-resolution screenshots</li>
                <li>• Ensure text is clearly visible</li>
                <li>• Include complete trade information</li>
                <li>• Avoid cropping important details</li>
                <li>• Good lighting for mobile photos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OCRImportPage;
