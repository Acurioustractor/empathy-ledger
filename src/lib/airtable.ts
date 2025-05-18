import { TABLES, FIELDS, getAirtableBase } from './airtable.config';
import { FieldSet } from 'airtable';
import { Storyteller } from './airtable.types';
import { fetchRecords, QueryParams } from './airtable.utils';

// Types
export interface StoryLocal {
  [key: string]: unknown;
  id: string;
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  engagement: {
    views: number;
    likes: number;
    comments: number;
  };
}

export interface UserLocal {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  stats: {
    stories: number;
    followers: number;
    following: number;
  };
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  impactFocus: string[];
  stories: string[];
}

export interface ImpactMetric {
  id: string;
  storyId: string;
  organizationId: string;
  metricType: string;
  value: number;
  description: string;
  createdAt: string;
}

// Generic fetch utility for any table
export async function fetchAllRecords<T>(tableName: string): Promise<T[]> {
  const base = getAirtableBase();
  const records = await base(tableName).select().all();
  return records.map(record => ({ id: record.id, ...record.fields }) as T);
}

// Example: Fetch all Storytellers
export async function getAllStorytellers(
  params: QueryParams = {}
): Promise<{ records: Storyteller[]; totalCount: number }> {
  return fetchRecords<Storyteller>(TABLES.STORYTELLERS, params);
}

// Story Operations
export const getStories = async (
  params: QueryParams = {}
): Promise<{ records: StoryLocal[]; totalCount: number }> => {
  const fetchParams: QueryParams = {
    sortBy: FIELDS.STORIES.CREATED,
    sortDirection: 'desc',
    ...params,
  };

  return fetchRecords<StoryLocal>(TABLES.STORIES, fetchParams);
};

export const getStory = async (id: string): Promise<StoryLocal | null> => {
  try {
    const { records } = await fetchRecords<StoryLocal>(TABLES.STORIES, {
      filterBy: 'id',
      filterValue: id,
      pageSize: 1,
    });
    return records[0] || null;
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};

export const createStory = async (
  story: Omit<StoryLocal, 'id'>
): Promise<Partial<StoryLocal> | null> => {
  try {
    const base = getAirtableBase();
    const record = await base(TABLES.STORIES).create([
      {
        fields: {
          [FIELDS.STORIES.TITLE]: story.title,
          [FIELDS.STORIES.STORY_COPY]: story.content,
          [FIELDS.STORIES.CREATED]: new Date().toISOString(),
          [FIELDS.STORIES.STATUS]: story.status,
        } as FieldSet,
      },
    ]);
    return {
      id: record[0].id,
      ...story,
    };
  } catch (error) {
    console.error('Error creating story:', error);
    return null;
  }
};

export const updateStory = async (
  id: string,
  story: Partial<StoryLocal>
): Promise<Partial<StoryLocal> | null> => {
  try {
    const base = getAirtableBase();
    const record = await base(TABLES.STORIES).update([
      {
        id,
        fields: {
          ...(story.title && { [FIELDS.STORIES.TITLE]: story.title }),
          ...(story.content && { [FIELDS.STORIES.STORY_COPY]: story.content }),
          [FIELDS.STORIES.CREATED]: new Date().toISOString(),
          ...(story.status && { [FIELDS.STORIES.STATUS]: story.status }),
        },
      },
    ]);
    return {
      id: record[0].id,
      ...story,
    };
  } catch (error) {
    console.error('Error updating story:', error);
    return null;
  }
};

// User Operations
export const getUser = async (id: string): Promise<UserLocal | null> => {
  try {
    const base = getAirtableBase();
    const record = await base(TABLES.USERS).find(id);
    return {
      id: record.id,
      name: record.get(FIELDS.USERS.NAME) as string,
      avatar: record.get(FIELDS.USERS.AVATAR) as string,
      bio: record.get(FIELDS.USERS.BIO) as string,
      location: record.get(FIELDS.USERS.LOCATION) as string,
      website: record.get(FIELDS.USERS.WEBSITE) as string,
      stats: {
        stories: 0,
        followers: 0,
        following: 0,
      },
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Organization Operations
// export const getOrganization = async (id: string): Promise<Organization | null> => {
//   try {
//     const base = getAirtableBase();
//     const record = await base(TABLES.ORGANIZATIONS).find(id);
//     return {
//       id: record.id,
//       name: record.get(FIELDS.ORGANIZATIONS.NAME) as string,
//       description: record.get(FIELDS.ORGANIZATIONS.DESCRIPTION) as string,
//       logo: record.get(FIELDS.ORGANIZATIONS.LOGO) as string,
//       website: record.get(FIELDS.ORGANIZATIONS.WEBSITE) as string,
//       impactFocus: record.get(FIELDS.ORGANIZATIONS.IMPACT_FOCUS) as string[],
//       stories: record.get(FIELDS.ORGANIZATIONS.STORIES) as string[],
//     };
//   } catch (error) {
//     console.error('Error fetching organization:', error);
//     return null;
//   }
// };

// Impact Metrics Operations
// export const getImpactMetrics = async (storyId: string): Promise<ImpactMetric[]> => {
//   try {
//     const base = getAirtableBase();
//     const records = await base(TABLES.IMPACT_METRICS)
//       .select({
//         filterByFormula: `{${FIELDS.IMPACT_METRICS.STORY_ID}} = '${storyId}'`,
//       })
//       .all();
//
//     return records.map((record) => ({
//       id: record.id,
//       storyId: record.get(FIELDS.IMPACT_METRICS.STORY_ID) as string,
//       organizationId: record.get(FIELDS.IMPACT_METRICS.ORGANIZATION_ID) as string,
//       metricType: record.get(FIELDS.IMPACT_METRICS.METRIC_TYPE) as string,
//       value: record.get(FIELDS.IMPACT_METRICS.VALUE) as number,
//       description: record.get(FIELDS.IMPACT_METRICS.DESCRIPTION) as string,
//       createdAt: record.get(FIELDS.IMPACT_METRICS.CREATED_AT) as string,
//     }));
//   } catch (error) {
//     console.error('Error fetching impact metrics:', error);
//     return [];
//   }
// };
