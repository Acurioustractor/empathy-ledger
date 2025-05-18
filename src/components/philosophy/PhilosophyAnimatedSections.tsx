'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MethodologyDiagram } from '@/components/philosophy/MethodologyDiagram';
import { NarrativeSovereigntyFramework } from '@/components/philosophy/NarrativeSovereigntyFramework';
import { AirtableStoryteller } from '@/lib/airtable-types';
import { OrangeSkyProof } from '@/components/philosophy/framework/OrangeSkyProof';
import { TransformativePrinciples } from '@/components/philosophy/framework/TransformativePrinciples';
import { ExploreStoriesSection } from './framework/ExploreStoriesSection';

interface PhilosophyAnimatedSectionsProps {
  heroes: AirtableStoryteller[];
}

export function PhilosophyAnimatedSections({ heroes }: PhilosophyAnimatedSectionsProps) {
  return (
    <>
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8 text-center text-indigo-700 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Philosophy
      </motion.h1>
      <motion.div
        className="relative mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-rose-50 opacity-30 rounded-3xl"></div>
        <blockquote className="relative z-10 text-xl md:text-2xl italic text-gray-700 text-center max-w-4xl mx-auto px-8 py-12">
          &quot;In the liminal space where narratives intersect, reality itself becomes
          malleable—continuously transforming through each new connection. Empathy Ledger creates
          not merely a platform, but a living ecosystem where stories transcend their boundaries to
          reveal previously unimagined possibilities.&quot;
        </blockquote>
      </motion.div>
      <section className="space-y-24">
        {/* Paradigm Comparison Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
              Reimagining Impact Paradigms
            </h2>
            <p className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto mb-16">
              From extraction to exchange, we&apos;re transforming how stories shape our understanding of
              human experience.
            </p>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Traditional Research Panel */}
              <motion.div
                className="relative group"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold text-blue-900">
                      Traditional Impact Methodology
                    </h3>
                    <p className="text-blue-600/80 italic">
                      Extractive, Hierarchical, Institution-Centered Approach
                    </p>
                  </div>
                  <MethodologyDiagram variant="traditional" />
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 text-xl">•</span>
                      <div>
                        <span className="font-semibold block">Hierarchical Structure:</span>
                        <span className="text-sm">
                          Information flows in one direction from researcher to subjects
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 text-xl">•</span>
                      <div>
                        <span className="font-semibold block">Subjects as Data:</span>
                        <span className="text-sm">
                          People become data points in larger institutional studies
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 text-xl">•</span>
                      <div>
                        <span className="font-semibold block">Value Extraction:</span>
                        <span className="text-sm">
                          Benefits accumulate primarily at institutional level
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
              {/* Transformative Exchange Panel */}
              <motion.div
                className="relative group"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-100 p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold text-rose-900">
                      Transformative Exchange Methodology
                    </h3>
                    <p className="text-rose-600/80 italic">
                      Reciprocal, Networked, Storyteller-Centered Approach
                    </p>
                  </div>
                  <MethodologyDiagram variant="transformative" />
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <span className="text-rose-500 text-xl">•</span>
                      <div>
                        <span className="font-semibold block">Network Ecosystem:</span>
                        <span className="text-sm">
                          Information flows through dynamic, living relationships
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-rose-500 text-xl">•</span>
                      <div>
                        <span className="font-semibold block">Storyteller Sovereignty:</span>
                        <span className="text-sm">
                          People maintain control over their narratives
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-rose-500 text-xl">•</span>
                      <div>
                        <span className="font-semibold block">Value Reciprocity:</span>
                        <span className="text-sm">
                          Benefits flow to all participants in the ecosystem
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="mt-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <blockquote className="text-center">
                <p className="text-xl md:text-2xl italic text-gray-700 mb-4">
                  &quot;Every element of this visualization whispers the same truth: that meaningful
                  research is not about extracting value from communities, but about cultivating
                  gardens where wisdom grows collectively.&quot;
                </p>
                <footer className="text-gray-500">— Core Design Philosophy</footer>
              </blockquote>
            </motion.div>
          </div>
        </motion.div>
        {/* Core Principles Section */}
        <motion.section
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 to-rose-50/30 rounded-3xl"></div>
          <div className="relative z-10 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Core Philosophical Principles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-6 text-gray-700">
                {[
                  {
                    title: 'Boundary Transcendence',
                    description:
                      'The most profound insights emerge from navigating between different worlds and perspectives.',
                  },
                  {
                    title: 'Reality Malleability',
                    description: "Stories actively reshape our understanding of what&apos;s possible.",
                  },
                  {
                    title: 'Continuous Transformation',
                    description:
                      'Narrative exchange is an ongoing process of collective evolution.',
                  },
                ].map((principle, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{principle.title}</h3>
                      <p className="text-sm leading-relaxed">{principle.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
              <ul className="space-y-6 text-gray-700">
                {[
                  {
                    title: 'Dignified Narrative Exchange',
                    description:
                      'Transforming storytelling from extractive to reciprocal relationships.',
                  },
                  {
                    title: 'Value Recognition & Reciprocity',
                    description: 'Ensuring fair compensation and benefit distribution.',
                  },
                  {
                    title: 'Empathetic Bridge Building',
                    description:
                      'Creating pathways for authentic connection between diverse experiences.',
                  },
                ].map((principle, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                      <span className="text-rose-600">{i + 4}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{principle.title}</h3>
                      <p className="text-sm leading-relaxed">{principle.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
        {/* Four Transformative Principles */}
        <motion.section
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 to-rose-50/30 rounded-3xl"></div>
          <div className="relative z-10 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Four Transformative Principles
            </h2>
            <TransformativePrinciples />
          </div>
        </motion.section>
        {/* People section: Orange Sky Proof */}
        <OrangeSkyProof heroes={heroes} />
        {/* Narrative Sovereignty Framework (framework/diagram only) */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Narrative Sovereignty Framework
          </h2>
          <NarrativeSovereigntyFramework />
        </div>
        <div className="my-16">
          <ExploreStoriesSection heroes={heroes} />
        </div>
      </section>
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <Link
          href="/about"
          className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
        >
          <span>←</span>
          <span>Back to About Us</span>
        </Link>
      </motion.div>
    </>
  );
}
