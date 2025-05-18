import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
// import { Storyteller, Theme, VisualQuote } from './StorytellerLegend'; // Not strictly needed for this V5 static test

interface NodeDatum {
  id: string;
  label: string;
  type: 'theme' | 'storyteller';
  color: string;
  fx?: number;
  fy?: number;
  x?: number;
  y?: number;
}

interface LinkDatum {
  source: string;
  target: string;
}

interface ConstellationCanvasProps {
  activeStoryteller: {
    id: string;
    name: string;
    color?: string;
    themes?: string[] | { id: string }[];
  } | null;
  allThemes: { id: string; name: string; color?: string }[];
}

export const ConstellationCanvas: React.FC<ConstellationCanvasProps> = ({
  activeStoryteller,
  allThemes,
}) => {
  // Responsive SVG size
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // D3 simulation state
  const [nodes, setNodes] = useState<NodeDatum[]>([]);
  const [links, setLinks] = useState<LinkDatum[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Build nodes and links from props
  useEffect(() => {
    if (!activeStoryteller) {
      setNodes([]);
      setLinks([]);
      return;
    }
    // Only show the active storyteller and their actually connected themes
    // Assume activeStoryteller.themes is an array of theme IDs or objects
    const themeIds = (activeStoryteller.themes || []).map((t: string | { id: string }) =>
      typeof t === 'string' ? t : t.id
    );
    const relevantThemes = allThemes.filter(theme => themeIds.includes(theme.id));
    const themeNodes: NodeDatum[] = relevantThemes.map(theme => ({
      id: theme.id,
      label: theme.name,
      type: 'theme',
      color: theme.color || '#38bdf8',
    }));
    const storytellerNode: NodeDatum = {
      id: activeStoryteller.id,
      label: activeStoryteller.name,
      type: 'storyteller',
      color: activeStoryteller.color || '#fbbf24',
      fx: dimensions.width / 2,
      fy: dimensions.height / 2,
    };
    const themeLinks: LinkDatum[] = relevantThemes.map(theme => ({
      source: activeStoryteller.id,
      target: theme.id,
    }));
    setNodes([storytellerNode, ...themeNodes]);
    setLinks(themeLinks);
  }, [allThemes, activeStoryteller, dimensions]);

  // D3 force simulation
  useEffect(() => {
    if (nodes.length === 0) return;
    const sim = d3
      .forceSimulation<NodeDatum>(nodes)
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collision', d3.forceCollide().radius(40))
      .force(
        'link',
        d3
          .forceLink<NodeDatum, LinkDatum>(links)
          .id((d) => d.id)
          .distance(120)
      )
      .stop();
    for (let i = 0; i < 120; ++i) sim.tick();
    setNodes([...(sim.nodes() as NodeDatum[])]);
  }, [nodes.length, links, dimensions, nodes]);

  // Zoom/pan state
  const [viewBox, setViewBox] = useState('0 0 600 400');
  useEffect(() => {
    setViewBox(`0 0 ${dimensions.width} ${dimensions.height}`);
  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[240px] max-h-[60vh] aspect-[3/2]">
      <svg
        width="100%"
        height="100%"
        viewBox={viewBox}
        className="w-full h-full bg-black/80 rounded-lg"
        style={{ touchAction: 'none' }}
      >
        {/* Edges */}
        {links.map((link, i) => {
          const source = nodes.find(n => n.id === link.source);
          const target = nodes.find(n => n.id === link.target);
          if (!source || !target) return null;
          return (
            <line
              key={i}
              x1={source.fx ?? source.x}
              y1={source.fy ?? source.y}
              x2={target.fx ?? target.x}
              y2={target.fy ?? target.y}
              stroke="#38bdf8"
              strokeWidth={
                hoveredNode && (hoveredNode === source.id || hoveredNode === target.id) ? 3 : 1.5
              }
              opacity={
                hoveredNode && hoveredNode !== source.id && hoveredNode !== target.id ? 0.2 : 0.7
              }
            />
          );
        })}
        {/* Nodes */}
        {nodes.map(node => (
          <g
            key={node.id}
            tabIndex={0}
            aria-label={node.label}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onFocus={() => setHoveredNode(node.id)}
            onBlur={() => setHoveredNode(null)}
            style={{ cursor: 'pointer', outline: 'none' }}
          >
            <circle
              cx={node.fx ?? node.x}
              cy={node.fy ?? node.y}
              r={node.type === 'storyteller' ? 32 : 22}
              fill={node.color}
              stroke={hoveredNode === node.id ? '#fff' : '#222'}
              strokeWidth={hoveredNode === node.id ? 4 : 2}
              opacity={hoveredNode && hoveredNode !== node.id ? 0.4 : 1}
            />
            <text
              x={node.fx ?? node.x}
              y={(node.fy ?? node.y ?? 0) + (node.type === 'storyteller' ? 48 : 34)}
              textAnchor="middle"
              fontSize={node.type === 'storyteller' ? 18 : 14}
              fill="#fff"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
