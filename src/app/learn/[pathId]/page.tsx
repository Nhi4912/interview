import React from 'react';
import { learningPathService } from '@/lib/learning-paths';
import LearningPathClient from './LearningPathClient';

interface LearningPathPageProps {
  params: { pathId: string };
}

export function generateStaticParams() {
  const paths = learningPathService.getAllLearningPaths();
  return paths.map((path) => ({
    pathId: path.id,
  }));
}

const LearningPathPage: React.FC<LearningPathPageProps> = ({ params }) => {
  return <LearningPathClient pathId={params.pathId} />;
};

export default LearningPathPage;