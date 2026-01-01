import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronDown, Send, X, User, Bot, Star, ThumbsUp, MessageSquare, CheckCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FeedbackForm {
  category: string;
  rating: number;
  feedbackText: string;
  name: string;
  email: string;
}

export default function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! Welcome to Water Tax Support. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Feedback state
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm>({
    category: '',
    rating: 0,
    feedbackText: '',
    name: '',
    email: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const faqs = [
    {
      question: 'How do I view my last water bill?',
      answer: 'Navigate to the "Pay Water Tax Bill" section from the sidebar. Your current and previous bills will be displayed with payment history.'
    },
    {
      question: 'What documents are needed for a new water connection?',
      answer: 'You need: 1) Proof of property ownership, 2) Aadhaar card, 3) Address proof, 4) Property tax receipt, and 5) NOC from society (if applicable).'
    },
    {
      question: 'How do I track my complaint status?',
      answer: 'Go to "Register Complaint / Track" section and click on the "Track Status" tab. Enter your complaint ID and registered mobile number to view real-time status updates.'
    },
    {
      question: 'What is the expected time for new connection approval?',
      answer: 'As per the Right to Service Act, new water connections are typically processed within 7-10 working days after field inspection and document verification.'
    },
    {
      question: 'How can I change my water connection type?',
      answer: 'Submit a complaint under the "Change Usage Type" category with your current connection details and the desired connection type. Our team will guide you through the process.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept UPI, Credit/Debit Cards, Net Banking, and various digital wallets through our secure payment gateway.'
    }
  ];

  const quickReplies = [
    'View my bill',
    'New connection',
    'Track complaint',
    'Payment methods',
    'Contact support',
    'Office timings'
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('bill') || lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return 'To view or pay your water bill, navigate to the "Pay Water Tax Bill" section from the main menu. You can see your current bill, payment history, and make online payments using UPI, cards, or net banking.';
    } else if (lowerMessage.includes('new connection') || lowerMessage.includes('apply')) {
      return 'To apply for a new water connection:\n1. Click on "Apply for New Connection" from the menu\n2. Fill in property details and upload required documents\n3. Submit the application with ₹50 fee\n4. Track your application status using the application ID\n\nRequired documents: Property ownership proof, Aadhaar card, address proof, and property tax receipt.';
    } else if (lowerMessage.includes('track') || lowerMessage.includes('complaint') || lowerMessage.includes('status')) {
      return 'You can track your complaint status by:\n1. Going to "Register Complaint / Track" section\n2. Clicking on "Track Status" tab\n3. Entering your Complaint ID and mobile number\n\nYou\'ll see real-time updates on your complaint resolution progress.';
    } else if (lowerMessage.includes('document') || lowerMessage.includes('documents')) {
      return 'Required documents for new water connection:\n• Property ownership proof (Sale deed/Registry)\n• Aadhaar card\n• Address proof\n• Property tax receipt\n• NOC from society (if applicable)\n\nAll documents should be in PDF format, max 2MB each.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
      return 'You can reach us at:\n📞 Toll-free: 1800-XXX-XXXX\n📞 Direct: +91 80-XXXX-XXXX\n📧 Email: support@municipalcorp.gov.in\n\nOffice hours: Mon-Fri 9:30 AM - 5:30 PM, Sat 9:30 AM - 1:00 PM';
    } else if (lowerMessage.includes('time') || lowerMessage.includes('hour') || lowerMessage.includes('office')) {
      return 'Our office timings are:\n🕘 Monday to Friday: 9:30 AM - 5:30 PM\n🕘 Saturday: 9:30 AM - 1:00 PM\n🕘 Sunday & Public Holidays: Closed\n\nFor urgent queries, you can use our 24/7 online portal.';
    } else if (lowerMessage.includes('calculator') || lowerMessage.includes('calculate') || lowerMessage.includes('estimate')) {
      return 'Use our Water Tax Calculator to estimate your bill:\n1. Go to "Bill Calculator" from the menu\n2. Enter your location details\n3. Select connection type and pipe size\n4. Input meter readings\n5. Click Calculate to see your estimated tax\n\nRate slabs: ₹8/unit (0-100), ₹12/unit (101-300), ₹18/unit (301-500), ₹25/unit (500+)';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! I\'m here to help you with water tax services. You can ask me about:\n• Viewing and paying bills\n• New connection applications\n• Complaint tracking\n• Required documents\n• Office timings\n• Payment methods\n\nHow can I assist you?';
    } else if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
      return 'You\'re welcome! If you have any other questions, feel free to ask. Have a great day! 😊';
    } else {
      return 'I\'m here to help! You can ask me about:\n• Bill payment and viewing\n• New water connections\n• Complaint tracking\n• Required documents\n• Office timings and contact info\n• Tax calculation\n\nPlease feel free to ask any specific question about water tax services.';
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating: number) => {
    setFeedbackForm(prev => ({
      ...prev,
      rating
    }));
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add logic to send feedback to the server
    console.log('Feedback Submitted:', feedbackForm);
    setFeedbackSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackForm({
        category: '',
        rating: 0,
        feedbackText: '',
        name: '',
        email: ''
      });
    }, 3000);
  };

  return (
    <div className="w-full mx-auto py-6 relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen mt-[57px] mr-[0px] mb-[0px] ml-[0px]">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 70, 0],
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -70, 0],
            y: [0, -50, 0],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <h2 className="text-3xl text-gray-900 mb-[16px] relative z-10 mt-[16px] mr-[0px] ml-[20px]">Support & Helpdesk</h2>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <Card className="p-8 bg-gradient-to-r from-[#0077C8] to-[#00A5A5] text-white mb-[24px] overflow-hidden relative shadow-2xl mt-[0px] mr-[0px] ml-[16px]">
          <div className="relative z-10">
            <h3 className="text-white mb-2 text-xl">Need Help?</h3>
            <p className="text-white/90">
              We're here to assist you with any questions or concerns about water tax services.
            </p>
          </div>
          
          {/* Decorative illustration */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="80" fill="white" />
              <path d="M100,40 Q120,60 100,80 Q80,60 100,40" fill="white" />
            </svg>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 relative z-10">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 h-full shadow-xl">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-gradient-to-r from-[#0A66A6] to-[#06A6A1]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0A66A6] to-[#06A6A1] flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-gray-900">Contact Information</h3>
            </div>
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* LEFT COLUMN - Contact Details */}
              <div className="space-y-2">
                <div className="mb-3 pb-2 border-b-2 border-blue-400">
                  <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wide">📞 Get in Touch</h4>
                </div>
                
                {/* Helpline Number */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-3 rounded-lg border-l-4 border-blue-500 shadow-sm">
                  <div className="text-[11px] text-blue-700 font-medium mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Helpline Number
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-1">1800-XXX-XXXX</div>
                  <div className="text-xs text-gray-600 mb-2">+91 80-XXXX-XXXX</div>
                  <Button
                    className="w-full bg-[#0077C8] hover:bg-[#005A9C] text-white"
                    size="sm"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>

                {/* Email Support */}
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-3 py-3 rounded-lg border-l-4 border-teal-500 shadow-sm">
                  <div className="text-[11px] text-teal-700 font-medium mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email Support
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">support@municipalcorp.gov.in</div>
                  <div className="text-xs text-gray-600 mb-2">watertax@municipalcorp.gov.in</div>
                  <Button
                    className="w-full bg-[#00A5A5] hover:bg-[#008A8A] text-white"
                    size="sm"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>

              {/* RIGHT COLUMN - Office & Hours */}
              <div className="space-y-2">
                <div className="mb-3 pb-2 border-b-2 border-purple-400">
                  <h4 className="text-xs font-semibold text-purple-700 uppercase tracking-wide">🏢 Office Details</h4>
                </div>

                {/* Office Address */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-3 py-3 rounded-lg border-l-4 border-purple-500 shadow-sm">
                  <div className="text-[11px] text-purple-700 font-medium mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Office Address
                  </div>
                  <div className="text-sm text-gray-900 leading-relaxed">
                    Municipal Corporation Head Office<br />
                    Water Tax Department<br />
                    MG Road, City Center<br />
                    Bangalore - 560001
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-3 py-3 rounded-lg border-l-4 border-orange-500 shadow-sm">
                  <div className="text-[11px] text-orange-700 font-medium mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Working Hours
                  </div>
                  <div className="text-sm text-gray-900 leading-relaxed">
                    Monday - Friday: 9:30 AM - 5:30 PM<br />
                    Saturday: 9:30 AM - 1:00 PM<br />
                    Sunday & Public Holidays: Closed
                  </div>
                </div>
              </div>
              
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <Card className="p-6 h-full shadow-xl">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-gradient-to-r from-[#0A66A6] to-[#06A6A1]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0A66A6] to-[#06A6A1] flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-gray-900">Frequently Asked Questions</h3>
            </div>
            
            {/* Two Column Layout for FAQs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* LEFT COLUMN - FAQs 1-3 */}
              <div className="space-y-3">
                {faqs.slice(0, 3).map((faq, index) => {
                  const gradients = [
                    { from: 'from-blue-50', to: 'to-blue-100', border: 'border-blue-500', text: 'text-blue-700', bg: 'bg-blue-100' },
                    { from: 'from-green-50', to: 'to-green-100', border: 'border-green-500', text: 'text-green-700', bg: 'bg-green-100' },
                    { from: 'from-purple-50', to: 'to-purple-100', border: 'border-purple-500', text: 'text-purple-700', bg: 'bg-purple-100' },
                  ];
                  const colors = gradients[index % 3];
                  
                  return (
                    <Collapsible
                      key={index}
                      open={openFaq === index}
                      onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <div className={`bg-gradient-to-r ${colors.from} ${colors.to} rounded-lg border-l-4 ${colors.border} shadow-sm overflow-hidden`}>
                        <CollapsibleTrigger asChild>
                          <button className="w-full flex items-center justify-between text-left py-3 px-4 hover:opacity-80 transition-opacity">
                            <span className={`text-sm ${colors.text} font-medium pr-4`}>❓ {faq.question}</span>
                            <ChevronDown
                              className={`h-4 w-4 ${colors.text} flex-shrink-0 transition-transform ${
                                openFaq === index ? 'transform rotate-180' : ''
                              }`}
                            />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-3">
                          <div className={`${colors.bg} rounded-md p-3 mt-1`}>
                            <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>

              {/* RIGHT COLUMN - FAQs 4-6 */}
              <div className="space-y-3">
                {faqs.slice(3, 6).map((faq, index) => {
                  const gradients = [
                    { from: 'from-orange-50', to: 'to-orange-100', border: 'border-orange-500', text: 'text-orange-700', bg: 'bg-orange-100' },
                    { from: 'from-teal-50', to: 'to-teal-100', border: 'border-teal-500', text: 'text-teal-700', bg: 'bg-teal-100' },
                    { from: 'from-pink-50', to: 'to-pink-100', border: 'border-pink-500', text: 'text-pink-700', bg: 'bg-pink-100' },
                  ];
                  const colors = gradients[index % 3];
                  const actualIndex = index + 3;
                  
                  return (
                    <Collapsible
                      key={actualIndex}
                      open={openFaq === actualIndex}
                      onOpenChange={() => setOpenFaq(openFaq === actualIndex ? null : actualIndex)}
                    >
                      <div className={`bg-gradient-to-r ${colors.from} ${colors.to} rounded-lg border-l-4 ${colors.border} shadow-sm overflow-hidden`}>
                        <CollapsibleTrigger asChild>
                          <button className="w-full flex items-center justify-between text-left py-3 px-4 hover:opacity-80 transition-opacity">
                            <span className={`text-sm ${colors.text} font-medium pr-4`}>❓ {faq.question}</span>
                            <ChevronDown
                              className={`h-4 w-4 ${colors.text} flex-shrink-0 transition-transform ${
                                openFaq === actualIndex ? 'transform rotate-180' : ''
                              }`}
                            />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-3">
                          <div className={`${colors.bg} rounded-md p-3 mt-1`}>
                            <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
              
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Citizen Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 relative z-10"
      >
        <Card className="p-6 shadow-xl overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="grid grid-cols-8 h-full">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-emerald-500"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-emerald-400">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Citizen Feedback</h3>
                <p className="text-sm text-gray-600">Help us improve our portal and services</p>
              </div>
            </div>

            {feedbackSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="inline-block"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                </motion.div>
                <h4 className="text-2xl text-gray-900 mb-2">Thank You for Your Feedback!</h4>
                <p className="text-gray-600 mb-4">
                  Your valuable input helps us improve our services and portal experience.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Your feedback has been successfully submitted</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={feedbackForm.name}
                        onChange={handleFeedbackChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={feedbackForm.email}
                        onChange={handleFeedbackChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    {/* Category Select */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Feedback Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={feedbackForm.category}
                        onChange={handleFeedbackChange}
                        required
                        className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors bg-white"
                      >
                        <option value="">Select a category</option>
                        <option value="portal_usability">Portal Usability</option>
                        <option value="service_quality">Service Quality</option>
                        <option value="staff_behavior">Staff Behavior</option>
                        <option value="payment_experience">Payment Experience</option>
                        <option value="application_process">Application Process</option>
                        <option value="suggestions">Suggestions</option>
                        <option value="complaint">Complaint</option>
                        <option value="appreciation">Appreciation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Overall Rating <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <motion.button
                            key={rating}
                            type="button"
                            onClick={() => handleStarClick(rating)}
                            onMouseEnter={() => setHoveredStar(rating)}
                            onMouseLeave={() => setHoveredStar(0)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 transition-all ${
                                rating <= (hoveredStar || feedbackForm.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </motion.button>
                        ))}
                        {feedbackForm.rating > 0 && (
                          <span className="ml-2 text-sm text-gray-600">
                            {feedbackForm.rating === 1 && '😞 Poor'}
                            {feedbackForm.rating === 2 && '😐 Fair'}
                            {feedbackForm.rating === 3 && '🙂 Good'}
                            {feedbackForm.rating === 4 && '😊 Very Good'}
                            {feedbackForm.rating === 5 && '🌟 Excellent'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Feedback Text */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Your Feedback <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="feedbackText"
                        value={feedbackForm.feedbackText}
                        onChange={handleFeedbackChange}
                        required
                        rows={6}
                        placeholder="Please share your thoughts, suggestions, or concerns about our portal and services..."
                        className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {feedbackForm.feedbackText.length} / 500 characters
                      </p>
                    </div>

                    {/* Info Box */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-4 rounded-lg">
                      <div className="flex gap-3">
                        <ThumbsUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-800 mb-1">Your Voice Matters!</p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            Your feedback helps us understand citizen needs and continuously improve our water tax portal and services. We review every submission carefully.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={
                        !feedbackForm.name ||
                        !feedbackForm.email ||
                        !feedbackForm.category ||
                        !feedbackForm.rating ||
                        !feedbackForm.feedbackText
                      }
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-gray-900 mb-4">Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-[#0077C8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">1</span>
              </div>
              <div>
                <p className="text-sm text-gray-900 mb-1">Keep Your Property ID Handy</p>
                <p className="text-xs text-gray-600">For faster assistance, have your property ID ready when contacting support.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-[#0077C8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">2</span>
              </div>
              <div>
                <p className="text-sm text-gray-900 mb-1">Check FAQs First</p>
                <p className="text-xs text-gray-600">Most common questions are answered in our FAQ section.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-[#0077C8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">3</span>
              </div>
              <div>
                <p className="text-sm text-gray-900 mb-1">Use Live Chat</p>
                <p className="text-xs text-gray-600">Get instant responses through our live chat feature below.</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#0077C8] to-[#00A5A5] hover:from-[#005A9C] hover:to-[#008A8A] text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-transform hover:scale-110"
          >
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-cyan-400"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <MessageCircle className="h-7 w-7" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] z-50"
          >
            <Card className="shadow-2xl overflow-hidden border-2 border-[#0077C8]">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#0077C8] to-[#00A5A5] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Water Tax Support</h4>
                    <p className="text-white/80 text-xs">Online • Ready to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages Area */}
              <div className="h-96 bg-gradient-to-br from-gray-50 to-blue-50 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-[#0077C8] to-[#00A5A5] rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-[#0077C8] to-[#00A5A5] text-white'
                            : 'bg-white shadow-md text-gray-800 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2 justify-start"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#0077C8] to-[#00A5A5] rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-white shadow-md rounded-2xl px-4 py-3 border border-gray-200">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Quick Replies */}
              <div className="bg-gray-100 p-3 border-t">
                <div className="text-xs text-gray-600 mb-2">Quick replies:</div>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-white hover:bg-[#0077C8] hover:text-white border-gray-300"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-white p-4 border-t flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#0077C8] transition-colors"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-[#0077C8] to-[#00A5A5] hover:from-[#005A9C] hover:to-[#008A8A] text-white rounded-full h-10 w-10 p-0 flex items-center justify-center"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
