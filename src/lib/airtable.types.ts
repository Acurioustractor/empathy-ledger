// TypeScript interfaces for all Airtable tables

import type { Collaborator, Attachment } from 'airtable';

// Storytellers Table
export interface Storyteller {
  [key: string]: string | number | boolean | readonly string[] | Collaborator | readonly Collaborator[] | readonly Attachment[] | undefined;
  id: string;
  name?: string;
  summaryFromMedia?: string[];
  themesFromMedia?: string[];
  descriptionFromThemesFromMedia?: string[];
  quotesFromMedia?: string[];
  themeFromQuotesFromMedia?: string[];
  transcriptFromMedia?: string[];
  project?: string;
  projectFromMedia?: string[];
  fileProfileImage?: string[];
  location?: string;
  role?: string;
  organisation?: string;
  done?: boolean;
  media?: string[];
  secureContactEmail?: string;
  preferences?: string;
  createdAt?: string;
  filePathUrlFromMedia?: string[];
  magicLinkUrl?: string;
  userRole?: string;
  uniqueStorytellerId?: string;
  consentStatus?: string;
  preferredAnonymityLevel?: string;
  lastUpdatedByStoryteller?: string;
  preferredName?: string;
  phoneNumber?: string;
  comments?: string[];
  consentFormPhoto?: string[];
  signature?: string[];
  locationRollupFromMedia?: string[];
  tag?: string;
  videoDraftLinkRollupFromMedia?: string[];
  created?: string;
  videoDraftLinkFromMedia?: string[];
  rawVideoAndPhotoUrl?: string;
  userWhoAddedStory?: string[];
  videoDraftLinkFromMedia2?: string[];
  galleriesFromMedia?: string[];
  linkFromGalleriesFromMedia?: string[];
  storiesFromMedia?: string[];
  shiftsFromMedia?: string[];
  bio?: string;
  website?: string;
  stories?: string[];
  quotes?: string[];
  shifts?: string[];
}

// Media Table
export interface Media {
  [key: string]: string | number | boolean | readonly string[] | Collaborator | readonly Collaborator[] | readonly Attachment[] | undefined;
  id: string;
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  storyteller?: string;
  comments?: string[];
  fileName?: string;
  storytellers?: string[];
  transcript?: string;
  summary?: string;
  themes?: string[];
  descriptionFromThemes?: string[];
  quotes?: string[];
  themeFromQuotes?: string[];
  location?: string;
  project?: string;
  shifts?: string[];
  videoDraftLink?: string;
  createdAt?: string;
  processed?: boolean;
  galleries?: string[];
  audio?: string[];
  stories?: string[];
  dropbox?: string;
  fileProfileImageFromStorytellers?: string[];
  linkFromGalleries?: string[];
  postShiftReflection?: string[];
  assigneeFromPostShiftReflection?: string[];
  reflectionTranscriptFromPostShiftReflection?: string[];
}

// Themes Table
export interface Theme {
  [key: string]: string | number | boolean | readonly string[] | Collaborator | readonly Collaborator[] | readonly Attachment[] | undefined;
  id: string;
  name?: string;
  description?: string;
  stories?: string[];
  quotes?: string[];
  shifts?: string[];
  comments?: string[];
  themeName?: string;
  storytellersRollupFromRelatedMedia?: string[];
  relatedMedia?: string[];
  quotesFromRelatedMedia?: string[];
}

// Quotes Table
export interface Quote {
  [key: string]: string | number | boolean | readonly string[] | Collaborator | readonly Collaborator[] | readonly Attachment[] | undefined;
  id: string;
  text?: string;
  author?: string;
  story?: string;
  storyteller?: string;
  comments?: string[];
  quoteText?: string;
  transcriptReference?: string[];
  theme?: string;
}

// Galleries Table
export interface Gallery {
  [key: string]: string | number | boolean | readonly string[] | Collaborator | readonly Collaborator[] | readonly Attachment[] | undefined;
  id: string;
  name?: string;
  description?: string;
  comments?: string[];
  galleryName?: string;
  shootDate?: string;
  link?: string;
  galleryType?: string;
  media?: string[];
  storytellersFromMedia?: string[];
  shiftsFromMedia?: string[];
  storiesFromMedia?: string[];
  storytellers?: string[];
}

