import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Search, Download, Eye, MapPin, Droplets, Activity, TrendingUp, TrendingDown, Home, Filter, Camera, FileText, CreditCard, CheckCircle, AlertTriangle, Share2, Bell, Calendar, Zap, X, Wallet, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';

interface MyConnectionsProps {
  user: any;
}

export function MyConnections({ user }: MyConnectionsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [paymentConnection, setPaymentConnection] = useState<any>(null);
  const [paidConnection, setPaidConnection] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Get connections from user data (filtered by selected property)
  const userConnections = user?.connections || [];
  const selectedPropertyNumber = user?.propertyNumber || user?.selectedProperty;

  // Mock connection details for all properties - this data would come from backend
  const allConnectionDetails = [
    // Property A1-1 connections
    {
      id: 'WC-2025-001',
      propertyId: 'A1-1',
      address: '123, MG Road, Zone A, Ward 5',
      type: 'Residential',
      size: '15mm',
      status: 'Active',
      activatedDate: 'Jan 15, 2024',
      meterNumber: 'MTR-45678',
      meterPhoto: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=150&fit=crop',
      currentReading: 1245,
      lastReading: 1200,
      consumption: 45,
      avgConsumption: 42,
      billAmount: 1275,
      dueDate: 'Dec 30, 2025',
      tariff: '₹25/KL',
      lastPayment: 'Nov 28, 2025',
      healthScore: 95,
      alerts: ['Due in 2 days'],
      connectionPhoto: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop',
      billingFrequency: 'niyamit',
      meterType: 'meter'
    },
    {
      id: 'WC-2025-002',
      propertyId: 'A1-1',
      address: '123, MG Road, Zone A, Ward 5 - Shop Area',
      type: 'Residential',
      size: '20mm',
      status: 'Active',
      activatedDate: 'Mar 20, 2024',
      meterNumber: 'MTR-78901',
      meterPhoto: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&h=150&fit=crop',
      currentReading: 890,
      lastReading: 856,
      consumption: 34,
      avgConsumption: 38,
      billAmount: 982,
      dueDate: 'Jan 05, 2026',
      tariff: '₹25/KL',
      lastPayment: 'Oct 30, 2025',
      healthScore: 88,
      alerts: [],
      connectionPhoto: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop',
      billingFrequency: 'niyamit',
      meterType: 'meter'
    },
    // Property B2-5 connections
    {
      id: 'WC-2025-003',
      propertyId: 'B2-5',
      address: '456, Park Street, Zone B, Ward 8',
      type: 'Commercial',
      size: '25mm',
      status: 'Active',
      activatedDate: 'Jun 10, 2024',
      meterNumber: 'MTR-23456',
      meterPhoto: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=200&h=150&fit=crop',
      currentReading: 2340,
      lastReading: 2280,
      consumption: 60,
      avgConsumption: 55,
      billAmount: 2772,
      dueDate: 'Dec 28, 2025',
      tariff: '₹40/KL',
      lastPayment: 'Nov 26, 2025',
      healthScore: 92,
      alerts: ['High Usage'],
      connectionPhoto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop',
      billingFrequency: 'niyamit',
      meterType: 'meter'
    },
    {
      id: 'WC-2025-004',
      propertyId: 'B2-5',
      address: '456, Park Street, Zone B, Ward 8 - Unit 2',
      type: 'Commercial',
      size: '20mm',
      status: 'Active',
      activatedDate: 'Aug 05, 2024',
      meterNumber: 'N/A - Fixed Rate',
      meterPhoto: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=200&h=150&fit=crop',
      currentReading: 0,
      lastReading: 0,
      consumption: 0,
      avgConsumption: 0,
      billAmount: 0,
      dueDate: 'Jan 10, 2026',
      tariff: '₹5000/Year',
      billingFrequency: 'vaarshik',
      meterType: 'non-meter',
      fixedRate: 5000,
      lastPayment: 'Nov 23, 2025',
      healthScore: 90,
      alerts: [],
      connectionPhoto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop'
    },
    {
      id: 'WC-2025-005',
      propertyId: 'B2-5',
      address: '456, Park Street, Zone B, Ward 8 - Unit 3',
      type: 'Commercial',
      size: '15mm',
      status: 'Active',
      activatedDate: 'Sep 12, 2024',
      meterNumber: 'MTR-34567',
      meterPhoto: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=150&fit=crop',
      currentReading: 650,
      lastReading: 620,
      consumption: 30,
      avgConsumption: 32,
      billAmount: 1040,
      dueDate: 'Dec 31, 2025',
      tariff: '₹30/KL',
      lastPayment: 'Nov 20, 2025',
      healthScore: 94,
      alerts: [],
      connectionPhoto: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop',
      billingFrequency: 'niyamit',
      meterType: 'meter'
    },
    // Property C3-12 connection
    {
      id: 'WC-2025-006',
      propertyId: 'C3-12',
      address: '789, Lake View, Zone A, Ward 5',
      type: 'Residential',
      size: '15mm',
      status: 'Active',
      activatedDate: 'Feb 10, 2024',
      meterNumber: 'N/A - Fixed Rate',
      meterPhoto: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&h=150&fit=crop',
      currentReading: 0,
      lastReading: 0,
      consumption: 0,
      avgConsumption: 0,
      billAmount: 866,
      dueDate: 'Jan 02, 2026',
      tariff: '₹1500/Year',
      lastPayment: 'Nov 28, 2025',
      healthScore: 96,
      alerts: [],
      connectionPhoto: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop',
      billingFrequency: 'vaarshik',
      meterType: 'non-meter',
      fixedRate: 1500
    },
    // Property D1-8 connections (Consumer ID login)
    {
      id: 'WC-2025-007',
      propertyId: 'D1-8',
      address: '321, Green Valley, Zone C, Ward 12 - Main Unit',
      type: 'Industrial',
      size: '40mm',
      status: 'Active',
      activatedDate: 'May 18, 2024',
      meterNumber: 'MTR-56789',
      meterPhoto: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=200&h=150&fit=crop',
      currentReading: 5640,
      lastReading: 5500,
      consumption: 140,
      avgConsumption: 135,
      billAmount: 9702,
      dueDate: 'Dec 27, 2025',
      tariff: '₹60/KL',
      lastPayment: 'Nov 22, 2025',
      healthScore: 87,
      alerts: ['High Consumption'],
      connectionPhoto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop',
      billingFrequency: 'niyamit',
      meterType: 'meter'
    },
    {
      id: 'WC-2025-008',
      propertyId: 'D1-8',
      address: '321, Green Valley, Zone C, Ward 12 - Secondary Unit',
      type: 'Industrial',
      size: '25mm',
      status: 'Active',
      activatedDate: 'Jul 22, 2024',
      meterNumber: 'MTR-67890',
      meterPhoto: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&h=150&fit=crop',
      currentReading: 3200,
      lastReading: 3100,
      consumption: 100,
      avgConsumption: 95,
      billAmount: 0,
      dueDate: 'Jan 08, 2026',
      billingFrequency: 'niyamit',
      meterType: 'meter',
      tariff: '₹60/KL',
      lastPayment: 'Nov 28, 2025',
      healthScore: 93,
      alerts: [],
      connectionPhoto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop'
    }
  ];

  // Filter connections based on the selected property - show all connections for this property
  const connections = allConnectionDetails.filter(conn => {
    // Match by property ID from the selected property
    return conn.propertyId === selectedPropertyNumber;
  });

  const usageHistory = [
    { month: 'Dec 2025', reading: 1245, consumption: 45, amount: 1200, paid: false },
    { month: 'Nov 2025', reading: 1200, consumption: 48, amount: 1250, paid: true },
    { month: 'Oct 2025', reading: 1152, consumption: 50, amount: 1300, paid: true },
    { month: 'Sep 2025', reading: 1102, consumption: 45, amount: 1200, paid: true },
    { month: 'Aug 2025', reading: 1057, consumption: 38, amount: 1050, paid: true },
    { month: 'Jul 2025', reading: 1019, consumption: 42, amount: 1150, paid: true }
  ];

  const billHistory = [
    { billId: 'BL-2025-045', date: 'Dec 01, 2025', dueDate: 'Dec 30, 2025', amount: 1200, status: 'Pending', consumption: '45 KL', breakdown: { water: 1125, sewerage: 50, gst: 25 } },
    { billId: 'BL-2025-034', date: 'Nov 01, 2025', dueDate: 'Nov 30, 2025', amount: 1250, status: 'Paid', consumption: '48 KL', paidDate: 'Nov 25, 2025', paymentMode: 'UPI', transactionId: 'TXN2025890', breakdown: { water: 1175, sewerage: 50, gst: 25 } },
    { billId: 'BL-2025-023', date: 'Oct 01, 2025', dueDate: 'Oct 31, 2025', amount: 1300, status: 'Paid', consumption: '50 KL', paidDate: 'Oct 28, 2025', paymentMode: 'Debit Card', transactionId: 'TXN2025845', breakdown: { water: 1225, sewerage: 50, gst: 25 } }
  ];

  const filteredConnections = connections
    .filter(conn => {
      const matchesSearch = conn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conn.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conn.propertyId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterType === 'all' || 
        (filterType === 'residential' && conn.type === 'Residential') ||
        (filterType === 'commercial' && conn.type === 'Commercial');
      
      return matchesSearch && matchesFilter;
    });

  return (
    <div className="w-full sm:px-6 lg:px-8 py-[0px] h-[calc(100vh-8rem)] flex flex-col gap-3 relative bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 mt-[55px] mr-[0px] mb-[0px] ml-[0px] px-[32px]">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Compact Header */}
      <div className="flex items-center justify-between relative z-10 mt-[28px] mr-[0px] mb-[0px] ml-[0px]">
        <div>
          <h2 className="text-2xl text-gray-900">My Connections</h2>
          <p className="text-sm text-gray-900">
            Property {selectedPropertyNumber}
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1">
          <Droplets className="w-3 h-3 mr-1" />
          {userConnections.length} Active Connections
        </Badge>
      </div>

      {/* Compact Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
        <Card className="p-3 shadow-md border-0 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Total Usage</p>
              <p className="text-xl">{connections.reduce((sum, c) => sum + c.consumption, 0)} KL</p>
            </div>
            <Droplets className="w-8 h-8 opacity-80" />
          </div>
        </Card>
        <Card className="p-3 shadow-md border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Total Due</p>
              <p className="text-xl">₹{connections.reduce((sum, c) => sum + c.billAmount, 0).toLocaleString()}</p>
            </div>
            <CreditCard className="w-8 h-8 opacity-80" />
          </div>
        </Card>
        <Card className="p-3 shadow-md border-0 bg-gradient-to-br from-teal-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Avg Usage</p>
              <p className="text-xl">{Math.round(connections.reduce((sum, c) => sum + c.avgConsumption, 0) / connections.length)} KL</p>
            </div>
            <TrendingDown className="w-8 h-8 opacity-80" />
          </div>
        </Card>
        <Card className="p-3 shadow-md border-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Last Payment</p>
              <p className="text-xl">{connections[0]?.lastPayment || 'N/A'}</p>
            </div>
            <Wallet className="w-8 h-8 opacity-80" />
          </div>
        </Card>
      </div>

      {/* Compact Search Bar */}
      

      {/* Connections Grid - Optimized for screen fit */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
        <div className="grid lg:grid-cols-3 gap-3">
          {filteredConnections.map((conn, index) => (
            <CompactConnectionCard
              key={conn.id}
              connection={conn}
              index={index}
              onViewDetails={() => setSelectedConnection(conn)}
              onPayNow={() => setPaymentConnection(conn)}
            />
          ))}
        </div>
      </div>

      {/* Detailed View Dialog */}
      {selectedConnection && (
        <ConnectionDetailsDialog
          connection={selectedConnection}
          usageHistory={usageHistory}
          billHistory={billHistory}
          onClose={() => setSelectedConnection(null)}
        />
      )}

      {/* Payment Dialog */}
      {paymentConnection && (
        <PaymentDialog
          connection={paymentConnection}
          onClose={() => setPaymentConnection(null)}
          onPaymentSuccess={(conn: any) => {
            setPaidConnection(conn);
            setPaymentConnection(null);
            setPaymentSuccess(true);
          }}
        />
      )}

      {/* Payment Success Dialog */}
      {paymentSuccess && paidConnection && (
        <PaymentSuccessDialog
          connection={paidConnection}
          onClose={() => {
            setPaymentSuccess(false);
            setPaidConnection(null);
          }}
        />
      )}

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}} />
    </div>
  );
}

