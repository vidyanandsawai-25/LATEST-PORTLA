import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Home,
  Droplets,
  FileText,
  CreditCard,
  Bell,
  Menu,
  User,
  LogOut,
  Search,
  ChevronRight,
  MessageSquare,
  Plus,
  Gauge,
  TrendingUp,
  TrendingDown,
  Activity,
  IndianRupee,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Settings,
  Camera,
  Trash2,
  X,
  ArrowRight,
  Phone,
  AlertCircle,
  MapPin,
  Building,
  Layers,
  Mail,
  Tag,
  Megaphone,
  Sparkles,
  Gift,
} from "lucide-react";
import { NewConnectionForm } from "./citizen/NewConnectionForm";
import { MyConnections } from "./citizen/MyConnections";
import { PayBills } from "./citizen/PayBills";
import { Grievances } from "./citizen/Grievances";
import BillCalculator from "./citizen/BillCalculator";
import Support from "./citizen/Support";
import { SubmitReading } from "./citizen/SubmitReading";
import { RTIInfo } from "./citizen/RTIInfo";
import { TrackStatus } from "./citizen/TrackStatus";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import CivicRibbon from "./CivicRibbon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface CitizenPortalProps {
  user: any;
  onLogout: () => void;
}

export function CitizenPortal({
  user,
  onLogout,
}: CitizenPortalProps) {
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "connections"
    | "newConnection"
    | "payBills"
    | "submitReading"
    | "grievances"
    | "calculator"
    | "history"
    | "downloads"
    | "support"
    | "rti"
  >("dashboard");
  const [showNewConnectionDialog, setShowNewConnectionDialog] =
    useState(false);
  const [showTrackDialog, setShowTrackDialog] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "bill",
      title: "Bill Due Soon",
      message:
        "Bill #BILL-2025-001 of ₹1,275 is due on Dec 30, 2025",
      time: "2 hours ago",
      read: false,
      action: "payBills",
      icon: CreditCard,
      color: "bg-red-100 text-red-600",
      borderColor: "border-red-200",
    },
    {
      id: 2,
      type: "reading",
      title: "Meter Reading Due",
      message:
        "Submit your meter reading for CON-2025-001 before Dec 28",
      time: "5 hours ago",
      read: false,
      action: "submitReading",
      icon: Camera,
      color: "bg-orange-100 text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      id: 3,
      type: "grievance",
      title: "Grievance Update",
      message: "Your grievance GRV-2025-012 has been resolved",
      time: "1 day ago",
      read: false,
      action: "grievances",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-200",
    },
    {
      id: 4,
      type: "connection",
      title: "New Connection Approved",
      message:
        "Your application for new connection has been approved",
      time: "2 days ago",
      read: true,
      action: "connections",
      icon: Droplets,
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      id: 5,
      type: "payment",
      title: "Payment Received",
      message:
        "Payment of ₹850 received successfully for Bill #BL-2025-044",
      time: "3 days ago",
      read: true,
      action: "payBills",
      icon: CheckCircle,
      color: "bg-teal-100 text-teal-600",
      borderColor: "border-teal-200",
    },
  ]);

  const unreadCount = notifications.filter(
    (n) => !n.read,
  ).length;

  const handleNotificationClick = (notification: any) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n,
      ),
    );
    // Navigate to the action
    setActiveTab(notification.action as any);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true })),
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNewConnectionClick = () => {
    setShowNewConnectionDialog(true);
  };

  const proceedWithNewConnection = () => {
    setShowNewConnectionDialog(false);
    setActiveTab("newConnection");
  };

  const handleNavigation = (screen: string) => {
    if (screen === "newConnection") {
      handleNewConnectionClick();
    } else {
      setActiveTab(screen as any);
    }
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      color: "text-blue-600",
    },
    {
      id: "connections",
      label: "My Connections",
      icon: Droplets,
      color: "text-cyan-600",
    },
    {
      id: "newConnection",
      label: "New Connection",
      icon: FileText,
      color: "text-teal-600",
    },
    {
      id: "payBills",
      label: "Pay Bills",
      icon: CreditCard,
      color: "text-green-600",
    },
    {
      id: "submitReading",
      label: "Submit Reading",
      icon: Camera,
      color: "text-emerald-600",
    },
    {
      id: "grievances",
      label: "Grievances",
      icon: MessageSquare,
      color: "text-orange-600",
    },
    {
      id: "calculator",
      label: "Usage Calculator",
      icon: Activity,
      color: "text-teal-600",
    },
    {
      id: "history",
      label: "Usage History",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      id: "downloads",
      label: "Downloads",
      icon: Download,
      color: "text-purple-600",
    },
    {
      id: "support",
      label: "Support",
      icon: Bell,
      color: "text-red-600",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "payment",
      title: "Bill Payment",
      description: "Paid ₹982 for WC-2025-002",
      time: "2 hours ago",
      icon: CreditCard,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      type: "connection",
      title: "Connection Active",
      description: "WC-2025-002 activated",
      time: "1 day ago",
      icon: CheckCircle,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      type: "bill",
      title: "New Bill Generated",
      description: "Bill #BILL-2025-001 - ₹1,275",
      time: "3 days ago",
      icon: FileText,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 4,
      type: "grievance",
      title: "Grievance Resolved",
      description: "GRV-2025-012 closed",
      time: "5 days ago",
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const quickActions = [
    {
      label: "Pay Now",
      icon: CreditCard,
      color: "from-green-500 to-emerald-600",
      action: () => setActiveTab("payBills"),
    },
    {
      label: "New Connection",
      icon: FileText,
      color: "from-blue-500 to-cyan-600",
      action: handleNewConnectionClick,
    },
    {
      label: "Track Status",
      icon: Search,
      color: "from-purple-500 to-indigo-600",
      action: () => setShowTrackDialog(true),
    },
    {
      label: "Raise Complaints",
      icon: MessageSquare,
      color: "from-orange-500 to-red-600",
      action: () => setActiveTab("grievances"),
    },
  ];

  // Calculate total due from bills (must match PayBills component)
  const selectedPropertyNumber =
    user?.propertyNumber || user?.selectedProperty;
  const allBills = [
    {
      propertyNumber: "A1-1",
      consumerNumber: "WC-2025-001",
      dueAmount: 1275,
      status: "Pending",
    },
    {
      propertyNumber: "A1-1",
      consumerNumber: "WC-2025-002",
      dueAmount: 982,
      status: "Pending",
    },
    {
      propertyNumber: "B2-5",
      consumerNumber: "WC-2025-003",
      dueAmount: 2772,
      status: "Pending",
    },
    {
      propertyNumber: "B2-5",
      consumerNumber: "WC-2025-004",
      dueAmount: 0,
      status: "Paid",
    },
    {
      propertyNumber: "B2-5",
      consumerNumber: "WC-2025-005",
      dueAmount: 1040,
      status: "Pending",
    },
    {
      propertyNumber: "C3-12",
      consumerNumber: "WC-2025-006",
      dueAmount: 866,
      status: "Pending",
    },
    {
      propertyNumber: "D1-8",
      consumerNumber: "WC-2025-007",
      dueAmount: 9702,
      status: "Pending",
    },
    {
      propertyNumber: "D1-8",
      consumerNumber: "WC-2025-008",
      dueAmount: 0,
      status: "Paid",
    },
  ];

  const userBills = allBills.filter(
    (bill) => bill.propertyNumber === selectedPropertyNumber,
  );
  const totalDue = userBills.reduce(
    (sum, bill) => sum + bill.dueAmount,
    0,
  );
  const pendingBillsCount = userBills.filter(
    (bill) => bill.status === "Pending",
  ).length;

  // Calculate water consumed from connections (must match MyConnections component)
  const allConnectionDetails = [
    { propertyId: "A1-1", consumption: 45 },
    { propertyId: "A1-1", consumption: 34 },
    { propertyId: "B2-5", consumption: 60 },
    { propertyId: "B2-5", consumption: 60 },
    { propertyId: "B2-5", consumption: 30 },
    { propertyId: "C3-12", consumption: 30 },
    { propertyId: "D1-8", consumption: 140 },
    { propertyId: "D1-8", consumption: 100 },
  ];

  const userConnections = allConnectionDetails.filter(
    (conn) => conn.propertyId === selectedPropertyNumber,
  );
  const totalConsumption = userConnections.reduce(
    (sum, conn) => sum + conn.consumption,
    0,
  );

  return (
    <div className="min-h-screen bg-[#EBF3FA]">
      {/* Top Navigation Bar */}
      <nav className="relative z-20 bg-gradient-to-r from-[#005AA7] via-[#0077B6] to-[#00C6FF] border-b border-blue-400/30 shadow-lg sticky top-0">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Top Header */}
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center border border-white/30">
                <Droplets className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base lg:text-lg text-white font-semibold">
                  Panvel Municipal Corporation
                </h1>
                <p className="text-[10px] sm:text-xs text-white/90 hidden sm:block">
                  Water Tax
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-white/20 text-white"
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    {unreadCount > 0 && (
                      <>
                        <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] sm:text-[10px] rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                          {unreadCount}
                        </span>
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[90vw] sm:w-96 p-0 mr-2 sm:mr-4"
                  align="end"
                >
                  <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
                    {/* Header */}
                    <div className="p-3 sm:p-4 border-b border-blue-200 bg-white/80 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2">
                          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white text-[10px] sm:text-xs">
                            {unreadCount} New
                          </Badge>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-700 h-auto p-0"
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">
                            No notifications
                          </p>
                        </div>
                      ) : (
                        <div className="divide-y divide-blue-100">
                          {notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`p-3 sm:p-4 hover:bg-white/60 transition-colors cursor-pointer group relative ${
                                !notification.read
                                  ? "bg-blue-50/50"
                                  : "bg-white/30"
                              }`}
                              onClick={() =>
                                handleNotificationClick(
                                  notification,
                                )
                              }
                            >
                              {/* Unread indicator */}
                              {!notification.read && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                              )}

                              <div className="flex items-start gap-3 pl-2">
                                {/* Icon */}
                                <div
                                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${notification.color} flex items-center justify-center flex-shrink-0`}
                                >
                                  <notification.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <p
                                      className={`text-xs sm:text-sm ${!notification.read ? "font-semibold" : "font-medium"} text-gray-900`}
                                    >
                                      {notification.title}
                                    </p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 flex-shrink-0"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNotification(
                                          notification.id,
                                        );
                                      }}
                                    >
                                      <X className="w-3 h-3 text-gray-400 hover:text-red-600" />
                                    </Button>
                                  </div>
                                  <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2 mb-1">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <p className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {notification.time}
                                    </p>
                                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-blue-200 bg-white/80 backdrop-blur-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          View All Notifications
                        </Button>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {/* User Profile */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-2 sm:gap-3 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/20 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-white/30 transition-colors border border-white/30">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                      <AvatarFallback className="bg-white text-blue-600 text-xs sm:text-sm font-semibold">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block">
                      <p className="text-xs sm:text-sm text-white font-medium">
                        {user.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-white/80">
                        {user.mobile}
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 sm:w-96 p-0 mr-2 sm:mr-4" 
                  align="end"
                >
                  <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
                    {/* Header */}
                    {/* <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-500">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14 border-2 border-white">
                          <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-base font-semibold text-white">
                            {user.name}
                          </h3>
                          <p className="text-xs text-blue-100">
                            Citizen Account
                          </p>
                        </div>
                      </div>
                    </div> */}

                    {/* Profile Details */}
                    <div className="p-4 max-h-[60vh] overflow-y-auto">
                      {/* User Profile Information */}
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">User Profile Information</h4>
                      </div>

                      {/* Grid Layout for Profile Fields */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Ward No. */}
                        <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-500">Ward No.</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">
                              {(() => {
                                const propNum = user.selectedProperty || user.propertyNumber;
                                const wards: Record<string, string> = {
                                  'A1-1': '5',
                                  'B2-5': '8',
                                  'C3-12': '5',
                                  'D1-8': '12'
                                };
                                return wards[propNum] || 'N/A';
                              })()}
                            </p>
                          </div>
                        </div>

                        {/* Property No. */}
                        <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <Building className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-500">Property No.</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">
                              {(() => {
                                const propNum = user.selectedProperty || user.propertyNumber;
                                const propertyNums: Record<string, string> = {
                                  'A1-1': '123',
                                  'B2-5': '456',
                                  'C3-12': '789',
                                  'D1-8': '321'
                                };
                                return propertyNums[propNum] || propNum;
                              })()}
                            </p>
                          </div>
                        </div>

                        {/* Name */}
                        <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow col-span-1">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-500">Name</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">राजेश कुमार शर्मा</p>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow col-span-1">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-500">Address</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">१२३, गांधी नगर, प्रभाग क्र. ४, अकोला - ४४४००१</p>
                          </div>
                        </div>

                        {/* Mobile */}
                        <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-500">Mobile</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">{user.mobile || '9876543210'}</p>
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-500">Email</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">rajesh.sharma@example.com</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-3 border-t border-blue-200 bg-white/80 backdrop-blur-sm">
                      {/* <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 justify-start"
                        onClick={() => setActiveTab("support")}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </Button> */}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogoutConfirmation(true)}
                className="text-black-600 hover:text-black-700 hover:bg-red-50 h-8 sm:h-9 px-2 sm:px-3"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* CivicRibbon Navigation */}
      <CivicRibbon
        currentScreen={activeTab}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full mx-auto space-y-6"
            >
              {/* Welcome Section */}
              <div className="px-4 sm:px-6 rounded-full bg-gradient-to-r from-blue-900 via-blue-700 to-teal-600 shadow-xl mt-[58px] mb-[24px] py-4 flex items-center justify-between gap-3 sm:gap-4 flex-wrap mx-[0px] my-[24px] mr-[0px] ml-[0px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base lg:text-lg text-white">
                      {(() => {
                        const hour = new Date().getHours();
                        if (hour < 12) return "Good Morning";
                        if (hour < 17) return "Good Afternoon";
                        return "Good Evening";
                      })()}
                      , {user.name}!
                    </h2>
                    <p className="text-xs text-blue-100">
                      Property{" "}
                      {user.selectedProperty ||
                        user.propertyNumber}{" "}
                      {/* - Managing {user.connections?.length || 0}{" "}
                      water connection
                      {user.connections?.length > 1 ? "s" : ""} */}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {/* <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg">
                    <p className="text-[10px] text-blue-100">
                      {user.loginType === "mobile"
                        ? "Mobile Number"
                        : "Consumer ID"}
                    </p>
                    <p className="text-xs sm:text-sm text-white">
                      {user.loginType === "mobile"
                        ? user.mobile
                        : user.consumerId}
                    </p>
                  </div> */}
                  {/* <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg">
                    <p className="text-[10px] text-blue-100">
                      {user.loginType === "mobile"
                        ? "Selected Property"
                        : "Property ID"}
                    </p>
                    <p className="text-xs sm:text-sm text-white">
                      {user.selectedProperty ||
                        user.propertyNumber ||
                        user.propertyId}
                    </p>
                  </div> */}
                  {user.loginType === "consumer" && (
                    <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg">
                      <p className="text-[10px] text-blue-100">
                        Login Type
                      </p>
                      <p className="text-xs sm:text-sm text-white flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        Consumer ID
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatsCard
                  title="Active Connections"
                  value={
                    user.connections?.length?.toString() || "0"
                  }
                  change={
                    user.connections?.length > 1
                      ? "Multiple properties"
                      : "Single property"
                  }
                  icon={Droplets}
                  color="from-blue-500 to-cyan-500"
                  trend="up"
                  onClick={() => setActiveTab("connections")}
                />
                <StatsCard
                  title="Total Due"
                  value={`₹${totalDue.toLocaleString()}`}
                  change={`${pendingBillsCount} pending ${pendingBillsCount === 1 ? "bill" : "bills"}`}
                  icon={IndianRupee}
                  color="from-orange-500 to-red-500"
                  trend="neutral"
                  onClick={() => setActiveTab("payBills")}
                />
                <StatsCard
                  title="Water Consumed"
                  value={`${totalConsumption} KL`}
                  change="Current month total"
                  icon={Activity}
                  color="from-teal-500 to-emerald-500"
                  trend="neutral"
                  onClick={() => setActiveTab("calculator")}
                />
                <StatsCard
                  title="Open Grievances"
                  value="1"
                  change="Response pending"
                  icon={MessageSquare}
                  color="from-purple-500 to-pink-500"
                  trend="neutral"
                  onClick={() => setActiveTab("grievances")}
                />
              </div>

              {/* My Connections and Grievances Summary Cards */}
              

              {/* Quick Actions */}
              <div>
               
                <div className="flex flex-wrap gap-2 sm:gap-3">
                   <h3 className="text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">
                  Quick Actions
                </h3>
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <Button
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r ${action.color} border-0 shadow-md hover:shadow-lg text-white transition-all relative overflow-hidden group h-auto`}
                        onClick={action.action}
                      >
                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <action.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 group-hover:scale-110 transition-transform" />
                        <span className="text-xs sm:text-sm font-medium relative z-10 ml-1.5 sm:ml-2">
                          {action.label}
                        </span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Activity & Usage Chart */}
              <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Recent Activity */}
                <Card className="p-4 sm:p-6 shadow-lg border-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg text-gray-900 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Recent Activity
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {recentActivities.slice(0, 3).map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                      >
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <activity.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-gray-900 font-medium">
                            {activity.title}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-600 truncate">
                            {activity.description}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Water Usage Chart */}
                <Card className="p-4 sm:p-6 shadow-lg border-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 backdrop-blur-sm">
                  <h3 className="text-base sm:text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Water Usage
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      {
                        month: "Jan",
                        usage: 42,
                        gradient:
                          "bg-gradient-to-r from-blue-500 to-blue-400",
                      },
                      {
                        month: "Feb",
                        usage: 38,
                        gradient:
                          "bg-gradient-to-r from-cyan-500 to-cyan-400",
                      },
                      {
                        month: "Mar",
                        usage: 45,
                        gradient:
                          "bg-gradient-to-r from-teal-500 to-teal-400",
                      },
                      {
                        month: "Apr",
                        usage: 50,
                        gradient:
                          "bg-gradient-to-r from-blue-600 to-blue-500",
                      },
                      {
                        month: "May",
                        usage: 48,
                        gradient:
                          "bg-gradient-to-r from-cyan-600 to-cyan-500",
                      },
                      {
                        month: "Jun",
                        usage: 45,
                        gradient:
                          "bg-gradient-to-r from-teal-600 to-teal-500",
                      },
                    ].map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 sm:gap-4"
                      >
                        <span className="text-xs sm:text-sm text-gray-600 w-6 sm:w-8">
                          {data.month}
                        </span>
                        <div className="flex-1 h-6 sm:h-8 bg-gray-200 rounded-lg overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${data.usage}%`,
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{
                              delay: index * 0.1,
                              duration: 0.5,
                            }}
                            className={`h-full ${data.gradient} flex items-center justify-end px-2 sm:px-3 shadow-md`}
                          >
                            <span className="text-[10px] sm:text-xs text-white font-medium">
                              {data.usage} KL
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* My Connections */}
              
                {/* Special Discounts */}
                {/* <Card className="p-4 sm:p-5 shadow-lg border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg text-gray-900 font-bold">Special Discounts</h3>
                      <p className="text-xs text-gray-600">Save more on your bills</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-white rounded-xl p-3 border-2 border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">10% Early Payment</p>
                          <p className="text-xs text-gray-600">Pay within 7 days</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-0 text-xs">Active</Badge>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-white rounded-xl p-3 border-2 border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Gift className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">₹200 Off</p>
                          <p className="text-xs text-gray-600">Senior citizen discount</p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">Active</Badge>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-white rounded-xl p-3 border-2 border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingDown className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">5% Water Saver</p>
                          <p className="text-xs text-gray-600">Use less than 15 KL</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">Active</Badge>
                      </div>
                    </motion.div>
                  </div>
                </Card> */}

                {/* Upcoming Schemes */}
                <Card className="p-4 sm:p-5 shadow-lg border-2 border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                      <Megaphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg text-gray-900 font-bold">News and Schemes</h3>
                      <p className="text-xs text-gray-600">By Panvel Corporation</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-white rounded-xl p-3 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Droplets className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Free Meter Installation</p>
                          <p className="text-xs text-gray-600">Starting January 2026</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">New</Badge>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-white rounded-xl p-3 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Rainwater Harvesting</p>
                          <p className="text-xs text-gray-600">Subsidy up to ₹10,000</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-0 text-xs">New</Badge>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-white rounded-xl p-3 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Digital Payments Bonus</p>
                          <p className="text-xs text-gray-600">Cashback on online bills</p>
                        </div>
                        <Badge className="bg-indigo-100 text-indigo-700 border-0 text-xs">New</Badge>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-white rounded-xl p-3 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Home className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">Low-Income Housing</p>
                          <p className="text-xs text-gray-600">50% connection fee waiver</p>
                        </div>
                        <Badge className="bg-pink-100 text-pink-700 border-0 text-xs">New</Badge>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </div>
              

              {/* Upcoming Bills */}
            </motion.div>
          )}

          {activeTab === "connections" && (
            <motion.div
              key="connections"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MyConnections user={user} />
            </motion.div>
          )}

          {activeTab === "newConnection" && (
            <motion.div
              key="newConnection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <NewConnectionForm
                selectedPropertyNumber={selectedPropertyNumber}
                onBackToDashboard={() =>
                  setActiveTab("dashboard")
                }
              />
            </motion.div>
          )}

          {activeTab === "payBills" && (
            <motion.div
              key="payBills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PayBills user={user} />
            </motion.div>
          )}

          {activeTab === "submitReading" && (
            <motion.div
              key="submitReading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SubmitReading user={user} />
            </motion.div>
          )}

          {activeTab === "grievances" && (
            <motion.div
              key="grievances"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Grievances
                user={user}
                onBackToDashboard={() =>
                  setActiveTab("dashboard")
                }
              />
            </motion.div>
          )}

          {activeTab === "calculator" && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <BillCalculator />
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 backdrop-blur-sm">
                <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Usage History
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    View your water usage history.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">
                        Select Month
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        Select Year
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                      </select>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white"
                  >
                    View History
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "downloads" && (
            <motion.div
              key="downloads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 backdrop-blur-sm">
                <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-orange-600" />
                  Downloads
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Download your water usage and bill details.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">
                        Select Month
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        Select Year
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                      </select>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white"
                  >
                    Download
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "support" && (
            <motion.div
              key="support"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Support />
            </motion.div>
          )}

          {activeTab === "rti" && (
            <motion.div
              key="rti"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <RTIInfo />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* New Connection Confirmation Dialog */}
      <Dialog
        open={showNewConnectionDialog}
        onOpenChange={setShowNewConnectionDialog}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="leading-tight">
                Apply for New Water Connection
              </span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              You are about to start the application process for
              a new water connection
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 sm:py-6 flex-1 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <div className="space-y-4">
                {/* Information Card */}
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    What you'll need:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Property details (Zone, Ward, Plot
                        Number)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Applicant information and contact
                        details
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Connection preferences (type, pipe size)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Required documents (Aadhar, Property
                        papers)
                      </span>
                    </li>
                  </ul>
                </Card>

                {/* Important Note */}
                <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900 mb-1">
                        Important
                      </p>
                      <p className="text-xs text-amber-800">
                        Processing time: 5-7 business days.
                        You'll receive updates via SMS and
                        email. Ensure all information is
                        accurate to avoid delays.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {/* Process Steps */}
                <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    Application Process:
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        1
                      </div>
                      <span>
                        Fill application details 
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        2
                      </div>
                      <span>Upload required documents</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        3
                      </div>
                      <span>Pay connection fee (₹1,500)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        4
                      </div>
                      <span>Submit and track application</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm h-9 sm:h-10"
              onClick={() => setShowNewConnectionDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs sm:text-sm h-9 sm:h-10"
              onClick={proceedWithNewConnection}
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">
                Proceed with Application
              </span>
              <span className="xs:hidden">Proceed</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Track Status Dialog */}
      <TrackStatus
        open={showTrackDialog}
        onOpenChange={setShowTrackDialog}
      />

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutConfirmation} onOpenChange={setShowLogoutConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <LogOut className="w-6 h-6 text-white" />
              </div>
              Confirm Logout
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to logout from the Citizen Portal?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="mb-2">You will be logged out of your account and redirected to the login page.</p>
                  <p>Any unsaved changes will be lost.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowLogoutConfirmation(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowLogoutConfirmation(false);
                onLogout();
              }}
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Yes, Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Stats Card Component
function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  trend,
  onClick,
}: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="p-3 sm:p-4 lg:p-5 shadow-lg border bg-white relative overflow-hidden">
        <div
          className={`absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`}
        ></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex items-baseline gap-1.5 sm:gap-2 min-w-0 flex-1">
                <h3 className="text-lg sm:text-xs lg:text-xl  text-gray-600 whitespace-nowrap">
                  {title}:
                </h3>
                <p className="text-lg sm:text-xs lg:text-xl text-gray-900 font-semibold truncate">
                  {value}
                </p>
              </div>
            </div>
            {trend === "up" && (
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
            )}
            {trend === "down" && (
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
            )}
          </div>
          {/* <p className="text-[9px] sm:text-[10px] text-gray-500 pl-11 sm:pl-[52px]">
            {change}
          </p> */}
        </div>
      </Card>
    </motion.div>
  );
}

