/**
 * Footer Component
 * Application footer with links and information
 */

import React from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/app.config';
import { Droplet, Mail, Phone, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Droplet className="h-5 w-5 text-white" />
              </div>
              <div className="font-bold text-white">{APP_CONFIG.app.shortName}</div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {APP_CONFIG.app.description}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/first-connection" className="text-sm hover:text-blue-400 transition-colors">
                  New Connection
                </Link>
              </li>
              <li>
                <Link href="/track-status" className="text-sm hover:text-blue-400 transition-colors">
                  Track Application
                </Link>
              </li>
              <li>
                <Link href="/first-grievance" className="text-sm hover:text-blue-400 transition-colors">
                  Register Grievance
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm hover:text-blue-400 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-blue-400 transition-colors">
                  Water Connection
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-blue-400 transition-colors">
                  Bill Payment
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-blue-400 transition-colors">
                  Meter Reading
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-blue-400 transition-colors">
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{APP_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span>{APP_CONFIG.contact.helplineNumber}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span>{APP_CONFIG.contact.email}</span>
              </li>
              <li className="text-sm text-gray-400">
                {APP_CONFIG.contact.officeHours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} {APP_CONFIG.app.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
