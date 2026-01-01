import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, X } from 'lucide-react';
import { Button } from '../../common/ui/button';
import { Card } from '../../common/ui/card';
import { Input } from '../../common/ui/input';
import { Label } from '../../common/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../common/ui/select';

export default function BillCalculator() {
  const [division, setDivision] = useState('');
  const [divisionCode, setDivisionCode] = useState('');
  const [section, setSection] = useState('');
  const [connectionCategory, setConnectionCategory] = useState('');
  const [connectionType, setConnectionType] = useState('');
  const [pipeSize, setPipeSize] = useState('');
  const [previousUnit, setPreviousUnit] = useState('');
  const [currentUnit, setCurrentUnit] = useState('');
  const [calculatedTax, setCalculatedTax] = useState<number>(0);
  const [consumption, setConsumption] = useState<number>(0);

  // Live calculation as user types
  useEffect(() => {
    if (previousUnit && currentUnit) {
      const prev = parseInt(previousUnit) || 0;
      const curr = parseInt(currentUnit) || 0;
      const cons = curr - prev;
      setConsumption(cons);
      
      let tax = 0;
      if (cons <= 100) {
        tax = cons * 8;
      } else if (cons <= 300) {
        tax = (100 * 8) + ((cons - 100) * 12);
      } else if (cons <= 500) {
        tax = (100 * 8) + (200 * 12) + ((cons - 300) * 18);
      } else {
        tax = (100 * 8) + (200 * 12) + (200 * 18) + ((cons - 500) * 25);
      }
      
      setCalculatedTax(tax);
    } else {
      setCalculatedTax(0);
      setConsumption(0);
    }
  }, [previousUnit, currentUnit]);

  const handleReset = () => {
    setDivision('');
    setDivisionCode('');
    setSection('');
    setConnectionCategory('');
    setConnectionType('');
    setPipeSize('');
    setPreviousUnit('');
    setCurrentUnit('');
    setCalculatedTax(0);
    setConsumption(0);
  };

  return (
    <div className="h-screen water-shimmer relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-orange-400/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-amber-400/20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="w-full max-w-5xl relative z-10">
        {/* Calculator Card - Real Calculator Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-3xl shadow-2xl border-4 border-orange-400/50 relative overflow-hidden mt-[17px] mr-[0px] mb-[0px] ml-[0px]">
            {/* Calculator Display */}
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-5 mb-5 border-4 border-slate-700 shadow-inner">
              <div className="text-right">
                <div className="text-xs text-slate-600 mb-1 font-mono">WATER TAX CALCULATOR v2.0</div>
                <motion.div
                  key={calculatedTax}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-5xl text-slate-900 font-bold font-mono mb-1"
                >
                  ₹ {calculatedTax.toFixed(2)}
                </motion.div>
                <div className="text-xs text-slate-500 font-mono">
                  {consumption > 0 ? `Consumption: ${consumption} units` : 'Enter meter readings to calculate'}
                </div>
              </div>
            </div>

            {/* Calculator Body */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-5 border-2 border-slate-600">
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Location Details Section */}
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-orange-400/30">
                    <div className="text-xs text-orange-400 mb-2 font-semibold uppercase tracking-wider">📍 Location Details</div>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-white text-xs mb-1 block">Municipal Division *</Label>
                        <Select value={division} onValueChange={setDivision}>
                          <SelectTrigger className="bg-slate-800 border-2 border-slate-600 text-white hover:border-orange-400 transition-all h-9 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                            <SelectItem value="pune">Pune</SelectItem>
                            <SelectItem value="nagpur">Nagpur</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-white text-xs mb-1 block">Division Code *</Label>
                        <Select value={divisionCode} onValueChange={setDivisionCode}>
                          <SelectTrigger className="bg-slate-800 border-2 border-slate-600 text-white hover:border-orange-400 transition-all h-9 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a">Division A</SelectItem>
                            <SelectItem value="b">Division B</SelectItem>
                            <SelectItem value="c">Division C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-white text-xs mb-1 block">Ward Section *</Label>
                        <Select value={section} onValueChange={setSection}>
                          <SelectTrigger className="bg-slate-800 border-2 border-slate-600 text-white hover:border-orange-400 transition-all h-9 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a-1">Section A-1</SelectItem>
                            <SelectItem value="a-2">Section A-2</SelectItem>
                            <SelectItem value="b-1">Section B-1</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Connection Details Section */}
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-cyan-400/30">
                    <div className="text-xs text-cyan-400 mb-2 font-semibold uppercase tracking-wider">🔌 Connection Details</div>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-white text-xs mb-1 block">Connection Category *</Label>
                        <Select value={connectionCategory} onValueChange={setConnectionCategory}>
                          <SelectTrigger className="bg-slate-800 border-2 border-slate-600 text-white hover:border-cyan-400 transition-all h-9 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meter">Meter</SelectItem>
                            <SelectItem value="non-meter">Non-Meter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-white text-xs mb-1 block">Connection Type *</Label>
                        <Select value={connectionType} onValueChange={setConnectionType}>
                          <SelectTrigger className="bg-slate-800 border-2 border-slate-600 text-white hover:border-cyan-400 transition-all h-9 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">🏠 Residential</SelectItem>
                            <SelectItem value="commercial">🏢 Commercial</SelectItem>
                            <SelectItem value="industrial">🏭 Industrial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-white text-xs mb-1 block">Pipe Size *</Label>
                        <Select value={pipeSize} onValueChange={setPipeSize}>
                          <SelectTrigger className="bg-slate-800 border-2 border-slate-600 text-white hover:border-cyan-400 transition-all h-9 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">½ inch</SelectItem>
                            <SelectItem value="0.75">¾ inch</SelectItem>
                            <SelectItem value="1">1 inch</SelectItem>
                            <SelectItem value="1.5">1½ inch</SelectItem>
                            <SelectItem value="2">2 inch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Meter Readings Section */}
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-green-400/30 h-full flex flex-col">
                    <div className="text-xs text-green-400 mb-3 font-semibold uppercase tracking-wider">📊 Meter Readings</div>
                    <div className="space-y-3 flex-1 flex flex-col justify-center">
                      <div>
                        <Label className="text-white text-xs mb-2 block">Previous Reading (units) *</Label>
                        <Input
                          type="number"
                          value={previousUnit}
                          onChange={(e) => setPreviousUnit(e.target.value)}
                          placeholder="0"
                          className="bg-slate-800 border-2 border-slate-600 text-white text-3xl font-mono h-16 hover:border-green-400 transition-all tabular-nums text-center"
                        />
                      </div>

                      <div>
                        <Label className="text-white text-xs mb-2 block">Current Reading (units) *</Label>
                        <Input
                          type="number"
                          value={currentUnit}
                          onChange={(e) => setCurrentUnit(e.target.value)}
                          placeholder="0"
                          className="bg-slate-800 border-2 border-slate-600 text-white text-3xl font-mono h-16 hover:border-green-400 transition-all tabular-nums text-center"
                        />
                      </div>
                    </div>

                    {/* Info and Breakdown */}
                    <div className="mt-3 space-y-2">
                      <div className="bg-blue-900/30 border border-blue-400/50 rounded-lg p-2">
                        <div className="text-blue-200 text-xs">
                          <strong>Rate Slabs:</strong> ₹8 (0-100) | ₹12 (101-300) | ₹18 (301-500) | ₹25 (500+)
                        </div>
                      </div>
                      
                      {consumption > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-green-900/30 border border-green-400/50 rounded-lg p-2"
                        >
                          <div className="text-green-200 text-xs">
                            <strong>Breakdown:</strong>
                            {consumption <= 100 && ` ${consumption} × ₹8 = ₹${calculatedTax}`}
                            {consumption > 100 && consumption <= 300 && ` 100×₹8 + ${consumption-100}×₹12 = ₹${calculatedTax}`}
                            {consumption > 300 && consumption <= 500 && ` 100×₹8 + 200×₹12 + ${consumption-300}×₹18 = ₹${calculatedTax}`}
                            {consumption > 500 && ` 100×₹8 + 200×₹12 + 200×₹18 + ${consumption-500}×₹25 = ₹${calculatedTax}`}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculator Button */}
              <div className="mt-4">
                <Button
                  onClick={handleReset}
                  className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg border-2 border-red-400"
                >
                  <X className="h-5 w-5 mr-2" />
                  RESET CALCULATOR
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
