import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  Droplets,
  User,
  MapPin,
  Phone,
  Home,
  FileText,
  CheckCircle,
  Upload,
  ArrowRight,
  ArrowLeft,
  Shield,
  AlertCircle,
  Info,
  X,
  Camera,
  Eye,
  Sparkles
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { ApplicationSuccess } from './ApplicationSuccess';
import { toast } from 'sonner@2.0.3';

interface CompactConnectionFormProps {
  onBack?: () => void;
  isNewConnection?: boolean;
  propertyInfo?: any;
}

export function CompactConnectionForm({ onBack, isNewConnection = false, propertyInfo }: CompactConnectionFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedApplicationId, setGeneratedApplicationId] = useState('');
  const [previewDoc, setPreviewDoc] = useState<{ file: File | null; url: string; name: string } | null>(null);
  const [propertyFetched, setPropertyFetched] = useState(false);
  const [fetchingProperty, setFetchingProperty] = useState(false);

  const [formData, setFormData] = useState({
    searchQuery: '',
    wardNo: '',
    zoneNo: '',
    propertyNumber: '',
    ownerNameMarathi: '',
    ownerNameEnglish: '',
    mobileNo: '',
    address: '',
    propertyType: '',
    buildingType: '',
    usageType: '',
    totalUnits: '',
    plotFlatNo: '',
    locality: '',
    pincode: '',
    connectionCategory: '',
    connectionUse: '',
    connectionSize: '',
    numberOfConnections: '1',
    meterRequired: '',
    meterType: '',
    tapLocation: '',
    estimatedConsumption: '',
    aadharDoc: null as File | null,
    addressProof: null as File | null,
    propertyDoc: null as File | null,
    photoDoc: null as File | null,
    propertyTaxReceipt: null as File | null,
    societyNOC: null as File | null,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = () => {
    const appId = `APP-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedApplicationId(appId);
    setShowSuccess(true);
    toast.success('Application submitted successfully!');
  };

  const fetchPropertyDetails = () => {
    if (!formData.searchQuery) {
      toast.error('Please enter UPIC ID, Mobile Number, or Property No');
      return;
    }

    setFetchingProperty(true);
    
    setTimeout(() => {
      const mockPropertyData = {
        wardNo: 'Ward-05',
        zoneNo: 'Zone-A',
        propertyNumber: 'PROP-2024-1001',
        ownerNameMarathi: 'राजेश कुमार शर्मा',
        ownerNameEnglish: 'Rajesh Kumar Sharma',
        mobileNo: '9876543210',
        address: 'Flat 101, Shivaji Nagar, Behind City Mall',
        propertyType: 'Residential',
        buildingType: 'Apartment',
        usageType: 'Domestic',
        totalUnits: '1',
        plotFlatNo: '101',
        locality: 'Shivaji Nagar',
        pincode: '411001',
        connectionCategory: 'residential',
        connectionUse: 'Domestic',
      };

      setFormData(prev => ({ ...prev, ...mockPropertyData }));
      setPropertyFetched(true);
      setFetchingProperty(false);
      toast.success('Property details fetched successfully!');
    }, 1500);
  };

  const openDocPreview = (file: File | null, name: string) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewDoc({ file, url, name });
    }
  };

  const closeDocPreview = () => {
    if (previewDoc?.url) {
      URL.revokeObjectURL(previewDoc.url);
    }
    setPreviewDoc(null);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header Navigation */}
      <nav className="relative z-20 bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Droplets className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl text-gray-900 font-bold">
                  Panvel Municipal Corporation
                </h1>
                <p className="text-xs text-blue-600">
                  Smart Water Management
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-[calc(100vh-4rem)] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="w-full h-full flex flex-col relative z-10 px-4 py-2">
        {/* Header */}
        <div className="flex items-center mb-2">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 hover:bg-white/50 h-7 text-xs"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </Button>
          )}
        </div>

        {/* Form Content - Single Page, No Scroll */}
        <Card className="flex-1 overflow-hidden bg-white/95 backdrop-blur-sm shadow-xl border-2 border-blue-100 flex flex-col">
          <div className="h-full p-3 overflow-hidden flex flex-col">
            <div className="flex-1 flex flex-col gap-2">
              {/* Header - Full Width */}
              <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white rounded-lg p-2 shadow-lg flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-sm font-bold">नवीन पाणी कनेक्शन अर्ज</h1>
                    <p className="text-xs text-blue-100">New Water Connection Application</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge className="bg-white/20 text-white text-xs px-1.5 py-0.5">
                      <Sparkles className="w-2.5 h-2.5 mr-0.5" />Online
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Property Search - Full Width */}
              <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-lg p-2 border border-blue-200 flex-shrink-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <h2 className="text-xs font-bold text-blue-700">मालमत्ता शोध / Search Property</h2>
                  {/* <Badge className="bg-blue-500 text-white px-1.5 py-0 text-xs ml-auto">Step 1</Badge> */}
                </div>
                
                <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                  मालमत्ता शोधण्यासाठी युपिक आयडी / मोबाईल क्र /मालमत्ता क्र चा वापर करा *
                </Label>
                <div className="flex gap-1.5">
                  <Input 
                    placeholder="Search By UPIC ID/Mobile number/Property No" 
                    value={formData.searchQuery} 
                    onChange={(e) => handleInputChange('searchQuery', e.target.value)} 
                    className="h-8 text-xs flex-1 border border-blue-300" 
                    disabled={propertyFetched}
                  />
                  <Button 
                    onClick={fetchPropertyDetails} 
                    disabled={fetchingProperty || propertyFetched}
                    className="h-8 px-4 text-xs font-bold bg-green-600 hover:bg-green-700 whitespace-nowrap"
                  >
                    {fetchingProperty ? 'Searching...' : propertyFetched ? '✓ Found' : 'Search'}
                  </Button>
                </div>

                {fetchingProperty && (
                  <div className="bg-blue-100 border border-blue-300 rounded p-1.5 mt-1.5 flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs text-blue-900">Searching property details...</p>
                  </div>
                )}
              </div>

              {/* Two Column Layout for Property Details and Rest */}
              <div className="flex-1 grid grid-cols-2 gap-3 overflow-hidden">
                {/* Left Column */}
                <div className="space-y-2 flex flex-col overflow-hidden">
                  {/* Property Details - Always Visible */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 border border-green-200 flex-1 overflow-y-auto">
                    <div className={`flex items-center gap-1.5 mb-1.5 rounded px-1.5 py-1 border ${propertyFetched ? 'bg-green-100 border-green-300' : 'bg-blue-100 border-blue-300'}`}>
                      {propertyFetched ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <h3 className="text-xs font-bold text-green-900">Property Details (Auto-Filled - Editable)</h3>
                        </>
                      ) : (
                        <>
                          <Home className="w-3 h-3 text-blue-600" />
                          <h3 className="text-xs font-bold text-blue-900">Property Details (Fill Manually or Search Above)</h3>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-white p-1.5 rounded border border-slate-200">
                        <Label className="text-xs font-bold text-slate-600 mb-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />Zone No *
                        </Label>
                        <Input 
                          value={formData.zoneNo} 
                          onChange={(e) => handleInputChange('zoneNo', e.target.value)} 
                          className="h-6 text-xs border border-slate-300 mt-0.5" 
                        />
                      </div>
                      <div className="bg-white p-1.5 rounded border border-slate-200">
                        <Label className="text-xs font-bold text-slate-600 mb-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />Ward No *
                        </Label>
                        <Input 
                          value={formData.wardNo} 
                          onChange={(e) => handleInputChange('wardNo', e.target.value)} 
                          className="h-6 text-xs border border-slate-300 mt-0.5" 
                        />
                      </div>
                      
                      <div className="bg-white p-1.5 rounded border border-slate-200 col-span-1">
                        <Label className="text-xs font-bold text-slate-600 mb-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />Property No *
                        </Label>
                        <Input 
                          value={formData.propertyNumber} 
                          onChange={(e) => handleInputChange('propertyNumber', e.target.value)} 
                          className="h-6 text-xs border border-slate-300 mt-0.5" 
                        />
                      </div>
                      <div className="bg-white p-1.5 rounded border border-blue-200">
                        <Label className="text-xs font-bold text-blue-600 mb-0.5 flex items-center gap-1">
                          <User className="w-2.5 h-2.5" />Owner Name *
                        </Label>
                        <Input 
                          value={formData.ownerNameEnglish} 
                          onChange={(e) => handleInputChange('ownerNameEnglish', e.target.value)} 
                          className="h-6 text-xs border border-blue-300 mt-0.5" 
                        />
                      </div>
                      {/* <div className="bg-white p-1.5 rounded border border-cyan-200">
                        <Label className="text-xs font-bold text-cyan-600 mb-0.5 flex items-center gap-1">
                          <User className="w-2.5 h-2.5" />Owner Name (Marathi) *
                        </Label>
                        <Input 
                          value={formData.ownerNameMarathi} 
                          onChange={(e) => handleInputChange('ownerNameMarathi', e.target.value)} 
                          className="h-6 text-xs border border-cyan-300 mt-0.5" 
                        />
                      </div> */}
                      <div className="bg-white p-1.5 rounded border border-teal-200">
                        <Label className="text-xs font-bold text-teal-600 mb-0.5 flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5" />Mobile No *
                        </Label>
                        <Input 
                          value={formData.mobileNo} 
                          onChange={(e) => handleInputChange('mobileNo', e.target.value)} 
                          className="h-6 text-xs border border-teal-300 mt-0.5" 
                        />
                      </div>
                      <div className="bg-white p-1.5 rounded border border-teal-200">
                        <Label className="text-xs font-bold text-teal-600 mb-0.5 flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5" />Email ID *
                        </Label>
                        <Input 
                          value={formData.mobileNo} 
                          onChange={(e) => handleInputChange('mobileNo', e.target.value)} 
                          className="h-6 text-xs border border-teal-300 mt-0.5" 
                        />
                      </div>
                      <div className="bg-white p-1.5 rounded border border-purple-200">
                        <Label className="text-xs font-bold text-purple-600 mb-0.5 flex items-center gap-1">
                          <Home className="w-2.5 h-2.5" />Property Type *
                        </Label>
                        <Input 
                          value={formData.propertyType} 
                          onChange={(e) => handleInputChange('propertyType', e.target.value)} 
                          className="h-6 text-xs border border-purple-300 mt-0.5" 
                        />
                      </div>
                      <div className="bg-white p-1.5 rounded border border-pink-200">
                        <Label className="text-xs font-bold text-pink-600 mb-0.5 flex items-center gap-1">
                          <Home className="w-2.5 h-2.5" />Building Type *
                        </Label>
                        <Input 
                          value={formData.buildingType} 
                          onChange={(e) => handleInputChange('buildingType', e.target.value)} 
                          className="h-6 text-xs border border-pink-300 mt-0.5" 
                        />
                      </div>
                      <div className="bg-white p-1.5 rounded border border-indigo-200">
                        <Label className="text-xs font-bold text-indigo-600 mb-0.5 flex items-center gap-1">
                          <Home className="w-2.5 h-2.5" />Plot/Flat No *
                        </Label>
                        <Input 
                          value={formData.plotFlatNo} 
                          onChange={(e) => handleInputChange('plotFlatNo', e.target.value)} 
                          className="h-6 text-xs border border-indigo-300 mt-0.5" 
                        />
                      </div>
                      <div className="bg-white p-1.5 rounded border border-rose-200">
                        <Label className="text-xs font-bold text-rose-600 mb-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />Locality *
                        </Label>
                        <Input 
                          value={formData.locality} 
                          onChange={(e) => handleInputChange('locality', e.target.value)} 
                          className="h-6 text-xs border border-rose-300 mt-0.5" 
                        />
                      </div>
                      <div className="bg-white p-1.5 rounded border border-amber-200">
                        <Label className="text-xs font-bold text-amber-600 mb-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />Pincode *
                        </Label>
                        <Input 
                          value={formData.pincode} 
                          onChange={(e) => handleInputChange('pincode', e.target.value)} 
                          className="h-6 text-xs border border-amber-300 mt-0.5" 
                        />
                      </div>
                      <div className="bg-white p-1.5 rounded border border-emerald-200 col-span-2">
                        <Label className="text-xs font-bold text-emerald-600 mb-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />Address *
                        </Label>
                        <Input 
                          value={formData.address} 
                          onChange={(e) => handleInputChange('address', e.target.value)} 
                          className="h-6 text-xs border border-emerald-300 mt-0.5" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Connection Details - Always Visible */}
                  <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-lg p-2 border border-cyan-200 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Droplets className="w-3 h-3 text-white" />
                      </div>
                      <h2 className="text-xs font-bold text-cyan-700">Connection Details</h2>
                      {/* <Badge className="bg-cyan-500 text-white px-1.5 py-0 text-xs ml-auto">Step 2</Badge> */}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-0.5 block">Category *</Label>
                        <Select value={formData.connectionCategory} onValueChange={(val) => handleInputChange('connectionCategory', val)}>
                          <SelectTrigger className="h-7 text-xs border border-cyan-300">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-0.5 block">Type *</Label>
                        <Select value={formData.meterType} onValueChange={(val) => handleInputChange('meterType', val)}>
                          <SelectTrigger className="h-7 text-xs border border-teal-300">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Meter">Meter</SelectItem>
                            <SelectItem value="Non-Meter">Non-Meter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-0.5 block">Size *</Label>
                        <Select value={formData.connectionSize} onValueChange={(val) => handleInputChange('connectionSize', val)}>
                          <SelectTrigger className="h-7 text-xs border border-emerald-300">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15mm">15mm</SelectItem>
                            <SelectItem value="20mm">20mm</SelectItem>
                            <SelectItem value="25mm">25mm</SelectItem>
                            <SelectItem value="40mm">40mm</SelectItem>
                            <SelectItem value="50mm">50mm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-2 flex flex-col overflow-hidden">
                  {/* Document Upload - Always Visible */}
                  <div className="bg-gradient-to-br from-purple-50 to-rose-50 rounded-lg p-2 border border-purple-200 flex-1 overflow-hidden flex flex-col">
                    <div className="flex items-center gap-2 mb-1.5 flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-rose-600 rounded-lg flex items-center justify-center">
                        <Upload className="w-3 h-3 text-white" />
                      </div>
                      <h2 className="text-xs font-bold text-purple-700">Upload Documents</h2>
                      {/* <Badge className="bg-purple-500 text-white px-1.5 py-0 text-xs ml-auto">Step 3</Badge> */}
                    </div>

                    <div className="bg-white border border-purple-200 rounded overflow-hidden flex-1 flex flex-col">
                      <div className="grid grid-cols-2 bg-gradient-to-r from-purple-600 to-rose-600 text-white flex-shrink-0">
                        <div className="px-2 py-1 text-xs font-bold">Document</div>
                        <div className="px-2 py-1 text-xs font-bold">Upload</div>
                      </div>
                      
                      <div className="overflow-y-auto flex-1">
                        {[
                          { field: 'aadharDoc', label: 'Aadhaar Card', icon: Shield, required: true },
                          { field: 'addressProof', label: 'Address Proof', icon: Home, required: true },
                          { field: 'propertyDoc', label: 'Property Doc', icon: FileText, required: true },
                          { field: 'photoDoc', label: 'Photo', icon: Camera, required: true },
                          { field: 'propertyTaxReceipt', label: 'Tax Receipt', icon: FileText, required: true },
                          { field: 'societyNOC', label: 'Society NOC', icon: FileText, required: false },
                        ].map((doc, index) => {
                          const file = formData[doc.field as keyof typeof formData] as File | null;
                          return (
                            <div 
                              key={doc.field} 
                              className={`grid grid-cols-2 border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                              <div className="px-2 py-1 flex items-center gap-1.5">
                                <div className={`w-5 h-5 rounded flex items-center justify-center ${file ? 'bg-green-500' : 'bg-gray-400'}`}>
                                  <doc.icon className="w-2.5 h-2.5 text-white" />
                                </div>
                                <p className="text-xs font-semibold text-gray-900">
                                  {doc.label}{doc.required && <span className="text-red-500">*</span>}
                                </p>
                              </div>
                              
                              <div className="px-2 py-1 flex items-center gap-1">
                                {file ? (
                                  <>
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                    <p className="text-xs text-green-700 truncate flex-1">{file.name}</p>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-5 w-5 p-0" 
                                      onClick={() => openDocPreview(file, doc.label)}
                                    >
                                      <Eye className="w-2.5 h-2.5 text-blue-600" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-5 w-5 p-0" 
                                      onClick={() => handleFileChange(doc.field, null)}
                                    >
                                      <X className="w-2.5 h-2.5 text-red-500" />
                                    </Button>
                                  </>
                                ) : (
                                  <label className="cursor-pointer">
                                    <input 
                                      type="file" 
                                      accept=".pdf,.jpg,.jpeg,.png" 
                                      className="hidden" 
                                      onChange={(e) => {
                                        const selectedFile = e.target.files?.[0];
                                        if (selectedFile) {
                                          if (selectedFile.size > 2 * 1024 * 1024) {
                                            toast.error('Max 2MB');
                                            return;
                                          }
                                          handleFileChange(doc.field, selectedFile);
                                        }
                                      }} 
                                    />
                                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs">
                                      <Upload className="w-2.5 h-2.5" />
                                      Choose
                                    </div>
                                  </label>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-300 rounded p-1.5 mt-1.5 flex-shrink-0">
                      <h3 className="text-xs font-bold text-amber-900 mb-0.5 flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5" />Guidelines
                      </h3>
                      <p className="text-xs text-amber-900">PDF/JPG/PNG, Max 2MB. Aadhaar must match records.</p>
                    </div>
                  </div>

                  {/* Declaration & Submit - Always Visible */}
                  <div className="space-y-1.5 flex-shrink-0">
                    <div className="bg-blue-100 border border-blue-400 rounded-lg p-1.5">
                      <div className="flex items-start gap-1.5">
                        <input 
                          type="checkbox" 
                          className="mt-0.5 w-3.5 h-3.5 rounded text-blue-600 cursor-pointer" 
                          id="declaration" 
                        />
                        <label htmlFor="declaration" className="text-xs text-gray-800 font-semibold cursor-pointer">
                          <Shield className="w-2.5 h-2.5 text-blue-600 inline mr-1" />
                          I declare that all information provided is true and correct.
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-teal-50 p-1.5 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700">
                        <Info className="w-3 h-3 text-blue-600" />
                        <span>Review before submitting</span>
                      </div>
                      <Button 
                        onClick={handleSubmit} 
                        className="gap-1.5 h-8 px-6 text-xs font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Submit Application
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Success Dialog */}
      {showSuccess && (
        <ApplicationSuccess
          applicationId={generatedApplicationId}
          onClose={() => {
            setShowSuccess(false);
            if (onBack) onBack();
          }}
        />
      )}

      {/* Preview Dialog */}
      {previewDoc && (
        <Dialog open={!!previewDoc} onOpenChange={() => closeDocPreview()}>
          <DialogContent className="max-w-3xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-blue-600" />{previewDoc.name}</DialogTitle>
              <DialogDescription>Document Preview</DialogDescription>
            </DialogHeader>
            <div className="w-full h-[70vh] bg-gray-100 rounded-lg flex items-center justify-center">
              {previewDoc.file?.type.startsWith('image/') ? (
                <img src={previewDoc.url} alt={previewDoc.name} className="max-w-full max-h-full object-contain" />
              ) : (
                <iframe src={previewDoc.url} className="w-full h-full rounded-lg" title={previewDoc.name} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
      </div>
    </div>
  );
}