import React from 'react';

export const ParadigmShift: React.FC = () => (
  <section className="w-full max-w-5xl mx-auto py-8">
    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-900">
      The Paradigm Shift: From Mining to Gardening
    </h3>
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      {/* Traditional Extractive Model - Minimal Abstract Version */}
      <div className="flex-1 bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-sm">
        <h4 className="text-xl font-bold text-red-700 mb-2 text-center">
          Traditional Extractive Model
        </h4>
        <div className="flex flex-col items-center mb-4">
          <svg
            width="260"
            height="260"
            viewBox="0 0 260 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top node: Institution (ellipse for better text fit) */}
            <ellipse
              cx="130"
              cy="48"
              rx="60"
              ry="32"
              fill="#fff"
              stroke="#dc2626"
              strokeWidth="2.5"
            />
            <text
              x="130"
              y="56"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
              fill="#dc2626"
              fontFamily="Inter,Arial,sans-serif"
            >
              Institution
            </text>
            {/* Middle row: Subjects */}
            <circle cx="70" cy="120" r="18" fill="#fff" stroke="#fecaca" strokeWidth="2" />
            <text
              x="70"
              y="125"
              textAnchor="middle"
              fontSize="13"
              fill="#dc2626"
              fontFamily="Inter,Arial,sans-serif"
            >
              Subject
            </text>
            <circle cx="130" cy="120" r="18" fill="#fff" stroke="#fecaca" strokeWidth="2" />
            <text
              x="130"
              y="125"
              textAnchor="middle"
              fontSize="13"
              fill="#dc2626"
              fontFamily="Inter,Arial,sans-serif"
            >
              Subject
            </text>
            <circle cx="190" cy="120" r="18" fill="#fff" stroke="#fecaca" strokeWidth="2" />
            <text
              x="190"
              y="125"
              textAnchor="middle"
              fontSize="13"
              fill="#dc2626"
              fontFamily="Inter,Arial,sans-serif"
            >
              Subject
            </text>
            {/* Arrows: Institution to Subjects */}
            <line
              x1="130"
              y1="80"
              x2="70"
              y2="102"
              stroke="#dc2626"
              strokeWidth="1.5"
              markerEnd="url(#arrowr)"
            />
            <line
              x1="130"
              y1="80"
              x2="130"
              y2="102"
              stroke="#dc2626"
              strokeWidth="1.5"
              markerEnd="url(#arrowr)"
            />
            <line
              x1="130"
              y1="80"
              x2="190"
              y2="102"
              stroke="#dc2626"
              strokeWidth="1.5"
              markerEnd="url(#arrowr)"
            />
            {/* Bottom: Repository */}
            <rect
              x="90"
              y="190"
              width="80"
              height="32"
              rx="8"
              fill="#fff"
              stroke="#a3a3a3"
              strokeWidth="2"
            />
            <text
              x="130"
              y="211"
              textAnchor="middle"
              fontSize="15"
              fontWeight="bold"
              fill="#a3a3a3"
              fontFamily="Inter,Arial,sans-serif"
            >
              Repository
            </text>
            {/* Arrows: Subjects to Repository */}
            <line
              x1="70"
              y1="138"
              x2="110"
              y2="190"
              stroke="#a3a3a3"
              strokeWidth="1.5"
              markerEnd="url(#arrowgray)"
            />
            <line
              x1="130"
              y1="138"
              x2="130"
              y2="190"
              stroke="#a3a3a3"
              strokeWidth="1.5"
              markerEnd="url(#arrowgray)"
            />
            <line
              x1="190"
              y1="138"
              x2="150"
              y2="190"
              stroke="#a3a3a3"
              strokeWidth="1.5"
              markerEnd="url(#arrowgray)"
            />
            <defs>
              <marker
                id="arrowr"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L7,3.5 L0,7 Q1.5,3.5 0,0" fill="#dc2626" />
              </marker>
              <marker
                id="arrowgray"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L7,3.5 L0,7 Q1.5,3.5 0,0" fill="#a3a3a3" />
              </marker>
            </defs>
          </svg>
        </div>
        <ul className="text-red-800 text-sm space-y-1">
          <li>• Stories extracted, processed, institutionalized</li>
          <li>• Value flows upward only</li>
          <li>• Storytellers remain invisible</li>
        </ul>
      </div>
      {/* Transformation Arrow */}
      <div className="hidden md:flex flex-col items-center justify-center">
        <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              d="M8 5l8 7-8 7"
              stroke="#22a844"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-green-700 font-bold">TRANSFORMATION</span>
      </div>
      {/* Transformative Exchange Model - Minimal Abstract Version */}
      <div className="flex-1 bg-green-50 border-2 border-green-200 rounded-xl p-6 shadow-sm">
        <h4 className="text-xl font-bold text-green-700 mb-2 text-center">
          Transformative Exchange Model
        </h4>
        <div className="flex flex-col items-center mb-4">
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft background circle */}
            <circle cx="150" cy="150" r="110" fill="#bbf7d0" opacity="0.18" />
            {/* Center node: Hero */}
            <circle cx="150" cy="150" r="36" fill="#22a844" />
            <text
              x="150"
              y="158"
              textAnchor="middle"
              fontSize="19"
              fontWeight="bold"
              fill="#fff"
              fontFamily="Inter,Arial,sans-serif"
            >
              Hero
            </text>
            {/* Outer nodes: 7 evenly spaced, all labeled, ellipses wide enough for text */}
            {[
              { label: 'Community', angle: -90, rx: 38 },
              { label: 'Policy', angle: -38, rx: 30 },
              { label: 'Education', angle: 0, rx: 38 },
              { label: 'Peers', angle: 38, rx: 30 },
              { label: 'Organizations', angle: 90, rx: 48 },
              { label: 'Media', angle: 142, rx: 30 },
              { label: 'Research', angle: 180, rx: 38 },
            ].map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = 150 + 95 * Math.cos(rad);
              const y = 150 + 95 * Math.sin(rad);
              return (
                <g key={i}>
                  {/* Single line, arrowheads at both ends */}
                  <line
                    x1={150}
                    y1={150}
                    x2={x}
                    y2={y}
                    stroke="#22a844"
                    strokeWidth="1.5"
                    markerEnd="url(#arrowg)"
                    markerStart="url(#arrowg)"
                  />
                  {/* Outer node */}
                  <ellipse
                    cx={x}
                    cy={y}
                    rx={node.rx}
                    ry="16"
                    fill="#fff"
                    stroke="#22a844"
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={y + 5}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#166534"
                    fontFamily="Inter,Arial,sans-serif"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
            <defs>
              <marker
                id="arrowg"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L7,3.5 L0,7 Q1.5,3.5 0,0" fill="#22a844" />
              </marker>
            </defs>
          </svg>
        </div>
        <ul className="text-green-800 text-sm space-y-1">
          <li>• Stories create regenerative value</li>
          <li>• Multidirectional flow benefits all</li>
          <li>• Storytellers recognized as experts</li>
        </ul>
      </div>
    </div>
    {/* Mobile transformation arrow */}
    <div className="flex md:hidden items-center justify-center my-4">
      <div className="bg-green-400 rounded-full w-12 h-12 flex items-center justify-center">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path
            d="M8 5l8 7-8 7"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-green-700 font-bold ml-2">TRANSFORMATION</span>
    </div>
  </section>
);