// Compact Connection Card
function CompactConnectionCard({ connection, index, onViewDetails, onPayNow }: any) {
  const [showMeter, setShowMeter] = useState(false);
  const [showProperty, setShowProperty] = useState(false);
  const consumptionDiff = connection.consumption - connection.avgConsumption;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all overflow-hidden h-full">
        {/* Compact Header */}
        <div 
          className="relative h-32 bg-gradient-to-br from-blue-500 to-cyan-500 cursor-pointer group"
          onMouseEnter={() => setShowProperty(true)}
          onMouseLeave={() => setShowProperty(false)}
        >
          <img
            src={connection.connectionPhoto}
            alt="Property"
            className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-2 left-3 right-3">
              <div className="flex items-end justify-between">
                <div className="text-white">
                  <p className="text-sm font-medium">Consumer No: {connection.id}</p>
                  <p className="text-xs opacity-90">Property: {connection.propertyId}</p>
                </div>
                <Badge className={connection.type === 'Residential' ? 'bg-blue-600' : 'bg-purple-600'}>
                  {connection.type}
                </Badge>
              </div>
            </div>
            {/* Hover indicator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4 text-white" />
            </div>
          </div>
          
          {/* Full Property Image Popup on Hover */}
          <AnimatePresence>
            {showProperty && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2 }}
                className="fixed z-[100] pointer-events-none"
                style={{
                  left: '50%',
                  top: '30%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative bg-white rounded-2xl shadow-2xl border-4 border-cyan-500 overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-teal-500/20 blur-xl" />
                  
                  {/* Image container */}
                  <div className="relative">
                    <img
                      src={connection.connectionPhoto}
                      alt="Property Full View"
                      className="w-[500px] h-[300px] object-cover"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-cyan-600 text-white text-sm shadow-lg">
                        <Home className="w-3 h-3 mr-1" />
                        {connection.id}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-3 right-3">
                      <Badge className={connection.type === 'Residential' ? 'bg-blue-600 text-white text-sm shadow-lg' : 'bg-purple-600 text-white text-sm shadow-lg'}>
                        {connection.type}
                      </Badge>
                    </div>
                    
                    {/* Info overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white">
                      <p className="text-sm font-semibold mb-1">Property: {connection.propertyId}</p>
                      <p className="text-xs opacity-90 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {connection.address}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Health Badge */}
          

          {/* Alert Badge */}
          {/* {connection.alerts.length > 0 && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                <Bell className="w-3 h-3 mr-1" />
                {connection.alerts.length}
              </Badge>
            </div>
          )} */}
        </div>

        {/* Compact Content */}
        <div className="p-3 space-y-2">
          {/* Address */}
          <div className="flex items-start gap-1 text-xs text-gray-600 bg-blue-50 p-2 rounded">
            <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-600" />
            <p className="line-clamp-2">{connection.address}</p>
            <Badge className={connection.billingFrequency === 'niyamit' ? 'flex items-right bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs'}>
              {connection.billingFrequency === 'niyamit' ? '📅 Meter (Q)' : '📅 Non-Meter (Y)'}
            </Badge>
          </div>

          {/* Billing & Meter Type */}
          <div className="flex gap-1.5">
            
            {/* <Badge className={connection.meterType === 'meter' ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs' : 'bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs'}>
              {connection.meterType === 'meter' ? '📊 Metered' : '💰 Fixed'}
            </Badge> */}
          </div>

          {/* Meter Section */}
          <div className="flex gap-2 bg-purple-50 p-2 rounded border border-purple-200">
            {connection.meterType === 'meter' ? (
              <>
                <div
                  className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 cursor-pointer group"
                  onMouseEnter={() => setShowMeter(true)}
                  onMouseLeave={() => setShowMeter(false)}
                >
                  <img
                    src={connection.meterPhoto}
                    alt="Meter"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Full Image Popup on Hover */}
                  <AnimatePresence>
                    {showMeter && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed z-[100] pointer-events-none"
                        style={{
                          left: '50%',
                          top: '20%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div className="relative bg-white rounded-2xl shadow-2xl border-4 border-blue-500 overflow-hidden">
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 blur-xl" />
                          
                          {/* Image container */}
                          <div className="relative">
                            <img
                              src={connection.meterPhoto}
                              alt="Meter Full View"
                              className="w-96 h-80 object-contain bg-gray-50"
                            />
                            
                            {/* Badge */}
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-blue-600 text-white text-xs shadow-lg">
                                <Camera className="w-3 h-3 mr-1" />
                                Meter #{connection.meterNumber}
                              </Badge>
                            </div>
                            
                            {/* Info overlay at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 text-white">
                              <p className="text-sm font-semibold">Reading: {connection.currentReading}</p>
                              <p className="text-xs opacity-90">Size: {connection.size}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600">Meter #{connection.meterNumber}</p>
                  <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
                    <div>
                      <p className="text-gray-600">Reading</p>
                      <p className="text-gray-900 font-medium">{connection.currentReading}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tap Size</p>
                      <p className="text-gray-900 font-medium">{connection.size}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-2 py-2">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Fixed Rate Connection</p>
                  <p className="text-lg font-bold text-orange-600">₹{connection.fixedRate}</p>
                  <p className="text-xs text-gray-500">{connection.billingFrequency === 'vaarshik' ? 'Per Year' : 'Per Quarter'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="p-2 bg-cyan-50 rounded text-center border border-cyan-200">
              <Droplets className="w-4 h-4 text-cyan-600 mx-auto mb-0.5" />
              <p className="text-sm font-medium text-gray-900">Use: {connection.consumption} KL</p>
              {/* <p className="text-xs text-gray-600">KL</p> */}
              {consumptionDiff !== 0 && (
                <div className="flex items-center justify-center gap-0.5 mt-0.5">
                  {consumptionDiff > 0 ? (
                    <TrendingUp className="w-2.5 h-2.5 text-red-600" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5 text-green-600" />
                  )}
                  <span className={`text-xs ${consumptionDiff > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {Math.abs(consumptionDiff)}
                  </span>
                </div>
              )}
            </div>

            <div className="p-2 bg-orange-50 rounded text-center border border-orange-200">
              <CreditCard className="w-4 h-4 text-orange-600 mx-auto mb-0.5" />
              <p className="text-sm font-medium text-gray-900">Pay: ₹{connection.billAmount}</p>
              <p className="text-xs text-gray-600 truncate">{connection.dueDate.split(',')[0]}</p>
            </div>

            <div className="p-2 bg-teal-50 rounded text-center border border-teal-200">
              <Zap className="w-4 h-4 text-teal-600 mx-auto mb-0.5" />
              <p className="text-sm font-medium text-gray-900">Rate: {connection.tariff}</p>
              {/* <p className="text-xs text-gray-600">Rate</p> */}
            </div>
          </div>

          {/* Progress */}
          {/* <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Usage vs Avg</span>
              <span className={`text-xs font-medium ${
                consumptionDiff > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {((connection.consumption / connection.avgConsumption) * 100 - 100).toFixed(0)}%
              </span>
            </div>
            <Progress 
              value={Math.min((connection.consumption / connection.avgConsumption) * 100, 100)} 
              className="h-1.5"
            />
          </div> */}

          {/* Alerts */}
          {/* {connection.alerts.length > 0 && (
            <div className="space-y-1">
              {connection.alerts.map((alert, i) => (
                <div key={i} className="flex items-center gap-1.5 p-1.5 bg-red-50 rounded text-xs text-red-800 border border-red-200">
                  <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <p className="truncate">{alert}</p>
                </div>
              ))}
            </div>
          )} */}

          {/* Compact Actions */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onViewDetails}
              className="h-8 text-xs"
            >
              <Eye className="w-3 h-3 mr-1" />
              Details
            </Button>
            <Button 
              size="sm"
              className="h-8 text-xs bg-gradient-to-r from-blue-500 to-cyan-500"
              onClick={onPayNow}
            >
              <CreditCard className="w-3 h-3 mr-1" />
              Pay
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Connection Details Dialog (Same as before but optimized)
function ConnectionDetailsDialog({ connection, usageHistory, billHistory, onClose }: any) {
  return (
    <Dialog open={!!connection} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[75vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-cyan-50">
        <DialogHeader className="space-y-0 pb-2">
          <DialogTitle className="flex items-center gap-2 text-base">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm">{connection.id}</p>
              <p className="text-xs text-gray-600 font-normal">{connection.propertyId}</p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm sr-only">
            Complete connection information and history
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* <TabsTrigger value="usage">Usage</TabsTrigger> */}
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="meter">Meter</TabsTrigger>
            <TabsTrigger value="documents">Docs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-2 mt-0">
            <div className="relative h-35 rounded-lg overflow-hidden">
              <img src={connection.connectionPhoto} alt="Property" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-end justify-between">
                    <div>
                      <Badge className="bg-white/20 mb-2">{connection.type}</Badge>
                      <h3 className="text-xl">{connection.id}</h3>
                      <p className="text-sm opacity-90 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {connection.address}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl">₹{connection.billAmount}</p>
                      <p className="text-xs opacity-80">Due Amount</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-blue-50">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Connection Details
                </h4>
                <div className="space-y-2 text-sm">
                  <DetailRow label="Consumer No :" value={connection.id} />
                  <DetailRow label="Property No :" value={connection.propertyId} />
                  <DetailRow label="Type :" value={connection.type} />
                  <DetailRow label="Tap Size :" value={connection.size} />
                  <DetailRow label="Tariff :" value={connection.tariff} />
                  <DetailRow label="Activated :" value={connection.activatedDate} />
                </div>
              </Card>

              <Card className="p-4 bg-purple-50">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-600" />
                  Meter Information
                </h4>
                <div className="space-y-2 text-sm">
                  <DetailRow label="Meter Number :" value={connection.meterNumber} />
                  <DetailRow label="Current Reading :" value={`${connection.currentReading} KL`} />
                  <DetailRow label="Last Reading :" value={`${connection.lastReading} KL`} />
                  <DetailRow label="This Month :" value={`${connection.consumption} KL`} />
                  <DetailRow label="Average :" value={`${connection.avgConsumption} KL`} />
                  <DetailRow label="Health Score :" value={`${connection.healthScore}%`} />
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-2 mt-0">
            {usageHistory.map((record, index) => (
              <Card key={index} className={`p-4 ${record.paid ? 'bg-green-50' : 'bg-orange-50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${record.paid ? 'bg-green-500' : 'bg-orange-500'} flex items-center justify-center`}>
                      {record.paid ? <CheckCircle className="w-5 h-5 text-white" /> : <AlertTriangle className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <p className="font-medium">{record.month}</p>
                      <p className="text-sm text-gray-600">{record.consumption} KL • ₹{record.amount}</p>
                    </div>
                  </div>
                  <Badge className={record.paid ? 'bg-green-500' : 'bg-orange-500'}>
                    {record.paid ? 'Paid' : 'Pending'}
                  </Badge>
                </div>
                <Progress value={(record.consumption / 60) * 100} className="h-2 mt-3" />
              </Card>
            ))}
          </TabsContent>

          {/* Bills Tab */}
          <TabsContent value="bills" className="space-y-2 mt-0">
            {billHistory.map((bill, index) => (
              <Card key={index} className={`p-2 ${bill.status === 'Paid' ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-start justify-between mb-[1px] mt-[0px] mr-[0px] ml-[0px] m-[0px]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{bill.billId}</p>
                      <Badge className={bill.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'}>
                        {bill.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Generated: {bill.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-medium">₹{bill.amount}</p>
                    <p className="text-sm text-gray-600">{bill.consumption}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-sm mt-[0px] mr-[0px] mb-[-1px] ml-[0px]">
                  <div className="bg-white/50 p-2 rounded">
                    <p className="text-xs text-gray-600">Water</p>
                    <p className="font-medium">₹{bill.breakdown.water}</p>
                  </div>
                  <div className="bg-white/50 p-2 rounded">
                    <p className="text-xs text-gray-600">Sewerage</p>
                    <p className="font-medium">₹{bill.breakdown.sewerage}</p>
                  </div>
                  <div className="bg-white/50 p-2 rounded">
                    <p className="text-xs text-gray-600">GST</p>
                    <p className="font-medium">₹{bill.breakdown.gst}</p>
                  </div>
                  <div className="bg-white/50 p-2 rounded">
                    <p className="text-xs text-gray-600">Due</p>
                    <p className="font-medium text-xs">{bill.dueDate.split(',')[0]}</p>
                  </div>
                </div>

                {bill.status === 'Paid' && (
                  <div className="bg-green-100 p-2 rounded text-sm">
                    <p className="font-medium mb-1">Payment: {bill.paymentMode} • {bill.transactionId}</p>
                    <p className="text-xs text-gray-600">Paid on: {bill.paidDate}</p>
                  </div>
                )}

                <div className="flex gap-2 mt-3 m-[0px]">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  {bill.status === 'Pending' && (
                    <Button size="sm" className="flex-1 bg-blue-600">Pay Now</Button>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Meter Tab */}
          <TabsContent value="meter" className="space-y-2 mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Current Meter Photo</Label>
                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-blue-300">
                  <img src={connection.meterPhoto} alt="Meter" className="w-full h-full object-cover" />
                  <Badge className="absolute bottom-2 right-2 bg-white/90 text-gray-900">
                    <Camera className="w-3 h-3 mr-1" />
                    Dec 2025
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Installation Photo</Label>
                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-300">
                  <img src={connection.connectionPhoto} alt="Installation" className="w-full h-full object-cover" />
                  <Badge className="absolute bottom-2 right-2 bg-white/90 text-gray-900">
                    <Calendar className="w-3 h-3 mr-1" />
                    Jan 2024
                  </Badge>
                </div>
              </div>
            </div>

            <Card className="p-4 bg-purple-50">
              <h4 className="font-medium mb-3">Meter Details</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <DetailRow label="Meter Number :" value={connection.meterNumber} />
                <DetailRow label="Type :" value="Digital" />
                <DetailRow label="Installed :" value={connection.activatedDate} />
                <DetailRow label="Last Service :" value="Sep 15, 2025" />
                <DetailRow label="Next Check :" value="Jan 15, 2026" />
                <DetailRow label="Status :" value="Working" badge="success" />
              </div>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-2 mt-0">
            {[
              { name: 'Connection Certificate', date: 'Jan 15, 2024', size: '245 KB', verified: true },
              { name: 'Property Ownership', date: 'Jan 10, 2024', size: '1.2 MB', verified: true },
              { name: 'Identity Proof', date: 'Jan 10, 2024', size: '856 KB', verified: true },
              { name: 'Latest Bill', date: 'Dec 01, 2025', size: '124 KB', verified: true }
            ].map((doc, index) => (
              <Card key={index} className="p-2.5 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-600">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.verified && <Badge className="bg-green-500 text-xs">Verified</Badge>}
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({ label, value, badge }: { label: string; value: string; badge?: 'success' | 'warning' | 'error' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600"> {label}</span>
      {badge ? (
        <Badge className={badge === 'success' ? 'bg-green-500' : badge === 'warning' ? 'bg-orange-500' : 'bg-red-500'}>
          {value}
        </Badge>
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </div>
  );
}

// Payment Dialog
function PaymentDialog({ connection, onClose, onPaymentSuccess }: any) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  // Payment details state
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardName: '',
    bankName: '',
    walletProvider: ''
  });

  const validatePaymentDetails = () => {
    switch (selectedPaymentMethod) {
      case 'upi':
        return paymentDetails.upiId.trim() !== '' && paymentDetails.upiId.includes('@');
      case 'card':
        return paymentDetails.cardNumber.trim() !== '' && 
               paymentDetails.cardExpiry.trim() !== '' && 
               paymentDetails.cardCVV.trim() !== '' &&
               paymentDetails.cardName.trim() !== '';
      case 'netbanking':
        return paymentDetails.bankName.trim() !== '';
      case 'wallet':
        return paymentDetails.walletProvider.trim() !== '';
      default:
        return false;
    }
  };

  const handlePayment = () => {
    if (!validatePaymentDetails()) {
      toast.error('Please fill in all required payment details');
      return;
    }
    
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      onPaymentSuccess(connection);
      // Reset payment details
      setPaymentDetails({
        upiId: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: '',
        cardName: '',
        bankName: '',
        walletProvider: ''
      });
    }, 2000);
  };

  return (
    <Dialog open={!!connection} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[95vh] overflow-hidden flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-base">Pay Bill</p>
              <p className="text-xs text-gray-600 font-normal">{connection.id}</p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Pay your water bill securely
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
          {/* Bill Summary */}
          <Card className="p-3 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs opacity-90">Total Amount Due</p>
                <p className="text-2xl">₹{connection.billAmount.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="w-3 h-3" />
              <span>Due by {connection.dueDate}</span>
            </div>
          </Card>

          {/* Connection Details */}
          <Card className="p-3 bg-blue-50">
            <h4 className="text-xs font-medium mb-2 flex items-center gap-2">
              <Droplets className="w-3 h-3 text-blue-600" />
              Connection Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-600 text-[10px]">Connection ID</p>
                <p className="font-medium">{connection.id}</p>
              </div>
              <div>
                <p className="text-gray-600 text-[10px]">Property ID</p>
                <p className="font-medium">{connection.propertyId}</p>
              </div>
              <div>
                <p className="text-gray-600 text-[10px]">Consumption</p>
                <p className="font-medium">{connection.consumption} KL</p>
              </div>
              <div>
                <p className="text-gray-600 text-[10px]">Tariff</p>
                <p className="font-medium">{connection.tariff}</p>
              </div>
            </div>
          </Card>

          {/* Payment Method Selection */}
          <Card className="p-3">
            <h4 className="text-xs font-medium mb-2 flex items-center gap-2">
              <CreditCard className="w-3 h-3 text-gray-700" />
              Select Payment Method
            </h4>
            <div className="space-y-2">
              {/* UPI */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedPaymentMethod('upi')}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedPaymentMethod === 'upi'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">UPI Payment</p>
                    <p className="text-[10px] text-gray-600">Google Pay, PhonePe, Paytm</p>
                  </div>
                  {selectedPaymentMethod === 'upi' && (
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                {selectedPaymentMethod === 'upi' && (
                  <div className="mt-2 pt-2 border-t">
                    <Label className="mb-1 text-[10px]">Enter UPI ID <span className="text-red-500">*</span></Label>
                    <Input
                      placeholder="username@upi"
                      className="h-8 text-xs"
                      value={paymentDetails.upiId}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                      required
                    />
                    {paymentDetails.upiId && !paymentDetails.upiId.includes('@') && (
                      <p className="text-[10px] text-red-500 mt-1">Please enter a valid UPI ID</p>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedPaymentMethod('card')}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedPaymentMethod === 'card'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Credit/Debit Card</p>
                    <p className="text-[10px] text-gray-600">Visa, Mastercard, Rupay</p>
                  </div>
                  {selectedPaymentMethod === 'card' && (
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                {selectedPaymentMethod === 'card' && (
                  <div className="mt-2 pt-2 border-t space-y-2">
                    <div>
                      <Label className="mb-1 text-[10px]">Cardholder Name <span className="text-red-500">*</span></Label>
                      <Input
                        placeholder="Name on card"
                        className="h-8 text-xs"
                        value={paymentDetails.cardName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-1 text-[10px]">Card Number <span className="text-red-500">*</span></Label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="h-8 text-xs"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '');
                          const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                          setPaymentDetails({ ...paymentDetails, cardNumber: formatted });
                        }}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="mb-1 text-[10px]">Expiry <span className="text-red-500">*</span></Label>
                        <Input
                          placeholder="MM/YY"
                          maxLength={5}
                          className="h-8 text-xs"
                          value={paymentDetails.cardExpiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setPaymentDetails({ ...paymentDetails, cardExpiry: value });
                          }}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-1 text-[10px]">CVV <span className="text-red-500">*</span></Label>
                        <Input
                          placeholder="123"
                          maxLength={3}
                          type="password"
                          className="h-8 text-xs"
                          value={paymentDetails.cardCVV}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCVV: e.target.value.replace(/\D/g, '') })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Net Banking */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'netbanking'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedPaymentMethod('netbanking')}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedPaymentMethod === 'netbanking'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Net Banking</p>
                    <p className="text-[10px] text-gray-600">All major banks</p>
                  </div>
                  {selectedPaymentMethod === 'netbanking' && (
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                {selectedPaymentMethod === 'netbanking' && (
                  <div className="mt-2 pt-2 border-t">
                    <Label className="mb-1 text-[10px]">Select Your Bank <span className="text-red-500">*</span></Label>
                    <Select
                      value={paymentDetails.bankName}
                      onValueChange={(value) => setPaymentDetails({ ...paymentDetails, bankName: value })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Choose bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sbi">State Bank of India</SelectItem>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                        <SelectItem value="icici">ICICI Bank</SelectItem>
                        <SelectItem value="axis">Axis Bank</SelectItem>
                        <SelectItem value="pnb">Punjab National Bank</SelectItem>
                        <SelectItem value="boi">Bank of India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </motion.div>

              {/* Wallet */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'wallet'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedPaymentMethod('wallet')}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedPaymentMethod === 'wallet'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Digital Wallet</p>
                    <p className="text-[10px] text-gray-600">Paytm, PhonePe Wallet</p>
                  </div>
                  {selectedPaymentMethod === 'wallet' && (
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                {selectedPaymentMethod === 'wallet' && (
                  <div className="mt-2 pt-2 border-t">
                    <Label className="mb-1 text-[10px]">Select Wallet <span className="text-red-500">*</span></Label>
                    <Select
                      value={paymentDetails.walletProvider}
                      onValueChange={(value) => setPaymentDetails({ ...paymentDetails, walletProvider: value })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Choose wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paytm">Paytm Wallet</SelectItem>
                        <SelectItem value="phonepe">PhonePe Wallet</SelectItem>
                        <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                        <SelectItem value="mobikwik">Mobikwik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </motion.div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 flex-shrink-0">
            <Button
              variant="outline"
              className="flex-1 h-9 text-xs"
              onClick={onClose}
              disabled={paymentProcessing}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-9 text-xs bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePayment}
              disabled={!selectedPaymentMethod || !validatePaymentDetails() || paymentProcessing}
            >
              {paymentProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-1"
                  >
                    <Zap className="w-3 h-3" />
                  </motion.div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-3 h-3 mr-1" />
                  Pay ₹{connection.billAmount.toLocaleString()}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Payment Success Dialog
function PaymentSuccessDialog({ connection, onClose }: any) {
  const transactionId = `TXN${Date.now().toString().slice(-8)}`;
  const paymentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Dialog open={!!connection} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-gradient-to-br from-green-50 to-emerald-50">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <DialogTitle className="text-center text-2xl">Payment Successful!</DialogTitle>
          <DialogDescription className="text-center">
            Your water bill has been paid successfully
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Transaction Details */}
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
              <p className="text-3xl text-green-600">₹{connection.billAmount.toLocaleString()}</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date</span>
                <span className="font-medium">{paymentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Connection ID</span>
                <span className="font-medium">{connection.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <Badge className="bg-green-500">Success</Badge>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {}}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}