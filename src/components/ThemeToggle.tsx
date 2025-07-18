'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', size = 'md' }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'System' },
  ] as const;

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const currentThemeIndex = themes.findIndex(t => t.name === theme);

  const handleThemeChange = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextIndex].name);
  };

  const CurrentIcon = themes[currentThemeIndex]?.icon || Sun;

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={handleThemeChange}
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center
          bg-secondary-100 dark:bg-secondary-800 
          hover:bg-secondary-200 dark:hover:bg-secondary-700
          border border-secondary-200 dark:border-secondary-700
          rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-secondary-900
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${themes[(currentThemeIndex + 1) % themes.length].label.toLowerCase()} theme`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentIcon 
            size={iconSizes[size]} 
            className="text-secondary-700 dark:text-secondary-300" 
          />
        </motion.div>
      </motion.button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-secondary-900 dark:bg-secondary-100 text-white dark:text-secondary-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {themes[currentThemeIndex]?.label} theme
      </div>
    </div>
  );
};

export default ThemeToggle;