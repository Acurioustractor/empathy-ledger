import React from 'react';
import { fetchRecords } from '@/lib/airtable.utils';
import { AIRTABLE_TABLES } from '@/lib/airtable-tables';
import { AirtableStoryteller, AirtableStory } from '@/lib/airtable-types';
import { PhilosophyAnimatedSections } from '@/components/philosophy/PhilosophyAnimatedSections';

export default async function PhilosophyPage() {
  // Use the exact names from Airtable
  const heroNames = ['ZERO', 'Robyn Watts', 'Felicity Davis-Smith'];
  const filter = `OR(${heroNames.map(name => `{Name}='${name}'`).join(',')})`;
  const { records: heroes } = await fetchRecords<AirtableStoryteller>(
    AIRTABLE_TABLES.STORYTELLERS,
    {
      filterByFormula: filter,
      fields: ['Name', 'File Profile Image', 'Summary (from Media)', 'Stories (from Media)'],
    }
  );

  // Get all connected story IDs
  const storyIds = heroes.flatMap(h => h['Stories (from Media)'] || []).filter(Boolean);
  const uniqueStoryIds = Array.from(new Set(storyIds));

  let stories: AirtableStory[] = [];
  if (uniqueStoryIds.length > 0) {
    const storyFormula = `OR(${uniqueStoryIds.map(id => `RECORD_ID()='${id}'`).join(',')})`;
    const { records: fetchedStories } = await fetchRecords<AirtableStory>(AIRTABLE_TABLES.STORIES, {
      filterByFormula: storyFormula,
      fields: [
        'Title',
        'Video Embed Code',
        'Story Transcript',
        'Shifts (from Storytellers)',
        'Storytellers',
      ],
    });
    stories = fetchedStories;
  }

  // Join each hero with their story
  const heroesWithStories = heroes.map(hero => {
    const heroStoryId = (hero['Stories (from Media)'] || [])[0];
    const story = stories.find(s => s.id === heroStoryId);
    return {
      ...hero,
      story,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <article className="prose lg:prose-xl max-w-none">
          <PhilosophyAnimatedSections heroes={heroesWithStories} />
        </article>
      </div>
    </div>
  );
}
