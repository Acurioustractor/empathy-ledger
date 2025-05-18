import React from 'react';
import { FrameworkHeader } from './framework/FrameworkHeader';
import { ParadigmShift } from './framework/ParadigmShift';
// import { TransformativePrinciples } from './framework/TransformativePrinciples';
// import { OrangeSkyProof } from './framework/OrangeSkyProof';
import { ImplementationFramework } from './framework/ImplementationFramework';
import { RevolutionaryPromise } from './framework/RevolutionaryPromise';
// import { AirtableStoryteller } from '@/lib/airtable-types';

// interface NarrativeSovereigntyFrameworkProps {
//   heroes: AirtableStoryteller[];
// }

// Remove heroes prop, this component is now just the framework
export const NarrativeSovereigntyFramework: React.FC = () => (
  <div className="w-full my-12 space-y-16">
    {/* 1. Header/Title Section */}
    <FrameworkHeader />
    {/* 2. Paradigm Shift Visualization */}
    <ParadigmShift />
    {/* 3. Implementation Framework */}
    <ImplementationFramework />
    {/* 4. Revolutionary Promise */}
    <RevolutionaryPromise />
  </div>
);
