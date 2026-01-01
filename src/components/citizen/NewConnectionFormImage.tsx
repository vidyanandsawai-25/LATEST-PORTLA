import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Search,
  Home,
  Upload,
  Droplets,
  ChevronLeft,
  Check,
  Eye,
  Trash2,
  X,
  Loader2,
  FileText,
  CheckCircle2,
  Phone,
} from 'lucide-react';

interface NewConnectionFormImageProps {
  user?: any;
  onBack?: () => void;
}

export function NewConnectionFormImage({ user, onBack }: NewConnectionFormImageProps) {
  // Search State
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Property Details State
  const [zone, setZone] = useState('');
  const [ward, setWard] = useState('');
  const [propertyNo, setPropertyNo] = useState('');
  const [plotFlat, setPlotFlat] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [societyName, setSocietyName] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [locality, setLocality] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  // Connection Details State
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');

  // Documents State
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>({
    aadhaar: null,
    addressProof: null,
    propertyDoc: null,
    photo: null,
    taxReceipt: null,
    societyNOC: null,
  });

  // Form State
  const [declaration, setDeclaration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');

  // Document Viewer State
  const [viewingDoc, setViewingDoc] = useState<{ key: string; file: File } | null>(null);

  // Available wards based on zone
  const availableWards = zone === 'A' ? ['1', '2', '3'] : zone === 'B' ? ['4', '5', '6'] : zone === 'C' ? ['7', '8', '9'] : zone === 'D' ? ['10', '11', '12'] : [];

  // Mock database of properties/consumers
  const mockDatabase = [
    {
      propertyNo: 'P12345',
      consumerId: 'C001',
      mobile: '9876543210',
      email: 'rajesh.kumar@email.com',
      societyName: 'Sunshine Apartments',
      zone: 'A',
      ward: '1',
      plotFlat: '101',
      ownerName: 'Rajesh Kumar',
      buildingType: 'Residential',
      locality: 'MG Road',
      pincode: '400001',
      address: '101, Sunshine Apartments, MG Road, Mumbai'
    },
    {
      propertyNo: 'P67890',
      consumerId: 'C002',
      mobile: '9876543211',
      email: 'priya.sharma@email.com',
      societyName: 'Paradise Tower',
      zone: 'B',
      ward: '4',
      plotFlat: '205',
      ownerName: 'Priya Sharma',
      buildingType: 'Commercial',
      locality: 'Brigade Road',
      pincode: '560001',
      address: '205, Paradise Tower, Brigade Road, Bangalore'
    },
    {
      propertyNo: 'P11111',
      consumerId: 'C003',
      mobile: '9876543212',
      email: 'amit.patel@email.com',
      societyName: 'Green Valley Apartments',
      zone: 'C',
      ward: '7',
      plotFlat: '302',
      ownerName: 'Amit Patel',
      buildingType: 'Residential',
      locality: 'Anna Nagar',
      pincode: '600040',
      address: '302, Green Valley Apartments, Anna Nagar, Chennai'
    },
    {
      propertyNo: 'P22222',
      consumerId: 'C004',
      mobile: '9876543213',
      email: 'sunita.reddy@email.com',
      societyName: 'Royal Residency',
      zone: 'D',
      ward: '10',
      plotFlat: '101',
      ownerName: 'Sunita Reddy',
      buildingType: 'Residential',
      locality: 'Banjara Hills',
      pincode: '500034',
      address: '101, Royal Residency, Banjara Hills, Hyderabad'
    }
  ];

  const handleSearch = () => {
    if (!searchValue.trim()) {
      setSearchError('Please enter Property No, Consumer ID, or Mobile Number');
      return;
    }
    
    setIsSearching(true);
    setSearchError('');
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Search in mock database
      const foundProperty = mockDatabase.find(
        (prop) =>
          prop.propertyNo.toLowerCase() === searchValue.toLowerCase() ||
          prop.consumerId.toLowerCase() === searchValue.toLowerCase() ||
          prop.mobile === searchValue
      );

      if (foundProperty) {
        // Auto-fill the form with found data
        setIsAutoFilled(true);
        setZone(foundProperty.zone);
        setWard(foundProperty.ward);
        setPropertyNo(foundProperty.propertyNo);
        setPlotFlat(foundProperty.plotFlat);
        setOwnerName(foundProperty.ownerName);
        setMobile(foundProperty.mobile);
        setEmail(foundProperty.email);
        setBuildingType(foundProperty.buildingType);
        setLocality(foundProperty.locality);
        setPincode(foundProperty.pincode);
        setAddress(foundProperty.address);
        setSocietyName(foundProperty.societyName);
        setSearchError('');
      } else {
        // Not found - allow manual entry
        setSearchError('Property/Consumer not found. Please enter details manually.');
        setIsAutoFilled(false);
      }
      
      setIsSearching(false);
    }, 1000);
  };

  const handleClearForm = () => {
    setSearchValue('');
    setIsAutoFilled(false);
    setSearchError('');
    setZone('');
    setWard('');
    setPropertyNo('');
    setPlotFlat('');
    setOwnerName('');
    setMobile('');
    setEmail('');
    setSocietyName('');
    setBuildingType('');
    setLocality('');
    setPincode('');
    setAddress('');
    setCategory('');
    setType('');
    setSize('');
    setDocuments({
      aadhaar: null,
      addressProof: null,
      propertyDoc: null,
      photo: null,
      taxReceipt: null,
      societyNOC: null,
    });
    setDeclaration(false);
  };

  const handleFileChange = (key: string, file: File | null) => {
    setDocuments({ ...documents, [key]: file });
  };

  const handleSubmitForm = () => {
    if (!declaration) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', {
        search: searchValue,
        property: { zone, ward, propertyNo, plotFlat, ownerName, mobile, email, societyName, buildingType, locality, pincode, address },
        connection: { category, type, size },
        documents,
        declaration,
      });
      setIsSubmitting(false);
      // Handle success/navigation here
      setApplicationNumber('APP123456789');
      setShowSuccessDialog(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#EBF3FA]">
      {/* Navigation Header - Commented out
      <nav className="relative z-20 bg-gradient-to-r from-[#005AA7] via-[#0077B6] to-[#00C6FF] border-b border-blue-400/30 shadow-lg sticky top-0 mt-[55px] mr-[0px] mb-[0px] ml-[0px] m-[0px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 mt-[0px] mr-[0px] mb-[0px] ml-[-80px]">
              <motion.div
                className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Droplets className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl text-white font-bold">
                  Panvel Municipal Corporation
                </h1>
                <p className="text-sm text-white/90">
                  Water Tax
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {onBack && (
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              )}
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30"
              >
                <Phone className="w-4 h-4 mr-2" />
                Citizen Portal
              </Button>
            </div>
          </div>
        </div>
      </nav>
      */}

      {/* Main Content */}
      <div className="p-0">
        <div className="w-full">
          <div className="bg-white overflow-hidden mt-[60px] mr-[0px] mb-[0px] ml-[0px]">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-[#005AA7] via-[#0077B6] to-[#00C6FF] px-5 py-3 shadow-xl flex items-center gap-3 mt-[3px] mr-[0px] mb-[0px] ml-[0px] m-[0px]">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-white">Register New Application</h1>
                <p className="text-xs text-blue-100">Search consumer or create new connection</p>
              </div>
            </div>

            <div className="bg-white shadow-xl p-3 flex-1 overflow-auto">
              <div className="space-y-3">
                {/* Search Section */}
                <div className="relative bg-white backdrop-blur-xl rounded-xl border-2 border-blue-200/50 p-3 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-cyan-50/30 to-teal-50/50 rounded-2xl pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-t-2xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-900 text-xs">Search Property / Consumer</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            placeholder="Search By UPIC ID/Mobile number/Property No"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="h-9 border-2 border-blue-200/70 focus:border-blue-600 rounded-lg pr-20 text-sm"
                          />
                          {searchValue && (
                            <button
                              onClick={handleClearForm}
                              className="absolute right-10 top-1/2 -translate-y-1/2 p-1 hover:bg-red-100 rounded-full transition-colors group"
                              title="Clear form"
                            >
                              <X className="w-3 h-3 text-red-500 group-hover:text-red-700" />
                            </button>
                          )}
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                        </div>
                        <Button
                          onClick={handleSearch}
                          disabled={isSearching || !searchValue.trim()}
                          className="h-9 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all rounded-lg px-4 text-xs"
                        >
                          {isSearching ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Searching...
                            </>
                          ) : (
                            <>
                              <Search className="w-4 h-4 mr-2" />
                              Search
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    {searchError && (
                      <div className={`text-[10px] mt-2 px-2 py-1 rounded ${searchError.includes('not found') ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                        {searchError}
                      </div>
                    )}
                    {isAutoFilled && !searchError && (
                      <div className="text-[10px] mt-2 px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200">
                        ✓ Property details loaded successfully! Please fill connection details and upload documents.
                      </div>
                    )}
                  </div>
                </div>

                {/* Two Column Layout: Left Column (Property + Connection Details), Right Column (Upload Documents) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  
                  {/* Left Column: Property Details + Connection Details */}
                  <div className="space-y-3">
                    
                    {/* Property Details */}
                    <div className="relative bg-white backdrop-blur-xl rounded-xl border-2 border-green-200/50 p-3 shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-teal-50/30 rounded-xl pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-teal-600 rounded-t-xl" />
                      
                      <div className="relative z-10 space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="w-4 h-4 text-green-600" />
                          <span className="text-green-900 text-xs">Property Details</span>
                        </div>

                        <div className="space-y-1.5">
                          {/* Row 1: Zone No | Ward No | Property No | Flat Number */}
                          <div className="grid grid-cols-4 gap-1.5">
                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Zone No <span className="text-red-500">*</span></Label>
                              <Select value={zone} onValueChange={setZone} disabled={isAutoFilled}>
                                <SelectTrigger className="h-8 border border-gray-200 rounded-md text-[11px]">
                                  <SelectValue placeholder="Zone" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="A">A</SelectItem>
                                  <SelectItem value="B">B</SelectItem>
                                  <SelectItem value="C">C</SelectItem>
                                  <SelectItem value="D">D</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Ward No <span className="text-red-500">*</span></Label>
                              <Select value={ward} onValueChange={setWard} disabled={isAutoFilled || !zone}>
                                <SelectTrigger className="h-8 border border-gray-200 rounded-md text-[11px]">
                                  <SelectValue placeholder="Ward" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableWards.map((wardOption) => (
                                    <SelectItem key={wardOption} value={wardOption}>{wardOption}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Property No <span className="text-red-500">*</span></Label>
                              <Input
                                value={propertyNo}
                                onChange={(e) => setPropertyNo(e.target.value)}
                                placeholder="Property"
                                className="h-8 border border-gray-200 rounded-md text-[11px]"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Flat no/Wing no</Label>
                              <Input
                                value={plotFlat}
                                onChange={(e) => setPlotFlat(e.target.value)}
                                placeholder="Flat"
                                className="h-8 border border-gray-200 rounded-md text-[11px]"
                              />
                            </div>
                          </div>

                          {/* Row 2: Owner Name | Mobile Number */}
                          <div className="grid grid-cols-3 gap-1.5">
                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Owner Name <span className="text-red-500">*</span></Label>
                              <Input
                                value={ownerName}
                                onChange={(e) => setOwnerName(e.target.value)}
                                placeholder="Owner Name"
                                className="h-8 border border-gray-200 rounded-md text-[11px]"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Mobile No <span className="text-red-500">*</span></Label>
                              <Input
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Mobile Number"
                                className="h-8 border border-gray-200 rounded-md text-[11px]"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Society Name <span className="text-red-500">*</span></Label>
                              <Input
                                value={societyName}
                                onChange={(e) => setSocietyName(e.target.value)}
                                placeholder="Society Name"
                                className="h-8 border border-gray-200 rounded-md text-[11px]"
                              />
                            </div>
                          </div>

                          {/* Row 3: Building Type | Locality | Pincode */}
                          <div className="grid grid-cols-3 gap-1.5">
                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Building Type</Label>
                              <Input
                                value={buildingType}
                                onChange={(e) => setBuildingType(e.target.value)}
                                placeholder="Building"
                                className="h-8 border border-gray-200 rounded-md text-[11px]"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Locality</Label>
                              <Input
                                value={locality}
                                onChange={(e) => setLocality(e.target.value)}
                                placeholder="Locality"
                                className="h-8 border border-gray-200 rounded-md text-[11px]"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Pincode</Label>
                              <Input
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                placeholder="Pincode"
                                className="h-8 border border-gray-200 rounded-md text-[11px]"
                              />
                            </div>
                          </div>

                          {/* Row 4: Address (Full Width) */}
                          
                        </div>
                      </div>
                    
                    <div className="grid grid-cols-3 gap-1.5">
                          <div className="space-y-0.5">
                            <Label className="text-[9px]">Email <span className="text-red-500">*</span></Label>
                            <Input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email address"
                              className=" border border-gray-200 rounded-md text-[11px]"
                            />
                          </div>   
                          <div className="space-y-0.5">
                            <Label className="text-[9px]">Address <span className="text-red-500">*</span></Label>
                            <Textarea
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Full address"
                              className="border border-gray-200 rounded-md text-[11px] resize-none min-h-0"
                              rows={2}
                            />
                          </div>
                          
                    </div>
                      </div>
                    {/* Connection Details */}
                    <div className="relative bg-white backdrop-blur-xl rounded-xl border-2 border-cyan-200/50 p-3 shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-blue-50/20 to-teal-50/30 rounded-xl pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-t-xl" />
                      
                      <div className="relative z-10 space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-cyan-600" />
                          <span className="text-cyan-900 text-xs">Connection Details</span>
                        </div>

                        <div className="space-y-1.5">
                          {/* Single Row: Category | Type | Size */}
                          <div className="grid grid-cols-3 gap-1.5">
                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Connection Category <span className="text-red-500">*</span></Label>
                              <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="h-8 border border-gray-200 rounded-md text-[11px]">
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Domestic">Domestic</SelectItem>
                                  <SelectItem value="Commercial">Commercial</SelectItem>
                                  <SelectItem value="Industrial">Industrial</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Connection Type <span className="text-red-500">*</span></Label>
                              <Select value={type} onValueChange={setType}>
                                <SelectTrigger className="h-8 border border-gray-200 rounded-md text-[11px]">
                                  <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Metered">Metered</SelectItem>
                                  <SelectItem value="Non-Metered">Non-Metered</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px]">Connection Size <span className="text-red-500">*</span></Label>
                              <Select value={size} onValueChange={setSize}>
                                <SelectTrigger className="h-8 border border-gray-200 rounded-md text-[11px]">
                                  <SelectValue placeholder="Size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="15mm">15mm</SelectItem>
                                  <SelectItem value="20mm">20mm</SelectItem>
                                  <SelectItem value="25mm">25mm</SelectItem>
                                  <SelectItem value="32mm">32mm</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Upload Documents */}
                  <div className="relative bg-white backdrop-blur-xl rounded-xl border-2 border-purple-200/50 p-3 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-purple-50/30 rounded-xl pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-xl" />
                    
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Upload className="w-4 h-4 text-purple-600" />
                        <span className="text-purple-900 text-xs">Upload Documents</span>
                      </div>

                      <div className="bg-white rounded-lg border border-purple-200 overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                              <th className="px-2 py-1.5 text-left text-[10px]">Document</th>
                              <th className="px-2 py-1.5 text-left text-[10px]">File</th>
                              <th className="px-2 py-1.5 text-center text-[10px] w-16">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { key: 'aadhaar', label: 'Aadhaar Card' },
                              { key: 'addressProof', label: 'Address Proof' },
                              { key: 'propertyDoc', label: 'Property Doc' },
                              { key: 'photo', label: 'Photograph' },
                              { key: 'taxReceipt', label: 'Tax Receipt' },
                              { key: 'societyNOC', label: 'Society NOC' },
                            ].map((doc, index) => (
                              <tr key={doc.key} className={`border-b border-purple-100 ${index % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}`}>
                                <td className="px-2 py-1.5">
                                  <span className="text-[10px] text-gray-700">{doc.label}</span>
                                </td>
                                <td className="px-2 py-1.5">
                                  {documents[doc.key] ? (
                                    <span className="text-[10px] text-green-700 font-medium">{documents[doc.key]?.name}</span>
                                  ) : (
                                    <Input
                                      type="file"
                                      onChange={(e) => handleFileChange(doc.key, e.target.files?.[0] || null)}
                                      className="h-7 border border-gray-200 rounded text-[9px] file:mr-2 file:h-5 file:px-2 file:rounded file:border-0 file:text-[9px] file:bg-purple-100 file:text-purple-700"
                                    />
                                  )}
                                </td>
                                <td className="px-2 py-1.5 text-center">
                                  {documents[doc.key] && (
                                    <div className="flex gap-1 justify-center">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setViewingDoc({ key: doc.key, file: documents[doc.key]! })}
                                        className="h-6 w-6 p-0 hover:bg-blue-100"
                                        title="View document"
                                      >
                                        <Eye className="w-3 h-3 text-blue-600" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleFileChange(doc.key, null)}
                                        className="h-6 w-6 p-0 hover:bg-red-100"
                                        title="Delete document"
                                      >
                                        <X className="w-3 h-3 text-red-600" />
                                      </Button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-[9px] text-purple-700 bg-purple-50 border border-purple-200 rounded-md p-2">
                        <strong>Note:</strong> Supported formats: PDF, JPG, PNG (Max 2MB each)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Declaration & Submit */}
                <div className="relative bg-white backdrop-blur-xl rounded-xl border-2 border-blue-200/50 p-3 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-teal-50/20 to-cyan-50/30 rounded-xl pointer-events-none" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-md p-2">
                      <Checkbox
                        checked={declaration}
                        onCheckedChange={(checked) => setDeclaration(checked as boolean)}
                        className="mt-0.5"
                      />
                      <label className="text-[10px] text-gray-700 cursor-pointer" onClick={() => setDeclaration(!declaration)}>
                        I declare that all information provided is true and correct.
                      </label>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <Button
                        onClick={onBack}
                        variant="outline"
                        className="h-9 px-4 border-2 border-gray-300 hover:border-gray-400 rounded-lg text-xs"
                      >
                        <ChevronLeft className="w-3 h-3 mr-1" />
                        Back
                      </Button>

                      <Button
                        onClick={handleSubmitForm}
                        disabled={isSubmitting || !declaration}
                        className="h-9 px-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white shadow-md rounded-lg text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Check className="w-3 h-3 mr-2" />
                            Submit
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Application Submitted Successfully!</DialogTitle>
            <DialogDescription className="text-sm">
              Your application number is <strong>{applicationNumber}</strong>. Please keep it for future reference.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="h-9 px-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white shadow-md rounded-lg text-xs"
            >
              <CheckCircle2 className="w-3 h-3 mr-2" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Viewer Dialog */}
      <Dialog open={viewingDoc !== null} onOpenChange={(open) => !open && setViewingDoc(null)}>
        <DialogContent className="max-w-[700px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>
              Viewing: {viewingDoc?.file.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 min-h-[400px]">
            {viewingDoc?.file && (
              viewingDoc.file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(viewingDoc.file)}
                  alt={viewingDoc.file.name}
                  className="max-w-full max-h-[60vh] object-contain rounded"
                />
              ) : viewingDoc.file.type === 'application/pdf' ? (
                <iframe
                  src={URL.createObjectURL(viewingDoc.file)}
                  className="w-full h-[60vh] rounded"
                  title={viewingDoc.file.name}
                />
              ) : (
                <div className="text-center text-gray-600">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm">Preview not available for this file type</p>
                  <p className="text-xs mt-2">{viewingDoc.file.name}</p>
                </div>
              )
            )}
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setViewingDoc(null)}
              variant="outline"
              className="h-9 px-5 rounded-lg text-xs"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}