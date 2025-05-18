import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Between Worlds, Beyond Boundaries
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              In the space where your reality meets mine, something transformative emerges—not my
              story, not your story, but a third reality we can only discover together.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophical Foundation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Transcending Traditional Storytelling
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Empathy Ledger isn&apos;t merely a platform—it&apos;s a paradigm shift in how we understand
              narrative power. We&apos;ve created the infrastructure for a continuously evolving
              ecosystem where:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-900 mb-4">Boundaries Dissolve</h3>
                <p className="text-gray-700">
                  Stories transcend their individual containers to reveal deeper connections and
                  collective wisdom.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">
                  Reality Becomes Malleable
                </h3>
                <p className="text-gray-700">
                  Through narrative interaction, our understanding of what&apos;s possible continuously
                  transforms.
                </p>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-pink-900 mb-4">
                  New Possibilities Emerge
                </h3>
                <p className="text-gray-700">
                  From the space between different perspectives, insights previously unimagined come
                  to light.
                </p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                  Value Flows Equitably
                </h3>
                <p className="text-gray-700">
                  Those who share their experiences receive fair recognition and compensation for
                  their contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformative Exchange */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Transformative Narrative Exchange
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Storytellers</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Navigate between different worlds while maintaining narrative sovereignty
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Witness your experience transform through interaction
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Receive equitable recognition through verification
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Organizations</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Access insights beyond traditional knowledge categories
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Build solutions from boundary-crossing perspectives
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Demonstrate ethical commitment through value exchange
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Communities</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Witness the dissolution of artificial divisions
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Participate in collective meaning-making
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    Experience transformative boundary-crossing narratives
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Core Principles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-indigo-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Boundary Transcendence</h3>
                <p className="text-gray-700">
                  The most profound insights emerge from navigating between different worlds and
                  perspectives.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reality Malleability</h3>
                <p className="text-gray-700">
                  Stories don&apos;t merely document reality—they actively reshape our understanding of
                  what&apos;s possible.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-pink-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Continuous Transformation
                </h3>
                <p className="text-gray-700">
                  Narrative exchange is not static documentation but an ongoing process of
                  collective evolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Join the Transformative Exchange</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/stories/new"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                Share Your Reality
              </Link>
              <Link
                href="/stories"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Explore the Between-Space
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
