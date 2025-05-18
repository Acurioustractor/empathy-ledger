'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { fetchRecords } from '@/lib/airtable.utils';
import { AIRTABLE_TABLES } from '@/lib/airtable-tables';
import {
  AirtableTheme,
  AirtableMedia,
  AirtableStory,
  AirtableStoryteller,
} from '@/lib/airtable-types';

import { StorytellerSelector } from './StorytellerSelector';
import { ConstellationCanvas } from './ConstellationCanvas';
import { StorytellerInfoPanel } from './StorytellerInfoPanel';
import { Insight, KnowledgeExtraction } from './KnowledgeExtraction';
import { FloatingParticles } from './FloatingParticles';
import { FullStorytellerList } from './FullStorytellerList';
import { AnimatePresence, motion } from 'framer-motion';
import { MiniThemeNetworkList } from './MiniThemeNetworkList';
import { Storyteller, Theme, VisualQuote } from './StorytellerLegend';

const DEFAULT_STORYTELLER_COLORS = [
  '#10b981',
  '#3b82f6',
  '#fbbf24',
  '#8b5cf6',
  '#ec4899',
  '#f97316',
  '#14b8a6',
  '#6366f1',
  '#d946ef',
  '#f59e0b',
];
const DEFAULT_THEME_COLORS = [...DEFAULT_STORYTELLER_COLORS].reverse();

const CORE_STORYTELLER_COUNT = 10;

const assignStorytellerProperties = (storytellers: AirtableStoryteller[]): Storyteller[] => {
  return storytellers.map(
    (st, index): Storyteller => ({
      // Explicit return type for mapped object
      id: st.id,
      name: st.Name || 'Unnamed Storyteller',
      description: Array.isArray(st['Summary (from Media)'])
        ? st['Summary (from Media)'].join('\n')
        : st['Summary (from Media)'] || undefined,
      color: DEFAULT_STORYTELLER_COLORS[index % DEFAULT_STORYTELLER_COLORS.length],
      avatarUrl: Array.isArray(st['File Profile Image']) && st['File Profile Image'][0] && typeof st['File Profile Image'][0] === 'object' && 'url' in st['File Profile Image'][0]
        ? (st['File Profile Image'][0] as { url?: string }).url
        : undefined,
      themes: [], // Initial empty array, will be Theme[]
      quotes: [], // Initial empty array, will be VisualQuote[]
      themeCount: 0,
      quoteCount: 0,
      mediaCount: (st.Media || []).length,
      storyCount: 0,
      rawMediaIds: (st.Media || []) as string[],
    })
  );
};

const assignThemeProperties = (themes: AirtableTheme[]): Theme[] => {
  return themes.map(
    (theme, index): Theme => ({
      // Explicit return type
      id: theme.id,
      name: theme['Theme Name'] || 'Unnamed Theme',
      description: theme.Description || undefined,
      color: DEFAULT_THEME_COLORS[index % DEFAULT_THEME_COLORS.length],
      stories: 0,
    })
  );
};

