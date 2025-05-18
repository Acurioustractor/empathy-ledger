import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Empathy Ledger</h3>
            <p className="text-sm text-gray-600">
              A platform for ethical storytelling and value exchange.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/stories" className="text-sm text-gray-600 hover:text-primary-600">
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/organizations"
                  className="text-sm text-gray-600 hover:text-primary-600"
                >
                  Organizations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary-600">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-sm text-gray-600 hover:text-primary-600">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-primary-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-sm text-gray-600 hover:text-primary-600">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Empathy Ledger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
