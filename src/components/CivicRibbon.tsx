import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, CreditCard, MessageSquare, HelpCircle, 
  Download, FileText, BookOpen, Camera, Calculator, History,
  Droplets, Shield
} from 'lucide-react';
import { Badge } from './ui/badge';

interface Hub {
  id: string;
  label: string;
  icon: any;
  gradient: string;
  badge?: string;
  badgeColor?: string;
}

interface CivicRibbonProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const hubs: Hub[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-[#5A6472] to-[#09223B]' },
  { id: 'connections', label: 'My Connections', icon: Droplets, gradient: 'from-[#0A66A6] to-[#06A6A1]' },
  { id: 'newConnection', label: 'New Connection', icon: FileText, gradient: 'from-[#06A6A1] to-[#0A66A6]' },
  // { id: 'payBills', label: 'Pay Bills', icon: CreditCard, gradient: 'from-[#2E7D32] to-[#1B5E20]', badge: '₹2,450', badgeColor: 'bg-[#DA7A00]' },
  { id: 'submitReading', label: 'Meter Reading', icon: Camera, gradient: 'from-[#1B5E20] to-[#2E7D32]' },
  { id: 'grievances', label: 'Grievances', icon: MessageSquare, gradient: 'from-[#DA7A00] to-[#B86500]', badge: '1', badgeColor: 'bg-[#0A66A6]' },
  { id: 'calculator', label: 'Bill Calculator', icon: Calculator, gradient: 'from-[#7B1FA2] to-[#4A148C]' },
  // { id: 'rti', label: 'RTI / RTS', icon: Shield, gradient: 'from-[#0277BD] to-[#01579B]' },
  // { id: 'history', label: 'Transactions', icon: History, gradient: 'from-[#C62828] to-[#B71C1C]' },
  // { id: 'downloads', label: 'Downloads', icon: Download, gradient: 'from-[#00838F] to-[#006064]' },
  // { id: 'support', label: 'HelpDesk', icon: HelpCircle, gradient: 'from-[#F57C00] to-[#E65100]' },
];

export default function CivicRibbon({ currentScreen, onNavigate }: CivicRibbonProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [expandedHub, setExpandedHub] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40 hidden md:block"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        scale: isCompact ? 0.92 : 1,
      }}
      transition={{ 
        duration: 0.4,
        ease: [0.2, 0.8, 0.2, 1]
      }}
    >
      {/* Curved Ribbon Background - Glass Card */}
      <div className="bg-white/80 backdrop-blur-lg rounded-full px-3 py-3 shadow-lg border border-blue-200/50">
        <div className="flex items-center gap-2">
          {hubs.map((hub, index) => {
            const Icon = hub.icon;
            const isActive = currentScreen === hub.id;
            const isExpanded = expandedHub === hub.id;

            return (
              <motion.button
                key={hub.id}
                onClick={() => onNavigate(hub.id)}
                onMouseEnter={() => setExpandedHub(hub.id)}
                onMouseLeave={() => setExpandedHub(null)}
                className={`
                  relative flex items-center gap-2 rounded-full px-4 py-2.5
                  transition-all duration-300
                  ${isActive 
                    ? `bg-gradient-to-r ${hub.gradient} text-white shadow-md` 
                    : 'bg-transparent text-gray-700 hover:bg-white/50'
                  }
                `}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {/* Icon */}
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                
                {/* Label - Always visible on active, show on hover for others */}
                <AnimatePresence>
                  {(isActive || isExpanded || !isCompact) && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs font-medium whitespace-nowrap overflow-hidden"
                    >
                      {hub.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Badge */}
                {/* {hub.badge && isActive && (
                  <Badge 
                    className={`${hub.badgeColor} text-white text-[10px] px-1.5 py-0.5 ml-1`}
                  >
                    {hub.badge}
                  </Badge>
                )} */}

                {/* Active Indicator Glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3), 0 0 12px rgba(10, 102, 166, 0.4)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}