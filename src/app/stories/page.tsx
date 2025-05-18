import { fetchRecords } from '@/lib/airtable.utils';
import { AirtableStory, AirtableStoryteller, AirtableShift } from '@/lib/airtable-types';
import { AIRTABLE_TABLES } from '@/lib/airtable-tables';
import StoriesClientPage from './StoriesClientPage';
import { StoryWithDetails } from '@/lib/airtable-wrappers';

// Fetch all stories and related data at build time
export default async function StoriesPage() {
  // Fetch all stories
  const { records: storiesData } = await fetchRecords<AirtableStory>(AIRTABLE_TABLES.STORIES, {});

  // Get unique storyteller IDs from the fetched stories
  const storytellerIds = Array.from(
    new Set(
      storiesData
        .flatMap(story => story.Storytellers || story['Storytellers (from Media)'] || [])
        .filter(id => id)
    )
  );

  let storiesWithNames: StoryWithDetails[] = storiesData;

  // Fetch storyteller names
  if (storytellerIds.length > 0) {
    const formula = `OR(${storytellerIds.map(id => `RECORD_ID()='${id}'`).join(',')})`;
    const { records: storytellers } = await fetchRecords<AirtableStoryteller>(
      AIRTABLE_TABLES.STORYTELLERS,
      {
        filterByFormula: formula,
        fields: ['Name'],
      }
    );
    const storytellerMap = new Map(storytellers.map(st => [st.id, st.Name]));
    storiesWithNames = storiesData.map(story => {
      const storytellerId = (story.Storytellers || story['Storytellers (from Media)'] || [])[0];
      const idStr = typeof storytellerId === 'string' ? storytellerId : '';
      return {
        ...story,
        storytellerName: storytellerMap.get(idStr) || 'Unknown',
      };
    });
  }

  // Fetch Shift Names
  const shiftIds = Array.from(
    new Set(
      storiesData.flatMap(story => story['Shifts (from Storytellers)'] || []).filter(id => id)
    )
  );
  let stories: StoryWithDetails[] = storiesWithNames;
  if (shiftIds.length > 0) {
    const shiftFormula = `OR(${shiftIds.map(id => `RECORD_ID()='${id}'`).join(',')})`;
    const { records: shifts } = await fetchRecords<AirtableShift>(AIRTABLE_TABLES.SHIFTS, {
      filterByFormula: shiftFormula,
      fields: ['Name'],
    });
    const shiftMap = new Map(shifts.map(sh => [sh.id, sh.Name]));
    stories = storiesWithNames.map(story => ({
      ...story,
      displayShiftName: shiftMap.get((story['Shifts (from Storytellers)'] || [])[0]),
    }));
  }

  // Gather unique filter values
  const statusSet = new Set<string>();
  const shiftsNameSet = new Set<string>();
  const locationSet = new Set<string>();
  const monthSet = new Set<string>();

  for (const story of stories) {
    if (story.Status) statusSet.add(story.Status);
    if (story.displayShiftName) shiftsNameSet.add(story.displayShiftName);
    if (Array.isArray(story['Location (from Media)'])) {
      story['Location (from Media)'].forEach((loc: string) => locationSet.add(loc));
    }
    // Month from Created
    const created = story.Created || story.createdTime;
    if (created) {
      const date = new Date(created);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthSet.add(month);
    }
  }

  const filterFields = [
    { value: 'Status', label: 'Status' },
    { value: 'Shifts', label: 'Shift' },
    { value: 'Location', label: 'Location' },
    { value: 'Month', label: 'Month' },
  ];
  const sortFields = [
    { value: 'Title', label: 'Title' },
    { value: 'Status', label: 'Status' },
    { value: 'Storytellers', label: 'Storyteller' },
    { value: 'Created', label: 'Created Date' },
  ];

  const filterValues = {
    Status: Array.from(statusSet),
    Shifts: Array.from(shiftsNameSet),
    Location: Array.from(locationSet),
    Month: Array.from(monthSet),
  };

  // Pass all data to a client component for filtering, sorting, and pagination
  return (
    <StoriesClientPage
      stories={stories}
      filterFields={filterFields}
      sortFields={sortFields}
      filterValues={filterValues}
    />
  );
}
