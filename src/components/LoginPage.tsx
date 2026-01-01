import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Droplets, Building2, Shield, User, Lock, Waves, Fish, Shell, Anchor, Phone, Hash, ArrowLeft, Navigation, Home, CheckCircle, Info, MapPin, X, ArrowRight, AlertCircle, Search } from 'lucide-react';
import { FloatingBubbles, WaterWaves, WaterParticles } from './WaterTheme';

interface LoginPageProps {
  onLogin: (role: 'citizen', userData: any) => void;
  onBackToLanding?: () => void;
}

export function LoginPage({ onLogin, onBackToLanding }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Citizen OTP states
  const [searchQuery, setSearchQuery] = useState(''); // Generic search field for name/mobile/consumer/property
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [showPropertySelection, setShowPropertySelection] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [userProperties, setUserProperties] = useState<Array<{propertyNumber: string, address: string, connectionCount: number}>>([]);

  // Mock data: Properties linked to mobile numbers
  const mobileToProperties: Record<string, Array<{propertyNumber: string, address: string, connectionCount: number}>> = {
    '9876543210': [
      { propertyNumber: 'A1-1', address: '123, MG Road, Zone A, Ward 5', connectionCount: 2 },
      { propertyNumber: 'B2-5', address: '456, Park Street, Zone B, Ward 8', connectionCount: 3 },
      { propertyNumber: 'C3-12', address: '789, Lake View, Zone A, Ward 5', connectionCount: 1 }
    ],
    '9876543211': [
      { propertyNumber: 'D1-8', address: '321, Green Valley, Zone C, Ward 12', connectionCount: 2 }
    ]
  };

  // Mock data: Connections per property
  const propertyToConnections: Record<string, any[]> = {
    'A1-1': [
      {
        consumerNumber: 'WC-2025-001',
        propertyNumber: 'A1-1',
        connectionCategory: 'Residential',
        connectionType: 'Metered',
        connectionSize: '15mm',
        billingFrequency: 'niyamit', // Quarterly
        meterType: 'meter',
        hasDueBills: true,
        dueAmount: 1850,
        lastMeterReading: 1250,
        currentMeterReading: 1320
      },
      {
        consumerNumber: 'WC-2025-002',
        propertyNumber: 'A1-1',
        connectionCategory: 'Residential',
        connectionType: 'Metered',
        connectionSize: '20mm',
        billingFrequency: 'niyamit', // Quarterly
        meterType: 'meter',
        hasDueBills: true,
        dueAmount: 1200,
        lastMeterReading: 890,
        currentMeterReading: 945
      }
    ],
    'B2-5': [
      {
        consumerNumber: 'WC-2025-003',
        propertyNumber: 'B2-5',
        connectionCategory: 'Commercial',
        connectionType: 'Metered',
        connectionSize: '25mm',
        billingFrequency: 'niyamit', // Quarterly
        meterType: 'meter',
        hasDueBills: true,
        dueAmount: 3250,
        lastMeterReading: 4500,
        currentMeterReading: 4850
      },
      {
        consumerNumber: 'WC-2025-004',
        propertyNumber: 'B2-5',
        connectionCategory: 'Commercial',
        connectionType: 'Non-Metered',
        connectionSize: '20mm',
        billingFrequency: 'vaarshik', // Annual
        meterType: 'non-meter',
        hasDueBills: false,
        dueAmount: 0,
        fixedRate: 5000 // Annual fixed amount
      },
      {
        consumerNumber: 'WC-2025-005',
        propertyNumber: 'B2-5',
        connectionCategory: 'Commercial',
        connectionType: 'Metered',
        connectionSize: '15mm',
        billingFrequency: 'niyamit', // Quarterly
        meterType: 'meter',
        hasDueBills: true,
        dueAmount: 980,
        lastMeterReading: 670,
        currentMeterReading: 720
      }
    ],
    'C3-12': [
      {
        consumerNumber: 'WC-2025-006',
        propertyNumber: 'C3-12',
        connectionCategory: 'Residential',
        connectionType: 'Non-Metered',
        connectionSize: '15mm',
        billingFrequency: 'vaarshik', // Annual
        meterType: 'non-meter',
        hasDueBills: true,
        dueAmount: 1420,
        fixedRate: 1500 // Annual fixed amount
      }
    ],
    'D1-8': [
      {
        consumerNumber: 'WC-2025-007',
        propertyNumber: 'D1-8',
        connectionCategory: 'Industrial',
        connectionType: 'Metered',
        connectionSize: '40mm',
        billingFrequency: 'niyamit', // Quarterly
        meterType: 'meter',
        hasDueBills: true,
        dueAmount: 5600,
        lastMeterReading: 8900,
        currentMeterReading: 9450
      },
      {
        consumerNumber: 'WC-2025-008',
        propertyNumber: 'D1-8',
        connectionCategory: 'Industrial',
        connectionType: 'Metered',
        connectionSize: '25mm',
        billingFrequency: 'niyamit', // Quarterly
        meterType: 'meter',
        hasDueBills: false,
        dueAmount: 0,
        lastMeterReading: 3400,
        currentMeterReading: 3550
      }
    ]
  };

  const handleLogin = (role: 'citizen') => {
    // Different user data based on login method for citizens
    let citizenData;
    
    if (role === 'citizen') {
      if (searchQuery) {
        // Search query login: Must select property first
        const lookupMobile = searchQuery || '9876543210';
        const userProperties = mobileToProperties[lookupMobile] || mobileToProperties['9876543210'];
        const selectedProp = selectedProperty || userProperties[0].propertyNumber;
        const connections = propertyToConnections[selectedProp] || [];
        
        citizenData = {
          id: 1,
          name: 'Rajesh Kumar',
          mobile: lookupMobile,
          loginType: 'mobile',
          selectedProperty: selectedProp,
          allProperties: userProperties,
          connections: connections,
          propertyNumber: selectedProp
        };
      } else {
        // Consumer ID login: Find the connection by consumer ID
        const lookupConsumerId = searchQuery || 'WC-2025-007';
        
        // Find the connection across all properties
        let foundConnection = null;
        let foundPropertyNumber = null;
        
        for (const [propNum, connections] of Object.entries(propertyToConnections)) {
          const connection = connections.find(conn => conn.consumerNumber === lookupConsumerId);
          if (connection) {
            foundConnection = connection;
            foundPropertyNumber = propNum;
            break;
          }
        }
        
        // If not found, use default
        if (!foundConnection) {
          foundConnection = {
            consumerNumber: lookupConsumerId,
            propertyNumber: 'D1-8',
            connectionCategory: 'Industrial',
            connectionType: 'Metered',
            connectionSize: '40mm',
            hasDueBills: true,
            dueAmount: 5600
          };
          foundPropertyNumber = 'D1-8';
        }
        
        // Get all connections for this property (for My Connections page)
        const allPropertyConnections = propertyToConnections[foundPropertyNumber] || [foundConnection];
        
        // Consumer ID login: User's primary connection is the one they logged in with
        // But they can see all connections for that property in My Connections section
        citizenData = {
          id: 2,
          name: 'Priya Deshmukh',
          mobile: '9876543211',
          loginType: 'consumer',
          consumerId: lookupConsumerId,
          propertyNumber: foundPropertyNumber,
          primaryConnection: foundConnection,  // The connection they logged in with
          connections: allPropertyConnections  // All connections for the property (for My Connections page)
        };
      }
    }
    
    const mockUsers = {
      citizen: citizenData,
      officer: { id: 2, name: 'Priya Sharma', designation: 'Water Tax Officer', ward: 'Ward 5' },
      admin: { id: 3, name: 'Admin User', department: 'IT Department' },
      fieldOfficer: { id: 4, name: 'Arun Mehta', designation: 'Field Officer', zone: 'Zone 2', mobile: '9876543220' }
    };
    onLogin(role, mockUsers[role]);
  };

  const handleSendOTP = () => {
    // Simulate OTP sending - don't check for multiple properties yet
    setOtpSent(true);
    setOtpTimer(60);
    
    // Start countdown
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOTP = () => {
    // In production, verify OTP from backend
    if (otp.every(digit => digit !== '')) {
      // After OTP verification, check if user has multiple properties
      const lookupMobile = searchQuery || '9876543210';
      const userProperties = mobileToProperties[lookupMobile] || mobileToProperties['9876543210'];
      
      if (userProperties && userProperties.length > 1) {
        // Show property selection dialog AFTER OTP verification
        setShowPropertySelection(true);
        setUserProperties(userProperties);
      } else if (userProperties && userProperties.length === 1) {
        // Auto-select single property and login
        setSelectedProperty(userProperties[0].propertyNumber);
        handleLogin('citizen');
      } else {
        // No properties found or other login type, proceed to login
        handleLogin('citizen');
      }
    }
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '', '', '']);
    handleSendOTP();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`login-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`login-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Marine/aquatic decorative elements
  const marineElements = [
    { icon: Fish, color: 'text-cyan-300', rotation: 15, x: '10%', y: '15%' },
    { icon: Shell, color: 'text-blue-300', rotation: -20, x: '85%', y: '20%' },
    { icon: Waves, color: 'text-teal-300', rotation: 0, x: '15%', y: '75%' },
    { icon: Anchor, color: 'text-indigo-300', rotation: 25, x: '80%', y: '70%' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Beautiful Background Image with Blur */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1758532843609-43d98fa8c23f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRleHR1cmUlMjBibHVlJTIwc2VyZW5lfGVufDF8fHx8MTc2Mzk3MDAxOXww&ixlib=rb-4.1.0&q=80&w=1080)'
          }}
        />
        {/* Blur and color overlays */}
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-blue-600/30 via-cyan-600/30 to-teal-600/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-cyan-800/80 to-teal-700/80" />
      </div>
      
      {/* Animated water elements */}
      <div className="fixed inset-0 opacity-15 pointer-events-none z-0">
        <FloatingBubbles count={12} />
        <WaterParticles />
      </div>

      {/* Decorative marine elements */}
      {marineElements.map((elem, index) => (
        <motion.div
          key={index}
          className={`absolute ${elem.color} opacity-20`}
          style={{
            left: elem.x,
            top: elem.y,
            rotate: elem.rotation
          }}
          animate={{
            y: [0, 20, 0],
            rotate: [elem.rotation, elem.rotation + 10, elem.rotation],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <elem.icon className="w-16 h-16" />
        </motion.div>
      ))}

      {/* Main login container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Back to Landing button */}
          {onBackToLanding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <Button
                variant="ghost"
                onClick={onBackToLanding}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </motion.div>
          )}

          {/* Glass morphism card with water effect */}
          <div className="relative">
            <Card className="p-8 shadow-2xl bg-white/10 backdrop-blur-2xl border border-white/20 relative overflow-hidden">
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
              
              <div className="text-center mb-8 relative">
                {/* Animated water drop logo */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="inline-block relative mb-6"
                >
                  <div className="relative w-28 h-28">
                    {/* Pulsing glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                    
                    {/* Main droplet */}
                    <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl">
                      <Droplets className="w-14 h-14 text-white" />
                      
                      {/* Glass shine effect */}
                      <div className="absolute inset-2 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
                      
                      {/* Ripple effect */}
                      <motion.div
                        className="absolute inset-0 border-4 border-cyan-300 rounded-full"
                        animate={{
                          scale: [1, 1.5],
                          opacity: [0.8, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl text-white mb-2 drop-shadow-lg"
                >
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent">
                    Water Tax Management
                  </span>
                </motion.h1>
                <p className="text-cyan-100 text-lg drop-shadow">Municipal Corporation Portal</p>
                
                {/* Status badges with water theme */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <motion.span 
                    className="px-3 py-1 bg-gradient-to-r from-green-400/30 to-emerald-400/30 backdrop-blur-sm text-green-100 rounded-full text-xs border border-green-300/30"
                    animate={{
                      boxShadow: ['0 0 10px rgba(34, 197, 94, 0.3)', '0 0 20px rgba(34, 197, 94, 0.5)', '0 0 10px rgba(34, 197, 94, 0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌊 System Online
                  </motion.span>
                  <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-100 rounded-full text-xs border border-blue-300/30">
                    v2.0 Aqua
                  </span>
                </div>
              </div>

              <Tabs defaultValue="citizen" className="w-full">
                <TabsList className="grid w-full grid-cols-1 mb-6 bg-white/5 backdrop-blur-md border border-white/10">
                  <TabsTrigger 
                    value="citizen" 
                    className="text-sm text-white/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Citizen Login
                  </TabsTrigger>
                </TabsList>

                {/* Citizen Login with OTP */}
                <TabsContent value="citizen">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {!otpSent ? (
                      <>
                        <div className="relative">
                          <label className="block text-sm mb-2 text-cyan-100 font-medium">Search by Name/Mobile/Consumer No/Property No</label>
                          <div className="relative group">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-300 group-focus-within:text-cyan-200 transition-colors" />
                            <Input
                              type="text"
                              placeholder="Enter search query"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-cyan-400 backdrop-blur-sm transition-all"
                            />
                          </div>
                          <p className="text-xs text-cyan-200/70 mt-2">
                            🔍 Enter your registered details
                          </p>
                        </div>

                        <Button
                          onClick={handleSendOTP}
                          disabled={!searchQuery}
                          className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-400 hover:via-blue-400 hover:to-teal-400 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-0 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Waves className="w-4 h-4 mr-2" />
                          Send OTP
                        </Button>
                        <p className="text-xs text-center text-cyan-200/70 mt-2">
                          🔐 Secure OTP-based authentication
                        </p>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4"
                      >
                        <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 mb-4">
                          <p className="text-green-100 text-sm text-center">
                            ✅ OTP sent successfully to {searchQuery}
                          </p>
                        </div>

                        <div className="relative">
                          <label className="block text-sm mb-3 text-cyan-100 font-medium text-center">Enter OTP</label>
                          
                          {/* 6 Separate OTP Input Boxes */}
                          <div className="flex gap-3 justify-center mb-4">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Input
                                  id={`login-otp-${index}`}
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={1}
                                  value={otp[index]}
                                  onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                  onFocus={(e) => e.target.select()}
                                  className="w-12 h-14 text-center text-2xl bg-white/15 border-2 border-white/30 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-cyan-400 backdrop-blur-sm transition-all rounded-lg font-semibold focus:ring-2 focus:ring-cyan-400/50 focus:scale-110"
                                  placeholder="•"
                                />
                              </motion.div>
                            ))}
                          </div>
                          
                          {otpTimer > 0 ? (
                            <p className="text-xs text-cyan-200/70 mt-2 text-center">
                              ⏱️ Resend OTP in {otpTimer}s
                            </p>
                          ) : (
                            <button
                              onClick={handleResendOTP}
                              className="text-xs text-cyan-200 mt-2 hover:text-white transition-colors w-full text-center underline"
                            >
                              Resend OTP
                            </button>
                          )}
                        </div>

                        <Button
                          onClick={handleVerifyOTP}
                          disabled={otp.some(digit => digit === '')}
                          className="w-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-500 hover:from-green-400 hover:via-teal-400 hover:to-emerald-400 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Waves className="w-4 h-4 mr-2" />
                          Verify & Login
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={() => {
                            setOtpSent(false);
                            setOtp(['', '', '', '', '', '']);
                            setOtpTimer(0);
                          }}
                          className="w-full text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Change Search Query
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex justify-between text-xs text-cyan-100">
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    Need Help?
                  </a>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                    <Waves className="w-3 h-3" />
                    Register New
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 text-white/80 text-sm"
          >
            <p className="flex items-center justify-center gap-2 drop-shadow">
              <Shield className="w-4 h-4" />
              © 2025 Municipal Corporation. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Property Selection Dialog */}
      <Dialog open={showPropertySelection} onOpenChange={setShowPropertySelection}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 border-2 border-cyan-200 shadow-2xl overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -20, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative z-10">
            <DialogHeader>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 flex items-center justify-center shadow-xl relative overflow-hidden"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <Home className="w-7 h-7 text-white relative z-10" />
                  </motion.div>
                  <div>
                    <div className="text-gray-900">Select Property</div>
                    <motion.div 
                      className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full mt-1"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </DialogTitle>
              </motion.div>
              <DialogDescription asChild>
                <div className="text-gray-700 mt-3 text-sm bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-cyan-200">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Multiple properties are linked to mobile number <span className="font-semibold text-gray-900">{searchQuery}</span>. Please select a property to continue.
                    </span>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {userProperties.map((property, index) => (
                <motion.div
                  key={property.propertyNumber}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    className={`p-4 cursor-pointer border-2 transition-all duration-300 relative overflow-hidden ${
                      selectedProperty === property.propertyNumber
                        ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg shadow-cyan-200/50'
                        : 'border-gray-200 bg-white/80 backdrop-blur-sm'
                    }`}
                    onClick={() => setSelectedProperty(property.propertyNumber)}
                  >
                    {/* Selection glow effect */}
                    {selectedProperty === property.propertyNumber && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-teal-400/20"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex items-start gap-3 flex-1">
                        <div 
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md relative overflow-hidden ${
                            selectedProperty === property.propertyNumber
                              ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                              : 'bg-gradient-to-br from-blue-100 to-cyan-100'
                          }`}
                        >
                          {selectedProperty === property.propertyNumber && (
                            <motion.div
                              className="absolute inset-0 bg-white"
                              initial={{ scale: 0, opacity: 0.5 }}
                              animate={{ scale: 2, opacity: 0 }}
                              transition={{ duration: 0.6 }}
                            />
                          )}
                          <Home className={`w-6 h-6 ${
                            selectedProperty === property.propertyNumber ? 'text-white' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-base mb-1 ${
                            selectedProperty === property.propertyNumber 
                              ? 'text-cyan-900' 
                              : 'text-gray-900'
                          }`}>
                            Property {property.propertyNumber}
                          </h3>
                          <div className="flex items-start gap-1.5 mb-2">
                            <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-600">{property.address}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs px-2 py-0.5 ${
                              selectedProperty === property.propertyNumber
                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              <Droplets className="w-3 h-3 mr-1" />
                              {property.connectionCount} {property.connectionCount === 1 ? 'Connection' : 'Connections'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <AnimatePresence>
                        {selectedProperty === property.propertyNumber && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex gap-3 pt-4 border-t-2 border-cyan-200 bg-white/40 backdrop-blur-sm rounded-lg p-3 -m-3 mt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                className="flex-1 border-2 border-gray-300 transition-all"
                onClick={() => {
                  setShowPropertySelection(false);
                  setSelectedProperty(null);
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                className={`flex-1 transition-all duration-300 ${
                  selectedProperty 
                    ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 shadow-lg shadow-cyan-300/50' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!selectedProperty}
                onClick={() => {
                  setShowPropertySelection(false);
                  // Proceed to login with selected property
                  handleLogin('citizen');
                }}
              >
                {selectedProperty ? (
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                    Continue with Property {selectedProperty}
                  </motion.div>
                ) : (
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Select a Property
                  </span>
                )}
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}