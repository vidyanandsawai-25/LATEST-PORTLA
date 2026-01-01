import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Droplets,
  Phone,
  FileText,
  Receipt,
  Wrench,
  Clock,
  Shield,
  Zap,
  CreditCard,
  Globe,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  ArrowRight,
  Bell,
  Activity,
  BarChart3,
  CheckCircle2,
  Plus,
  Calendar,
  Bot,
  Send,
  X,
  Minimize2,
  Maximize2,
  MessageCircle,
  Smartphone,
  Rocket,
  Search,
} from "lucide-react";
import jalmitra from "figma:asset/bd3d14033ffadc4971e7e9ff337ef5d148d5cddc.png";
import { TrackStatus } from "./citizen/TrackStatus";

interface CitizenLandingProps {
  onNavigateToLogin: () => void;
  onNavigateToFirstConnection?: () => void;
}

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  options?: string[];
}

// Counter animation component
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export function CitizenLanding({
  onNavigateToLogin,
  onNavigateToFirstConnection,
}: CitizenLandingProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(
    null,
  );
  const [showTrackDialog, setShowTrackDialog] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  // Chatbot states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    ChatMessage[]
  >([
    {
      id: "1",
      role: "bot",
      content:
        "👋 Hello! I'm your Water Services Assistant. I can help you with:\n\n• Apply for new water connection\n• Pay your water bills\n• Track application status\n• Submit meter readings\n• Raise grievances\n• General queries\n\nHow can I assist you today?",
      timestamp: new Date(),
      options: [
        "Apply for New Connection",
        "Pay Bills",
        "Track Application",
        "Submit Meter Reading",
        "Raise Grievance",
        "General Query",
      ],
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [conversationContext, setConversationContext] =
    useState<string>("initial");
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatMessages]);

  // Auto-scroll when chat opens
  useEffect(() => {
    if (
      isChatOpen &&
      !isChatMinimized &&
      chatMessagesEndRef.current
    ) {
      setTimeout(() => {
        chatMessagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [isChatOpen, isChatMinimized]);

  const resetTrackDialog = () => {
    setShowTrackDialog(false);
    setTrackingId("");
  };

  // Chatbot functions
  const handleChatSubmit = (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    setTimeout(() => {
      let botResponse: ChatMessage;
      const lowerMessage = message.toLowerCase();

      if (
        lowerMessage.includes("new connection") ||
        lowerMessage.includes("apply")
      ) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content:
            "Great! To apply for a new water connection, I'll need some information:\n\n1. Property details (address, property ID)\n2. Owner information\n3. Connection type (Residential/Commercial)\n4. Required documents\n\nWould you like to:\n• Start the application process (requires login)\n• Know about required documents\n• Check eligibility criteria",
          timestamp: new Date(),
          options: [
            "Start Application (Login Required)",
            "Required Documents",
            "Eligibility Criteria",
          ],
        };
      } else if (
        lowerMessage.includes("track") ||
        lowerMessage.includes("status")
      ) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content:
            "You can track your application or grievance status by entering your Tracking ID.\\n\\nTracking ID formats:\\n• APP-YYYY-XXX (Logged-in user applications)\\n• WNC-YYYY-XXXXXX (First water connection)\\n• GRV-YYYY-XXX (Grievances)\\n\\nWould you like to track now?",
          timestamp: new Date(),
          options: ["Track Application", "Sample Tracking IDs"],
        };
      } else if (lowerMessage.includes("sample")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content:
            "Sample Tracking IDs for testing:\\n\\n• APP-2025-001 (Under Review)\\n• APP-2025-002 (Approved)\\n• WNC-2025-180652 (First Connection - Under Review)\\n• GRV-2025-023 (Grievance - In Progress)\\n\\nTry tracking any of these!",
          timestamp: new Date(),
          options: [
            "Track APP-2025-001",
            "Track WNC-2025-180652",
            "Track GRV-2025-023",
          ],
        };
      } else if (lowerMessage.includes("login")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content:
            "🔐 To proceed, please login using:\n\n• Mobile Number + OTP\n• Consumer ID + OTP\n\nNo password required!",
          timestamp: new Date(),
          options: ["Go to Login Page"],
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content:
            "I can help you with:\n\n• New water connections\n• Bill payments\n• Application tracking\n• Meter readings\n• Grievances\n\nWhat would you like to know more about?",
          timestamp: new Date(),
          options: [
            "New Connection",
            "Pay Bills",
            "Track Application",
          ],
        };
      }

      setChatMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleOptionClick = (option: string) => {
    handleChatSubmit(option);

    if (
      option === "Go to Login Page" ||
      option.includes("Login Required")
    ) {
      setTimeout(() => {
        onNavigateToLogin();
      }, 1000);
    } else if (
      option === "Track Application" ||
      option.startsWith("Track APP-") ||
      option.startsWith("Track WNC-") ||
      option.startsWith("Track GRV-")
    ) {
      setTimeout(() => {
        setShowTrackDialog(true);
        setIsChatOpen(false);
        if (option.startsWith("Track ")) {
          const appId = option.replace("Track ", "");
          setTrackingId(appId);
        }
      }, 500);
    }
  };

  const quickServices = [
    {
      icon: FileText,
      title: "Check Connections ",
      description: "New water connection request",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
      glowColor: "shadow-blue-500/20",
    },
    {
      icon: Plus,
      title: "New Water Connection",
      description: "Apply without login",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      iconColor: "text-green-600",
      glowColor: "shadow-green-500/20",
      badge: "New",
    },
    {
      icon: CreditCard,
      title: "Pay Bills",
      description: "Quick bill payment",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
      iconColor: "text-orange-600",
      glowColor: "shadow-orange-500/20",
    },
    {
      icon: MessageCircle,
      title: "Raise Grievance",
      description: "Report an issue",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50",
      iconColor: "text-rose-600",
      glowColor: "shadow-rose-500/20",
    },
    {
      icon: Receipt,
      title: "Track Application",
      description: "Check application status",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
      iconColor: "text-purple-600",
      glowColor: "shadow-purple-500/20",
    },
    {
      icon: Activity,
      title: "Submit Reading",
      description: "Meter reading submission",
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
      iconColor: "text-teal-600",
      glowColor: "shadow-teal-500/20",
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Access services anytime, anywhere",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Your data is protected",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Quick Processing",
      description: "Fast application processing",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Optimized for all devices",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    {
      label: "Active Citizens",
      value: 50000,
      suffix: "+",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Bills Paid",
      value: 2000,
      suffix: "+",
      icon: CheckCircle2,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      label: "Avg. Processing",
      value: 2,
      suffix: " Days",
      icon: TrendingDown,
      gradient: "from-orange-500 to-amber-500",
    },
    {
      label: "Satisfaction",
      value: 4.8,
      suffix: "/5",
      icon: Award,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#EBF3FA]">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header/Navbar */}
      <nav className="relative z-20 bg-gradient-to-r from-[#005AA7] via-[#0077B6] to-[#00C6FF] border-b border-blue-400/30 shadow-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
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
              <Button
                variant="outline"
                onClick={onNavigateToLogin}
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50"
              >
                Officer Login
              </Button>
              <Button
                onClick={onNavigateToLogin}
                className="bg-white text-[#005AA7] hover:bg-white/90 shadow-lg font-semibold"
              >
                <Phone className="w-4 h-4 mr-2" />
                Citizen Portal
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full mb-6 border-2 border-blue-200 shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">
                  Next-Gen Water Management System
                </span>
              </motion.div> */}

              <h1 className="text-5xl md:text-7xl text-gray-900 mb-6 leading-tight font-bold">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  Water Services
                </span>
                Experience
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Seamlessly manage water connections, pay bills
                instantly, and track everything in real-time.
                Join 50,000+ citizens enjoying hassle-free water
                management.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={onNavigateToLogin}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl shadow-blue-500/30 text-lg px-8 h-14"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 text-lg px-8 h-14"
                    onClick={() => setShowTrackDialog(true)}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Track Application
                  </Button>
                </motion.div>
              </div>

              {/* Animated Running Stats */}
              <div className="grid grid-cols-4 gap-4 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="relative group"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-2xl`}
                    ></div>
                    <div className="relative bg-white rounded-2xl p-4 border-2 border-blue-100 group-hover:border-blue-300 transition-all shadow-lg text-center">
                      <stat.icon
                        className={`w-8 h-8 mx-auto mb-2 bg-gradient-to-r ${stat.gradient} p-1.5 rounded-lg text-white`}
                      />
                      <motion.p
                        className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                      >
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </motion.p>
                      <p className="text-xs text-gray-600 font-medium mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - 3D Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Glowing background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-3xl blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                ></motion.div>

                {/* Main card */}
                <motion.div
                  className="relative bg-white rounded-3xl shadow-2xl p-8 border-2 border-blue-100"
                  whileHover={{ y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 pb-6 border-b-2 border-blue-100">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                        animate={{ rotate: 0 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Droplets className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl text-gray-900 font-bold">
                          Welcome!
                        </h3>
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-3">
                      {quickServices
                        .slice(0, 4)
                        .map((service, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => {
                              if (
                                service.title ===
                                  "New Water Connection" &&
                                onNavigateToFirstConnection
                              ) {
                                onNavigateToFirstConnection();
                              } else if (
                                service.title ===
                                "Track Application"
                              ) {
                                setShowTrackDialog(true);
                              } else {
                                onNavigateToLogin();
                              }
                            }}
                            className={`p-4 bg-gradient-to-br ${service.bgGradient} rounded-xl cursor-pointer border-2 border-transparent hover:border-blue-300 transition-all shadow-md hover:shadow-xl`}
                          >
                            <div
                              className={`bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-2 shadow-md`}
                            >
                              <service.icon
                                className={`w-6 h-6 ${service.iconColor}`}
                              />
                            </div>
                            <p className="text-sm text-gray-900 font-semibold">
                              {service.title}
                            </p>
                            {service.badge && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full font-semibold">
                                {service.badge}
                              </span>
                            )}
                          </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    {/* <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-blue-100">
                      <div>
                        <p className="text-3xl text-blue-600 font-bold">
                          3
                        </p>
                        <p className="text-xs text-gray-600">
                          Connections
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl text-green-600 font-bold">
                          ₹0
                        </p>
                        <p className="text-xs text-gray-600">
                          Pending
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl text-purple-600 font-bold">
                          0
                        </p>
                        <p className="text-xs text-gray-600">
                          Issues
                        </p>
                      </div>
                    </div> */}
                  </div>
                </motion.div>

                {/* Floating elements */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-24 h-24 bg-gradient-to-br ${
                      i === 0
                        ? "from-blue-300/40 to-cyan-300/40 -top-12 -right-12"
                        : i === 1
                          ? "from-purple-300/40 to-pink-300/40 -bottom-12 -left-12"
                          : "from-green-300/40 to-emerald-300/40 top-1/2 -right-16"
                    } rounded-full blur-2xl`}
                    animate={{
                      y: [0, -20, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}

                {/* Floating Chat Button - Positioned in this section */}
                {!isChatOpen && (
                  <div className="absolute -bottom-48 -right-6 w-24 h-24 z-50">
                    {/* Pulsing Ring Effect - Outer */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-blue-400"
                      animate={{
                        scale: [1, 1.5, 1.8],
                        opacity: [0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    {/* Pulsing Ring Effect - Middle */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-cyan-400"
                      animate={{
                        scale: [1, 1.4, 1.6],
                        opacity: [0.7, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.4,
                      }}
                    />
                    {/* Pulsing Ring Effect - Inner */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-teal-400"
                      animate={{
                        scale: [1, 1.3, 1.5],
                        opacity: [0.6, 0.2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.8,
                      }}
                    />
                    
                    {/* Main Button */}
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      onClick={() => setIsChatOpen(true)}
                      className="relative w-24 h-24 rounded-full shadow-2xl shadow-blue-500/50 flex items-center justify-center transition-transform hover:scale-110 overflow-hidden border-4 border-white"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#005AA7] via-[#0077B6] to-[#00C6FF] rounded-full"
                        animate={{ 
                          opacity: [0.8, 1, 0.8],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <img 
                        src={jalmitra} 
                        alt="JalMitra" 
                        className="w-full h-full object-cover relative z-10 rounded-full" 
                      />
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white shadow-lg z-20"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* <section className="relative z-10 py-20 px-4 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl text-gray-900 mb-4 font-bold">All Services in One Place</h2>
              <p className="text-xl text-gray-600">Choose from our comprehensive suite of water management tools</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => {
                  if (service.title === 'First Connection' && onNavigateToFirstConnection) {
                    onNavigateToFirstConnection();
                  } else if (service.title === 'Track Application') {
                    setShowTrackDialog(true);
                  } else {
                    onNavigateToLogin();
                  }
                }}
                className="group relative cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity rounded-3xl`}></div>
                
                <Card className={`relative h-full bg-white hover:bg-gradient-to-br ${service.bgGradient} border-2 border-blue-100 group-hover:border-blue-300 transition-all shadow-lg group-hover:shadow-2xl ${service.glowColor} p-6`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2 font-bold">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  {service.badge && (
                    <Badge className="absolute top-4 right-4 px-3 py-1 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                      {service.badge}
                    </Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    className={`${service.iconColor} p-0 group-hover:translate-x-2 transition-transform font-semibold`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      {/* <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-gray-900 mb-4 font-bold">Why Citizens Love Us</h2>
            <p className="text-xl text-gray-600">Experience the future of water management</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="p-6 text-center bg-white border-2 border-blue-100 hover:border-blue-300 h-full shadow-lg hover:shadow-2xl transition-all">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2 font-bold">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="relative p-12 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 border-0 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative text-center">
                <motion.div
                  animate={{ rotate: 0 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Waves className="w-20 h-20 text-white mx-auto mb-6" />
                </motion.div>
                <h2 className="text-5xl text-white mb-4 font-bold">Ready to Get Started?</h2>
                <p className="text-xl text-blue-50 mb-8">
                  Join thousands of citizens managing their water services effortlessly
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    onClick={onNavigateToLogin}
                    className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl text-lg px-10 h-14 font-bold"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Login Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-gray-900 to-blue-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">AquaFlow</h3>
              </div>
              <p className="text-blue-200 text-sm">
                Next-generation water tax management system for
                smart cities
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-lg">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-lg">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    New Connection
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Bill Payment
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Grievances
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Track Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-lg">
                Contact Us
              </h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>📞 1800-XXX-XXXX</li>
                <li>📧 water@municipal.gov.in</li>
                <li>🕐 Mon-Sat: 9 AM - 6 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-700 pt-8 text-center text-blue-200 text-sm">
            <p>
              © 2025 AquaFlow Portal. All rights reserved. |
              Powered by Smart City Initiative
            </p>
          </div>
        </div>
      </footer>

      {/* Track Application Dialog */}
      <TrackStatus
        open={showTrackDialog}
        onOpenChange={(open) => {
          setShowTrackDialog(open);
          if (!open) resetTrackDialog();
        }}
        initialId={trackingId}
      />

      {/* Chat Window */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-32 right-8 w-96 max-w-[calc(100vw-3rem)] z-50"
        >
          <Card className="shadow-2xl overflow-hidden border-2 border-blue-200 bg-white">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
                  <img src={jalmitra} alt="JalMitra" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-white font-bold">
                    JalMitra
                  </h4>
                  <p className="text-cyan-100 text-xs">
                    Your AI-Powered Water Billing Intelligence
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setIsChatMinimized(!isChatMinimized)
                  }
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white"
                >
                  {isChatMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {!isChatMinimized && (
              <>
                <div className="h-96 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "bot" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div className="max-w-[75%]">
                          <div
                            className={`rounded-2xl px-4 py-2 shadow-md ${
                              message.role === "user"
                                ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white"
                                : "bg-white text-gray-800 border-2 border-blue-100"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">
                              {message.content}
                            </p>
                            <p
                              className={`text-xs mt-1 ${message.role === "user" ? "text-cyan-100" : "text-gray-500"}`}
                            >
                              {message.timestamp.toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </p>
                          </div>
                          {message.options &&
                            message.options.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {message.options.map(
                                  (option, idx) => (
                                    <Button
                                      key={idx}
                                      size="sm"
                                      onClick={() =>
                                        handleOptionClick(
                                          option,
                                        )
                                      }
                                      className="text-xs bg-white hover:bg-blue-50 text-blue-700 border-2 border-blue-200"
                                    >
                                      {option}
                                    </Button>
                                  ),
                                )}
                              </div>
                            )}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={chatMessagesEndRef} />
                  </div>
                </div>

                <div className="bg-white p-4 border-t-2 border-blue-100 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) =>
                      setChatInput(e.target.value)
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      handleChatSubmit(chatInput)
                    }
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border-2 border-blue-200 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <Button
                    onClick={() => handleChatSubmit(chatInput)}
                    disabled={!chatInput.trim()}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full h-10 w-10 p-0 shadow-lg"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
