'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  Zap, 
  Target,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  RefreshCw,
  BarChart3,
  LineChart,
  PieChart,
  Settings
} from 'lucide-react';

interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  tti: number; // Time to Interactive
  tbt: number; // Total Blocking Time
  fmp: number; // First Meaningful Paint
}

interface PerformanceEntry {
  timestamp: number;
  metrics: PerformanceMetrics;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | '5g';
  url: string;
}

const MonitorContainer = styled.div`
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.textSecondary};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled(motion.div)<{ status: 'good' | 'needs-improvement' | 'poor' }>`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'good': return props.theme.colors.success;
      case 'needs-improvement': return props.theme.colors.warning;
      case 'poor': return props.theme.colors.error;
      default: return props.theme.colors.border;
    }
  }};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const MetricTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const MetricStatus = styled.div<{ status: 'good' | 'needs-improvement' | 'poor' }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => {
    switch (props.status) {
      case 'good': return props.theme.colors.success;
      case 'needs-improvement': return props.theme.colors.warning;
      case 'poor': return props.theme.colors.error;
      default: return props.theme.colors.textSecondary;
    }
  }};
  font-size: 0.9rem;
  font-weight: 500;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const MetricDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.4;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.surfaceLight};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
`;

const ProgressFill = styled.div<{ percentage: number; status: 'good' | 'needs-improvement' | 'poor' }>`
  height: 100%;
  width: ${props => Math.min(props.percentage, 100)}%;
  background: ${props => {
    switch (props.status) {
      case 'good': return props.theme.colors.success;
      case 'needs-improvement': return props.theme.colors.warning;
      case 'poor': return props.theme.colors.error;
      default: return props.theme.colors.primary;
    }
  }};
  transition: width 0.5s ease;
`;

const ChartContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadows.md};
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin: 0;
  }
`;

const ChartControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surfaceLight};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primaryDark : props.theme.colors.primary};
    color: white;
  }
`;

const RecommendationCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: ${props => props.theme.shadows.md};
  
  h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin: 0 0 0.5rem 0;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0 0 1rem 0;
    line-height: 1.5;
  }
  
  ul {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
    padding-left: 1.5rem;
    
    li {
      margin: 0.5rem 0;
    }
  }
`;

const DeviceToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
`;

const DeviceButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surfaceLight};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primaryDark : props.theme.colors.primary};
    color: white;
  }
`;

const thresholds = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  fcp: { good: 1800, needsImprovement: 3000 },
  ttfb: { good: 800, needsImprovement: 1800 },
  tti: { good: 3800, needsImprovement: 7300 },
  tbt: { good: 200, needsImprovement: 600 },
  fmp: { good: 2000, needsImprovement: 4000 }
};

const mockData: PerformanceEntry[] = [
  {
    timestamp: Date.now() - 300000,
    metrics: { lcp: 2100, fid: 85, cls: 0.08, fcp: 1600, ttfb: 650, tti: 3200, tbt: 150, fmp: 1800 },
    deviceType: 'desktop',
    connectionType: '4g',
    url: '/'
  },
  {
    timestamp: Date.now() - 240000,
    metrics: { lcp: 3200, fid: 120, cls: 0.15, fcp: 2100, ttfb: 850, tti: 4100, tbt: 280, fmp: 2400 },
    deviceType: 'mobile',
    connectionType: '3g',
    url: '/learn'
  },
  {
    timestamp: Date.now() - 180000,
    metrics: { lcp: 1800, fid: 60, cls: 0.05, fcp: 1300, ttfb: 400, tti: 2800, tbt: 120, fmp: 1500 },
    deviceType: 'desktop',
    connectionType: '5g',
    url: '/problems'
  }
];