export const StorytellerExplorerView: React.FC = () => {
  const [allStorytellers, setAllStorytellers] = useState<Storyteller[]>([]);
  const [coreStorytellers, setCoreStorytellers] = useState<Storyteller[]>([]);
  const [activeStoryteller, setActiveStoryteller] = useState<Storyteller | null>(null);
  const [allThemes, setAllThemes] = useState<Theme[]>([]);
  const [knowledgeInsights, setKnowledgeInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openWidget, setOpenWidget] = useState<'info' | 'themes' | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [allStories, setAllStories] = useState<AirtableStory[]>([]);

  const fetchData = useCallback(async () => {
    if (allStorytellers.length === 0) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const { records: airtableStorytellers } = await fetchRecords<AirtableStoryteller>(
        AIRTABLE_TABLES.STORYTELLERS,
        {
          fields: ['Name', 'Summary (from Media)', 'Media', 'File Profile Image'],
        }
      );
      let storytellersWithProps: Storyteller[] = assignStorytellerProperties(airtableStorytellers);

      const { records: mediaRecords } = await fetchRecords<AirtableMedia>(AIRTABLE_TABLES.MEDIA, {
        fields: ['Themes', 'Quotes', 'Stories', 'Storytellers'],
      });
      const mediaMap = new Map(mediaRecords.map((m: AirtableMedia) => [m.id, m]));

      const { records: airtableThemes } = await fetchRecords<AirtableTheme>(
        AIRTABLE_TABLES.THEMES,
        {
          fields: ['Theme Name', 'Description'],
        }
      );
      const themesWithProps = assignThemeProperties(airtableThemes);
      const themeMap = new Map(themesWithProps.map((t: Theme) => [t.id, t]));
      setAllThemes(themesWithProps);

      storytellersWithProps = storytellersWithProps
        .map((st: Storyteller): Storyteller => {
          // Explicit return type
          const storytellerMediaIds = st.rawMediaIds || [];
          const SCMedia: AirtableMedia[] = storytellerMediaIds
            .map((id: string) => mediaMap.get(id))
            .filter(Boolean) as AirtableMedia[];

          const linkedThemeIds = Array.from(new Set(SCMedia.flatMap(m => m.Themes || [])));
          const linkedQuoteIds = Array.from(new Set(SCMedia.flatMap(m => m.Quotes || [])));
          const linkedStoryIds = Array.from(new Set(SCMedia.flatMap(m => m.Stories || [])));

          return {
            ...st,
            themes: linkedThemeIds.filter((id): id is string => typeof id === 'string').map(id => themeMap.get(id)).filter(Boolean) as Theme[],
            quotes: linkedQuoteIds.filter((id): id is string => typeof id === 'string').map(id => ({
              id,
              name: `Quote ${id.slice(-4)}`,
              color: '#A0AEC0',
            })) as VisualQuote[],
            themeCount: linkedThemeIds.length,
            quoteCount: linkedQuoteIds.length,
            mediaCount: SCMedia.length,
            storyCount: linkedStoryIds.length,
          };
        })
        .sort((a: Storyteller, b: Storyteller) => (b.mediaCount ?? 0) - (a.mediaCount ?? 0));

      const topCoreStorytellers = storytellersWithProps.slice(0, CORE_STORYTELLER_COUNT);

      setAllStorytellers(storytellersWithProps);
      setCoreStorytellers(topCoreStorytellers);

      let currentActiveStoryteller = activeStoryteller
        ? storytellersWithProps.find((s: Storyteller) => s.id === activeStoryteller!.id)
        : null;
      if (!currentActiveStoryteller && topCoreStorytellers.length > 0) {
        currentActiveStoryteller = topCoreStorytellers[0];
      }
      setActiveStoryteller(currentActiveStoryteller || null);

      setKnowledgeInsights([
        {
          title: 'Storyteller Insight 1',
          description: 'Dominant themes for active storytellers...',
          relatedThemes: [],
        },
      ]);

      // Fetch stories
      const { records: airtableStories } = await fetchRecords<AirtableStory>(
        AIRTABLE_TABLES.STORIES,
        {
          fields: ['Title', 'Themes', 'Storytellers'],
        }
      );
      setAllStories(airtableStories);
    } catch (err) {
      console.error('Error fetching data for Storyteller Explorer:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isFullScreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  const handleSelectStoryteller = (storytellerId: string) => {
    const selected = allStorytellers.find((s: Storyteller) => s.id === storytellerId);
    setActiveStoryteller(selected || null);
  };

  if (isLoading && allStorytellers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
        <div className="animate-pulse text-xl">Loading Storyteller Constellations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-900/20 text-white p-4">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Data</h2>
        <p className="text-red-300 mb-6 text-center">{error}</p>
        <button
          onClick={fetchData}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950 text-white flex flex-col overflow-auto">
      <FloatingParticles />

      <header className="relative z-10 text-center py-4 md:py-6 px-4 flex-shrink-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
          <span className="bg-gradient-to-r from-amber-400 via-purple-500 to-emerald-500 bg-clip-text text-transparent animate-pulseGlow">
            Storyteller Constellation
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
          Explore the narratives and thematic footprints of each storyteller.
        </p>
      </header>

      {/* Responsive grid: left = selector, right = main content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 box-border">
        <div className="relative z-10 w-full max-w-full grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-8 items-start">
          {/* Left column: Selector and Info button */}
          <aside
            className="w-full max-w-xs lg:max-w-[320px] flex flex-col gap-0 mb-8 lg:mb-0 transition-all duration-300"
            aria-label="Storyteller navigation panel"
          >
            <div className="bg-gray-800/80 rounded-lg shadow border border-gray-700 p-2 flex flex-col">
              {/* Info button elegantly inside selector card */}
              {activeStoryteller && (
                <button
                  className="flex items-center gap-2 px-4 py-2 mb-2 rounded-full bg-amber-500/90 hover:bg-amber-600 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-amber-400/70 transition text-base self-center"
                  aria-label="Show storyteller info"
                  onClick={() => setOpenWidget('info')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                  Info
                </button>
              )}
              <StorytellerSelector
                storytellers={coreStorytellers}
                activeStorytellerId={activeStoryteller?.id || null}
                onSelectStoryteller={handleSelectStoryteller}
              />
            </div>
          </aside>
          {/* Right column: Main interactive content */}
          <main
            className="flex flex-col gap-8 w-full max-w-full justify-center"
            aria-label="Storyteller explorer main content"
          >
            {/* Modal overlay for Info only */}
            <AnimatePresence>
              {openWidget === 'info' && activeStoryteller && (
                <StorytellerInfoPanel
                  activeStoryteller={activeStoryteller}
                  onClose={() => setOpenWidget(null)}
                />
              )}
            </AnimatePresence>
            {/* Canvas Section (responsive, with full screen option) */}
            <section
              className="w-full max-w-full border-4 border-orange-500 rounded-lg bg-teal-700/50 p-2 md:p-4 shadow-lg relative flex flex-col items-center justify-center transition-all duration-300 max-h-[70vh]"
              aria-label="Constellation visualization"
            >
              {/* Full Screen Button */}
              <button
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/70 transition"
                aria-label="Enter full screen"
                onClick={() => setIsFullScreen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V6a2 2 0 012-2h2m8 0h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2m-8 0H6a2 2 0 01-2-2v-2"
                  />
                </svg>
              </button>
              <div className="w-full h-full flex-grow flex items-center justify-center min-h-[240px] max-h-[60vh]">
                <ConstellationCanvas activeStoryteller={activeStoryteller} allThemes={allThemes} />
              </div>
            </section>

            {/* Full Screen Overlay for Constellation */}
            <AnimatePresence>
              {isFullScreen && (
                <motion.div
                  key="fullscreen-constellation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
                  aria-modal="true"
                  role="dialog"
                >
                  {/* Exit Full Screen Button */}
                  <button
                    className="absolute top-6 right-6 z-50 p-3 rounded-full bg-gray-800/90 hover:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/70 transition"
                    aria-label="Exit full screen"
                    onClick={() => setIsFullScreen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ maxWidth: '100vw', maxHeight: '100vh' }}
                  >
                    <ConstellationCanvas
                      activeStoryteller={activeStoryteller}
                      allThemes={allThemes}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Knowledge and Full List */}
            <section
              className="w-full mt-8"
              aria-label="Knowledge insights and full storyteller list"
            >
              <KnowledgeExtraction insights={knowledgeInsights} />
              {activeStoryteller && (
                <MiniThemeNetworkList
                  storyteller={activeStoryteller}
                  stories={allStories}
                  themes={allThemes}
                />
              )}
              <FullStorytellerList allStorytellers={allStorytellers} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
