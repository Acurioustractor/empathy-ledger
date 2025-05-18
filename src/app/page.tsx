import React from 'react';
import Link from 'next/link';
// import Layout from '@/components/layout/Layout'; // Removed Layout import
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { fetchRecords } from '@/lib/airtable.utils'; // Use the main fetchRecords
import {
  AirtableStory,
  AirtableStoryteller,
  AirtableQuote,
  AirtableShift,
} from '@/lib/airtable-types';
import { AIRTABLE_TABLES } from '@/lib/airtable-tables';
// import StoryCard from '@/components/stories/StoryCard'; // Comment out or remove old StoryCard import
import FeaturedStoryCard from '@/components/stories/FeaturedStoryCard'; // Import the new card
import { StoryWithDetails } from '@/lib/airtable-wrappers';

export default async function Home() {
  let featuredStories: StoryWithDetails[] = [];
  try {
    const { records: storiesData } = await fetchRecords<AirtableStory>(AIRTABLE_TABLES.STORIES, {
      pageSize: 4,
      sortBy: 'Created',
      sortDirection: 'desc',
      // fields: ['Title', 'Story copy', /* ...OTHER FIELDS... */] // <--- TEMPORARILY COMMENT OUT/REMOVE THIS LINE FOR DEBUGGING
    });

    let enrichedStories: StoryWithDetails[] = storiesData;

    const storytellerIds = Array.from(
      new Set(
        storiesData
          .flatMap(story => story.Storytellers || story['Storytellers (from Media)'] || [])
          .filter(id => id)
      )
    );

    if (storytellerIds.length > 0) {
      const storytellerFormula = `OR(${storytellerIds.map(id => `RECORD_ID()='${id}'`).join(',')})`;
      const { records: storytellers } = await fetchRecords<AirtableStoryteller>(
        AIRTABLE_TABLES.STORYTELLERS,
        {
          filterByFormula: storytellerFormula,
          fields: ['Name'],
        }
      );
      const storytellerMap = new Map(storytellers.map(st => [st.id, st.Name]));
      enrichedStories = enrichedStories.map(story => {
        const storytellerId = (story.Storytellers || story['Storytellers (from Media)'] || [])[0];
        const idStr = typeof storytellerId === 'string' ? storytellerId : '';
        return {
          ...story,
          storytellerName: storytellerMap.get(idStr) || 'Unknown',
        };
      });
    }

    // Fetch Quote Texts
    const quoteIdsToFetch = Array.from(
      new Set(
        enrichedStories.flatMap(story => story['Quotes Rollup (from Media)'] || []).filter(id => id) // Filter out any null/undefined IDs
      )
    );

    if (quoteIdsToFetch.length > 0) {
      const quoteFormula = `OR(${quoteIdsToFetch.map(id => `RECORD_ID()='${id}'`).join(',')})`;
      const { records: quotes } = await fetchRecords<AirtableQuote>(AIRTABLE_TABLES.QUOTES, {
        // Assuming your quotes table is named QUOTES
        filterByFormula: quoteFormula,
        fields: ['Quote Text'],
      });
      const quoteMap = new Map(quotes.map(q => [q.id, q['Quote Text']])); // Assuming the field is "Quote Text"

      enrichedStories = enrichedStories.map(story => {
        const firstQuoteId = (story['Quotes Rollup (from Media)'] || [])[0];
        return {
          ...story,
          displayQuoteText: firstQuoteId ? quoteMap.get(firstQuoteId) : undefined,
        };
      });
    }

    // Fetch Shift Names for Homepage Cards
    const shiftIds = Array.from(
      new Set(
        enrichedStories.flatMap(story => story['Shifts (from Storytellers)'] || []).filter(id => id)
      )
    );
    if (shiftIds.length > 0) {
      const shiftFormula = `OR(${shiftIds.map(id => `RECORD_ID()='${id}'`).join(',')})`;
      const { records: shifts } = await fetchRecords<AirtableShift>(AIRTABLE_TABLES.SHIFTS, {
        filterByFormula: shiftFormula,
        fields: ['Name'],
      });
      const shiftMap = new Map(shifts.map(sh => [sh.id, sh.Name]));
      enrichedStories = enrichedStories.map(story => ({
        ...story,
        displayShiftName: shiftMap.get((story['Shifts (from Storytellers)'] || [])[0]),
      }));
    }

    featuredStories = enrichedStories;
  } catch (error) {
    console.error('Error fetching featured stories or related data for homepage:', error);
  }

  return (
    <div className="min-h-screen">
      {/* About Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base">Discover the power of frontline stories</p>
            <Link
              href="/about"
              className="text-sm md:text-base font-medium hover:text-indigo-200 transition-colors flex items-center"
            >
              Learn More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to Empathy Ledger
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A platform for frontline workers to share their stories, experiences, and insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/stories"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Explore Stories
              </Link>
              <Link
                href="/stories/new"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Share Your Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Stories Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.map(story => (
              <FeaturedStoryCard key={story.id} story={story} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/stories"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              View All Stories
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <section className="text-center py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Empathy Ledger</h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto px-4">
            What if every story could reshape our world? At Empathy Ledger, we connect narratives to
            impact, dignity to voice.
          </p>
          <Button
            href="/stories"
            size="lg"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            Explore Stories
          </Button>
        </section>

        {/* "Why We Exist" Section - NEW */}
        <section className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-6">The Heart of Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4">
            Empathy Ledger transcends conventional storytelling by reimagining the relationship
            between storytellers, audiences, and impact. We envision a world where marginalized
            voices are not merely heard but valued—where personal narratives drive measurable social
            change while ensuring those who share their stories receive ongoing recognition,
            compensation, and dignity.
          </p>
          <Link href="/about" className="text-indigo-600 hover:text-indigo-800 font-semibold">
            Learn More About Our Vision &rarr;
          </Link>
        </section>

        {featuredStories.length > 0 && (
          <section className="py-16 bg-gray-50 rounded-lg shadow-lg my-16">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-4">
              {featuredStories.slice(0, 4).map(story => (
                <FeaturedStoryCard key={story.id} story={story} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                href="/stories"
                variant="secondary"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                View All Stories
              </Button>
            </div>
          </section>
        )}

        <section className="mb-16 text-center">
          <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">For Everyone</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Storytellers</h3>
                <p className="mb-4 text-gray-600">
                  Share your experiences and insights while maintaining control over your narrative.
                </p>
                <Button variant="outline" size="sm" href="/stories">
                  Learn More
                </Button>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Audiences</h3>
                <p className="mb-4 text-gray-600">
                  Discover authentic stories and engage with meaningful content.
                </p>
                <Button variant="outline" size="sm" href="/discover">
                  Learn More
                </Button>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Organizations</h3>
                <p className="mb-4 text-gray-600">
                  Access valuable insights while supporting ethical storytelling practices.
                </p>
                <Button variant="outline" size="sm" href="/organizations">
                  Learn More
                </Button>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Administrators</h3>
                <p className="mb-4 text-gray-600">
                  Manage the platform while upholding ethical standards and community guidelines.
                </p>
                <Button variant="outline" size="sm" href="/admin">
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">Core Principles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card variant="outlined">
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Dignity-Centered Design
                </h3>
                <p className="text-gray-600">
                  Every interaction and feature is designed with respect for human dignity at its
                  core.
                </p>
              </div>
            </Card>
            <Card variant="outlined">
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Narrative Agency</h3>
                <p className="text-gray-600">
                  Storytellers maintain full control over their narratives and how they are shared.
                </p>
              </div>
            </Card>
            <Card variant="outlined">
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Ethical Value Exchange</h3>
                <p className="text-gray-600">
                  Fair compensation and transparent value exchange for all participants.
                </p>
              </div>
            </Card>
            <Card variant="outlined">
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Impact Measurement</h3>
                <p className="text-gray-600">
                  Comprehensive tracking of social impact and ethical outcomes.
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section className="text-center py-16 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-lg text-gray-700 mb-10 max-w-xl mx-auto px-4">
            Join a community dedicated to ethical storytelling and driving meaningful change.
          </p>
          <div className="flex justify-center space-x-4">
            <Button href="/stories/new" size="lg" variant="primary">
              Share Your Story
            </Button>
            <Button
              href="/about"
              size="lg"
              variant="secondary"
              className="bg-white text-indigo-700 hover:bg-gray-100 border-indigo-700"
            >
              Learn More About Us
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