// Stories Table
export interface Story {
  [key: string]: string | number | boolean | readonly string[] | Collaborator | readonly Collaborator[] | readonly Attachment[] | undefined;
  id: string;
  storyId?: number;
  shiftsFromMedia?: string[];
  shifts?: string[];
  geocacheFromShifts?: string[];
  locationFromMedia?: string[];
  stateFromShifts?: string[];
  storytellersFromMedia?: string[];
  videoEmbedCode?: string;
  title?: string;
  summary?: string;
  content?: string;
  theme?: string;
  storyteller?: string;
  comments?: string[];
  fileProfileImageFromStorytellersFromMedia?: string[];
  media?: string[];
  transcriptFromMedia?: string[];
  watermark?: string;
  permissions?: string;
  storyImage?: string[];
  status?: string;
  created?: string;
  linkFromGalleriesFromMedia?: string[];
  videoStoryLink?: string;
  storyTranscript?: string;
  storyCopy?: string;
  totalUses?: string;
  usageLogs?: string;
  storytellers?: string[];
}

// Shifts Table
export interface Shift {
  [key: string]: string | number | boolean | readonly string[] | Collaborator | readonly Collaborator[] | readonly Attachment[] | undefined;
  id: string;
  name?: string;
  date?: string;
  day?: string;
  address?: string;
  state?: string;
  geocache?: string;
  contactPerson?: string;
  contactPersonEmail?: string;
  contactPersonPhoneNumber?: string;
  status?: string;
  notes?: string;
  assignmentTable?: string[];
  postShiftReflection?: string[];
  galleries?: string[];
  media?: string[];
  storytellersFromMedia?: string[];
  latitude?: number;
  longtitude?: number;
  stories?: string[];
  storyteller?: string;
  theme?: string;
  comments?: string[];
}

// Manual Tags Table
export interface ManualTag {
  id: string;
  tagName?: string;
}

// Comments Table
export interface Comment {
  [key: string]: string | number | readonly string[] | undefined;
  id: string;
  comment?: string;
  text?: string;
  author?: string;
  relatedRecord?: string;
  storyteller?: string[];
  uniqueStorytellerIdFromStoryteller2?: string[];
  date?: string;
  adminResponse?: string;
  resolvedStatus?: string;
  uniqueStorytellerIdFromStoryteller?: string;
  createdTime?: string;
}

// Contact Table
export interface Contact {
  id: string;
  name?: string;
  email?: string;
  assignee?: string;
  status?: string;
  comment?: string;
}

// Users Table
export interface User {
  [key: string]: string | number | boolean | readonly string[] | Collaborator | readonly Collaborator[] | readonly Attachment[] | undefined;
  id: string;
  name?: string;
  email?: string;
  avatar?: string[];
  createdTime?: string;
  storytellers?: string[];
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  assignmentTable?: string[];
  postShiftReflection?: string[];
  select?: string;
}

// Assignment Table
export interface Assignment {
  id: string;
  assignmentId?: number;
  shifts?: string[];
  stateFromShifts?: string[];
  addressFromShifts2?: string[];
  photographerStatus?: string;
  photographer?: string[];
  notes?: string;
  dateFromShifts?: string[];
  addressFromShifts?: string[];
  contactPersonFromShifts?: string[];
  dayRollupFromShifts?: string[];
}

// Post-Shift Reflection Table
export interface PostShiftReflection {
  id: string;
  name?: number;
  assignee?: string[];
  rating?: string;
  shifts?: string[];
  reflectionVideo?: string[];
  reflectionTranscript?: string;
  photographerThemes?: string[];
  created?: string;
  notes?: string;
  webhookSent?: boolean;
  media?: string[];
}

// Photographer Themes Table
export interface PhotographerTheme {
  id: string;
  photographerThemeName?: string;
  description?: string;
  postShiftReflection?: string[];
}

// Forms Table
export interface Form {
  id: string;
  name?: string;
  status?: string;
  attachments?: string[];
  image?: string[];
}

// Empathy Journal Table
export interface EmpathyJournal {
  id: string;
  entryTitle?: string;
  content?: string;
  dateCreated?: string;
  author?: string;
  category?: string;
  wordCount?: number;
}
