/**
 * Main Layout Component
 * Wrapper layout with header and footer
 */

'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import type { User } from '@/types/common.types';

export interface MainLayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogout?: () => void;
  showFooter?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  user,
  onLogout,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};
