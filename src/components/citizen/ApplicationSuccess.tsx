import { Button } from '../ui/button';
import { 
  CheckCircle, Copy, ArrowRight, Clock, FileText, Download,
  Award, Zap, Mail, Phone, Home, Shield, BadgeIndianRupee, MessageSquare
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { TrackStatus } from './TrackStatus';

interface ApplicationSuccessProps {
  applicationId: string;
  onClose?: () => void;
  onProceedToPayment?: () => void;
  onRaiseGrievance?: () => void;
  onBackToDashboard?: () => void;
}

export function ApplicationSuccess({ applicationId, onClose, onProceedToPayment, onRaiseGrievance, onBackToDashboard }: ApplicationSuccessProps) {
  const [copied, setCopied] = useState(false);
  const [showTrackDialog, setShowTrackDialog] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(applicationId);
        setCopied(true);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = applicationId;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
        } catch (err) {
          setCopied(true);
        }
        textArea.remove();
      }
    } catch (err) {
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackApplication = () => {
    setShowTrackDialog(true);
  };

  const handleDone = () => {
    if (onBackToDashboard) {
      onBackToDashboard();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        {/* Modal Dialog */}
        <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-3xl shadow-2xl border-2 border-white/20 overflow-hidden">
          
          {/* Success Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-5 text-center relative">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h2 className="text-2xl text-white mb-1">
              ✨ Application Submitted Successfully!
            </h2>
            <p className="text-white/90 text-sm">
              Your water connection application has been received and is under review
            </p>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-5">
            
            {/* Application ID Card */}
            <div className="bg-slate-900/80 backdrop-blur-lg rounded-2xl p-5 border border-slate-600/50 shadow-lg">
              <p className="text-xs text-cyan-400 mb-2 text-center flex items-center justify-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Your Application ID
              </p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-3xl text-white tracking-widest">
                  {applicationId}
                </h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-9 w-9 p-0 hover:bg-cyan-500/20 rounded-lg border border-cyan-400/30"
                >
                  <Copy className="h-4 w-4 text-cyan-400" />
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-green-400 text-center flex items-center justify-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Copied to clipboard!
                </p>
              )}
              <p className="text-xs text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Save this ID to track your application status
              </p>
            </div>

            {/* Status Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current Status */}
              <div className="bg-blue-500/15 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-600 text-white px-2.5 py-1 text-xs shrink-0">
                    <Zap className="w-3 h-3 mr-1" />
                    In Process
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm text-white mb-1">Current Status</p>
                    <p className="text-xs text-slate-300">
                      Your application is submitted and awaiting initial scrutiny
                    </p>
                  </div>
                </div>
              </div>

              {/* Expected Timeline */}
              <div className="bg-green-500/15 backdrop-blur-sm rounded-xl p-4 border border-green-400/30">
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-green-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-white mb-1">Expected Timeline</p>
                    <p className="text-xs text-slate-300">
                      Processed within 7-15 working days as per RTS guidelines
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <h3 className="text-base text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                What Happens Next?
              </h3>
              <div className="space-y-3">
                {[
                  { icon: FileText, text: 'Document verification and initial scrutiny', color: 'text-blue-400' },
                  { icon: Home, text: 'Site inspection by field officer', color: 'text-purple-400' },
                  { icon: BadgeIndianRupee, text: 'Fee assessment and notification', color: 'text-green-400' },
                  { icon: CheckCircle, text: 'Approval and Consumer ID generation', color: 'text-pink-400' },
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 text-xs text-white">
                        {index + 1}
                      </div>
                      <Icon className={`w-4 h-4 ${step.color} mt-1 shrink-0`} />
                      <p className="text-sm text-slate-200 leading-relaxed">{step.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={handleTrackApplication}
                className="h-12 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all"
              >
                <FileText className="h-4 w-4 mr-2" />
                Track
              </Button>

              <Button className="h-12 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-600 transition-all">
                <Download className="h-4 w-4 mr-2" />
                Receipt
              </Button>

              <Button
                onClick={handleDone}
                className="h-12 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700 transition-all"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Help Notice */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <p className="text-xs text-slate-300 text-center">
                <Shield className="w-3 h-3 inline mr-1" />
                Need help? Contact our helpline:{' '}
                <span className="text-white">
                  <Phone className="w-3 h-3 inline mr-0.5" />
                  1800-XXX-XXXX
                </span>{' '}
                or email{' '}
                <span className="text-white">
                  <Mail className="w-3 h-3 inline mr-0.5" />
                  support@municipalcorp.gov.in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Track Status Dialog */}
      <TrackStatus 
        open={showTrackDialog} 
        onOpenChange={setShowTrackDialog}
        initialId={applicationId}
      />
    </>
  );
}
