'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Award, Target, BarChart3, PieChart, LineChart } from 'lucide-react';

interface ProgressData {
  date: string;
  topicsCompleted: number;
  hoursStudied: number;
  streak: number;
  category: string;
}

interface CategoryProgress {
  category: string;
  completed: number;
  total: number;
  color: string;
}

interface ProgressChartProps {
  data: ProgressData[];
  categoryProgress: CategoryProgress[];
  totalStats: {
    totalTopics: number;
    completedTopics: number;
    totalHours: number;
    currentStreak: number;
    longestStreak: number;
  };
  chartType?: 'line' | 'bar' | 'pie';
  className?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  categoryProgress,
  totalStats,
  chartType = 'line',
  className = ''
}) => {
  const chartRef = useRef<SVGSVGElement>(null);
  const [activeChart, setActiveChart] = useState<'line' | 'bar' | 'pie'>('line');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<ProgressData | null>(null);

  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 80, bottom: 60, left: 60 };

  // Filter data based on selected time range
  const filteredData = data.filter(d => {
    const date = new Date(d.date);
    const now = new Date();
    const daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (selectedTimeRange) {
      case '7d': return daysAgo <= 7;
      case '30d': return daysAgo <= 30;
      case '90d': return daysAgo <= 90;
      default: return true;
    }
  });

  const drawLineChart = () => {
    if (!chartRef.current) return;
    
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const xScale = d3.scaleTime()
      .domain(d3.extent(filteredData, d => new Date(d.date)) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.topicsCompleted) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line<ProgressData>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.topicsCompleted))
      .curve(d3.curveMonotoneX);

    // Add gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'progressGradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0).attr('y1', height)
      .attr('x2', 0).attr('y2', 0);

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0.1);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0.8);

    // Add area under the line
    const area = d3.area<ProgressData>()
      .x(d => xScale(new Date(d.date)))
      .y0(height - margin.bottom)
      .y1(d => yScale(d.topicsCompleted))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(filteredData)
      .attr('fill', 'url(#progressGradient)')
      .attr('d', area);

    // Add the line
    svg.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add data points
    svg.selectAll('.dot')
      .data(filteredData)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(new Date(d.date)))
      .attr('cy', d => yScale(d.topicsCompleted))
      .attr('r', 4)
      .attr('fill', '#3b82f6')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        setHoveredDataPoint(d);
        d3.select(event.currentTarget).attr('r', 6);
      })
      .on('mouseout', (event) => {
        setHoveredDataPoint(null);
        d3.select(event.currentTarget).attr('r', 4);
      });

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%m/%d')));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Add labels
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 20)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#6b7280')
      .text('Topics Completed');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#6b7280')
      .text('Date');
  };

  const drawBarChart = () => {
    if (!chartRef.current) return;
    
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const xScale = d3.scaleBand()
      .domain(categoryProgress.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(categoryProgress, d => d.total) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add bars for total
    svg.selectAll('.bar-total')
      .data(categoryProgress)
      .enter().append('rect')
      .attr('class', 'bar-total')
      .attr('x', d => xScale(d.category)!)
      .attr('y', d => yScale(d.total))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.total))
      .attr('fill', '#e5e7eb')
      .attr('rx', 4);

    // Add bars for completed
    svg.selectAll('.bar-completed')
      .data(categoryProgress)
      .enter().append('rect')
      .attr('class', 'bar-completed')
      .attr('x', d => xScale(d.category)!)
      .attr('y', d => yScale(d.completed))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.completed))
      .attr('fill', d => d.color)
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 0.8);
      })
      .on('mouseout', function(event, d) {
        d3.select(this).attr('opacity', 1);
      });

    // Add percentage labels
    svg.selectAll('.percentage-label')
      .data(categoryProgress)
      .enter().append('text')
      .attr('class', 'percentage-label')
      .attr('x', d => xScale(d.category)! + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.completed) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#374151')
      .text(d => `${Math.round((d.completed / d.total) * 100)}%`);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Add label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 20)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#6b7280')
      .text('Topics Count');
  };

  const drawPieChart = () => {
    if (!chartRef.current) return;
    
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    const pie = d3.pie<CategoryProgress>()
      .value(d => d.completed)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<CategoryProgress>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    const arcLabel = d3.arc<d3.PieArcDatum<CategoryProgress>>()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.7);

    const arcs = svg.selectAll('.arc')
      .data(pie(categoryProgress))
      .enter().append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 0.8);
      })
      .on('mouseout', function(event, d) {
        d3.select(this).attr('opacity', 1);
      });

    arcs.append('text')
      .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .text(d => d.data.completed > 0 ? d.data.completed : '');

    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 150}, 50)`);

    const legendItems = legend.selectAll('.legend-item')
      .data(categoryProgress)
      .enter().append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`);

    legendItems.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', d => d.color)
      .attr('rx', 2);

    legendItems.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .attr('font-size', '12px')
      .attr('fill', '#374151')
      .text(d => d.category);
  };

  useEffect(() => {
    switch (activeChart) {
      case 'line':
        drawLineChart();
        break;
      case 'bar':
        drawBarChart();
        break;
      case 'pie':
        drawPieChart();
        break;
    }
  }, [activeChart, selectedTimeRange, filteredData, categoryProgress]);

  return (
    <div className={`bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
          Progress Analytics
        </h3>
        
        {/* Chart Type Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveChart('line')}
            className={`p-2 rounded-lg transition-colors ${
              activeChart === 'line'
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                : 'hover:bg-secondary-100 dark:hover:bg-secondary-700'
            }`}
            title="Line Chart"
          >
            <LineChart size={20} />
          </button>
          <button
            onClick={() => setActiveChart('bar')}
            className={`p-2 rounded-lg transition-colors ${
              activeChart === 'bar'
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                : 'hover:bg-secondary-100 dark:hover:bg-secondary-700'
            }`}
            title="Bar Chart"
          >
            <BarChart3 size={20} />
          </button>
          <button
            onClick={() => setActiveChart('pie')}
            className={`p-2 rounded-lg transition-colors ${
              activeChart === 'pie'
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                : 'hover:bg-secondary-100 dark:hover:bg-secondary-700'
            }`}
            title="Pie Chart"
          >
            <PieChart size={20} />
          </button>
        </div>
      </div>

      {/* Time Range Selector (only for line chart) */}
      {activeChart === 'line' && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-secondary-600 dark:text-secondary-400 mr-2">Time Range:</span>
          {['7d', '30d', '90d', 'all'].map(range => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range as any)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTimeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-600'
              }`}
            >
              {range === 'all' ? 'All Time' : range.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="relative">
        <svg
          ref={chartRef}
          width={width}
          height={height}
          className="w-full h-auto"
        />
        
        {/* Hover Tooltip */}
        {hoveredDataPoint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 p-3 z-10"
          >
            <div className="text-sm space-y-1">
              <div className="font-medium text-secondary-900 dark:text-secondary-100">
                {new Date(hoveredDataPoint.date).toLocaleDateString()}
              </div>
              <div className="text-secondary-600 dark:text-secondary-400">
                Topics: {hoveredDataPoint.topicsCompleted}
              </div>
              <div className="text-secondary-600 dark:text-secondary-400">
                Hours: {hoveredDataPoint.hoursStudied}
              </div>
              <div className="text-secondary-600 dark:text-secondary-400">
                Streak: {hoveredDataPoint.streak} days
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {totalStats.completedTopics}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Topics Completed
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {totalStats.totalHours}h
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Hours Studied
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {totalStats.currentStreak}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Current Streak
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {Math.round((totalStats.completedTopics / totalStats.totalTopics) * 100)}%
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Overall Progress
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;