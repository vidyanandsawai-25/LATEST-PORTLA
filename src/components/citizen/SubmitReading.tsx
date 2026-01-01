import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Upload,
  CheckCircle,
  Download,
  Info,
  Building2,
  MapPin,
  Hash,
  Home,
  Droplets,
  FileText,
  Calendar,
  X,
  Sparkles,
  Eye,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { toast } from "sonner@2.0.3";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface SubmitReadingProps {
  user?: any;
}

export function SubmitReading({ user }: SubmitReadingProps) {
  const [quarter, setQuarter] = useState(
    "01/10/2025-31/12/2025",
  );
  const [currentMeterReading, setCurrentMeterReading] =
    useState("");
  const [previousMeterReading] = useState("377");
  const [readingDate, setReadingDate] = useState("");
  const [customDate, setCustomDate] = useState(false);
  const [newMeterReading, setNewMeterReading] = useState("");
  const [uploadedDocument, setUploadedDocument] =
    useState<File | null>(null);
  const [showLastReadings, setShowLastReadings] =
    useState(true);

  // OCR States
  const [meterPhoto, setMeterPhoto] = useState<string | null>(null);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrDetectedReading, setOcrDetectedReading] = useState("");
  const [ocrConfidence, setOcrConfidence] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showMeterImageDialog, setShowMeterImageDialog] = useState(false);

  // Auto-fill consumer data from logged-in user
  const consumerData = {
    nameEn: user?.name || "Ram Sharma",
    address: user?.address || "Kelwadi Bai Clinic",
    zone: "A4",
    ward: "586",
    section: "Residential",
    consumerId: user?.consumerId || "62200",
    connectionNumber:
      user?.connections?.[0]?.consumerNumber || "456789",
    waterMeterNumber:
      user?.connections?.[0]?.meterNumber || "M15-00288",
    numberOfConnections: user?.connections?.length || 15,
    propertyNumber:
      user?.propertyNumber || user?.selectedProperty || "A1-1",
    category:
      user?.connections?.[0]?.connectionType || "Residential",
  };

  // Mock last readings data
  const lastReadings = [
    {
      quarter: "Q3 2024",
      currentReading: "377",
      previousReading: "250",
      consumption: "127",
      date: "15/12/2024",
      status: "Verified",
    },
    {
      quarter: "Q2 2024",
      currentReading: "250",
      previousReading: "180",
      consumption: "70",
      date: "15/09/2024",
      status: "Verified",
    },
    {
      quarter: "Q1 2024",
      currentReading: "180",
      previousReading: "100",
      consumption: "80",
      date: "15/06/2024",
      status: "Verified",
    },
  ];

  const handleDocumentUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocument(file);
      toast.success(`Document uploaded: ${file.name}`);
    }
  };

  // Handle Meter Photo Upload with OCR
  const handleMeterPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      toast.error('Please upload an image or PDF file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setMeterPhoto(imageUrl);
      setUploadedDocument(file);

      // Simulate OCR processing
      setIsOcrProcessing(true);
      toast.info('Processing meter image with AI...', {
        description: 'Detecting meter reading automatically',
      });

      // Simulate OCR detection (in real implementation, call OCR API)
      setTimeout(() => {
        // Generate realistic reading based on previous reading
        const previousValue = parseInt(previousMeterReading);
        const consumption = Math.floor(Math.random() * 50) + 50; // Random consumption between 50-100
        const detectedValue = previousValue + consumption;
        const confidence = Math.floor(Math.random() * 10) + 90; // 90-100% confidence

        setOcrDetectedReading(detectedValue.toString());
        setOcrConfidence(confidence);
        setCurrentMeterReading(detectedValue.toString()); // Auto-fill the field
        setIsOcrProcessing(false);

        toast.success('Meter reading detected!', {
          description: `Reading: ${detectedValue} (${confidence}% confidence)`,
        });
      }, 2500);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmitReading = () => {
    if (!currentMeterReading || !readingDate) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Meter reading submitted successfully!", {
      description:
        "Your reading has been recorded and will be processed shortly.",
    });

    // Reset form
    setCurrentMeterReading("");
    setReadingDate("");
    setNewMeterReading("");
    setUploadedDocument(null);
    setCustomDate(false);
    setMeterPhoto(null);
    setOcrDetectedReading("");
    setOcrConfidence(0);
  };

  return (
    <div className="h-relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 mt-[55px] px-6">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 w-full mt-[20px]">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Camera className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl text-gray-900">
                Submit Meter Reading
              </h1>
              {/* <p className="text-xs text-gray-600">
                Submit your water meter reading for billing
              </p> */}
            </div>
          </div>
        </motion.div>

        {/* Add Reading Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-3 bg-white/80 backdrop-blur-sm border-2 border-green-200 shadow-xl pb-[0-px]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-200">
              <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-sm text-gray-900">
                Add Reading
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Quarter - LOCKED */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-700">
                  Quarter{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={quarter}
                  disabled
                  readOnly
                  className="h-10 border-2 border-gray-300 bg-gray-100 cursor-not-allowed"
                  placeholder="01/10/2025-31/12/2025"
                />
              </div>

              
              

              {/* Previous Meter Reading */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-700">
                  Previous Reading
                </Label>
                <Input
                  value={previousMeterReading}
                  disabled
                  className="h-10 border-2 border-gray-300 bg-gray-100"
                  placeholder="377"
                />
              </div>
              
              {/* Current Meter Reading */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-700">
                  Current Meter Reading{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  value={currentMeterReading}
                  onChange={(e) =>
                    setCurrentMeterReading(e.target.value)
                  }
                  className="h-10 border-2 border-gray-300"
                  placeholder="0"
                />
              </div>

              {/* Reading Date */}
              

              {/* New Meter Reading */}
              

              {/* Upload Meter Photo with OCR */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-700">
                  Upload Meter Photo (AI Auto-detect)
                </Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleMeterPhotoUpload}
                  className="hidden"
                />
                {!meterPhoto ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isOcrProcessing}
                    className="w-full h-10 border-2 border-dashed border-blue-400 rounded-lg bg-white hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isOcrProcessing ? (
                      <>
                        <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                        <span className="text-sm text-blue-600">Processing...</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">Upload Photo</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="relative h-10 border-2 border-green-400 rounded-lg overflow-hidden">
                    <img
                      src={meterPhoto}
                      alt="Meter"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0.5 right-0.5 flex gap-1">
                      <button
                        type="button"
                        onClick={() => setShowMeterImageDialog(true)}
                        className="bg-blue-500 text-white rounded-full p-0.5 hover:bg-blue-600 transition-colors"
                        title="View image"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMeterPhoto(null);
                          setOcrDetectedReading("");
                          setCurrentMeterReading("");
                          setOcrConfidence(0);
                          setUploadedDocument(null);
                        }}
                        className="bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                        title="Delete image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* OCR Detected Reading Display */}
            <AnimatePresence>
              {ocrDetectedReading && !isOcrProcessing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg p-4 flex items-center justify-between shadow-md px-[16px] py-[10px]">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-green-600" />
                      <div>
                        <span className="text-sm text-gray-600">AI Detected Reading:</span>
                        <span className="ml-2 text-lg font-bold text-green-700 font-mono">{ocrDetectedReading}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Confidence:</span>
                      <span className="text-lg font-bold text-green-600">{ocrConfidence}%</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="mt-3 flex justify-center">
              <Button
                onClick={handleSubmitReading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 h-auto shadow-lg hover:shadow-xl transition-all text-sm"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Add Reading
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Last Readings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-xl mt-[0px] mr-[0px] mb-[20px] ml-[0px]">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-blue-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg text-gray-900">
                Last Reading
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-4 py-3 text-left text-sm">
                      Quarter
                    </th>
                    <th className="px-4 py-3 text-left text-sm">
                      Current Reading
                    </th>
                    <th className="px-4 py-3 text-left text-sm">
                      Previous Reading
                    </th>
                    <th className="px-4 py-3 text-left text-sm">
                      Consumption
                    </th>
                    <th className="px-4 py-3 text-left text-sm">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lastReadings.map((reading, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-blue-50/50" : "bg-white"} hover:bg-blue-100/50 transition-colors`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {reading.quarter}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {reading.currentReading}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {reading.previousReading}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {reading.consumption}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {reading.date}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {reading.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Meter Image Preview Dialog */}
      <Dialog open={showMeterImageDialog} onOpenChange={setShowMeterImageDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg">Meter Photo Preview</div>
                {ocrDetectedReading && (
                  <div className="text-sm font-normal text-gray-600 mt-1">
                    AI Detected Reading: <span className="font-bold text-green-600">{ocrDetectedReading}</span> ({ocrConfidence}% confidence)
                  </div>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative px-6 pb-6">
            {meterPhoto && (
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                <img
                  src={meterPhoto}
                  alt="Meter Preview"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
            )}

            {/* Download Button */}
            {meterPhoto && uploadedDocument && (
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = meterPhoto;
                    link.download = uploadedDocument.name || 'meter-photo.jpg';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    toast.success('Image downloaded successfully');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}