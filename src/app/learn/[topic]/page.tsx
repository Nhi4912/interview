import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Share2 } from "lucide-react";
import MarkdownViewer from "@/components/MarkdownViewer";
import { getTopicContent } from "@/lib/content";

export default function LearnTopicPage({
  params,
}: {
  params: { topic: string };
}) {
  const topic = params.topic;
  const topicData = getTopicContent(topic);

  if (!topicData) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-24">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/learn">
            <button className="flex items-center gap-2 bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors">
              <ArrowLeft size={16} />
              Back
            </button>
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-center">
          Content not found for topic: {topic}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/learn">
          <button className="flex items-center gap-2 bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors">
            <ArrowLeft size={16} />
            Back to Learn
          </button>
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {topicData.title}
          </h1>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-transparent text-gray-700 border border-gray-300 px-6 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors">
              <Star size={16} />
              Bookmark
            </button>
            <button className="flex items-center gap-2 bg-transparent text-gray-700 border border-gray-300 px-6 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        <div className="flex gap-8 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            {topicData.estimatedTime}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
              topicData.difficulty === "Beginner"
                ? "bg-green-500"
                : topicData.difficulty === "Intermediate"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {topicData.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            {topicData.category}
          </span>
        </div>

        {topicData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {topicData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-lg text-gray-700 leading-relaxed">
          {topicData.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <MarkdownViewer content={topicData.content} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Progress
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "25%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">25% Complete</p>
          </div>

          {topicData.relatedTopics.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Related Topics
              </h3>
              {topicData.relatedTopics.map((relatedTopic, index) => (
                <Link key={index} href={`/learn/${relatedTopic}`}>
                  <div className="block p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 mb-2 hover:bg-gray-100 transition-colors">
                    {relatedTopic}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Generate static paths for all available content
export async function generateStaticParams() {
  const { generateStaticParams: generateParams } = await import(
    "@/lib/content"
  );
  return generateParams();
}
