// AUTO-GENERATED: Update these types if your Airtable schema changes

export interface AirtableStory {
  id: string;
  'Story ID': number;
  'Shifts (from Media)': string[];
  Shifts: string[];
  'Geocache (from Shifts)': string[];
  'Location (from Media)': string;
  'State (from Shifts)': string;
  'Storytellers (from Media)': string[];
  'Video Embed Code': string;
  Title: string;
  'File Profile Image (from Storytellers) (from Media)': string[];
  Media: string[];
  'Transcript (from Media)': string;
  Watermark: string;
  Permissions: string;
  'Story Image': string[];
  Status: string;
  Created: string;
  'Link (from Galleries) (from Media)': string[];
  'Video Story Link': string;
  'Story Transcript': string;
  'Story copy': string;
  'Total Uses': string;
  'Usage Logs': string;
  Storytellers: string;
  'Quotes Rollup (from Media)'?: string[];
  createdTime?: string;
  'Shifts (from Storytellers)': string[];
  Themes?: string[];
}

export interface AirtableStoryteller {
  id: string;
  Name: string;
  'Summary (from Media)': unknown[];
  'Themes (from Media)': unknown[];
  'Description (from Themes) (from Media)': unknown[];
  'Quotes (from Media)': unknown[];
  'Theme (from Quotes) (from Media)': unknown[];
  'Transcript (from Media)': unknown;
  Project: string;
  'Project (from Media)': unknown[];
  'File Profile Image': unknown[];
  Location: string;
  Role: string;
  Organisation: string;
  Done: boolean;
  Media: unknown[];
  'Secure Contact Email': string;
  Preferences: string;
  'Created At': string;
  'File Path/URL (from Media)': unknown[];
  'Magic Link URL': string;
  'User Role': string;
  'Unique Storyteller ID': string;
  'Consent Status': string;
  'Preferred Anonymity Level': string;
  'Last Updated By Storyteller': string;
  'Preferred Name': string;
  'Phone Number': string;
  Comments: unknown[];
  'Consent Form Photo': unknown[];
  Signature: unknown[];
  'Location Rollup (from Media)': unknown;
  Tag: string;
  'Video draft link Rollup (from Media)': unknown;
  Created: string;
  'Video draft link (from Media)': unknown[];
  'RAW Video and photo URL': string;
  'User who added story': unknown[];
  'Video draft link (from Media) 2': unknown[];
  'Galleries (from Media)': unknown[];
  'Link (from Galleries) (from Media)': unknown[];
  'Stories (from Media)': unknown[];
  'Shifts (from Media)': unknown[];
}

export interface AirtableMedia {
  id: string;
  'File Name': string;
  Storytellers: unknown[];
  Transcript: string;
  Summary: string;
  Themes: unknown[];
  'Description (from Themes)': unknown[];
  Quotes: unknown[];
  'Theme (from Quotes)': unknown;
  Location: string;
  Project: string;
  Shifts: unknown[];
  'Video draft link': string;
  'Created At': string;
  Type: string;
  Processed: boolean;
  Galleries: unknown[];
  Audio: unknown[];
  Stories: unknown[];
  Dropbox: string;
  'File Profile Image (from Storytellers)': unknown[];
  'Link (from Galleries)': unknown[];
  'Post-Shift Reflection': unknown[];
  'Assignee (from Post-Shift Reflection)': unknown[];
  'Reflection Transcript (from Post-Shift Reflection)': unknown;
}

export interface AirtableTheme {
  id: string;
  'Theme Name': string;
  Description: string;
  'Storytellers Rollup (from Related Media)': unknown;
  'Related Media': unknown[];
  'Quotes (from Related Media)': unknown[];
}

export interface AirtableQuote {
  id: string;
  'Quote Text': string;
  'Transcript Reference': unknown[];
  Theme: string;
}

export interface AirtableGallery {
  id: string;
  'Gallery Name': string;
  'Shoot Date': string;
  Link: string;
  'Gallery Type': string;
  Media: unknown[];
  'Storytellers (from Media)': unknown[];
  'Shifts (from Media)': unknown[];
  'Stories (from Media)': unknown[];
  Storytellers: string;
}

export interface AirtableShift {
  id: string;
  Name: string;
  Date: string;
  Day: string;
  Address: string;
  State: string;
  Geocache: string;
  'Contact Person': string;
  'Contact Person Email': string;
  'Contact Person Phone Number': string;
  Status: string;
  Notes: string;
  'Assignment Table': unknown[];
  'Post-Shift Reflection': unknown[];
  Galleries: string;
  Media: unknown[];
  'Storytellers (from Media)': unknown[];
  Latitude: number;
  Longtitude: number;
  Stories: unknown[];
}

export interface AirtableManualTag {
  id: string;
  'Tag Name': string;
}

export interface AirtableComment {
  id: string;
  Comment: string;
  Storyteller: unknown[];
  'Unique Storyteller ID (from Storyteller) 2': unknown[];
  Date: string;
  'Admin Response': string;
  'Resolved Status': string;
  'Unique Storyteller ID (from Storyteller)': string;
}

export interface AirtableContact {
  id: string;
  Name: string;
  Email: string;
  Assignee: string;
  Status: string;
  Comment: string;
}

export interface AirtableUser {
  id: string;
  Name: string;
  Email: string;
  Avatar: unknown[];
  'Created time': string;
  Storytellers: unknown[];
  Bio: string;
  Phone: string;
  Location: string;
  Website: string;
  'Assignment Table': unknown[];
  'Post-Shift Reflection': unknown[];
  Select: string;
}

export interface AirtableAssignmentTable {
  id: string;
  'Assignment ID': number;
  Shifts: unknown[];
  'State (from Shifts)': unknown[];
  'Address (from Shifts) 2': unknown[];
  'Photographer Status': string;
  Photographer: unknown[];
  Notes: string;
  'Date (from Shifts)': unknown[];
  'Address (from Shifts)': unknown[];
  'Contact Person (from Shifts)': unknown[];
  'Day Rollup (from Shifts)': unknown;
}

export interface AirtablePostShiftReflection {
  id: string;
  Name: number;
  Assignee: unknown[];
  Rating: string;
  Shifts: unknown[];
  'Reflection video': unknown[];
  'Reflection Transcript': string;
  'Photographer themes': unknown[];
  Created: string;
  Notes: string;
  'Webhook Sent': boolean;
  Media: unknown[];
}

export interface AirtablePhotographerTheme {
  id: string;
  'Photographer Theme Name': string;
  Description: string;
  'Post-Shift Reflection': unknown[];
}

export interface AirtableForm {
  id: string;
  Name: string;
  Status: string;
  Attachments: unknown[];
  Image: unknown[];
}

export interface AirtableEmpathyJournal {
  id: string;
  'Entry Title': string;
  Content: string;
  'Date Created': string;
  Author: string;
  Category: string;
  'Word Count': number;
}
