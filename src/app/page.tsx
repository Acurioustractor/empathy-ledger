import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const Home = () => {
  return (
    <Layout>
      <div className="container py-12">
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Empathy Ledger
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A platform for ethical storytelling and value exchange, where every story matters and every voice is valued.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">
            For Everyone
          </h2>
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
          <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900">
            Core Principles
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card variant="outlined">
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Dignity-Centered Design</h3>
                <p className="text-gray-600">
                  Every interaction and feature is designed with respect for human dignity at its core.
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

        <section className="text-center">
          <h2 className="mb-4 text-3xl font-semibold text-gray-900">
            Ready to Join?
          </h2>
          <p className="mb-8 text-gray-600">
            Become part of a community that values ethical storytelling and meaningful connections.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" size="lg" href="/signup">
              Get Started
            </Button>
            <Button variant="outline" size="lg" href="/about">
              Learn More
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home; 