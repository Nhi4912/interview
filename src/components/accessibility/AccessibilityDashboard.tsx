'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Type, 
  Contrast,
  MousePointer2,
  Keyboard,
  Zap,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
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

const DashboardContainer = styled.div<{ settings: AccessibilitySettings }>`
  background: ${props => props.settings.highContrast ? '#000000' : props.theme.colors.background};
  color: ${props => props.settings.highContrast ? '#ffffff' : props.theme.colors.text};
  font-size: ${props => props.settings.largeText ? '1.2rem' : '1rem'};
  line-height: ${props => props.settings.lineHeight}em;
  transition: ${props => props.settings.reduceMotion ? 'none' : 'all 0.3s ease'};
  min-height: 100vh;
  padding: 2rem;
`;

const ControlPanel = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1rem;
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 1000;
  max-width: 300px;
`;

const ControlTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
`;

const ControlGroup = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ControlLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

const ToggleSwitch = styled.input`
  appearance: none;
  width: 40px;
  height: 20px;
  background: ${props => props.theme.colors.border};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:checked {
    background: ${props => props.theme.colors.primary};
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: all 0.3s ease;
    transform: ${props => props.checked ? 'translateX(20px)' : 'translateX(0)'};
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Slider = styled.input`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.border};
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-right: 320px;
  
  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.md};
`;

const SectionTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  color: ${props => props.theme.colors.text};
  font-size: 1.8rem;
`;

const FeatureCard = styled.div<{ settings: AccessibilitySettings }>`
  background: ${props => props.settings.highContrast ? '#1a1a1a' : props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.settings.highContrast ? '#ffffff' : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: ${props => props.settings.reduceMotion ? 'none' : 'all 0.3s ease'};
  
  &:hover {
    transform: ${props => props.settings.reduceMotion ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.settings.reduceMotion ? 'none' : props.theme.shadows.lg};
  }
  
  &:focus {
    outline: 3px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const FeatureIcon = styled.div<{ color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;

const FeatureDescription = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ComplianceCard = styled.div<{ status: 'pass' | 'fail' | 'warning' }>`
  background: ${props => {
    switch (props.status) {
      case 'pass': return props.theme.colors.success + '10';
      case 'fail': return props.theme.colors.error + '10';
      case 'warning': return props.theme.colors.warning + '10';
      default: return props.theme.colors.surfaceLight;
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'pass': return props.theme.colors.success;
      case 'fail': return props.theme.colors.error;
      case 'warning': return props.theme.colors.warning;
      default: return props.theme.colors.border;
    }
  }};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.text};
    font-size: 0.9rem;
  }
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.8rem;
  }
`;

const StatusIcon = styled.div<{ status: 'pass' | 'fail' | 'warning' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => {
    switch (props.status) {
      case 'pass': return props.theme.colors.success;
      case 'fail': return props.theme.colors.error;
      case 'warning': return props.theme.colors.warning;
      default: return props.theme.colors.border;
    }
  }};
  color: white;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const KeyboardShortcuts = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-top: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.text};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .shortcut {
    background: ${props => props.theme.colors.surfaceLight};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.8rem;
  }
`;

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
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(true);
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
        return <Check size={12} />;
      case 'fail':
        return <X size={12} />;
      case 'warning':
        return <AlertCircle size={12} />;
      default:
        return null;
    }
  };

  return (
    <DashboardContainer settings={settings}>
      <div
        ref={announcementRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      >
        {announcement}
      </div>

      <ControlPanel>
        <ControlTitle>
          <Settings size={20} style={{ marginRight: '0.5rem' }} />
          Accessibility Settings
        </ControlTitle>
        
        <ControlGroup>
          <ControlLabel>
            <ToggleSwitch
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => updateSetting('highContrast', e.target.checked)}
            />
            High Contrast Mode
          </ControlLabel>
          
          <ControlLabel>
            <ToggleSwitch
              type="checkbox"
              checked={settings.largeText}
              onChange={(e) => updateSetting('largeText', e.target.checked)}
            />
            Large Text
          </ControlLabel>
          
          <ControlLabel>
            <ToggleSwitch
              type="checkbox"
              checked={settings.reduceMotion}
              onChange={(e) => updateSetting('reduceMotion', e.target.checked)}
            />
            Reduce Motion
          </ControlLabel>
          
          <ControlLabel>
            <ToggleSwitch
              type="checkbox"
              checked={settings.screenReader}
              onChange={(e) => updateSetting('screenReader', e.target.checked)}
            />
            Screen Reader Mode
          </ControlLabel>
        </ControlGroup>

        <ControlGroup>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            Font Size: {settings.fontSize}em
          </label>
          <Slider
            type="range"
            min="0.8"
            max="2"
            step="0.1"
            value={settings.fontSize}
            onChange={(e) => updateSetting('fontSize', parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            Line Height: {settings.lineHeight}em
          </label>
          <Slider
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={settings.lineHeight}
            onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
          />
        </ControlGroup>
      </ControlPanel>

      <MainContent>
        <header>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Accessibility Dashboard
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem' }}>
            Demonstrating inclusive design principles and WCAG compliance
          </p>
        </header>

        <Section>
          <SectionTitle>Accessibility Features</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                settings={settings}
                tabIndex={0}
                role="button"
                aria-label={`Learn more about ${feature.title}`}
              >
                <FeatureIcon color={feature.color}>
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </div>
        </Section>

        <Section>
          <SectionTitle>WCAG Compliance Status</SectionTitle>
          <ComplianceGrid>
            {complianceChecks.map((check, index) => (
              <ComplianceCard key={check.title} status={check.status}>
                <h4 style={{ display: 'flex', alignItems: 'center' }}>
                  <StatusIcon status={check.status}>
                    {getStatusIcon(check.status)}
                  </StatusIcon>
                  {check.title}
                </h4>
                <p>{check.description}</p>
              </ComplianceCard>
            ))}
          </ComplianceGrid>
        </Section>

        <Section>
          <SectionTitle>Keyboard Shortcuts</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#64748b' }}>
            Navigate the interface using these keyboard shortcuts:
          </p>
          <KeyboardShortcuts>
            <ul>
              {keyboardShortcuts.map((shortcut, index) => (
                <li key={index}>
                  <span>{shortcut.action}</span>
                  <span className="shortcut">{shortcut.shortcut}</span>
                </li>
              ))}
            </ul>
          </KeyboardShortcuts>
        </Section>
      </MainContent>
    </DashboardContainer>
  );
}