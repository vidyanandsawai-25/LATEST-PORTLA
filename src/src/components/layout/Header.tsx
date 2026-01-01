/**
 * Header Component
 * Main application header with navigation and user menu
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { APP_CONFIG } from '@/config/app.config';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Bell,
  Droplet,
  Settings
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import type { User as UserType } from '@/types/common.types';

export interface HeaderProps {
  user?: UserType | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = React.useMemo(() => {
    if (!user) {
      return [
        { name: 'Home', href: '/' },
        { name: 'Track Application', href: '/track-status' },
        { name: 'New Connection', href: '/first-connection' },
      ];
    }

    switch (user.role) {
      case 'citizen':
        return [
          { name: 'Dashboard', href: '/citizen/dashboard' },
          { name: 'My Connections', href: '/citizen/connections' },
          { name: 'Bills', href: '/citizen/bills' },
          { name: 'Grievances', href: '/citizen/grievances' },
        ];
      case 'officer':
        return [
          { name: 'Dashboard', href: '/officer/dashboard' },
          { name: 'Applications', href: '/officer/applications' },
          { name: 'Collection', href: '/officer/collection' },
          { name: 'Reports', href: '/officer/reports' },
        ];
      case 'fieldOfficer':
        return [
          { name: 'Dashboard', href: '/field/dashboard' },
          { name: 'My Tasks', href: '/field/tasks' },
          { name: 'Inspections', href: '/field/inspections' },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', href: '/admin/dashboard' },
          { name: 'Users', href: '/admin/users' },
          { name: 'Masters', href: '/admin/masters' },
          { name: 'Settings', href: '/admin/settings' },
        ];
      default:
        return [];
    }
  }, [user]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Droplet className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-gray-900">{APP_CONFIG.app.shortName}</div>
                <div className="text-xs text-gray-600">{APP_CONFIG.app.department}</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-600 capitalize">{user.role}</div>
                    </div>
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 fade-in">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-600">{user.email || user.mobileNumber}</div>
                      </div>
                      <Link
                        href={`/${user.role}/profile`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      {user.role === 'citizen' && (
                        <Link
                          href="/citizen/support"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                      )}
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 fade-in">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
