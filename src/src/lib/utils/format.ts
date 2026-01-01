/**
 * Formatting Utilities
 */

import { APP_CONFIG } from '@/config/app.config';

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(APP_CONFIG.currency.locale, {
    style: 'currency',
    currency: APP_CONFIG.currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat(APP_CONFIG.currency.locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Format date
 */
export function formatDate(date: string | Date, includeTime: boolean = false): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (includeTime) {
    return dateObj.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
  
  return dateObj.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format date for API
 */
export function formatDateForAPI(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format mobile number
 */
export function formatMobileNumber(mobile: string): string {
  // Remove all non-digit characters
  const cleaned = mobile.replace(/\D/g, '');
  
  // Format as +91 XXXXX-XXXXX
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }
  
  return mobile;
}

/**
 * Format consumer ID
 */
export function formatConsumerId(consumerId: string): string {
  // Format as XXXX-XXXX-XXXX
  const cleaned = consumerId.replace(/\D/g, '');
  
  if (cleaned.length === 12) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
  }
  
  return consumerId;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Truncate text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert snake_case to Title Case
 */
export function snakeToTitle(str: string): string {
  return str
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Calculate days difference
 */
export function daysDifference(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if date is overdue
 */
export function isOverdue(dueDate: string | Date): boolean {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  return due < new Date();
}

/**
 * Get days remaining
 */
export function daysRemaining(dueDate: string | Date): number {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const today = new Date();
  
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format consumption units
 */
export function formatConsumption(consumption: number): string {
  return `${formatNumber(consumption, 2)} KL`;
}

/**
 * Get status badge classes
 */
export function getStatusBadgeClass(type: 'connection' | 'bill' | 'grievance' | 'payment' | 'priority', status: string): string {
  const statusColors = APP_CONFIG.statusColors[type];
  return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-300';
}

/**
 * Mask sensitive data
 */
export function maskAadhar(aadhar: string): string {
  if (aadhar.length !== 12) return aadhar;
  return `XXXX-XXXX-${aadhar.slice(-4)}`;
}

/**
 * Mask mobile number
 */
export function maskMobile(mobile: string): string {
  const cleaned = mobile.replace(/\D/g, '');
  if (cleaned.length !== 10) return mobile;
  return `XXXXXX${cleaned.slice(-4)}`;
}

/**
 * Generate random OTP (for testing purposes only)
 */
export function generateOTP(length: number = 6): string {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0');
}

/**
 * Validate mobile number
 */
export function isValidMobile(mobile: string): boolean {
  const cleaned = mobile.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate Aadhar number
 */
export function isValidAadhar(aadhar: string): boolean {
  const cleaned = aadhar.replace(/\D/g, '');
  return /^\d{12}$/.test(cleaned);
}

/**
 * Calculate bill amount based on consumption
 */
export function calculateBillAmount(
  connectionType: 'domestic' | 'commercial' | 'industrial' | 'institutional',
  consumption: number
): number {
  const slabs = APP_CONFIG.tariffSlabs[connectionType];
  let totalAmount = 0;
  let remainingConsumption = consumption;

  for (const slab of slabs) {
    if (remainingConsumption <= 0) break;

    const slabConsumption = Math.min(
      remainingConsumption,
      slab.max - slab.min + 1
    );

    totalAmount += slabConsumption * slab.rate;
    remainingConsumption -= slabConsumption;
  }

  return totalAmount;
}

/**
 * Calculate penalty
 */
export function calculatePenalty(amount: number, daysOverdue: number): number {
  const { penaltyPercentage } = APP_CONFIG.billing;
  const months = Math.ceil(daysOverdue / 30);
  return (amount * penaltyPercentage * months) / 100;
}

/**
 * Calculate rebate
 */
export function calculateRebate(amount: number, paymentDate: Date, billDate: Date): number {
  const { rebatePercentage, rebateDays } = APP_CONFIG.billing;
  const daysDiff = daysDifference(billDate, paymentDate);
  
  if (daysDiff <= rebateDays) {
    return (amount * rebatePercentage) / 100;
  }
  
  return 0;
}

/**
 * Get RTS due date
 */
export function getRTSDueDate(applicationDate: Date, serviceType: keyof typeof APP_CONFIG.rtsTimelines): Date {
  const timeline = APP_CONFIG.rtsTimelines[serviceType];
  const dueDate = new Date(applicationDate);
  dueDate.setDate(dueDate.getDate() + timeline);
  return dueDate;
}

/**
 * Check RTS compliance
 */
export function checkRTSCompliance(applicationDate: Date, completionDate: Date | null, serviceType: keyof typeof APP_CONFIG.rtsTimelines): boolean {
  if (!completionDate) {
    // If not completed, check if still within timeline
    const dueDate = getRTSDueDate(applicationDate, serviceType);
    return new Date() <= dueDate;
  }
  
  const timeline = APP_CONFIG.rtsTimelines[serviceType];
  const daysTaken = daysDifference(applicationDate, completionDate);
  return daysTaken <= timeline;
}
