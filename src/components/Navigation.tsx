'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, BookOpen, Code, Users, Award, Brain, Activity, Eye, Zap, ChevronRight, Home } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface NavigationProps {
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;
}

const navigationItems = [
  { name: 'Problems', href: '/problems', icon: <Code size={16} /> },
  { name: 'Learn', href: '/learn', icon: <Brain size={16} /> },
  { name: 'Study Guide', href: '/study-guide', icon: <BookOpen size={16} /> },
  { name: 'System Design', href: '/system-design', icon: <Users size={16} /> },
  { name: 'Performance', href: '/performance', icon: <Zap size={16} /> },
  { name: 'Accessibility', href: '/accessibility', icon: <Eye size={16} /> },
  { name: 'Interview Tips', href: '/interview-tips', icon: <Award size={16} /> },
];

const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
      <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
        <Home size={16} />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <ChevronRight size={16} className="text-secondary-400" />
          {index === items.length - 1 ? (
            <span className="text-secondary-900 dark:text-secondary-100 font-medium">{item.name}</span>
          ) : (
            <Link 
              href={item.href} 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

const Sidebar = ({ children, isOpen, onClose }: { children: React.ReactNode; isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 z-50 w-64 h-full bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-700 lg:translate-x-0 lg:static lg:z-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">Navigation</h2>
          <button
            onClick={onClose}
            className="p-1 lg:hidden hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-md"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </motion.aside>
    </>
  );
};

export default function Navigation({ showSidebar = false, sidebarContent }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        openSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];
    
    pathSegments.forEach((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      items.push({ name, href });
    });
    
    return items;
  };

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md border-b border-secondary-200 dark:border-secondary-700' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              {showSidebar && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 mr-2 lg:hidden hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-md"
                >
                  <Menu size={20} />
                </button>
              )}
              <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                <Code size={24} />
                <span className="hidden sm:block">Frontend Interview Prep</span>
                <span className="sm:hidden">FIP</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActiveLink(item.href)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <button 
                onClick={openSearch}
                className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-md text-sm text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
              >
                <Search size={16} />
                <span>Search</span>
                <span className="ml-2 text-xs bg-secondary-200 dark:bg-secondary-700 px-1.5 py-0.5 rounded">
                  ⌘K
                </span>
              </button>
              <ThemeToggle size="sm" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-md"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-700 shadow-lg md:hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActiveLink(item.href)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <button 
                onClick={openSearch}
                className="flex items-center space-x-3 px-3 py-3 w-full text-left bg-secondary-100 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-md text-base text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
              >
                <Search size={16} />
                <span>Search</span>
              </button>
              <div className="flex items-center justify-between px-3 py-3">
                <span className="text-base font-medium text-secondary-700 dark:text-secondary-300">Theme</span>
                <ThemeToggle size="sm" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {showSidebar && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          {sidebarContent}
        </Sidebar>
      )}

      {/* Breadcrumb */}
      {pathname !== '/' && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm border-b border-secondary-100 dark:border-secondary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumb items={getBreadcrumbItems()} />
          </div>
        </div>
      )}
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}

export { Breadcrumb, Sidebar };