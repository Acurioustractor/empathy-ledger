import React from 'react';
import { AirtableStory } from '@/lib/airtable-types';
import { Storyteller, Theme } from './StorytellerLegend';

// Utility: Aggregation logic
function computeThemeNetwork(stories: AirtableStory[], themes: Theme[]) {
  const themeMap = Object.fromEntries(themes.map(t => [t.id, t]));
  const pairCounts: { [key: string]: number } = {};
  stories.forEach(story => {
    // Use both 'Themes' and 'themes' fields for compatibility
    const themeIds = (story['Themes'] || []) as string[];
    for (let i = 0; i < themeIds.length; i++) {
      for (let j = i + 1; j < themeIds.length; j++) {
        const [a, b] = [themeIds[i], themeIds[j]].sort();
        const key = `${a}|${b}`;
        pairCounts[key] = (pairCounts[key] || 0) + 1;
      }
    }
  });
  const nodes = Object.values(themeMap);
  const edges = Object.entries(pairCounts).map(([key, count]) => {
    const [source, target] = key.split('|');
    return { source, target, count };
  });
  return { nodes, edges };
}

function getTopThemeConnections(
  edges: { source: string; target: string; count: number }[],
  themeMap: { [key: string]: Theme },
  topN = 3
): { id: string; name?: string; color?: string; count: number }[] {
  const themeCounts: { [key: string]: number } = {};
  edges.forEach(({ source, target, count }) => {
    themeCounts[source] = (themeCounts[source] || 0) + count;
    themeCounts[target] = (themeCounts[target] || 0) + count;
  });
  return Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([themeId, count]) => ({
      ...(themeMap[themeId] || { id: themeId, name: 'Unknown', color: '#888' }),
      count,
    }));
}

export function MiniThemeNetworkList({
  storyteller,
  stories,
  themes,
}: {
  storyteller: Storyteller;
  stories: AirtableStory[];
  themes: Theme[];
}) {
  if (!storyteller) return null;

  // Filter stories for this storyteller
  const storiesForStoryteller = stories.filter(s => {
    // AirtableStory: Storytellers is string or string[]
    const ids = Array.isArray(s.Storytellers)
      ? s.Storytellers
      : typeof s.Storytellers === 'string' && s.Storytellers
      ? [s.Storytellers]
      : [];
    return ids.includes(storyteller.id);
  });

  // Build network and get top connections
  const { edges } = computeThemeNetwork(storiesForStoryteller, themes);
  const themeMap = Object.fromEntries(themes.map(t => [t.id, t]));
  const topThemes = getTopThemeConnections(edges, themeMap, 3);

  return (
    <div className="bg-gray-900/80 rounded-lg p-4 shadow-md mt-4">
      <h4 className="text-base font-semibold mb-2 text-amber-300">
        {storyteller.name}&apos;s Top Theme Connections
      </h4>
      <ul className="space-y-1">
        {topThemes.length === 0 && (
          <li className="text-gray-400 text-sm">No theme connections found.</li>
        )}
        {topThemes
          .filter(theme => typeof theme.id === 'string')
          .map(theme => (
            <li key={theme.id} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.color }}
              />
              <span className="text-sm text-gray-200">{theme.name}</span>
              <span className="ml-auto text-xs text-gray-400">{theme.count} connections</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
