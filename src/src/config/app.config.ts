/**
 * Application Configuration
 * Centralized configuration for the Water Tax Management System
 */

export const APP_CONFIG = {
  // Application Details
  app: {
    name: 'Water Tax Management System',
    shortName: 'WTMS',
    version: '1.0.0',
    description: 'Integrated Water Tax Assessment, Collection and Management Software',
    department: 'Municipal Water Department',
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },

  // Authentication
  auth: {
    tokenKey: 'wtms_auth_token',
    refreshTokenKey: 'wtms_refresh_token',
    userKey: 'wtms_user',
    otpLength: 6,
    otpExpiryMinutes: 5,
    sessionTimeoutMinutes: 30,
  },

  // OTP Configuration
  otp: {
    length: 6,
    expiryMinutes: 5,
    resendDelaySeconds: 60,
    maxAttempts: 3,
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    maxPageSize: 100,
  },

  // File Upload
  fileUpload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    allowedDocumentTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
    maxFiles: 5,
  },

  // Billing Configuration
  billing: {
    billingCycleDay: 1, // 1st of every month
    dueDateDays: 15, // 15 days from bill date
    rebatePercentage: 5, // 5% rebate for early payment
    rebateDays: 7, // Within 7 days
    penaltyPercentage: 2, // 2% penalty per month
    latePaymentCharges: 50, // Flat ₹50
  },

  // Connection Charges
  connectionCharges: {
    domestic: {
      securityDeposit: 1000,
      connectionCharges: 500,
      developmentCharges: 1500,
      processingFee: 100,
    },
    commercial: {
      securityDeposit: 5000,
      connectionCharges: 2000,
      developmentCharges: 5000,
      processingFee: 500,
    },
    industrial: {
      securityDeposit: 25000,
      connectionCharges: 10000,
      developmentCharges: 15000,
      processingFee: 1000,
    },
    institutional: {
      securityDeposit: 10000,
      connectionCharges: 5000,
      developmentCharges: 7500,
      processingFee: 500,
    },
  },

  // Tariff Slabs (Rate per KL - Kilo Liter)
  tariffSlabs: {
    domestic: [
      { min: 0, max: 10, rate: 5 },
      { min: 11, max: 20, rate: 10 },
      { min: 21, max: 30, rate: 15 },
      { min: 31, max: Number.MAX_SAFE_INTEGER, rate: 20 },
    ],
    commercial: [
      { min: 0, max: 20, rate: 20 },
      { min: 21, max: 50, rate: 25 },
      { min: 51, max: Number.MAX_SAFE_INTEGER, rate: 30 },
    ],
    industrial: [
      { min: 0, max: 100, rate: 30 },
      { min: 101, max: Number.MAX_SAFE_INTEGER, rate: 35 },
    ],
    institutional: [
      { min: 0, max: 50, rate: 15 },
      { min: 51, max: Number.MAX_SAFE_INTEGER, rate: 20 },
    ],
  },

  // RTS (Right to Service) Timelines (in days)
  rtsTimelines: {
    newConnection: 15, // 15 days for new connection
    grievanceResolution: 7, // 7 days for grievance resolution
    meterInstallation: 10, // 10 days for meter installation
    inspection: 5, // 5 days for inspection
    billCorrection: 3, // 3 days for bill correction
    disconnection: 2, // 2 days for disconnection
    reconnection: 1, // 1 day for reconnection
  },

  // Status Colors (Tailwind classes)
  statusColors: {
    connection: {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      under_verification: 'bg-blue-100 text-blue-800 border-blue-300',
      inspection_scheduled: 'bg-purple-100 text-purple-800 border-purple-300',
      inspection_completed: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      active: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      disconnected: 'bg-gray-100 text-gray-800 border-gray-300',
      suspended: 'bg-orange-100 text-orange-800 border-orange-300',
    },
    bill: {
      unpaid: 'bg-red-100 text-red-800 border-red-300',
      partially_paid: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      paid: 'bg-green-100 text-green-800 border-green-300',
      overdue: 'bg-orange-100 text-orange-800 border-orange-300',
    },
    grievance: {
      submitted: 'bg-blue-100 text-blue-800 border-blue-300',
      acknowledged: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      under_review: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      in_progress: 'bg-purple-100 text-purple-800 border-purple-300',
      resolved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      closed: 'bg-gray-100 text-gray-800 border-gray-300',
    },
    payment: {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      success: 'bg-green-100 text-green-800 border-green-300',
      failed: 'bg-red-100 text-red-800 border-red-300',
    },
    priority: {
      low: 'bg-gray-100 text-gray-800 border-gray-300',
      medium: 'bg-blue-100 text-blue-800 border-blue-300',
      high: 'bg-orange-100 text-orange-800 border-orange-300',
      urgent: 'bg-red-100 text-red-800 border-red-300',
    },
  },

  // Date Formats
  dateFormats: {
    display: 'DD/MM/YYYY',
    displayWithTime: 'DD/MM/YYYY hh:mm A',
    api: 'YYYY-MM-DD',
    apiWithTime: 'YYYY-MM-DD HH:mm:ss',
  },

  // Currency
  currency: {
    symbol: '₹',
    code: 'INR',
    locale: 'en-IN',
  },

  // Contact Information
  contact: {
    helplineNumber: '1800-XXX-XXXX',
    email: 'watertax@municipality.gov.in',
    address: 'Municipal Corporation Building, City Centre',
    officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
  },

  // Feature Flags
  features: {
    enableOnlinePayment: true,
    enableSelfMeterReading: true,
    enableSMSNotifications: true,
    enableEmailNotifications: true,
    enablePropertyTaxIntegration: true,
    enableGIS: false, // GIS integration
    enableAutoDisconnection: false,
    enableBulkUpload: true,
    enableMobileApp: false,
  },

  // Storage Keys
  storageKeys: {
    theme: 'wtms_theme',
    language: 'wtms_language',
    notifications: 'wtms_notifications',
    filters: 'wtms_filters',
  },
} as const;