const recommendations = [
  {
    metric: 'LCP',
    title: 'Optimize Largest Contentful Paint',
    description: 'Reduce server response times and optimize critical resources',
    suggestions: [
      'Optimize server response time (TTFB)',
      'Remove unused CSS and JavaScript',
      'Optimize images and use next-gen formats',
      'Use a CDN for static assets',
      'Implement lazy loading for below-the-fold content'
    ]
  },
  {
    metric: 'FID',
    title: 'Improve First Input Delay',
    description: 'Reduce JavaScript execution time and optimize main thread',
    suggestions: [
      'Break up long tasks into smaller chunks',
      'Use code splitting and lazy loading',
      'Optimize third-party scripts',
      'Use a web worker for heavy computations',
      'Minimize main thread work'
    ]
  },
  {
    metric: 'CLS',
    title: 'Minimize Cumulative Layout Shift',
    description: 'Prevent unexpected layout shifts during page load',
    suggestions: [
      'Include size attributes on images and video elements',
      'Reserve space for ads and embeds',
      'Use CSS aspect-ratio for responsive images',
      'Avoid inserting content above existing content',
      'Use font-display: swap for web fonts'
    ]
  }
];

export default function PerformanceMonitor() {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');
  const [selectedMetric, setSelectedMetric] = useState<keyof PerformanceMetrics>('lcp');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [performanceData, setPerformanceData] = useState<PerformanceEntry[]>(mockData);

  const currentMetrics = useMemo(() => {
    const latestEntry = performanceData
      .filter(entry => entry.deviceType === selectedDevice)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
    
    return latestEntry?.metrics || mockData[0].metrics;
  }, [performanceData, selectedDevice]);

  const getMetricStatus = (metric: keyof PerformanceMetrics, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getStatusIcon = (status: 'good' | 'needs-improvement' | 'poor') => {
    switch (status) {
      case 'good':
        return <CheckCircle size={16} />;
      case 'needs-improvement':
        return <AlertCircle size={16} />;
      case 'poor':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  const formatMetricValue = (metric: keyof PerformanceMetrics, value: number) => {
    switch (metric) {
      case 'cls':
        return value.toFixed(3);
      case 'lcp':
      case 'fcp':
      case 'ttfb':
      case 'tti':
      case 'tbt':
      case 'fmp':
        return `${Math.round(value)}ms`;
      case 'fid':
        return `${Math.round(value)}ms`;
      default:
        return Math.round(value).toString();
    }
  };

  const getProgressPercentage = (metric: keyof PerformanceMetrics, value: number) => {
    const threshold = thresholds[metric];
    const maxValue = threshold.needsImprovement * 2;
    return Math.min((value / maxValue) * 100, 100);
  };

  const simulateRealTimeData = useCallback(() => {
    if (!isLiveMode) return;
    
    const newEntry: PerformanceEntry = {
      timestamp: Date.now(),
      metrics: {
        lcp: Math.random() * 5000 + 1000,
        fid: Math.random() * 200 + 50,
        cls: Math.random() * 0.3,
        fcp: Math.random() * 3000 + 800,
        ttfb: Math.random() * 1000 + 200,
        tti: Math.random() * 6000 + 2000,
        tbt: Math.random() * 400 + 100,
        fmp: Math.random() * 4000 + 1200
      },
      deviceType: selectedDevice,
      connectionType: '4g',
      url: window.location.pathname
    };
    
    setPerformanceData(prev => [...prev.slice(-20), newEntry]);
  }, [isLiveMode, selectedDevice]);

  useEffect(() => {
    const interval = setInterval(simulateRealTimeData, 5000);
    return () => clearInterval(interval);
  }, [simulateRealTimeData]);

  const metricCards = [
    {
      key: 'lcp' as keyof PerformanceMetrics,
      title: 'Largest Contentful Paint',
      description: 'Time when the largest element becomes visible',
      icon: <Target size={20} />
    },
    {
      key: 'fid' as keyof PerformanceMetrics,
      title: 'First Input Delay',
      description: 'Time from first user interaction to response',
      icon: <Zap size={20} />
    },
    {
      key: 'cls' as keyof PerformanceMetrics,
      title: 'Cumulative Layout Shift',
      description: 'Measure of visual stability during page load',
      icon: <Activity size={20} />
    },
    {
      key: 'fcp' as keyof PerformanceMetrics,
      title: 'First Contentful Paint',
      description: 'Time when first text or image appears',
      icon: <Clock size={20} />
    },
    {
      key: 'ttfb' as keyof PerformanceMetrics,
      title: 'Time to First Byte',
      description: 'Time from request to first byte received',
      icon: <Wifi size={20} />
    },
    {
      key: 'tti' as keyof PerformanceMetrics,
      title: 'Time to Interactive',
      description: 'Time when page becomes fully interactive',
      icon: <Monitor size={20} />
    }
  ];

  return (
    <MonitorContainer>
      <Header>
        <h1>Performance Monitor</h1>
        <p>Real-time Core Web Vitals monitoring and optimization recommendations</p>
      </Header>

      <DeviceToggle>
        <DeviceButton 
          active={selectedDevice === 'desktop'} 
          onClick={() => setSelectedDevice('desktop')}
        >
          <Monitor size={16} />
          Desktop
        </DeviceButton>
        <DeviceButton 
          active={selectedDevice === 'mobile'} 
          onClick={() => setSelectedDevice('mobile')}
        >
          <Smartphone size={16} />
          Mobile
        </DeviceButton>
        <DeviceButton 
          active={selectedDevice === 'tablet'} 
          onClick={() => setSelectedDevice('tablet')}
        >
          <Tablet size={16} />
          Tablet
        </DeviceButton>
        <DeviceButton 
          active={isLiveMode} 
          onClick={() => setIsLiveMode(!isLiveMode)}
        >
          <RefreshCw size={16} />
          {isLiveMode ? 'Live' : 'Static'}
        </DeviceButton>
      </DeviceToggle>

      <MetricsGrid>
        {metricCards.map((card) => {
          const value = currentMetrics[card.key];
          const status = getMetricStatus(card.key, value);
          const percentage = getProgressPercentage(card.key, value);
          
          return (
            <MetricCard
              key={card.key}
              status={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MetricHeader>
                <MetricTitle>{card.title}</MetricTitle>
                <MetricStatus status={status}>
                  {getStatusIcon(status)}
                  {status.replace('-', ' ')}
                </MetricStatus>
              </MetricHeader>
              
              <MetricValue>{formatMetricValue(card.key, value)}</MetricValue>
              <MetricDescription>{card.description}</MetricDescription>
              
              <ProgressBar>
                <ProgressFill percentage={percentage} status={status} />
              </ProgressBar>
            </MetricCard>
          );
        })}
      </MetricsGrid>

      <ChartContainer>
        <ChartHeader>
          <h3>Performance Trends</h3>
          <ChartControls>
            <ControlButton active={selectedMetric === 'lcp'} onClick={() => setSelectedMetric('lcp')}>
              LCP
            </ControlButton>
            <ControlButton active={selectedMetric === 'fid'} onClick={() => setSelectedMetric('fid')}>
              FID
            </ControlButton>
            <ControlButton active={selectedMetric === 'cls'} onClick={() => setSelectedMetric('cls')}>
              CLS
            </ControlButton>
          </ChartControls>
        </ChartHeader>
        
        <div style={{ 
          height: '200px', 
          background: '#f8fafc', 
          borderRadius: '0.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#64748b',
          fontSize: '0.9rem'
        }}>
          <LineChart size={24} style={{ marginRight: '0.5rem' }} />
          Performance chart visualization would be implemented here
        </div>
      </ChartContainer>

      <div>
        <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Optimization Recommendations</h2>
        {recommendations.map((rec, index) => (
          <RecommendationCard key={rec.metric}>
            <h4>
              <TrendingUp size={20} />
              {rec.title}
            </h4>
            <p>{rec.description}</p>
            <ul>
              {rec.suggestions.map((suggestion, i) => (
                <li key={i}>{suggestion}</li>
              ))}
            </ul>
          </RecommendationCard>
        ))}
      </div>
    </MonitorContainer>
  );
}