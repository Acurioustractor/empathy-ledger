import { AirtableStory, AirtableStoryteller } from './airtable-types';

// Wrapper type for enriched stories
export interface StoryWithDetails extends AirtableStory {
  storytellerName?: string;
  displayQuoteText?: string;
  displayShiftName?: string;
}

// Wrapper type for enriched storytellers
export interface StorytellerWithStory extends AirtableStoryteller {
  story?: AirtableStory;
}

// Add more wrappers as your app grows 