// Bill Card Component
function BillCard({
  billId,
  connectionId,
  amount,
  dueDate,
  status,
  onPayNow,
}: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      animate={
        status === "due"
          ? {
              boxShadow: [
                "0 4px 6px -1px rgba(239, 68, 68, 0.1)",
                "0 10px 15px -3px rgba(239, 68, 68, 0.3)",
                "0 4px 6px -1px rgba(239, 68, 68, 0.1)",
              ],
            }
          : {}
      }
      transition={
        status === "due"
          ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : { type: "spring", stiffness: 300 }
      }
      className={`p-4 sm:p-5 rounded-xl border-2 relative overflow-hidden shadow-md ${
        status === "due"
          ? "bg-gradient-to-br from-red-50 via-orange-50 to-red-50 border-red-200 shadow-red-100"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 border-blue-200 shadow-blue-100"
      }`}
    >
      {/* Decorative gradient blob */}
      <div
        className={`absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-2xl opacity-30 ${
          status === "due" ? "bg-red-400" : "bg-blue-400"
        }`}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div>
            <p className="text-xs sm:text-sm text-gray-700 font-medium">
              Bill #{billId}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
              {connectionId}
            </p>
          </div>
          <Badge
            className={`${
              status === "due"
                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-200"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-200"
            } px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs`}
          >
            {status === "due" ? "Due Now" : "Upcoming"}
          </Badge>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <p className="text-2xl sm:text-3xl text-gray-900 font-bold">
              {amount}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1.5 mt-2">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Due: {dueDate}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              className={`${
                status === "due"
                  ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              } shadow-lg text-white border-0 text-xs sm:text-sm px-3 sm:px-4`}
              onClick={onPayNow}
            >
              Pay Now
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}