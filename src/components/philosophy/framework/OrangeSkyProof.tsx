import React from 'react';
import Image from 'next/image';
import { StorytellerWithStory } from '@/lib/airtable-wrappers';

interface OrangeSkyProofProps {
  heroes: StorytellerWithStory[];
}

export const OrangeSkyProof: React.FC<OrangeSkyProofProps> = ({ heroes }) => (
  <section className="w-full max-w-6xl mx-auto py-8 px-4">
    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-900">
      Orange Sky: Living Proof of Narrative Sovereignty
    </h3>
    <div className="grid grid-cols-1 gap-6 mb-8">
      {heroes.map(h => (
        <div
          key={h.id}
          className="w-full bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col h-full min-h-[520px]"
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold mb-3 bg-gray-200 overflow-hidden`}
          >
            {Array.isArray(h['File Profile Image']) && (h['File Profile Image'][0] as { url?: string })?.url ? (
              <Image
                src={(h['File Profile Image'][0] as { url: string }).url}
                alt={h['Name']}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-white">{h['Name']?.[0]}</span>
            )}
          </div>
          <div className={`text-lg font-bold mb-2`}>{h['Name']}</div>
          <ul className="text-gray-700 text-sm space-y-1 text-center mb-3">
            {Array.isArray(h['Summary (from Media)'])
              ? (h['Summary (from Media)'] as string[]).map((line, i) => <li key={i}>{line}</li>)
              : h['Summary (from Media)'] && <li>{h['Summary (from Media)']}</li>}
          </ul>
          {/* Video Embed */}
          {h.story && h.story['Video Embed Code'] && (
            <div className="w-full aspect-[16/9] overflow-hidden rounded-lg mx-auto mt-2 mb-2 bg-black relative">
              <div
                className="absolute inset-0 w-full h-full"
                style={{ width: '100%', height: '100%' }}
                dangerouslySetInnerHTML={{
                  __html: h.story['Video Embed Code']
                    // Make iframes/videos responsive
                    .replace(/<iframe /g, '<iframe style="width:100%;height:100%;" ')
                    .replace(/<video /g, '<video style="width:100%;height:100%;" '),
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="max-w-2xl mx-auto bg-green-50 border-2 border-green-300 rounded-xl shadow-md p-6 flex flex-col items-center">
      <div className="text-xl font-bold text-green-700 mb-2">The Multiplier Effect</div>
      {/* Ripple circles */}
      <div className="relative w-40 h-40 mb-4 flex items-center justify-center">
        <span className="absolute w-40 h-40 rounded-full bg-green-300 opacity-10"></span>
        <span className="absolute w-32 h-32 rounded-full bg-green-300 opacity-20"></span>
        <span className="absolute w-24 h-24 rounded-full bg-green-300 opacity-40"></span>
        <span className="absolute w-16 h-16 rounded-full bg-green-500 opacity-80 flex items-center justify-center text-white font-bold text-lg">
          Story
        </span>
      </div>
      <ul className="text-green-800 text-sm space-y-1 text-center">
        <li>• Policy changes affecting 10,000+ people</li>
        <li>• Educational materials reaching 500+ workers</li>
        <li>• Peer support networks touching 200+ lives</li>
      </ul>
    </div>
  </section>
);
