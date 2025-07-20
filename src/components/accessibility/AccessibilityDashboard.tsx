'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Volume2, 
  MousePointer2,
  Keyboard,
  Settings,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  colorBlindFriendly: boolean;
  fontSize: number;
  lineHeight: number;
}

const initialSettings: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  screenReader: false,
  keyboardNavigation: true,
  focusIndicators: true,
  colorBlindFriendly: false,
  fontSize: 1,
  lineHeight: 1.5
};

const features = [
  {
    icon: <Eye size={24} />,
    title: 'Visual Accessibility',
    description: 'High contrast mode, large text, and color-blind friendly design',
    color: '#3b82f6'
  },
  {
    icon: <Keyboard size={24} />,
    title: 'Keyboard Navigation',
    description: 'Full keyboard support with clear focus indicators',
    color: '#10b981'
  },
  {
    icon: <Volume2 size={24} />,
    title: 'Screen Reader Support',
    description: 'ARIA labels, semantic HTML, and proper heading structure',
    color: '#f59e0b'
  },
  {
    icon: <MousePointer2 size={24} />,
    title: 'Motor Accessibility',
    description: 'Large clickable areas and reduced motion options',
    color: '#ef4444'
  }
];

const complianceChecks = [
  {
    title: 'Color Contrast',
    description: 'All text meets WCAG AA contrast ratio requirements',
    status: 'pass' as const
  },
  {
    title: 'Focus Indicators',
    description: 'All interactive elements have visible focus states',
    status: 'pass' as const
  },
  {
    title: 'Alt Text',
    description: 'All images have descriptive alt text',
    status: 'pass' as const
  },
  {
    title: 'Heading Structure',
    description: 'Proper heading hierarchy (h1, h2, h3, etc.)',
    status: 'pass' as const
  },
  {
    title: 'Form Labels',
    description: 'All form inputs have associated labels',
    status: 'warning' as const
  },
  {
    title: 'Skip Links',
    description: 'Skip to main content link for screen readers',
    status: 'fail' as const
  }
];

const keyboardShortcuts = [
  { action: 'Toggle high contrast', shortcut: 'Ctrl + Alt + C' },
  { action: 'Increase text size', shortcut: 'Ctrl + +' },
  { action: 'Decrease text size', shortcut: 'Ctrl + -' },
  { action: 'Toggle screen reader', shortcut: 'Ctrl + Alt + S' },
  { action: 'Navigate to next element', shortcut: 'Tab' },
  { action: 'Navigate to previous element', shortcut: 'Shift + Tab' },
  { action: 'Activate element', shortcut: 'Enter / Space' }
];

export default function AccessibilityDashboard() {
  const [settings, setSettings] = useState<AccessibilitySettings>(initialSettings);
  const [announcement, setAnnouncement] = useState('');
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey) {
        switch (e.key) {
          case 'c':
            e.preventDefault();
            setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
            announce('High contrast mode toggled');
            break;
          case 's':
            e.preventDefault();
            setSettings(prev => ({ ...prev, screenReader: !prev.screenReader }));
            announce('Screen reader mode toggled');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const announce = (message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(''), 3000);
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    announce(`${key} updated`);
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return <Check size={12} className="text-white" />;
      case 'fail':
        return <X size={12} className="text-white" />;
      case 'warning':
        return <AlertCircle size={12} className="text-white" />;
      default:
        return null;
    }
  };

  const getStatusStyles = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return 'bg-green-500 border-green-500 bg-opacity-10 border-opacity-100';
      case 'fail':
        return 'bg-red-500 border-red-500 bg-opacity-10 border-opacity-100';
      case 'warning':
        return 'bg-yellow-500 border-yellow-500 bg-opacity-10 border-opacity-100';
      default:
        return 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600';
    }
  };

  const getStatusIconBg = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return 'bg-green-500';
      case 'fail':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`min-h-screen p-8 transition-all duration-300 ${
        settings.highContrast 
          ? 'bg-black text-white' 
          : 'bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100'
      }`}
      style={{ 
        fontSize: settings.largeText ? '1.2rem' : '1rem',
        lineHeight: `${settings.lineHeight}em`
      }}
    >
      {/* Screen Reader Announcements */}
      <div
        ref={announcementRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Control Panel */}
      <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg z-50 max-w-xs">
        <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          <Settings size={20} />
          Accessibility Settings
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => updateSetting('highContrast', e.target.checked)}
                className="w-10 h-5 bg-gray-200 rounded-full relative appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 transition-colors"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">High Contrast Mode</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.largeText}
                onChange={(e) => updateSetting('largeText', e.target.checked)}
                className="w-10 h-5 bg-gray-200 rounded-full relative appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 transition-colors"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Large Text</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.reduceMotion}
                onChange={(e) => updateSetting('reduceMotion', e.target.checked)}
                className="w-10 h-5 bg-gray-200 rounded-full relative appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 transition-colors"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Reduce Motion</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.screenReader}
                onChange={(e) => updateSetting('screenReader', e.target.checked)}
                className="w-10 h-5 bg-gray-200 rounded-full relative appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 transition-colors"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Screen Reader Mode</span>
            </label>
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Font Size: {settings.fontSize}em
            </label>
            <input
              type="range"
              min="0.8"
              max="2"
              step="0.1"
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Line Height: {settings.lineHeight}em
            </label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={settings.lineHeight}
              onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto pr-80 lg:pr-80 md:pr-0">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Accessibility Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Demonstrating inclusive design principles and WCAG compliance
          </p>
        </header>

        {/* Features Section */}
        <section className="mb-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  settings.highContrast 
                    ? 'bg-gray-800 border-white hover:bg-gray-700' 
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:shadow-lg hover:-translate-y-1'
                } ${settings.reduceMotion ? 'transition-none hover:transform-none' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`Learn more about ${feature.title}`}
              >
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WCAG Compliance Section */}
        <section className="mb-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-6">WCAG Compliance Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceChecks.map((check) => (
              <div
                key={check.title}
                className={`p-4 rounded-lg border ${getStatusStyles(check.status)}`}
              >
                <h4 className="flex items-center text-sm font-medium mb-2">
                  <div className={`inline-flex items-center justify-center w-5 h-5 rounded-full mr-2 ${getStatusIconBg(check.status)}`}>
                    {getStatusIcon(check.status)}
                  </div>
                  {check.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {check.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Keyboard Shortcuts Section */}
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Keyboard Shortcuts</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Navigate the interface using these keyboard shortcuts:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <ul className="space-y-3">
              {keyboardShortcuts.map((shortcut, index) => (
                <li key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <span className="text-gray-700 dark:text-gray-300">{shortcut.action}</span>
                  <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono">
                    {shortcut.shortcut}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}