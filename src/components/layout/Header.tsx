import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600">Empathy Ledger</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/stories"
              className="text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              Stories
            </Link>
            <Link
              href="/storytellers"
              className="text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              Storytellers
            </Link>
            <Link
              href="/media"
              className="text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              Media
            </Link>
            <Link
              href="/themes"
              className="text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              Themes
            </Link>
            <Link
              href="/constellation"
              className="text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              Constellation
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" href="/login">
            Log in
          </Button>
          <Button variant="primary" size="sm" href="/signup">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
