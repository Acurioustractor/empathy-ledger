import React from 'react';

const actions = [
  {
    number: 1,
    title: 'Recognize Storytellers as Heroes',
    color: 'purple',
    border: 'border-purple-400',
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    heading: 'text-purple-700',
    actions: [
      'Position people as experts in their own experience',
      'Create storyteller advisory councils',
      'Ensure full consent and control mechanisms',
    ],
    systemic: ['Redesign research methodologies', 'Establish equitable partnership frameworks'],
  },
  {
    number: 2,
    title: 'Create Value Exchange Systems',
    color: 'green',
    border: 'border-green-400',
    bg: 'bg-green-50',
    text: 'text-green-900',
    heading: 'text-green-700',
    actions: [
      'Establish transparent compensation models',
      'Track story usage and impact',
      'Return benefits to storytellers',
    ],
    systemic: ['Develop blockchain-based value tracking', 'Create regenerative impact models'],
  },
  {
    number: 3,
    title: 'Build Network Communities',
    color: 'yellow',
    border: 'border-yellow-400',
    bg: 'bg-yellow-50',
    text: 'text-yellow-900',
    heading: 'text-yellow-700',
    actions: [
      'Connect storytellers with each other',
      'Create cross-pollination opportunities',
      'Foster collaborative relationships',
    ],
    systemic: ['Dissolve hierarchical boundaries', 'Enable story cross-referencing and connection'],
  },
];

export const ImplementationFramework: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto py-8">
    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-900">
      Implementation Framework: Three Transformative Actions
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map(a => (
        <div
          key={a.number}
          className={`rounded-xl shadow-md border-2 ${a.border} ${a.bg} p-6 flex flex-col items-start`}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-3 ${a.heading} bg-white border-2 ${a.border}`}
          >
            {a.number}
          </div>
          <h4 className={`text-lg font-bold mb-2 ${a.text}`}>{a.title}</h4>
          <div className={`${a.heading} font-semibold mb-1`}>Immediate Actions:</div>
          <ul className="text-sm mb-2 text-gray-700 list-disc list-inside">
            {a.actions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div className={`${a.heading} font-semibold mb-1`}>Systemic Changes:</div>
          <ul className="text-sm text-gray-700 list-disc list-inside">
            {a.systemic.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
