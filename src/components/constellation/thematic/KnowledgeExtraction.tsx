import React from 'react';

// Define structure for insight data
export interface Insight {
  title: string;
  description: string;
  relatedThemes: string[]; // IDs or names of themes related to this insight
}

interface KnowledgeExtractionProps {
  insights: Insight[];
}

export const KnowledgeExtraction: React.FC<KnowledgeExtractionProps> = ({ insights }) => {
  if (!insights || insights.length === 0) {
    return (
      <div className="my-16 p-8 bg-gray-800/30 rounded-lg text-center text-gray-400">
        Generating emergent knowledge patterns...
      </div>
    );
  }

  return (
    <div className="my-16 mx-4 md:mx-auto max-w-6xl bg-gradient-to-br from-purple-900/20 to-emerald-900/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-400">
        Emergent Knowledge Patterns
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.slice(0, 4).map(
          (
            insight,
            index // Limit to top 4 insights
          ) => (
            <div
              key={index}
              className="bg-gray-800/60 rounded-lg p-6 border-l-4 border-emerald-500 shadow-md transition-all duration-300 hover:bg-gray-700/60 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-3 text-amber-400">{insight.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{insight.description}</p>
              {/* Optional: Display related themes */}
              {/* <div className="mt-3 text-xs text-gray-400">
              Related: {insight.relatedThemes.join(', ')}
            </div> */}
            </div>
          )
        )}
      </div>
    </div>
  );
};
