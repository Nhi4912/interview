import { learningPathService } from '@/lib/learning-paths';

export function generateStaticParams() {
  // Get all available learning path IDs
  const paths = learningPathService.getAllLearningPaths();
  
  return paths.map((path) => ({
    pathId: path.id,
  }));
}