import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import {
  CreditCard,
  Home,
  Droplets,
  Building,
  FileText,
  CheckCircle,
  ArrowRight,
  User,
  ArrowLeft,
  Smartphone,
  Wallet,
  Building2,
  Download,
  Shield,
  Lock,
  QrCode,
  Check,
  AlertCircle,
  Clock,
  Calendar,
  Receipt,
  X,
  IndianRupee,
  Eye,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { toast } from "sonner@2.0.3";

interface PayBillsProps {
  user: any;
}

export function PayBills({ user }: PayBillsProps) {
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [viewDetailsBill, setViewDetailsBill] =
    useState<any>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<string>("");
  const [saveCard, setSaveCard] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [completedPayment, setCompletedPayment] =
    useState<any>(null);

  // OTP States
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  // Get connections from user data (filtered by selected property)
  const connections = user?.connections || [];
  const selectedPropertyNumber =
    user?.propertyNumber || user?.selectedProperty;

  // Mock bill details for all connections
  const allBills = [
    // Property A1-1 bills
    {
      id: "BILL-2025-001",
      consumerNumber: "WC-2025-001",
      propertyNumber: "A1-1",
      connectionCategory: "Residential",
      connectionType: "Metered",
      connectionSize: "15mm",
      billingFrequency: "niyamit",
      meterType: "meter",
      billMonth: "December 2025",
      billDate: "Dec 01, 2025",
      dueDate: "Dec 30, 2025",
      meterReading: {
        previous: 1200,
        current: 1245,
        consumption: 45,
      },
      charges: {
        waterCharges: 1125,
        sewerage: 100,
        gst: 50,
        total: 1275,
      },
      status: "Pending",
      dueAmount: 1275,
      address: "123, MG Road, Zone A, Ward 5",
    },
    {
      id: "BILL-2025-002",
      consumerNumber: "WC-2025-002",
      propertyNumber: "A1-1",
      connectionCategory: "Residential",
      connectionType: "Metered",
      connectionSize: "20mm",
      billingFrequency: "niyamit",
      meterType: "meter",
      billMonth: "December 2025",
      billDate: "Dec 01, 2025",
      dueDate: "Jan 05, 2026",
      meterReading: {
        previous: 856,
        current: 890,
        consumption: 34,
      },
      charges: {
        waterCharges: 850,
        sewerage: 85,
        gst: 47,
        total: 982,
      },
      status: "Pending",
      dueAmount: 982,
      address: "123, MG Road, Zone A, Ward 5 - Shop",
    },
    // Property B2-5 bills
    {
      id: "BILL-2025-003",
      consumerNumber: "WC-2025-003",
      propertyNumber: "B2-5",
      connectionCategory: "Commercial",
      connectionType: "Metered",
      connectionSize: "25mm",
      billMonth: "December 2025",
      billDate: "Dec 01, 2025",
      dueDate: "Dec 28, 2025",
      meterReading: {
        previous: 2280,
        current: 2340,
        consumption: 60,
      },
      charges: {
        waterCharges: 2400,
        sewerage: 240,
        gst: 132,
        total: 2772,
      },
      status: "Pending",
      dueAmount: 2772,
      address: "456, Park Street, Zone B, Ward 8",
    },
    {
      id: "BILL-2025-004",
      consumerNumber: "WC-2025-004",
      propertyNumber: "B2-5",
      connectionCategory: "Commercial",
      connectionType: "Metered",
      connectionSize: "20mm",
      billMonth: "December 2025",
      billDate: "Dec 01, 2025",
      dueDate: "Jan 10, 2026",
      meterReading: {
        previous: 2280,
        current: 2340,
        consumption: 60,
      },
      charges: {
        waterCharges: 1800,
        sewerage: 180,
        gst: 99,
        total: 2079,
      },
      status: "Paid",
      dueAmount: 0,
      paidDate: "Dec 05, 2025",
      paidAmount: 2079,
      paymentMode: "UPI",
      transactionId: "TXN2025001234",
      address: "456, Park Street, Zone B, Ward 8 - Unit 2",
    },
    {
      id: "BILL-2025-005",
      consumerNumber: "WC-2025-005",
      propertyNumber: "B2-5",
      connectionCategory: "Commercial",
      connectionType: "Metered",
      connectionSize: "15mm",
      billMonth: "December 2025",
      billDate: "Dec 01, 2025",
      dueDate: "Dec 31, 2025",
      meterReading: {
        previous: 620,
        current: 650,
        consumption: 30,
      },
      charges: {
        waterCharges: 900,
        sewerage: 90,
        gst: 50,
        total: 1040,
      },
      status: "Pending",
      dueAmount: 1040,
      address: "456, Park Street, Zone B, Ward 8 - Unit 3",
    },
    // Property C3-12 bill
    {
      id: "BILL-2025-006",
      consumerNumber: "WC-2025-006",
      propertyNumber: "C3-12",
      connectionCategory: "Residential",
      connectionType: "Metered",
      connectionSize: "15mm",
      billMonth: "December 2025",
      billDate: "Dec 01, 2025",
      dueDate: "Jan 02, 2026",
      meterReading: {
        previous: 750,
        current: 780,
        consumption: 30,
      },
      charges: {
        waterCharges: 750,
        sewerage: 75,
        gst: 41,
        total: 866,
      },
      status: "Pending",
      dueAmount: 866,
      address: "789, Lake View, Zone A, Ward 5",
    },
    // Property D1-8 bills
    {
      id: "BILL-2025-007",
      consumerNumber: "WC-2025-007",
      propertyNumber: "D1-8",
      connectionCategory: "Industrial",
      connectionType: "Metered",
      connectionSize: "40mm",
      billMonth: "December 2025",
      billDate: "Dec 01, 2025",
      dueDate: "Dec 27, 2025",
      meterReading: {
        previous: 5500,
        current: 5640,
        consumption: 140,
      },
      charges: {
        waterCharges: 8400,
        sewerage: 840,
        gst: 462,
        total: 9702,
      },
      status: "Pending",
      dueAmount: 9702,
      address: "321, Green Valley, Zone C, Ward 12 - Main Unit",
    },
    {
      id: "BILL-2025-008",
      consumerNumber: "WC-2025-008",
      propertyNumber: "D1-8",
      connectionCategory: "Industrial",
      connectionType: "Metered",
      connectionSize: "25mm",
      billMonth: "December 2025",
      billDate: "Dec 01, 2025",
      dueDate: "Jan 08, 2026",
      meterReading: {
        previous: 3100,
        current: 3200,
        consumption: 100,
      },
      charges: {
        waterCharges: 6000,
        sewerage: 600,
        gst: 330,
        total: 6930,
      },
      status: "Paid",
      dueAmount: 0,
      paidDate: "Nov 28, 2025",
      paidAmount: 6930,
      paymentMode: "Card",
      transactionId: "TXN2025005678",
      address:
        "321, Green Valley, Zone C, Ward 12 - Secondary Unit",
    },
  ];

  // Filter bills for the selected property
  const propertyBills = allBills.filter(
    (bill) => bill.propertyNumber === selectedPropertyNumber,
  );
  const pendingBills = propertyBills.filter(
    (bill) => bill.status === "Pending",
  );
  const paidBills = propertyBills.filter(
    (bill) => bill.status === "Paid",
  );
  const totalDue = pendingBills.reduce(
    (sum, bill) => sum + bill.dueAmount,
    0,
  );

  const handlePayNow = (bill: any) => {
    setSelectedBill(bill);
    setPaymentMethod("");
  };

  const handleViewDetails = (bill: any) => {
    setViewDetailsBill(bill);
  };

  const handleDownloadBill = (bill: any) => {
    toast.success(`Bill ${bill.id} downloaded successfully!`);
    // In real app, trigger actual download
  };

  const handleClosePayment = () => {
    setSelectedBill(null);
    setPaymentMethod("");
    setSaveCard(false);
    setShowOtpStep(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpSent(false);
    setResendTimer(30);
  };

  const handleProceedToOtp = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    // Simulate sending OTP
    setShowOtpStep(true);
    setOtpSent(true);
    toast.success(
      `OTP sent to registered mobile number ending with ****${user?.mobile?.slice(-4) || "1234"}`,
    );

    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`,
      );
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`,
      );
      prevInput?.focus();
    }
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setResendTimer(30);
    setOtpSent(true);
    toast.success("OTP resent successfully!");

    // Restart countdown
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtpAndPay = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    // Simulate OTP verification (in real app, verify with backend)
    const correctOtp = "123456"; // Mock OTP for demo

    if (enteredOtp !== correctOtp && enteredOtp !== "111111") {
      toast.error("Invalid OTP. Please try again.");
      return;
    }

    toast.success("OTP verified successfully!");
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const txnId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setTransactionId(txnId);
      setCompletedPayment({
        ...selectedBill,
        transactionId: txnId,
        paymentMethod: paymentMethod,
        paidDate: new Date().toLocaleString(),
      });
      setProcessing(false);
      setShowSuccess(true);
      setSelectedBill(null);
      toast.success("Payment successful!");
    }, 3000);
  };

  const downloadReceipt = () => {
    toast.success("Receipt downloaded successfully");
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setCompletedPayment(null);
    setPaymentMethod("");
    setSaveCard(false);
    setTransactionId("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header with Gradient */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-6 relative z-10">
        <div className="w-full mx-auto mt-[44px] mr-[0px] mb-[0px] ml-[0px]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                  >
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl text-gray-900 flex items-center gap-2">
                      Pay Bills
                      <Sparkles className="w-6 h-6 text-yellow-500" />
                    </h1>
                    <p className="text-sm text-gray-600">
                      Property {selectedPropertyNumber} •{" "}
                      {propertyBills.length}{" "}
                      {propertyBills.length === 1
                        ? "Bill"
                        : "Bills"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="flex gap-3 flex-wrap">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl px-6 py-3 shadow-lg">
                  <p className="text-xs opacity-90">
                    Total Outstanding
                  </p>
                  <p className="text-2xl">
                    ₹{totalDue.toLocaleString()}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl px-6 py-3 shadow-lg">
                  <p className="text-xs opacity-90">
                    Paid Bills
                  </p>
                  <p className="text-2xl">{paidBills.length}</p>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-500 text-white rounded-xl px-6 py-3 shadow-lg">
                  <p className="text-xs opacity-90">Pending</p>
                  <p className="text-2xl">
                    {pendingBills.length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative z-10">
        <div className="h-full w-full mx-auto px-4 sm:px-6">
          <div className="h-full overflow-hidden pb-6">
            {/* All Bills - Grid Layout */}
            {propertyBills.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
                {propertyBills.map((bill, index) => (
                  <motion.div
                    key={bill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`overflow-hidden border-2 shadow-xl transition-all duration-300 h-full ${
                        bill.status === "Pending"
                          ? "border-green-300 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
                          : "border-green-300 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
                      }`}
                    >
                      {/* Status Ribbon */}
                      <div
                        className={`h-2 ${
                          bill.status === "Pending"
                            ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
                            : "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
                        }`}
                      />

                      <div className="p-6">
                        {/* Bill Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <h3 className="text-xl text-gray-900">
                                {bill.id}
                              </h3>
                              <Badge
                                className={`${
                                  bill.status === "Pending"
                                    ? "bg-gradient-to-r from-green-600 to-emerald-600"
                                    : "bg-gradient-to-r from-green-600 to-emerald-600"
                                } text-white shadow-lg`}
                              >
                                {bill.status === "Pending" ? (
                                  <>
                                    <AlertCircle className="w-3 h-3 mr-1" />{" "}
                                    {bill.status}
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-3 h-3 mr-1" />{" "}
                                    {bill.status}
                                  </>
                                )}
                              </Badge>
                              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
                                <Building className="w-3 h-3 mr-1" />
                                {bill.connectionCategory}
                              </Badge>
                              {bill.status === "Pending" && (
                                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg animate-pulse">
                                  <Zap className="w-3 h-3 mr-1" />
                                  Action Required
                                </Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2 text-gray-700">
                                <User className="w-4 h-4 text-blue-600" />
                                <span>
                                  <span className="font-medium">
                                    Consumer:
                                  </span>{" "}
                                  {bill.consumerNumber}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <Calendar className="w-4 h-4 text-teal-600" />
                                <span>
                                  <span className="font-medium">
                                    Month:
                                  </span>{" "}
                                  {bill.billMonth}
                                </span>
                              </div>
                              {bill.status === "Pending" ? (
                                <div className="flex items-center gap-2 text-green-600">
                                  <Clock className="w-4 h-4 animate-pulse" />
                                  <span>
                                    <span className="font-medium">
                                      Due:
                                    </span>{" "}
                                    {bill.dueDate}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-green-700">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>
                                    <span className="font-medium">
                                      Paid:
                                    </span>{" "}
                                    {bill.paidDate}
                                  </span>
                                </div>
                              )}
                              {bill.status === "Paid" && (
                                <div className="flex items-center gap-2 text-gray-700">
                                  <FileText className="w-4 h-4 text-purple-600" />
                                  <span>
                                    <span className="font-medium">
                                      TXN:
                                    </span>{" "}
                                    {bill.transactionId}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Amount Display */}
                          <div className="text-right ml-4">
                            <p className="text-xs text-gray-600 mb-1">
                              {bill.status === "Pending"
                                ? "Amount Due"
                                : "Amount Paid"}
                            </p>
                            <p
                              className={`text-3xl sm:text-4xl ${
                                bill.status === "Pending"
                                  ? "text-green-600"
                                  : "text-green-600"
                              }`}
                            >
                              ₹
                              {(bill.status === "Pending"
                                ? bill.dueAmount
                                : bill.paidAmount
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mb-1">
                                <TrendingUp className="w-3 h-3" />
                                Previous
                              </div>
                              <p className="text-sm text-gray-900">
                                {bill.meterReading.previous} KL
                              </p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mb-1">
                                <Star className="w-3 h-3" />
                                Current
                              </div>
                              <p className="text-sm text-gray-900">
                                {bill.meterReading.current} KL
                              </p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 text-xs text-blue-600 mb-1">
                                <Droplets className="w-3 h-3" />
                                Used
                              </div>
                              <p className="text-sm text-blue-600">
                                {bill.meterReading.consumption}{" "}
                                KL
                              </p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mb-1">
                                <Building2 className="w-3 h-3" />
                                Pipe Size
                              </div>
                              <p className="text-sm text-gray-900">
                                {bill.connectionSize}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 flex-wrap">
                          {/* View Details Button */}
                          <Button
                            onClick={() =>
                              handleViewDetails(bill)
                            }
                            variant="outline"
                            className="flex-1 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-500 transition-all shadow-md"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>

                          {/* Pay Now or Download Button */}
                          {bill.status === "Pending" ? (
                            <Button
                              onClick={() => handlePayNow(bill)}
                              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
                            >
                              <CreditCard className="w-4 h-4 mr-2" />
                              Pay ₹
                              {bill.dueAmount.toLocaleString()}
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                handleDownloadBill(bill)
                              }
                              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Receipt
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Bills */}
            {propertyBills.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-2 border-gray-200">
                  <FileText className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl text-gray-900 mb-2">
                    No Bills Found
                  </h3>
                  <p className="text-gray-600">
                    There are no bills available for this
                    property.
                  </p>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* View Details Dialog */}
      <Dialog
        open={!!viewDetailsBill}
        onOpenChange={() => setViewDetailsBill(null)}
      >
        <DialogContent className="max-w-[90vw] w-[900px] max-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p>Bill Details - {viewDetailsBill?.id}</p>
                <p className="text-sm text-gray-600 font-normal">
                  Consumer: {viewDetailsBill?.consumerNumber}
                </p>
              </div>
            </DialogTitle>
            <DialogDescription>
              Complete breakdown of your water bill including
              charges and meter readings
            </DialogDescription>
          </DialogHeader>

          {viewDetailsBill && (
            <div className="flex-1 overflow-hidden flex flex-col py-4">
              {/* Status Badge */}
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  className={`${
                    viewDetailsBill.status === "Pending"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600"
                      : "bg-gradient-to-r from-green-600 to-emerald-600"
                  } text-white px-3 py-1.5`}
                >
                  {viewDetailsBill.status === "Pending" ? (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2" />{" "}
                      Pending Payment
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />{" "}
                      Payment Completed
                    </>
                  )}
                </Badge>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-auto pr-1">
                {/* Left Column */}
                <div className="space-y-3">
                  {/* Connection Details */}
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Building className="w-4 h-4 text-blue-600" />
                        Connection Information
                      </h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1 text-xs">
                            Property Number
                          </p>
                          <p className="text-gray-900">
                            {viewDetailsBill.propertyNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1 text-xs">
                            Connection Type
                          </p>
                          <p className="text-gray-900">
                            {viewDetailsBill.connectionCategory}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1 text-xs">
                            Meter Type
                          </p>
                          <p className="text-gray-900">
                            {viewDetailsBill.connectionType}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1 text-xs">
                            Pipe Size
                          </p>
                          <p className="text-gray-900">
                            {viewDetailsBill.connectionSize}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-600 mb-1 text-xs">
                            Address
                          </p>
                          <p className="text-gray-900 text-sm">
                            {viewDetailsBill.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Meter Reading */}
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-cyan-200">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-cyan-600" />
                        Meter Reading
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">
                            Previous
                          </p>
                          <p className="text-lg text-gray-900">
                            {
                              viewDetailsBill.meterReading
                                .previous
                            }
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            KL
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">
                            Current
                          </p>
                          <p className="text-lg text-gray-900">
                            {
                              viewDetailsBill.meterReading
                                .current
                            }
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            KL
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">
                            Usage
                          </p>
                          <p className="text-lg text-teal-600">
                            {
                              viewDetailsBill.meterReading
                                .consumption
                            }
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            KL
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {/* Charges Breakdown */}
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        Charges Breakdown
                      </h3>
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-gray-700 text-sm">
                            Water Charges
                          </span>
                          <span className="text-gray-900">
                            ₹
                            {
                              viewDetailsBill.charges
                                .waterCharges
                            }
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-gray-700 text-sm">
                            Sewerage Charges
                          </span>
                          <span className="text-gray-900">
                            ₹{viewDetailsBill.charges.sewerage}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-gray-700 text-sm">
                            GST (18%)
                          </span>
                          <span className="text-gray-900">
                            ₹{viewDetailsBill.charges.gst}
                          </span>
                        </div>
                        <div className="h-px bg-gray-300"></div>
                        <div className="flex justify-between items-center pt-2 bg-gradient-to-r from-green-50 to-emerald-50 -mx-4 px-4 py-3 rounded-b-lg">
                          <span className="text-gray-900 font-semibold">
                            Total Amount
                          </span>
                          <span className="text-xl text-green-600 font-semibold">
                            ₹{viewDetailsBill.charges.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Bill Timeline */}
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        Bill Timeline
                      </h3>
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-gray-700 text-sm">
                            Bill Generated
                          </span>
                          <span className="text-gray-900">
                            {viewDetailsBill.billDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-gray-700 text-sm">
                            {viewDetailsBill.status ===
                            "Pending"
                              ? "Due Date"
                              : "Payment Date"}
                          </span>
                          <span
                            className={`${viewDetailsBill.status === "Pending" ? "text-green-600" : "text-green-600"}`}
                          >
                            {viewDetailsBill.status ===
                            "Pending"
                              ? viewDetailsBill.dueDate
                              : viewDetailsBill.paidDate}
                          </span>
                        </div>
                        {viewDetailsBill.status === "Paid" && (
                          <>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                              <span className="text-gray-700 text-sm">
                                Payment Method
                              </span>
                              <span className="text-gray-900">
                                {viewDetailsBill.paymentMode}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 text-sm">
                                Transaction ID
                              </span>
                              <span className="text-gray-900 font-mono text-xs">
                                {viewDetailsBill.transactionId}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t mt-4">
                {viewDetailsBill.status === "Pending" ? (
                  <Button
                    onClick={() => {
                      setViewDetailsBill(null);
                      handlePayNow(viewDetailsBill);
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-11 shadow-lg"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay ₹
                    {viewDetailsBill.dueAmount.toLocaleString()}{" "}
                    Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleDownloadBill(viewDetailsBill);
                      setViewDetailsBill(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-11 shadow-lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog
        open={!!selectedBill}
        onOpenChange={handleClosePayment}
      >
        <DialogContent className="max-w-[95vw] w-[900px] max-h-[95vh] overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p>Payment for {selectedBill?.id}</p>
                <p className="text-sm text-gray-600 font-normal">
                  Consumer: {selectedBill?.consumerNumber}
                </p>
              </div>
            </DialogTitle>
            <DialogDescription>
              Complete your payment securely
            </DialogDescription>
          </DialogHeader>

          {!processing && (
            <div className="space-y-4 flex-1 overflow-auto pr-2">
              {/* Bill Summary */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="p-4">
                  <h3 className="text-gray-900 mb-3">
                    Bill Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Water Charges
                      </span>
                      <span className="text-gray-900">
                        ₹{selectedBill?.charges.waterCharges}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Sewerage Charges
                      </span>
                      <span className="text-gray-900">
                        ₹{selectedBill?.charges.sewerage}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        GST (18%)
                      </span>
                      <span className="text-gray-900">
                        ₹{selectedBill?.charges.gst}
                      </span>
                    </div>
                    <div className="h-px bg-gray-300 my-2"></div>
                    <div className="flex justify-between">
                      <span className="text-gray-900">
                        Total Amount
                      </span>
                      <span className="text-xl text-blue-600">
                        ₹
                        {selectedBill?.dueAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Methods */}
              <div>
                <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  Select Payment Method
                </h3>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="space-y-3">
                    {/* UPI */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "upi"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <RadioGroupItem value="upi" id="upi" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-gray-900">
                            UPI Payment
                          </p>
                          <p className="text-sm text-gray-500">
                            Pay using any UPI app
                          </p>
                        </div>
                      </div>
                      {paymentMethod === "upi" && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </label>

                    {/* Credit/Debit Card */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-900">
                            Credit/Debit Card
                          </p>
                          <p className="text-sm text-gray-500">
                            Visa, Mastercard, RuPay
                          </p>
                        </div>
                      </div>
                      {paymentMethod === "card" && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </label>

                    {/* Net Banking */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "netbanking"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <RadioGroupItem
                        value="netbanking"
                        id="netbanking"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-gray-900">
                            Net Banking
                          </p>
                          <p className="text-sm text-gray-500">
                            All major banks supported
                          </p>
                        </div>
                      </div>
                      {paymentMethod === "netbanking" && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </label>

                    {/* Wallet */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "wallet"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <RadioGroupItem
                        value="wallet"
                        id="wallet"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                          <Wallet className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-gray-900">
                            Wallet
                          </p>
                          <p className="text-sm text-gray-500">
                            Paytm, PhonePe, Amazon Pay
                          </p>
                        </div>
                      </div>
                      {paymentMethod === "wallet" && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-green-900">
                    Secure Payment Gateway
                  </p>
                  <p className="text-green-700">
                    Your payment information is encrypted and
                    secure
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleClosePayment}
                  variant="outline"
                  className="flex-1 border-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleProceedToOtp}
                  disabled={!paymentMethod}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Proceed to Pay ₹
                  {selectedBill?.dueAmount.toLocaleString()}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* OTP Step */}
          {showOtpStep && !processing && (
            <div className="space-y-6 flex-1 overflow-auto pr-2">
              {/* Bill Summary */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="p-4">
                  <h3 className="text-gray-900 mb-3">
                    Bill Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Water Charges
                      </span>
                      <span className="text-gray-900">
                        ₹{selectedBill?.charges.waterCharges}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Sewerage Charges
                      </span>
                      <span className="text-gray-900">
                        ₹{selectedBill?.charges.sewerage}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        GST (18%)
                      </span>
                      <span className="text-gray-900">
                        ₹{selectedBill?.charges.gst}
                      </span>
                    </div>
                    <div className="h-px bg-gray-300 my-2"></div>
                    <div className="flex justify-between">
                      <span className="text-gray-900">
                        Total Amount
                      </span>
                      <span className="text-xl text-blue-600">
                        ₹
                        {selectedBill?.dueAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* OTP Notice - Highly Visible */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-1 shadow-2xl"
              >
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg"
                    >
                      <Smartphone className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-gray-900 mb-1">
                        OTP Verification Required
                      </h3>
                      <p className="text-sm text-gray-600">
                        OTP sent to ****
                        {user?.mobile?.slice(-4) || "1234"}
                      </p>
                    </div>
                  </div>

                  {/* OTP Input - Large and Highlighted */}
                  <div className="mb-6">
                    <Label className="text-lg text-gray-900 mb-3 block">
                      Enter 6-Digit OTP
                    </Label>
                    <div className="flex items-center justify-center gap-3">
                      {otp.map((digit, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileFocus={{ scale: 1.1 }}
                        >
                          <Input
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(
                                index,
                                e.target.value.replace(
                                  /\D/g,
                                  "",
                                ),
                              )
                            }
                            onKeyDown={(e) =>
                              handleOtpKeyDown(index, e)
                            }
                            maxLength={1}
                            className="w-14 h-14 text-center text-2xl font-bold border-4 border-blue-300 focus:border-green-500 focus:ring-4 focus:ring-green-200 rounded-xl shadow-lg transition-all bg-white"
                            autoFocus={index === 0}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Helper Text */}
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        💡 For demo, use OTP:{" "}
                        <span className="font-mono font-bold text-blue-600">
                          123456
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Resend OTP */}
                  <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        {otpSent && resendTimer > 0 ? (
                          <>
                            Resend OTP in{" "}
                            <span className="font-bold text-green-600">
                              {resendTimer}s
                            </span>
                          </>
                        ) : (
                          "OTP Expired"
                        )}
                      </span>
                    </div>
                    <Button
                      onClick={handleResendOtp}
                      disabled={otpSent && resendTimer > 0}
                      variant="outline"
                      size="sm"
                      className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                    >
                      <ArrowRight className="w-4 h-4 mr-1" />
                      Resend OTP
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setShowOtpStep(false);
                        setOtp(["", "", "", "", "", ""]);
                      }}
                      variant="outline"
                      className="flex-1 border-2"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleVerifyOtpAndPay}
                      disabled={otp.some((digit) => !digit)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed h-12"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Verify & Pay ₹
                      {selectedBill?.dueAmount.toLocaleString()}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Security Notice */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-900 font-medium">
                    Secure Transaction
                  </p>
                  <p className="text-blue-700">
                    Your OTP is valid for 5 minutes. Do not
                    share it with anyone.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Processing State */}
          {processing && (
            <div className="py-12 text-center">
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <CreditCard className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl text-gray-900 mb-2">
                Processing Payment...
              </h3>
              <p className="text-gray-600">
                Please wait while we process your payment
                securely
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={showSuccess}
        onOpenChange={handleCloseSuccess}
      >
        <DialogContent className="max-w-md bg-gradient-to-br from-green-50 to-emerald-50">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Payment Successful
            </DialogTitle>
            <DialogDescription className="sr-only">
              Your payment has been completed successfully
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <h3 className="text-2xl text-gray-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Your bill has been paid successfully
            </p>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200 p-4 mb-6 text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Transaction ID
                  </span>
                  <span className="text-gray-900 font-mono">
                    {transactionId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Amount Paid
                  </span>
                  <span className="text-gray-900">
                    ₹
                    {completedPayment?.dueAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Payment Method
                  </span>
                  <span className="text-gray-900 capitalize">
                    {completedPayment?.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Date & Time
                  </span>
                  <span className="text-gray-900">
                    {completedPayment?.paidDate}
                  </span>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={downloadReceipt}
                variant="outline"
                className="flex-1 border-2 border-green-600 text-green-700 hover:bg-green-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button
                onClick={handleCloseSuccess}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}