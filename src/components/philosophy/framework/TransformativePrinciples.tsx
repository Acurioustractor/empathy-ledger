import React from 'react';

const principles = [
  {
    color: 'yellow',
    number: 1,
    title: 'From Subjects to Sovereigns',
    description: 'People move from being studied to being collaborators and change agents.',
    example: 'Zero becomes a housing policy consultant',
    border: 'border-yellow-400',
    bg: 'bg-yellow-50',
    circle: 'bg-yellow-400 text-white',
    text: 'text-yellow-900',
    exampleText: 'text-yellow-700 font-semibold',
  },
  {
    color: 'cyan',
    number: 2,
    title: 'From Extraction to Exchange',
    description: 'Value flows back to storytellers, creating sustainable benefit cycles.',
    example: "Robyn's leadership transforms entire teams",
    border: 'border-cyan-400',
    bg: 'bg-cyan-50',
    circle: 'bg-cyan-400 text-white',
    text: 'text-cyan-900',
    exampleText: 'text-cyan-700 font-semibold',
  },
  {
    color: 'purple',
    number: 3,
    title: 'From Hierarchy to Network',
    description: 'Rigid boundaries dissolve into dynamic, collaborative relationships.',
    example: 'Volunteers and friends become equals',
    border: 'border-purple-400',
    bg: 'bg-purple-50',
    circle: 'bg-purple-400 text-white',
    text: 'text-purple-900',
    exampleText: 'text-purple-700 font-semibold',
  },
  {
    color: 'red',
    number: 4,
    title: 'Regenerative Impact',
    description: 'Stories create ongoing value that grows with each connection.',
    example: "Felicity's bridge-building multiplies",
    border: 'border-red-400',
    bg: 'bg-red-50',
    circle: 'bg-red-400 text-white',
    text: 'text-red-900',
    exampleText: 'text-red-700 font-semibold',
  },
];

export const TransformativePrinciples: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto py-8">
    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-900">
      Four Transformative Principles
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {principles.map(p => (
        <div
          key={p.number}
          className={`rounded-xl shadow-md border-2 ${p.border} ${p.bg} p-6 flex flex-col items-start`}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-3 ${p.circle}`}
          >
            {p.number}
          </div>
          <h4 className={`text-lg font-bold mb-2 ${p.text}`}>{p.title}</h4>
          <p className="text-sm mb-2 text-gray-700">{p.description}</p>
          <div className={p.exampleText}>Example: {p.example}</div>
        </div>
      ))}
    </div>
  </section>
);
