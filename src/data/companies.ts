export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  focusAreas: string[];
  interviewProcess: InterviewStage[];
  commonQuestions: Question[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  preparationTime: number; // weeks
  culture: string[];
  tips: string[];
  salaryRange: {
    junior: string;
    mid: string;
    senior: string;
  };
}

export interface InterviewStage {
  stage: string;
  duration: string;
  format: 'Phone' | 'Video' | 'Onsite' | 'Take-home';
  description: string;
  tips: string[];
}

export interface Question {
  id: string;
  question: string;
  category: 'Technical' | 'Behavioral' | 'System Design' | 'Coding';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  expectedAnswer: string;
  followUps: string[];
}

export const companies: Company[] = [
  {
    id: 'google',
    name: 'Google',
    logo: '/logos/google.svg',
    description: 'Global technology leader focusing on search, cloud, and AI',
    focusAreas: [
      'Algorithm Design & Analysis',
      'System Design at Scale',
      'Data Structures Mastery',
      'Web Performance',
      'Accessibility',
      'Progressive Web Apps',
      'Angular/React Expertise'
    ],
    interviewProcess: [
      {
        stage: 'Phone/Video Screen',
        duration: '45-60 min',
        format: 'Video',
        description: 'Initial technical screening with coding problems',
        tips: [
          'Focus on clean, efficient code',
          'Explain your thought process clearly',
          'Ask clarifying questions',
          'Consider edge cases'
        ]
      },
      {
        stage: 'Technical Interviews',
        duration: '4-5 x 45 min',
        format: 'Video',
        description: 'Deep technical interviews covering algorithms, system design, and domain expertise',
        tips: [
          'Practice whiteboard coding',
          'Study common Google algorithms',
          'Prepare system design scenarios',
          'Review distributed systems concepts'
        ]
      },
      {
        stage: 'Googleyness & Leadership',
        duration: '45 min',
        format: 'Video',
        description: 'Cultural fit and leadership potential assessment',
        tips: [
          'Demonstrate intellectual curiosity',
          'Show collaborative problem-solving',
          'Discuss learning from failures',
          'Exhibit data-driven decision making'
        ]
      }
    ],
    commonQuestions: [
      {
        id: 'google-q1',
        question: 'Design a web-based autocomplete system like Google Search',
        category: 'System Design',
        difficulty: 'Hard',
        expectedAnswer: 'Discuss trie data structure, caching layers, load balancing, and real-time updates',
        followUps: [
          'How would you handle typos and spelling corrections?',
          'How would you personalize suggestions?',
          'How would you handle 10M+ queries per second?'
        ]
      },
      {
        id: 'google-q2',
        question: 'Implement a virtual scrolling component for large datasets',
        category: 'Coding',
        difficulty: 'Medium',
        expectedAnswer: 'Use viewport calculations, item height estimation, and efficient DOM manipulation',
        followUps: [
          'How would you handle variable item heights?',
          'How would you implement horizontal scrolling?',
          'How would you optimize for mobile performance?'
        ]
      }
    ],
    difficulty: 'Hard',
    preparationTime: 12,
    culture: [
      'Data-driven decisions',
      'User-first thinking',
      'Innovation and experimentation',
      'Intellectual curiosity',
      'Collaborative problem-solving'
    ],
    tips: [
      'Master algorithms and data structures fundamentals',
      'Practice system design with focus on scalability',
      'Study Google-specific technologies (Angular, PWA, AMP)',
      'Prepare for behavioral questions about learning and growth',
      'Demonstrate passion for building user-centric products'
    ],
    salaryRange: {
      junior: '$120K - $180K',
      mid: '$180K - $280K',
      senior: '$280K - $400K+'
    }
  },
  {
    id: 'meta',
    name: 'Meta',
    logo: '/logos/meta.svg',
    description: 'Leading social technology company building the metaverse',
    focusAreas: [
      'React Ecosystem Mastery',
      'GraphQL & Relay',
      'Real-time Systems',
      'Mobile Web Performance',
      'Social Media Scale',
      'JavaScript Fundamentals',
      'Frontend Architecture'
    ],
    interviewProcess: [
      {
        stage: 'Recruiter Screen',
        duration: '30 min',
        format: 'Phone',
        description: 'Initial conversation about background and role fit',
        tips: [
          'Research Meta\'s mission and values',
          'Prepare questions about the team',
          'Discuss relevant project experience',
          'Show enthusiasm for the role'
        ]
      },
      {
        stage: 'Technical Screen',
        duration: '45 min',
        format: 'Video',
        description: 'Coding interview with React/JavaScript focus',
        tips: [
          'Master React hooks and patterns',
          'Practice live coding problems',
          'Explain optimization strategies',
          'Discuss component design principles'
        ]
      },
      {
        stage: 'Virtual Onsite',
        duration: '4 x 45 min',
        format: 'Video',
        description: 'Coding, system design, and behavioral rounds',
        tips: [
          'Prepare for product sense questions',
          'Practice building Facebook-scale systems',
          'Study Meta\'s engineering culture',
          'Demonstrate impact-driven mindset'
        ]
      }
    ],
    commonQuestions: [
      {
        id: 'meta-q1',
        question: 'Build a real-time chat application like Facebook Messenger',
        category: 'System Design',
        difficulty: 'Hard',
        expectedAnswer: 'WebSocket connections, message queuing, offline support, and optimistic updates',
        followUps: [
          'How would you handle message ordering?',
          'How would you implement read receipts?',
          'How would you scale to billions of messages?'
        ]
      },
      {
        id: 'meta-q2',
        question: 'Implement an infinite scroll news feed with optimistic updates',
        category: 'Coding',
        difficulty: 'Medium',
        expectedAnswer: 'Virtual scrolling, optimistic UI updates, and state management',
        followUps: [
          'How would you handle failed updates?',
          'How would you implement pull-to-refresh?',
          'How would you optimize for mobile performance?'
        ]
      }
    ],
    difficulty: 'Hard',
    preparationTime: 10,
    culture: [
      'Move fast and break things',
      'Be bold and take risks',
      'Focus on impact',
      'Build social value',
      'Meta is for everyone'
    ],
    tips: [
      'Master React ecosystem (hooks, context, performance)',
      'Study GraphQL and modern state management',
      'Practice building real-time features',
      'Understand social media scale challenges',
      'Demonstrate user empathy and product thinking'
    ],
    salaryRange: {
      junior: '$130K - $200K',
      mid: '$200K - $320K',
      senior: '$320K - $500K+'
    }
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: '/logos/amazon.svg',
    description: 'E-commerce and cloud computing giant with customer obsession',
    focusAreas: [
      'Leadership Principles',
      'Customer Obsession',
      'Scalable E-commerce',
      'AWS Integration',
      'Microservices Architecture',
      'Performance Optimization',
      'Accessibility & Inclusion'
    ],
    interviewProcess: [
      {
        stage: 'Phone Screen',
        duration: '45 min',
        format: 'Phone',
        description: 'Technical screen with coding problem',
        tips: [
          'Focus on customer impact',
          'Discuss scalability considerations',
          'Mention relevant AWS services',
          'Show ownership mentality'
        ]
      },
      {
        stage: 'Virtual Interview Loop',
        duration: '4-5 x 1 hour',
        format: 'Video',
        description: 'Technical and behavioral interviews focused on Leadership Principles',
        tips: [
          'Prepare STAR method examples for all 16 Leadership Principles',
          'Practice system design for e-commerce scale',
          'Discuss customer-first decision making',
          'Show examples of bias for action'
        ]
      }
    ],
    commonQuestions: [
      {
        id: 'amazon-q1',
        question: 'Design a scalable product recommendation system',
        category: 'System Design',
        difficulty: 'Hard',
        expectedAnswer: 'Machine learning pipeline, A/B testing, personalization, and real-time serving',
        followUps: [
          'How would you handle cold start problems?',
          'How would you measure recommendation quality?',
          'How would you scale to millions of products?'
        ]
      },
      {
        id: 'amazon-q2',
        question: 'Tell me about a time you had to make a decision without complete information',
        category: 'Behavioral',
        difficulty: 'Medium',
        expectedAnswer: 'STAR method response showing bias for action and good judgment',
        followUps: [
          'How did you gather the information you needed?',
          'What would you do differently?',
          'How did you communicate the decision to stakeholders?'
        ]
      }
    ],
    difficulty: 'Medium',
    preparationTime: 8,
    culture: [
      'Customer obsession',
      'Ownership',
      'Invent and simplify',
      'Bias for action',
      'Frugality',
      'Learn and be curious'
    ],
    tips: [
      'Master all 16 Leadership Principles with specific examples',
      'Practice system design for e-commerce scale',
      'Study AWS services and integration patterns',
      'Emphasize customer impact in all answers',
      'Show examples of taking ownership and delivering results'
    ],
    salaryRange: {
      junior: '$110K - $160K',
      mid: '$160K - $250K',
      senior: '$250K - $400K+'
    }
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: '/logos/microsoft.svg',
    description: 'Technology company focused on productivity and cloud computing',
    focusAreas: [
      'TypeScript Expertise',
      'Enterprise Applications',
      'Accessibility Excellence',
      'Cloud Integration',
      'Collaborative Tools',
      'Cross-platform Development',
      'Inclusive Design'
    ],
    interviewProcess: [
      {
        stage: 'Phone Screen',
        duration: '45 min',
        format: 'Phone',
        description: 'Technical discussion and coding problem',
        tips: [
          'Emphasize collaborative approach',
          'Discuss accessibility considerations',
          'Show growth mindset',
          'Mention diversity and inclusion'
        ]
      },
      {
        stage: 'Virtual Interview Loop',
        duration: '4-5 x 1 hour',
        format: 'Video',
        description: 'Technical skills and cultural fit assessment',
        tips: [
          'Practice TypeScript advanced features',
          'Prepare accessibility examples',
          'Show examples of mentoring others',
          'Discuss inclusive design principles'
        ]
      }
    ],
    commonQuestions: [
      {
        id: 'microsoft-q1',
        question: 'Design a collaborative document editing system like Office 365',
        category: 'System Design',
        difficulty: 'Hard',
        expectedAnswer: 'Operational transforms, conflict resolution, real-time sync, and offline support',
        followUps: [
          'How would you handle concurrent edits?',
          'How would you implement version history?',
          'How would you ensure accessibility?'
        ]
      },
      {
        id: 'microsoft-q2',
        question: 'Implement a fully accessible dropdown component',
        category: 'Coding',
        difficulty: 'Medium',
        expectedAnswer: 'ARIA attributes, keyboard navigation, screen reader support, and focus management',
        followUps: [
          'How would you handle mobile touch interactions?',
          'How would you test accessibility?',
          'How would you support high contrast mode?'
        ]
      }
    ],
    difficulty: 'Medium',
    preparationTime: 8,
    culture: [
      'Respect and inclusion',
      'Growth mindset',
      'Customer success',
      'Diversity and inclusion',
      'Continuous learning',
      'Empowerment'
    ],
    tips: [
      'Master TypeScript and modern web standards',
      'Study accessibility best practices and WCAG guidelines',
      'Practice designing inclusive user experiences',
      'Show examples of mentoring and helping others grow',
      'Demonstrate collaborative problem-solving skills'
    ],
    salaryRange: {
      junior: '$115K - $170K',
      mid: '$170K - $260K',
      senior: '$260K - $380K+'
    }
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: '/logos/apple.svg',
    description: 'Technology company focused on consumer electronics and user experience',
    focusAreas: [
      'User Experience Excellence',
      'Performance Optimization',
      'Safari & WebKit',
      'Progressive Web Apps',
      'Mobile-first Design',
      'Privacy by Design',
      'Attention to Detail'
    ],
    interviewProcess: [
      {
        stage: 'Phone Screen',
        duration: '45 min',
        format: 'Phone',
        description: 'Technical discussion about web technologies',
        tips: [
          'Emphasize user experience focus',
          'Discuss performance optimization',
          'Show attention to detail',
          'Mention privacy considerations'
        ]
      },
      {
        stage: 'Onsite Interview',
        duration: '4-6 x 1 hour',
        format: 'Onsite',
        description: 'Technical depth and cultural fit assessment',
        tips: [
          'Practice Safari-specific optimizations',
          'Prepare mobile web performance examples',
          'Show examples of pixel-perfect implementations',
          'Discuss privacy-first design decisions'
        ]
      }
    ],
    commonQuestions: [
      {
        id: 'apple-q1',
        question: 'Optimize a web app for iOS Safari with 60fps animations',
        category: 'Technical',
        difficulty: 'Hard',
        expectedAnswer: 'Hardware acceleration, efficient repaints, touch optimizations, and memory management',
        followUps: [
          'How would you debug performance issues?',
          'How would you handle different screen sizes?',
          'How would you optimize for battery life?'
        ]
      },
      {
        id: 'apple-q2',
        question: 'Design a gesture-based interface for mobile web',
        category: 'System Design',
        difficulty: 'Medium',
        expectedAnswer: 'Touch events, gesture recognition, smooth animations, and accessibility',
        followUps: [
          'How would you handle gesture conflicts?',
          'How would you make it accessible?',
          'How would you provide visual feedback?'
        ]
      }
    ],
    difficulty: 'Hard',
    preparationTime: 10,
    culture: [
      'User experience first',
      'Attention to detail',
      'Innovation and creativity',
      'Privacy and security',
      'Quality without compromise',
      'Simplicity and elegance'
    ],
    tips: [
      'Master mobile web performance and iOS Safari quirks',
      'Practice pixel-perfect UI implementation',
      'Study gesture interactions and touch UX',
      'Show examples of user-centered design thinking',
      'Demonstrate privacy-conscious development practices'
    ],
    salaryRange: {
      junior: '$125K - $190K',
      mid: '$190K - $300K',
      senior: '$300K - $450K+'
    }
  },
  {
    id: 'netflix',
    name: 'Netflix',
    logo: '/logos/netflix.svg',
    description: 'Streaming entertainment service with global scale',
    focusAreas: [
      'Video Streaming Technology',
      'Performance at Scale',
      'A/B Testing & Experimentation',
      'Content Delivery Networks',
      'Responsive Design',
      'Data Visualization',
      'Microservices Architecture'
    ],
    interviewProcess: [
      {
        stage: 'Phone Screen',
        duration: '45 min',
        format: 'Phone',
        description: 'Technical discussion about streaming and performance',
        tips: [
          'Discuss video streaming challenges',
          'Show performance optimization experience',
          'Mention A/B testing and experimentation',
          'Demonstrate data-driven decision making'
        ]
      },
      {
        stage: 'Virtual Interview Loop',
        duration: '4-5 x 1 hour',
        format: 'Video',
        description: 'Technical skills and Netflix culture fit',
        tips: [
          'Practice video player implementation',
          'Prepare performance optimization examples',
          'Show examples of innovation and creativity',
          'Discuss global scale challenges'
        ]
      }
    ],
    commonQuestions: [
      {
        id: 'netflix-q1',
        question: 'Design a video streaming player with adaptive bitrate',
        category: 'System Design',
        difficulty: 'Hard',
        expectedAnswer: 'Adaptive bitrate streaming, CDN optimization, buffer management, and analytics',
        followUps: [
          'How would you handle network changes?',
          'How would you optimize for different devices?',
          'How would you implement offline playback?'
        ]
      },
      {
        id: 'netflix-q2',
        question: 'Implement a recommendation carousel with lazy loading',
        category: 'Coding',
        difficulty: 'Medium',
        expectedAnswer: 'Intersection Observer, virtual scrolling, image optimization, and smooth animations',
        followUps: [
          'How would you handle different screen sizes?',
          'How would you optimize for mobile?',
          'How would you implement A/B testing?'
        ]
      }
    ],
    difficulty: 'Hard',
    preparationTime: 10,
    culture: [
      'Freedom and responsibility',
      'High performance',
      'Context not control',
      'Highly aligned, loosely coupled',
      'Innovation and experimentation',
      'Data-driven decisions'
    ],
    tips: [
      'Master video streaming technologies and CDN optimization',
      'Practice building performance-critical applications',
      'Study A/B testing and experimentation frameworks',
      'Show examples of innovation and creative problem-solving',
      'Demonstrate ability to work with global scale challenges'
    ],
    salaryRange: {
      junior: '$140K - $220K',
      mid: '$220K - $350K',
      senior: '$350K - $550K+'
    }
  }
];

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

export const getCompaniesByDifficulty = (difficulty: Company['difficulty']): Company[] => {
  return companies.filter(company => company.difficulty === difficulty);
};

export const getCompaniesWithFocus = (focusArea: string): Company[] => {
  return companies.filter(company => 
    company.focusAreas.some(area => 
      area.toLowerCase().includes(focusArea.toLowerCase())
    )
  );
};