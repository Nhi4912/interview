'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Lock, Star, Target, Book, Code } from 'lucide-react';

interface SkillNode {
  id: string;
  title: string;
  description: string;
  level: number;
  category: string;
  prerequisites: string[];
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  estimatedHours: number;
  x: number;
  y: number;
  icon?: React.ReactNode;
}

interface SkillTreeProps {
  skills: SkillNode[];
  onSkillClick?: (skill: SkillNode) => void;
  onSkillComplete?: (skillId: string) => void;
  className?: string;
}

const SkillTree: React.FC<SkillTreeProps> = ({
  skills,
  onSkillClick,
  onSkillComplete,
  className = ''
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 1000, height: 600 });

  // Calculate connections between skills
  const connections = skills.flatMap(skill => 
    skill.prerequisites.map(prereqId => ({
      from: skills.find(s => s.id === prereqId),
      to: skill
    }))
  ).filter(conn => conn.from && conn.to);

  const getSkillColor = (skill: SkillNode) => {
    if (skill.isCompleted) return '#10b981'; // Green
    if (skill.isUnlocked) return '#3b82f6'; // Blue
    return '#6b7280'; // Gray
  };

  const getSkillIcon = (skill: SkillNode) => {
    if (skill.icon) return skill.icon;
    
    switch (skill.category) {
      case 'frontend':
        return <Code size={20} />;
      case 'algorithms':
        return <Target size={20} />;
      case 'system-design':
        return <Book size={20} />;
      default:
        return <Book size={20} />;
    }
  };

  const handleSkillClick = (skill: SkillNode) => {
    if (!skill.isUnlocked) return;
    
    setSelectedSkill(skill);
    onSkillClick?.(skill);
  };

  const handleSkillComplete = (skillId: string) => {
    onSkillComplete?.(skillId);
    setSelectedSkill(null);
  };

  return (
    <div className={`relative ${className}`}>
      {/* SVG Skill Tree */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-secondary-900 dark:to-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-4 overflow-hidden">
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          className="w-full h-96 md:h-[500px]"
        >
          {/* Connection Lines */}
          {connections.map((conn, index) => {
            if (!conn.from || !conn.to) return null;
            
            const isActive = conn.to.isUnlocked;
            const isCompleted = conn.from.isCompleted && conn.to.isCompleted;
            
            return (
              <motion.line
                key={`${conn.from.id}-${conn.to.id}`}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                stroke={isCompleted ? '#10b981' : isActive ? '#3b82f6' : '#d1d5db'}
                strokeWidth={isCompleted ? 3 : isActive ? 2 : 1}
                strokeDasharray={isActive ? 'none' : '5,5'}
                opacity={isActive ? 1 : 0.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            );
          })}
          
          {/* Skill Nodes */}
          {skills.map((skill, index) => (
            <g key={skill.id}>
              {/* Node Background */}
              <motion.circle
                cx={skill.x}
                cy={skill.y}
                r={30}
                fill={getSkillColor(skill)}
                opacity={skill.isUnlocked ? 1 : 0.4}
                stroke="#fff"
                strokeWidth={2}
                className={`cursor-pointer ${skill.isUnlocked ? 'hover:opacity-80' : 'cursor-not-allowed'}`}
                onClick={() => handleSkillClick(skill)}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={skill.isUnlocked ? { scale: 1.1 } : {}}
              />
              
              {/* Progress Ring */}
              {skill.isUnlocked && skill.progress > 0 && (
                <motion.circle
                  cx={skill.x}
                  cy={skill.y}
                  r={35}
                  fill="none"
                  stroke={getSkillColor(skill)}
                  strokeWidth={3}
                  strokeDasharray={`${2 * Math.PI * 35 * skill.progress / 100} ${2 * Math.PI * 35}`}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${skill.x} ${skill.y})`}
                  initial={{ strokeDasharray: '0 220' }}
                  animate={{ strokeDasharray: `${2 * Math.PI * 35 * skill.progress / 100} ${2 * Math.PI * 35}` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              )}
              
              {/* Skill Icon */}
              <foreignObject
                x={skill.x - 10}
                y={skill.y - 10}
                width={20}
                height={20}
                className="pointer-events-none"
              >
                <div className="flex items-center justify-center w-full h-full text-white">
                  {skill.isCompleted ? (
                    <CheckCircle size={20} />
                  ) : skill.isUnlocked ? (
                    getSkillIcon(skill)
                  ) : (
                    <Lock size={20} />
                  )}
                </div>
              </foreignObject>
              
              {/* Level Badge */}
              <circle
                cx={skill.x + 20}
                cy={skill.y - 20}
                r={10}
                fill="#fbbf24"
                stroke="#fff"
                strokeWidth={1}
              />
              <text
                x={skill.x + 20}
                y={skill.y - 20}
                textAnchor="middle"
                dy="0.35em"
                fontSize="10"
                fill="#fff"
                fontWeight="bold"
              >
                {skill.level}
              </text>
              
              {/* Skill Title */}
              <text
                x={skill.x}
                y={skill.y + 45}
                textAnchor="middle"
                fontSize="12"
                fill="#374151"
                fontWeight="500"
                className="pointer-events-none"
              >
                {skill.title.length > 15 ? skill.title.substring(0, 15) + '...' : skill.title}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 left-4 z-10 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 p-4 max-w-xs"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="text-primary-600">
                {getSkillIcon(hoveredSkill)}
              </div>
              <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                {hoveredSkill.title}
              </h4>
            </div>
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
              {hoveredSkill.description}
            </p>
            <div className="space-y-1 text-xs text-secondary-500 dark:text-secondary-400">
              <div className="flex justify-between">
                <span>Level:</span>
                <span>{hoveredSkill.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="capitalize">{hoveredSkill.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated:</span>
                <span>{hoveredSkill.estimatedHours}h</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`capitalize ${
                  hoveredSkill.isCompleted ? 'text-success-600' :
                  hoveredSkill.isUnlocked ? 'text-primary-600' :
                  'text-secondary-400'
                }`}>
                  {hoveredSkill.isCompleted ? 'Completed' :
                   hoveredSkill.isUnlocked ? 'Available' :
                   'Locked'}
                </span>
              </div>
              {hoveredSkill.progress > 0 && (
                <div className="flex justify-between">
                  <span>Progress:</span>
                  <span>{hoveredSkill.progress}%</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skill Details Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  {getSkillIcon(selectedSkill)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">
                    {selectedSkill.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">
                      Level {selectedSkill.level}
                    </span>
                    <span className="text-sm text-secondary-400">•</span>
                    <span className="text-sm text-secondary-600 dark:text-secondary-400 capitalize">
                      {selectedSkill.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                {selectedSkill.description}
              </p>
              
              {/* Progress Bar */}
              {selectedSkill.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-secondary-600 dark:text-secondary-400">Progress</span>
                    <span className="text-secondary-600 dark:text-secondary-400">{selectedSkill.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedSkill.progress}%` }}
                    />
                  </div>
                </div>
              )}
              
              {/* Prerequisites */}
              {selectedSkill.prerequisites.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                    Prerequisites
                  </h4>
                  <div className="space-y-1">
                    {selectedSkill.prerequisites.map(prereqId => {
                      const prereq = skills.find(s => s.id === prereqId);
                      return prereq ? (
                        <div key={prereqId} className="flex items-center gap-2 text-sm">
                          {prereq.isCompleted ? (
                            <CheckCircle size={16} className="text-success-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-secondary-300 dark:border-secondary-600" />
                          )}
                          <span className={prereq.isCompleted ? 'text-success-600' : 'text-secondary-600 dark:text-secondary-400'}>
                            {prereq.title}
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="flex-1 px-4 py-2 border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
                >
                  Close
                </button>
                {selectedSkill.isUnlocked && !selectedSkill.isCompleted && (
                  <button
                    onClick={() => handleSkillComplete(selectedSkill.id)}
                    className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-4 p-4 bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
        <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
          Legend
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
              <CheckCircle size={14} className="text-white" />
            </div>
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
              <Star size={14} className="text-white" />
            </div>
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-secondary-400 rounded-full flex items-center justify-center">
              <Lock size={14} className="text-white" />
            </div>
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;