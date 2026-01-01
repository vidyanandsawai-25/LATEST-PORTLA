import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../../common/ui/card';
import { Button } from '../../common/ui/button';
import { FileText, Clock, Download, ExternalLink, Info, Shield } from 'lucide-react';
import { Badge } from '../../common/ui/badge';

export function RTIInfo() {
  const services = [
    {
      name: 'New Water Connection',
      description: 'Sanction of new domestic/commercial water supply connection',
      timeLimit: '7 working days',
      authority: 'Executive Engineer (Water Supply)',
      fee: '₹50 (Application Fee)',
      documents: 'Ownership proof, Property tax receipt, ID proof'
    },
    {
      name: 'Water Tax Bill Copy',
      description: 'Issue duplicate water tax bill or receipt',
      timeLimit: '3 working days',
      authority: 'Revenue Officer',
      fee: '₹20',
      documents: 'Consumer ID, Application form'
    },
    {
      name: 'Water Connection Transfer',
      description: 'Transfer of water connection to new owner',
      timeLimit: '15 working days',
      authority: 'Deputy Engineer',
      fee: '₹100 (Transfer Fee)',
      documents: 'Sale deed, NOC from previous owner, Property documents'
    },
    {
      name: 'Complaint Resolution',
      description: 'Resolution of water supply related complaints',
      timeLimit: '30 working days',
      authority: 'Assistant Engineer (Ward)',
      fee: 'No fee',
      documents: 'Complaint description, Location details'
    },
  ];

  const rtiInfo = [
    {
      title: 'What is RTI?',
      content: 'Right to Information Act, 2005 empowers every citizen to seek information from public authorities. You can file RTI applications to get information about water supply, bills, connections, and municipal services.'
    },
    {
      title: 'How to File RTI?',
      content: 'Submit written application in English, Hindi, or Marathi with ₹10 fee (BPL citizens exempted) to the Public Information Officer (PIO) of the concerned department. Response must be provided within 30 days.'
    },
    {
      title: 'What is RTS?',
      content: 'Right to Public Services Act (Maharashtra) guarantees time-bound delivery of notified public services. If services are not delivered within the specified time limit, you can file an appeal and claim compensation for delays.'
    },
  ];

  return (
    <div className="w-full py-6 relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen mt-[32px] mr-[0px] mb-[0px] ml-[0px]">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="mb-[32px] relative z-10 mt-[0px] mr-[0px] ml-[15px]">
        <h2 className="text-3xl text-gray-900 mb-2">RTI / RTS Information</h2>
        <p className="text-gray-600">
          Your rights to information and time-bound public services
        </p>
      </div>

      {/* Info Banner */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-blue-600 mb-[32px] shadow-lg relative z-10 px-[14px] py-[24px] mt-[0px] mr-[0px] ml-[3px]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Info className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl text-gray-900 mb-2">
              Right to Information & Right to Service
            </h3>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              As a citizen of Maharashtra, you have the right to access information about government services 
              and receive time-bound delivery of notified public services. Below are the service charters 
              for water-related services as per RTS Act.
            </p>
            <div className="flex gap-3">
              <Badge className="bg-green-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                RTI Act 2005
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <Clock className="h-3 w-3 mr-1" />
                Maharashtra RTS Act
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* RTI/RTS Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
        {rtiInfo.map((info, index) => {
          const cardColors = [
            { bgFrom: 'from-blue-50', bgTo: 'to-blue-100', border: 'border-blue-500', textColor: 'text-blue-700' },
            { bgFrom: 'from-purple-50', bgTo: 'to-purple-100', border: 'border-purple-500', textColor: 'text-purple-700' },
            { bgFrom: 'from-teal-50', bgTo: 'to-teal-100', border: 'border-teal-500', textColor: 'text-teal-700' },
          ];
          const colors = cardColors[index % 3];
          
          return (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`bg-gradient-to-br ${colors.bgFrom} ${colors.bgTo} rounded-xl p-6 h-full border-l-4 ${colors.border} shadow-md hover:shadow-2xl transition-all cursor-pointer`}>
                <h3 className={`text-lg ${colors.textColor} mb-3`}>{info.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{info.content}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Service Charters */}
      <div className="mb-6 relative z-10">
        <h3 className="text-2xl text-gray-900 mb-4">Service Charters - Time-Bound Delivery</h3>
        <p className="text-sm text-gray-600 mb-6">
          As per Maharashtra Right to Public Services Act, the following services must be delivered within the specified time limits:
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 relative z-10">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.01, x: 5 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-2xl transition-all border-0 bg-gradient-to-r from-white/90 to-blue-50/50 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0"
                    >
                      <Clock className="h-5 w-5 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-lg text-gray-900 mb-1">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm px-3 py-1.5 whitespace-nowrap shadow-lg">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.timeLimit}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-xs text-gray-600 mb-1">Designated Authority</p>
                  <p className="text-sm text-gray-900">{service.authority}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-xs text-gray-600 mb-1">Fee</p>
                  <p className="text-sm text-gray-900">{service.fee}</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <p className="text-xs text-gray-600 mb-1">Required Documents</p>
                  <p className="text-sm text-gray-900">{service.documents}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-600 text-blue-600 hover:from-blue-600 hover:to-cyan-600 hover:text-white transition-all shadow-md hover:shadow-lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Service Charter
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Important Links */}
      <Card className="p-6 border-0 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm shadow-lg relative z-10">
        <h3 className="text-2xl text-gray-900 mb-4">Important Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://rtionline.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg hover:shadow-md transition-all group bg-blue-50 border border-blue-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-900">RTI Online Portal</p>
                  <p className="text-xs text-gray-600">File RTI applications online</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </a>

          <a
            href="https://aaplesarkar.mahaonline.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg hover:shadow-md transition-all group bg-green-50 border border-green-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-900">Aaple Sarkar Portal</p>
                  <p className="text-xs text-gray-600">Maharashtra Govt. Services</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
          </a>

          <div className="p-4 rounded-lg md:col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
            <h4 className="text-sm text-gray-900 mb-2">Escalation & Appeals</h4>
            <p className="text-xs text-gray-700 mb-3 leading-relaxed">
              If your service is not delivered within the time limit specified under RTS Act, you can file an appeal 
              to the First Appellate Authority within 30 days. Further appeal to Second Appellate Authority is possible 
              within 60 days if not satisfied with first appeal.
            </p>
            <div className="flex gap-3">
              <Badge variant="outline" className="text-xs border-orange-600 text-orange-600">
                First Appeal: 30 days
              </Badge>
              <Badge variant="outline" className="text-xs border-red-600 text-red-600">
                Second Appeal: 60 days
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-700 leading-relaxed">
          <strong className="text-gray-900">Note:</strong> The information provided here is for general guidance. For specific queries, 
          please refer to the official RTI Act 2005 and Maharashtra Right to Public Services Act. Time limits 
          may vary based on the complexity of the service and may be extended with proper justification by the 
          designated authority.
        </p>
      </div>
    </div>
  );
}