// Environment-specific configuration
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    sendOtp: '/auth/send-otp',
    verifyOtp: '/auth/verify-otp',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
    me: '/auth/me',
  },

  // Water Connections
  connections: {
    list: '/connections',
    create: '/connections',
    get: (id: string) => `/connections/${id}`,
    update: (id: string) => `/connections/${id}`,
    delete: (id: string) => `/connections/${id}`,
    myConnections: '/connections/my-connections',
    trackStatus: (applicationNumber: string) => `/connections/track/${applicationNumber}`,
  },

  // Bills
  bills: {
    list: '/bills',
    get: (id: string) => `/bills/${id}`,
    myBills: '/bills/my-bills',
    generate: '/bills/generate',
    bulkGenerate: '/bills/bulk-generate',
    download: (id: string) => `/bills/${id}/download`,
  },

  // Payments
  payments: {
    create: '/payments',
    verify: '/payments/verify',
    list: '/payments',
    get: (id: string) => `/payments/${id}`,
    receipt: (id: string) => `/payments/${id}/receipt`,
  },

  // Meter Readings
  readings: {
    list: '/meter-readings',
    create: '/meter-readings',
    get: (id: string) => `/meter-readings/${id}`,
    verify: (id: string) => `/meter-readings/${id}/verify`,
  },

  // Grievances
  grievances: {
    list: '/grievances',
    create: '/grievances',
    get: (id: string) => `/grievances/${id}`,
    update: (id: string) => `/grievances/${id}`,
    track: (grievanceNumber: string) => `/grievances/track/${grievanceNumber}`,
  },

  // Field Tasks
  fieldTasks: {
    list: '/field-tasks',
    get: (id: string) => `/field-tasks/${id}`,
    update: (id: string) => `/field-tasks/${id}`,
    myTasks: '/field-tasks/my-tasks',
  },

  // Reports
  reports: {
    collection: '/reports/collection',
    connections: '/reports/connections',
    grievances: '/reports/grievances',
    rtsCompliance: '/reports/rts-compliance',
    wardWise: '/reports/ward-wise',
    outstanding: '/reports/outstanding',
    dashboard: '/reports/dashboard',
  },

  // Master Data
  masters: {
    zones: '/masters/zones',
    wards: '/masters/wards',
    tariffs: '/masters/tariffs',
    rtsServices: '/masters/rts-services',
  },

  // Admin
  admin: {
    users: '/admin/users',
    systemConfig: '/admin/system-config',
    auditLogs: '/admin/audit-logs',
  },

  // Property Tax Integration
  propertyTax: {
    search: '/integrations/property-tax/search',
    getDetails: (propertyNumber: string) => `/integrations/property-tax/${propertyNumber}`,
  },

  // File Upload
  files: {
    upload: '/files/upload',
    download: (id: string) => `/files/${id}`,
  },
} as const;

// Export types for TypeScript
export type AppConfig = typeof APP_CONFIG;
export type ApiEndpoints = typeof API_ENDPOINTS;
