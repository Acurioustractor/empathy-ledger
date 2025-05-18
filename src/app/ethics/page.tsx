import React from 'react';
import Link from 'next/link';

export default function EthicsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      <article className="prose lg:prose-xl max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
          Our Ethical Framework
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          At Empathy Ledger, ethics are not an afterthought; they are woven into the very fabric of
          our platform. Our commitment is to create a safe, respectful, and empowering space for
          every individual who shares their narrative and for every member of our community who
          engages with these stories.
        </p>

        {/* Placeholder - Pull more detailed content from Ethical Framework.md */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Key Principles</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">Storyteller Agency & Consent:</span> Storytellers have
              full control over their narratives, including how they are shared, attributed, and
              utilized. Informed consent is paramount at every stage.
            </li>
            <li>
              <span className="font-semibold">Dignity & Respect:</span> We uphold the dignity of all
              individuals. Content that promotes hate speech, discrimination, or harassment is
              strictly prohibited.
            </li>
            <li>
              <span className="font-semibold">Privacy & Data Protection:</span> We are committed to
              protecting the privacy of our users and storytellers. Data handling practices will be
              transparent and adhere to the highest security standards.
            </li>
            <li>
              <span className="font-semibold">Fair Value Exchange:</span> We are developing systems
              to ensure that storytellers are fairly recognized and, where applicable, compensated
              for the value their narratives generate.
            </li>
            <li>
              <span className="font-semibold">Transparency:</span> Our processes, from story
              submission to impact measurement and value distribution, will be as transparent as
              possible.
            </li>
            <li>
              <span className="font-semibold">Trauma-Informed Approach:</span> We recognize that
              sharing personal stories can be a vulnerable act. Our platform and community
              guidelines are designed with a trauma-informed perspective.
            </li>
            <li>
              <span className="font-semibold">Community Moderation & Safety:</span> We will
              implement robust community guidelines and moderation practices to foster a safe and
              supportive environment.
            </li>
            <li>
              <span className="font-semibold">Accessibility:</span> We strive to make our platform
              accessible to people of all abilities.
            </li>
          </ul>
          <p className="mt-6 text-gray-600">
            <em>
              (This is a summary. Our full Ethical Framework document provides more comprehensive
              details on each of these principles and our governance model. This content will be
              populated from your <code>Ethical Framework.md</code>)
            </em>
          </p>
        </section>

        <div className="text-center mt-16">
          <Link href="/about" className="text-indigo-600 hover:text-indigo-800 font-semibold">
            &larr; Back to About Us
          </Link>
        </div>
      </article>
    </div>
  );
}
