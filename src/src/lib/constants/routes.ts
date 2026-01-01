/**
 * Application Routes
 * Centralized route definitions
 */

export const ROUTES = {
  // Public routes
  home: '/',
  login: '/login',
  firstConnection: '/first-connection',
  firstGrievance: '/first-grievance',
  trackStatus: '/track-status',

  // Citizen routes
  citizen: {
    dashboard: '/citizen/dashboard',
    myConnections: '/citizen/connections',
    newConnection: '/citizen/connections/new',
    connectionDetails: (id: string) => `/citizen/connections/${id}`,
    bills: '/citizen/bills',
    billDetails: (id: string) => `/citizen/bills/${id}`,
    payBill: (id: string) => `/citizen/bills/${id}/pay`,
    payments: '/citizen/payments',
    paymentReceipt: (id: string) => `/citizen/payments/${id}/receipt`,
    meterReading: '/citizen/meter-reading',
    submitReading: (connectionId: string) => `/citizen/meter-reading/${connectionId}/submit`,
    grievances: '/citizen/grievances',
    newGrievance: '/citizen/grievances/new',
    grievanceDetails: (id: string) => `/citizen/grievances/${id}`,
    support: '/citizen/support',
    profile: '/citizen/profile',
  },

  // Officer routes
  officer: {
    dashboard: '/officer/dashboard',
    applications: '/officer/applications',
    applicationDetails: (id: string) => `/officer/applications/${id}`,
    bills: '/officer/bills',
    billDetails: (id: string) => `/officer/bills/${id}`,
    collection: '/officer/collection',
    grievances: '/officer/grievances',
    grievanceDetails: (id: string) => `/officer/grievances/${id}`,
    reports: '/officer/reports',
    connections: '/officer/connections',
    connectionDetails: (id: string) => `/officer/connections/${id}`,
  },

  // Field Officer routes
  field: {
    dashboard: '/field/dashboard',
    tasks: '/field/tasks',
    taskDetails: (id: string) => `/field/tasks/${id}`,
    inspections: '/field/inspections',
    inspectionDetails: (id: string) => `/field/inspections/${id}`,
    verifications: '/field/verifications',
    installations: '/field/installations',
  },

  // Admin routes
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    userDetails: (id: string) => `/admin/users/${id}`,
    masters: '/admin/masters',
    zones: '/admin/masters/zones',
    wards: '/admin/masters/wards',
    tariffs: '/admin/masters/tariffs',
    rtsServices: '/admin/masters/rts-services',
    settings: '/admin/settings',
    auditLogs: '/admin/audit-logs',
    reports: '/admin/reports',
  },
} as const;

/**
 * Get breadcrumb for route
 */
export function getBreadcrumb(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: { label: string; href: string }[] = [
    { label: 'Home', href: '/' }
  ];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: formatSegment(segment),
      href: currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * Format URL segment to readable label
 */
function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Check if route is active
 */
export function isActiveRoute(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(route + '/');
}
