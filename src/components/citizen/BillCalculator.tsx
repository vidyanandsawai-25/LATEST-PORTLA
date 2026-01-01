import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import {
  Calculator,
  Droplet,
  Info,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function BillCalculator() {
  // Form fields matching the images
  const [division, setDivision] = useState(""); // विभाग (Division)
  const [divisionCode, setDivisionCode] = useState(""); // Division (A, B, C)
  const [section, setSection] = useState(""); // Section (A-1, A-2, etc.)
  const [connectionCategory, setConnectionCategory] = useState(""); // नळ जोडनी प्रकार (Regular/Annual)
  const [connectionType, setConnectionType] = useState(""); // Connection Type (Residential/Commercial)
  const [isMeter, setIsMeter] = useState(true); // Meter or Non-Meter
  const [connectionSize, setConnectionSize] = useState(""); // नळ आकार (Connection Size)
  const [previousReading, setPreviousReading] = useState(""); // Previous Reading (for Meter only)
  const [currentReading, setCurrentReading] = useState(""); // Current Reading (for Meter only)
  const [consumedUnits, setConsumedUnits] = useState(0); // Consumed Units (calculated for Meter)
  const [rate, setRate] = useState(0); // Rate (calculated)
  const [totalTax, setTotalTax] = useState(0); // Total Tax (calculated)
  const [showCalculationDialog, setShowCalculationDialog] = useState(false);
  
  // Rate mapping based on connection type (per unit for Meter)
  const getRateByConnectionType = (type: string): number => {
    const rates: { [key: string]: number } = {
      'residential': 8,
      'commercial': 15,
      'industrial': 25,
    };
    return rates[type] || 0;
  };

  // Fixed rates for Non-Meter connections
  const getFixedRateByConnectionType = (type: string): number => {
    const fixedRates: { [key: string]: number } = {
      'residential': 500,      // Fixed monthly rate for residential
      'commercial': 1500,      // Fixed monthly rate for commercial
      'industrial': 3000,      // Fixed monthly rate for industrial
    };
    return fixedRates[type] || 0;
  };

  const handleCalculate = () => {
    if (!connectionType) return;

    if (isMeter) {
      // Meter logic: Current Reading - Previous Reading, then multiply by rate
      if (!previousReading || !currentReading) return;
      
      const prevReading = parseFloat(previousReading) || 0;
      const currReading = parseFloat(currentReading) || 0;
      const units = currReading - prevReading;
      
      if (units < 0) {
        alert("Current reading cannot be less than previous reading!");
        return;
      }
      
      const calculatedRate = getRateByConnectionType(connectionType);
      const calculatedTotalTax = units * calculatedRate;
      
      setConsumedUnits(units);
      setRate(calculatedRate);
      setTotalTax(calculatedTotalTax);
      setShowCalculationDialog(true);
    } else {
      // Non-Meter logic: Fixed rate based on connection type
      const fixedBill = getFixedRateByConnectionType(connectionType);
      setConsumedUnits(0); // No units for non-meter
      setRate(fixedBill);
      setTotalTax(fixedBill);
      setShowCalculationDialog(true);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] overflow-hidden bg-[#EBF3FA] mt-[75px]">
      {/* Animated Background Orbs */}
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

      <div className="relative z-10 w-full h-full flex flex-col px-6 py-3">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Calculator className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Water Tax Calculator</h1>
              <p className="text-sm text-gray-600">Calculate your estimated water bill</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
          {/* Left Column: Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-100 shadow-sm">
              <div className="p-4 border-b-2 border-blue-100 px-[16px] py-[3px]">
                <div className="flex items-center gap-2 px-[0px] py-[3px]">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                    <Droplet className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-base font-bold text-gray-900">Calculate Water Tax</h2>
                </div>
              </div>

              <div className="space-y-3 pt-[15px] pr-[16px] pb-[15px] pl-[10px]">
                {/* {/* Division */}
                {/* <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Division <span className="text-red-500">*</span>
                  </Label>
                  <Select value={division} onValueChange={setDivision}>
                    <SelectTrigger className="h-9 text-sm border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="division1">Division 1</SelectItem>
                      <SelectItem value="division2">Division 2</SelectItem>
                      <SelectItem value="division3">Division 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                {/* Division Code */}
                {/* <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Division Code <span className="text-red-500">*</span>
                  </Label>
                  <Select value={divisionCode} onValueChange={setDivisionCode}>
                    <SelectTrigger className="h-9 text-sm border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <SelectValue placeholder="Select Division Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                {/* Section */}
                {/* <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Section <span className="text-red-500">*</span>
                  </Label>
                  <Select value={section} onValueChange={setSection}>
                    <SelectTrigger className="h-9 text-sm border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A-1">A-1</SelectItem>
                      <SelectItem value="A-2">A-2</SelectItem>
                      <SelectItem value="B-1">B-1</SelectItem>
                      <SelectItem value="B-2">B-2</SelectItem>
                      <SelectItem value="C-1">C-1</SelectItem>
                      <SelectItem value="C-2">C-2</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                {/* Connection Category */}
                {/* <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Connection Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={connectionCategory} onValueChange={setConnectionCategory}>
                    <SelectTrigger className="h-9 text-sm border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <SelectValue placeholder="Select Connection Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>  */}

                {/* Connection Type */}
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Connection Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={connectionType} onValueChange={setConnectionType}>
                    <SelectTrigger className="h-9 text-sm border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <SelectValue placeholder="Select Connection Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Meter or Non-Meter */}
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Meter or Non-Meter <span className="text-red-500">*</span>
                  </Label>
                  <Select value={isMeter ? "meter" : "non-meter"} onValueChange={(value) => setIsMeter(value === "meter")}>
                    <SelectTrigger className="h-9 text-sm border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <SelectValue placeholder="Select Meter Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meter">Meter</SelectItem>
                      <SelectItem value="non-meter">Non-Meter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Connection Size */}
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Connection Size <span className="text-red-500">*</span>
                  </Label>
                  <Select value={connectionSize} onValueChange={setConnectionSize}>
                    <SelectTrigger className="h-9 text-sm border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <SelectValue placeholder="Select Connection Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">1/2"</SelectItem>
                      <SelectItem value="0.75">3/4"</SelectItem>
                      <SelectItem value="1">1"</SelectItem>
                      <SelectItem value="1.5">1 1/2"</SelectItem>
                      <SelectItem value="2">2"</SelectItem>
                      <SelectItem value="3">3"</SelectItem>
                      <SelectItem value="4">4"</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Previous Reading (for Meter only) */}
                {isMeter && (
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                      Previous Reading <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      value={previousReading}
                      onChange={(e) => setPreviousReading(e.target.value)}
                      placeholder="Enter previous reading"
                      className="h-9 text-sm border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}

                {/* Current Reading (for Meter only) */}
                {isMeter && (
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">
                      Current Reading <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      value={currentReading}
                      onChange={(e) => setCurrentReading(e.target.value)}
                      placeholder="Enter current reading"
                      className="h-9 text-sm border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}

                {/* Calculate Button */}
                <Button
                  onClick={handleCalculate}
                  disabled={!connectionType || (isMeter && (!previousReading || !currentReading))}
                  className="w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-sm font-semibold shadow-lg"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Bill
                </Button>

                {/* Important Notes */}
                {/* <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                  <div className="flex gap-2">
                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-blue-900 mb-1">Important Notes:</p>
                      <ul className="text-[10px] text-blue-800 space-y-0.5 list-disc list-inside">
                        <li>Rates are subject to municipal policies</li>
                        <li>Additional charges like sewerage tax may apply</li>
                        <li>This calculator provides an estimate only</li>
                        <li>Pipe size affects fixed charges and billing</li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Rate Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-cyan-100 shadow-sm">
              <div className="p-4 border-b-2 border-cyan-100 px-[16px] py-[3px]">
                <div className="flex items-center gap-2 px-[0px] py-[3px]">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-base font-bold text-gray-900">Rate Information</h2>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Meter Connection Rates (Per Unit)</h3>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {/* Residential Rate */}
                    <motion.div 
                      className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <p className="text-xs text-gray-600 mb-1">Residential</p>
                      <p className="text-lg text-green-600 font-mono font-bold">₹8/unit</p>
                    </motion.div>

                    {/* Commercial Rate */}
                    <motion.div 
                      className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <p className="text-xs text-gray-600 mb-1">Commercial</p>
                      <p className="text-lg text-blue-600 font-mono font-bold">₹15/unit</p>
                    </motion.div>

                    {/* Industrial Rate */}
                    <motion.div 
                      className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <p className="text-xs text-gray-600 mb-1">Industrial</p>
                      <p className="text-lg text-orange-600 font-mono font-bold">₹25/unit</p>
                    </motion.div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Non-Meter Fixed Monthly Rates</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Residential Fixed */}
                    <motion.div 
                      className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-xl p-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <p className="text-xs text-gray-600 mb-1">Residential</p>
                      <p className="text-lg text-purple-600 font-mono font-bold">₹500/mo</p>
                    </motion.div>

                    {/* Commercial Fixed */}
                    <motion.div 
                      className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <p className="text-xs text-gray-600 mb-1">Commercial</p>
                      <p className="text-lg text-indigo-600 font-mono font-bold">₹1500/mo</p>
                    </motion.div>

                    {/* Industrial Fixed */}
                    <motion.div 
                      className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <p className="text-xs text-gray-600 mb-1">Industrial</p>
                      <p className="text-lg text-pink-600 font-mono font-bold">₹3000/mo</p>
                    </motion.div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-3">
                  <div className="flex gap-2">
                    <Info className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 mb-1">Billing Information</p>
                      <ul className="text-[10px] text-gray-700 space-y-0.5 list-disc list-inside">
                        <li>Meter rates are per unit of water consumed</li>
                        <li>Non-meter connections have fixed monthly charges</li>
                        <li>Minimum charges may apply based on pipe size</li>
                        <li>Sewerage and maintenance fees are additional</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Calculation Summary Dialog */}
      <Dialog open={showCalculationDialog} onOpenChange={setShowCalculationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              Calculation Summary
            </DialogTitle>
            <DialogDescription>
              Your estimated water bill calculation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Calculation Display */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200">
              {isMeter ? (
                // Meter Calculation Display
                <>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Previous Reading */}
                    <div className="text-center">
                      <Label className="text-xs text-gray-600 mb-2 block">Previous Reading</Label>
                      <div className="bg-white rounded-lg p-3 border-2 border-gray-300 shadow-sm">
                        <p className="text-2xl text-gray-900 font-mono font-bold">{parseFloat(previousReading).toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Current Reading */}
                    <div className="text-center">
                      <Label className="text-xs text-gray-600 mb-2 block">Current Reading</Label>
                      <div className="bg-white rounded-lg p-3 border-2 border-gray-300 shadow-sm">
                        <p className="text-2xl text-gray-900 font-mono font-bold">{parseFloat(currentReading).toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Consumed Units */}
                    <div className="text-center">
                      <Label className="text-xs text-gray-600 mb-2 block">Consumed Units</Label>
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg p-3 border-2 border-blue-400 shadow-md">
                        <p className="text-2xl text-white font-mono font-bold">{consumedUnits.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Formula: (Current - Previous) × Rate = Total */}
                  <div className="flex items-center justify-center gap-2 text-gray-700 bg-white rounded-lg p-3 border-2 border-gray-300 mb-4">
                    <span className="text-sm text-gray-600">({parseFloat(currentReading).toFixed(2)} - {parseFloat(previousReading).toFixed(2)}) × ₹{rate.toFixed(2)} =</span>
                    <span className="text-2xl font-mono text-green-600 font-bold">₹{totalTax.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Rate per Unit */}
                    <div className="text-center">
                      <Label className="text-xs text-gray-600 mb-2 block">Rate per Unit</Label>
                      <div className="bg-white rounded-lg p-3 border-2 border-gray-300 shadow-sm">
                        <p className="text-xl text-gray-900 font-mono font-bold">₹{rate.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Total Bill */}
                    <div className="text-center">
                      <Label className="text-xs text-gray-600 mb-2 block">Total Bill</Label>
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-3 border-2 border-green-400 shadow-md">
                        <p className="text-xl text-white font-mono font-bold">₹{totalTax.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Non-Meter Fixed Rate Display
                <>
                  <div className="text-center mb-4">
                    <Label className="text-sm text-gray-600 mb-3 block">Fixed Monthly Rate</Label>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-6 border-2 border-green-400 shadow-md inline-block">
                      <p className="text-4xl text-white font-mono font-bold">₹{totalTax.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Fixed rate for <span className="font-semibold">{connectionType === 'residential' ? 'Residential' : connectionType === 'commercial' ? 'Commercial' : 'Industrial'}</span> Non-Meter connection
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-2">Calculation Details:</p>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li><strong>Connection Type:</strong> {connectionType === 'residential' ? 'Residential' : connectionType === 'commercial' ? 'Commercial' : 'Industrial'}</li>
                    <li><strong>Meter Type:</strong> {isMeter ? 'Meter' : 'Non-Meter (Fixed Rate)'}</li>
                    <li><strong>Pipe Size:</strong> {connectionSize ? `${connectionSize}\"` : 'Not selected'}</li>
                    {isMeter ? (
                      <>
                        <li><strong>Consumed Units:</strong> {consumedUnits.toFixed(2)} units</li>
                        <li><strong>Rate per Unit:</strong> ₹{rate.toFixed(2)}</li>
                      </>
                    ) : (
                      <li><strong>Fixed Monthly Rate:</strong> ₹{rate.toFixed(2)}</li>
                    )}
                    <li>This is an estimated calculation. Actual charges may vary based on additional fees and taxes.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCalculationDialog(false)}
                className="h-9"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  // Reset form
                  setDivision("");
                  setDivisionCode("");
                  setSection("");
                  setConnectionCategory("");
                  setConnectionType("");
                  setIsMeter(true);
                  setConnectionSize("");
                  setPreviousReading("");
                  setCurrentReading("");
                  setConsumedUnits(0);
                  setRate(0);
                  setTotalTax(0);
                  setShowCalculationDialog(false);
                }}
                className="h-9 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Calculator className="w-4 h-4 mr-2" />
                New Calculation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}