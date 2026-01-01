/**
 * useAuth Hook
 * Hook for authentication management
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api.service';
import { APP_CONFIG } from '@/config/app.config';
import { ROUTES } from '@/lib/constants/routes';
import type { User, UserRole, OTPRequest, OTPVerification } from '@/types/common.types';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  sendOTP: (data: OTPRequest) => Promise<{ success: boolean; message: string }>;
  verifyOTP: (data: OTPVerification) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem(APP_CONFIG.auth.userKey);
        const token = localStorage.getItem(APP_CONFIG.auth.tokenKey);

        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Send OTP
  const sendOTP = useCallback(async (data: OTPRequest) => {
    try {
      const response = await authService.sendOTP(data);
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to send OTP',
      };
    }
  }, []);

  // Verify OTP and login
  const verifyOTP = useCallback(async (data: OTPVerification) => {
    try {
      const response = await authService.verifyOTP(data);

      if (response.success && response.data) {
        const { user: userData, token, refreshToken } = response.data;

        // Store in localStorage
        if (token) {
          localStorage.setItem(APP_CONFIG.auth.tokenKey, token);
        }
        if (refreshToken) {
          localStorage.setItem(APP_CONFIG.auth.refreshTokenKey, refreshToken);
        }
        if (userData) {
          localStorage.setItem(APP_CONFIG.auth.userKey, JSON.stringify(userData));
          setUser(userData);

          // Redirect based on role
          switch (userData.role) {
            case 'citizen':
              router.push(ROUTES.citizen.dashboard);
              break;
            case 'officer':
              router.push(ROUTES.officer.dashboard);
              break;
            case 'fieldOfficer':
              router.push(ROUTES.field.dashboard);
              break;
            case 'admin':
              router.push(ROUTES.admin.dashboard);
              break;
          }
        }
      }

      return {
        success: response.success,
        message: response.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to verify OTP',
      };
    }
  }, [router]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem(APP_CONFIG.auth.tokenKey);
      localStorage.removeItem(APP_CONFIG.auth.refreshTokenKey);
      localStorage.removeItem(APP_CONFIG.auth.userKey);
      
      setUser(null);
      router.push(ROUTES.login);
    }
  }, [router]);

  // Check if user has specific role
  const hasRole = useCallback((role: UserRole) => {
    return user?.role === role;
  }, [user]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    sendOTP,
    verifyOTP,
    logout,
    hasRole,
  };
}
