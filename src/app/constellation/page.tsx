'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchRecords } from '@/lib/airtable.utils';
import { AirtableStory, AirtableStoryteller } from '@/lib/airtable-types';
import { AIRTABLE_TABLES } from '@/lib/airtable-tables';
import { StorytellerExplorerView } from '@/components/constellation/thematic/StorytellerExplorerView';

// Define a structure for the data each point holds for the STORY POINT CONSTELLATION
interface ConstellationStoryData {
  id: string;
  title: string;
  fragment: string;
  color: string;
  storytellerName?: string;
}

// --- Core Constellation Logic for STORY POINT CONSTELLATION ---
class StoryPoint {
  x: number;
  y: number;
  radius: number;
  originalRadius: number;
  color: string;
  fragment: string;
  id: string;
  velocity: { x: number; y: number };
  pulsing: { direction: number; factor: number };
  title: string;
  storytellerName?: string;

  constructor(x: number, y: number, radius: number, data: ConstellationStoryData) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.originalRadius = radius;
    this.color = data.color;
    this.fragment = data.fragment;
    this.id = data.id;
    this.title = data.title;
    this.storytellerName = data.storytellerName;
    this.velocity = { x: (Math.random() - 0.5) * 0.2, y: (Math.random() - 0.5) * 0.2 };
    this.pulsing = { direction: 1, factor: Math.random() };
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.pulsing.factor += 0.01 * this.pulsing.direction;
    if (this.pulsing.factor >= 1 || this.pulsing.factor <= 0) this.pulsing.direction *= -1;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) this.velocity.x *= -1;
    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) this.velocity.y *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, glowIntensity: number) {
    const pulseRadius = this.originalRadius + this.pulsing.factor * 1;
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      pulseRadius * 0.5,
      this.x,
      this.y,
      pulseRadius * 4 * glowIntensity
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(this.x, this.y, pulseRadius * 4 * glowIntensity, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

type RouterType = ReturnType<typeof useRouter>;

class ConstellationSystem {
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  config!: {
    particleCount: number;
    connectionThreshold: number;
    transformationThreshold: number;
    evolutionSpeed: number;
    interactionInfluence: number;
    particleMinRadius: number;
    particleMaxRadius: number;
    glowIntensity: number;
    emergentPatternSize: number;
    clickRadius: number;
    [key: string]: unknown; // Allow other options
  };
  storyPoints: StoryPoint[] = [];
  connections: { pointA: StoryPoint; pointB: StoryPoint; strength: number }[] = [];
  mousePosition: { x: number | null; y: number | null } = { x: null, y: null };
  activeStory: StoryPoint | null = null;
  systemAge: number = 0;
  animationFrameId: number | null = null;
  storyFragmentElement: HTMLElement | null = null;
  router!: RouterType;

  constructor(canvasId: string, router: RouterType, options: Partial<ConstellationSystem['config']> = {}) {
    const canvasElement = document.getElementById(canvasId);
    if (canvasElement instanceof HTMLCanvasElement) {
      this.canvas = canvasElement;
      this.ctx = this.canvas.getContext('2d');
    } else {
      console.error(`Element with id '${canvasId}' is not a canvas or not found.`);
      return;
    }

    this.storyFragmentElement = document.getElementById('storyFragment');
    this.router = router;
    this.config = {
      particleCount: 100,
      connectionThreshold: 150,
      transformationThreshold: 0.6,
      evolutionSpeed: 0.005,
      interactionInfluence: 0.5,
      particleMinRadius: 2,
      particleMaxRadius: 5,
      glowIntensity: 0.8,
      emergentPatternSize: 4,
      clickRadius: 20,
      ...options,
    };

    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleCanvasClick = this.handleCanvasClick.bind(this);
    this.animate = this.animate.bind(this);
    this.bindEvents();
    this.resizeCanvas();
  }

  resizeCanvas() {
    if (!this.canvas || !this.canvas.parentElement) return;
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  bindEvents() {
    if (!this.canvas) return;
    window.addEventListener('resize', this.resizeCanvas);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.addEventListener('click', this.handleCanvasClick);
  }

  handleMouseMove(e: MouseEvent) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.mousePosition = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    this.updateActiveStory();
  }

  handleMouseLeave() {
    this.mousePosition = { x: null, y: null };
    this.activeStory = null;
    if (this.storyFragmentElement) this.storyFragmentElement.style.opacity = '0';
  }

  handleCanvasClick(e: MouseEvent) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    let clickedPoint: StoryPoint | null = null;
    let minDistance = this.config.clickRadius;
    this.storyPoints.forEach(point => {
      const distance = this.calculateDistance(point.x, point.y, clickX, clickY);
      if (distance < minDistance) {
        clickedPoint = point;
        minDistance = distance;
      }
    });
    if (clickedPoint) {
      this.router.push(`/stories/${(clickedPoint as StoryPoint).id}`);
    }
  }

  updateActiveStory() {
    let closestPoint: StoryPoint | null = null;
    let minDistance = this.config.connectionThreshold;
    if (this.mousePosition.x !== null && this.mousePosition.y !== null && this.canvas) {
      const { x: mouseX, y: mouseY } = this.mousePosition;
      this.storyPoints.forEach(point => {
        const distance = this.calculateDistance(point.x, point.y, mouseX, mouseY);
        if (distance < minDistance) {
          closestPoint = point;
          minDistance = distance;
        }
      });
    }
    this.activeStory = closestPoint;

    if (this.storyFragmentElement) {
      const currentActiveStory = this.activeStory;
      if (currentActiveStory) {
        const checkedStory = currentActiveStory as StoryPoint;
        const title = checkedStory.title || 'N/A';
        const storytellerNameHTML = checkedStory.storytellerName
          ? `<p class="text-xs text-gray-300 mb-2">By ${checkedStory.storytellerName}</p>`
          : '';
        const fragment = checkedStory.fragment || '...';
        if (this.storyFragmentElement) {
          this.storyFragmentElement.innerHTML = `
            <div class="p-3">
              <h4 class="font-bold text-sm mb-1 text-indigo-200">${title}</h4>
              ${storytellerNameHTML}
              <p class="text-xs italic text-gray-400 line-clamp-3">${fragment}</p>
            </div>
          `;
          this.storyFragmentElement.style.opacity = '1';
          let top = checkedStory.y - this.storyFragmentElement.offsetHeight - 10;
          let left = checkedStory.x - this.storyFragmentElement.offsetWidth / 2;
          if (top < 10) top = checkedStory.y + 20;
          if (left < 10) left = 10;
          if (
            this.canvas &&
            left + this.storyFragmentElement.offsetWidth > this.canvas.width - 10
          ) {
            left = this.canvas.width - this.storyFragmentElement.offsetWidth - 10;
          }
          this.storyFragmentElement.style.left = `${left}px`;
          this.storyFragmentElement.style.top = `${top}px`;
        }
      } else {
        if (this.storyFragmentElement) {
          this.storyFragmentElement.style.opacity = '0';
        }
      }
    }
  }

  animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateConnections();
    this.renderConnections();
    this.renderEmergentPatterns();
    this.storyPoints.forEach(point => {
      point.update(this.canvas!.width, this.canvas!.height);
      point.draw(this.ctx!, this.config.glowIntensity);
    });
    this.evolveSystem();
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  updateConnections() {
    this.connections = [];
    for (let i = 0; i < this.storyPoints.length; i++) {
      for (let j = i + 1; j < this.storyPoints.length; j++) {
        const pointA = this.storyPoints[i];
        const pointB = this.storyPoints[j];
        const distance = this.calculateDistance(pointA.x, pointA.y, pointB.x, pointB.y);
        if (distance < this.config.connectionThreshold) {
          const strength = 1 - distance / this.config.connectionThreshold;
          this.connections.push({ pointA, pointB, strength });
        }
      }
    }
    if (this.mousePosition.x && this.mousePosition.y) {
      this.storyPoints.forEach(point => {
        const distance = this.calculateDistance(
          point.x,
          point.y,
          this.mousePosition.x!,
          this.mousePosition.y!
        );
        if (distance < this.config.connectionThreshold) {
          this.connections.forEach(conn => {
            if (conn.pointA === point || conn.pointB === point) {
              const mouseInfluence = 1 - distance / this.config.connectionThreshold;
              conn.strength += mouseInfluence * this.config.interactionInfluence;
              conn.strength = Math.min(conn.strength, 1);
            }
          });
        }
      });
    }
  }

  renderConnections() {
    if (!this.ctx) return;
    this.connections.forEach(conn => {
      const gradient = this.ctx!.createLinearGradient(
        conn.pointA.x,
        conn.pointA.y,
        conn.pointB.x,
        conn.pointB.y
      );
      gradient.addColorStop(0, conn.pointA.color);
      gradient.addColorStop(1, conn.pointB.color);
      this.ctx!.beginPath();
      this.ctx!.moveTo(conn.pointA.x, conn.pointA.y);
      this.ctx!.lineTo(conn.pointB.x, conn.pointB.y);
      this.ctx!.strokeStyle = `rgba(255, 255, 255, ${conn.strength * 0.5})`;
      this.ctx!.lineWidth = 1;
      this.ctx!.stroke();
    });
  }

  renderEmergentPatterns() {
    if (!this.ctx) return;
    this.connections.forEach(conn => {
      if (conn.strength > this.config.transformationThreshold) {
        const midX = (conn.pointA.x + conn.pointB.x) / 2;
        const midY = (conn.pointA.y + conn.pointB.y) / 2;
        const size = this.config.emergentPatternSize * conn.strength;
        this.ctx!.beginPath();
        this.ctx!.arc(midX, midY, size, 0, Math.PI * 2);
        const patternColor = this.blendColors(conn.pointA.color, conn.pointB.color, 0.5);
        this.ctx!.fillStyle = patternColor;
        this.ctx!.fill();
        const gradient = this.ctx!.createRadialGradient(midX, midY, 0, midX, midY, size * 3);
        gradient.addColorStop(0, patternColor.replace('0.8', '0.4'));
        gradient.addColorStop(1, 'transparent');
        this.ctx!.beginPath();
        this.ctx!.arc(midX, midY, size * 3, 0, Math.PI * 2);
        this.ctx!.fillStyle = gradient;
        this.ctx!.fill();
      }
    });
  }

  evolveSystem() {
    this.systemAge += this.config.evolutionSpeed;
    this.storyPoints.forEach((point, index) => {
      const evolutionFactor = Math.sin(this.systemAge + index * 0.1) * 0.5 + 0.5;
      point.velocity.x *= 0.98 + evolutionFactor * 0.04;
      point.velocity.y *= 0.98 + evolutionFactor * 0.04;
      const speed = Math.sqrt(point.velocity.x ** 2 + point.velocity.y ** 2);
      if (speed > 1) {
        point.velocity.x *= 1 / speed;
        point.velocity.y *= 1 / speed;
      }
      if (Math.random() < 0.005) {
        point.velocity.x += (Math.random() - 0.5) * 0.2;
        point.velocity.y += (Math.random() - 0.5) * 0.2;
      }
    });
  }

  calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  blendColors(color1: string, color2: string, ratio: number): string {
    const parseColor = (hexStr: string) => {
      const hex = hexStr.replace('#', '');
      if (hex.length === 3)
        return {
          r: parseInt(hex[0] + hex[0], 16),
          g: parseInt(hex[1] + hex[1], 16),
          b: parseInt(hex[2] + hex[2], 16),
        };
      if (hex.length === 6)
        return {
          r: parseInt(hex.substring(0, 2), 16),
          g: parseInt(hex.substring(2, 4), 16),
          b: parseInt(hex.substring(4, 6), 16),
        };
      return { r: 255, g: 255, b: 255 }; // Default fallback
    };
    const c1 = parseColor(color1);
    const c2 = parseColor(color2);
    const r = Math.round(c1.r * (1 - ratio) + c2.r * ratio);
    const g = Math.round(c1.g * (1 - ratio) + c2.g * ratio);
    const b = Math.round(c1.b * (1 - ratio) + c2.b * ratio);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
  }

  start() {
    if (!this.animationFrameId && this.canvas) {
      this.animate();
    }
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (!this.canvas) return;
    window.removeEventListener('resize', this.resizeCanvas);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.removeEventListener('click', this.handleCanvasClick);
  }

  initializeWithData(storyData: ConstellationStoryData[]) {
    if (!this.canvas) return;
    this.storyPoints = [];
    const count = Math.min(storyData.length, this.config.particleCount);
    for (let i = 0; i < count; i++) {
      const story = storyData[i];
      const x =
        Math.random() * (this.canvas.width - this.config.particleMaxRadius * 2) +
        this.config.particleMaxRadius;
      const y =
        Math.random() * (this.canvas.height - this.config.particleMaxRadius * 2) +
        this.config.particleMaxRadius;
      const radius =
        this.config.particleMinRadius +
        Math.random() * (this.config.particleMaxRadius - this.config.particleMinRadius);
      this.storyPoints.push(new StoryPoint(x, y, radius, story));
    }
    this.start();
  }
}
// --- End Core Constellation Logic ---

const DEFAULT_COLORS = [
  '#FF5E5B',
  '#D8D8F6',
  '#59C3C3',
  '#EBEBEB',
  '#FFA857',
  '#BCECE0',
  '#EF798A',
  '#F7A399',
  '#7D82B8',
];

export default function ConstellationPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<ConstellationSystem | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('storyPoints');

  useEffect(() => {
    let isMounted = true;

    if (currentView === 'storyPoints') {
      // Only attempt to set up if canvasRef.current is available and no system exists
      if (canvasRef.current && !systemRef.current) {
        const system = new ConstellationSystem('constellationCanvas', router, {
          /* options */
        });
        // Check if ConstellationSystem was successfully initialized (i.e., canvas was found)
        if (system.canvas) {
          systemRef.current = system;
          setIsLoading(true); // Set loading before async fetch
          fetchRecords<AirtableStory>(AIRTABLE_TABLES.STORIES, {
            pageSize: 100,
            fields: ['Title', 'Story copy', 'Storytellers'],
          })
            .then(async ({ records: storiesData }) => {
              if (!isMounted) return;
              const storytellerIds = Array.from(
                new Set(storiesData.flatMap(story => story.Storytellers || []).filter(id => !!id))
              );
              let storytellerMap = new Map<string, string>();
              if (storytellerIds.length > 0) {
                const formula = `OR(${storytellerIds.map(id => `RECORD_ID()='${id}'`).join(',')})`;
                const { records: storytellers } = await fetchRecords<AirtableStoryteller>(
                  AIRTABLE_TABLES.STORYTELLERS,
                  {
                    filterByFormula: formula,
                    fields: ['Name'],
                  }
                );
                storytellerMap = new Map(storytellers.map(st => [st.id, st.Name]));
              }
              const constellationData: ConstellationStoryData[] = storiesData.map(
                (story, index) => ({
                  id: story.id,
                  title: story.Title || 'Untitled Story',
                  fragment:
                    story['Story copy']?.substring(0, 100) + '...' || 'Click to read more...',
                  color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
                  storytellerName: storytellerMap.get((story.Storytellers || [])[0]) || 'Unknown',
                })
              );
              // Ensure system and canvas are still valid before initializing
              if (
                systemRef.current &&
                systemRef.current.canvas &&
                systemRef.current.canvas.isConnected
              ) {
                systemRef.current.initializeWithData(constellationData);
              }
            })
            .catch(error => {
              console.error('Error setting up StoryPoint Constellation:', error);
              if (isMounted) setIsLoading(false); // Clear loading on error
            })
            .finally(() => {
              if (isMounted) setIsLoading(false);
            });
        } else {
          // ConstellationSystem failed to initialize (e.g. canvas not found by ID immediately)
          if (isMounted) setIsLoading(false);
        }
      } else if (!canvasRef.current && isMounted) {
        // Canvas ref is not yet available, not an error, but not loading story points.
        // If currentView is storyPoints but canvasRef.current is null, it means the canvas div isn't rendered.
        // This can happen if currentView flips quickly.
        setIsLoading(false);
      }
    } else {
      // thematic view
      if (systemRef.current) {
        systemRef.current.stop();
        systemRef.current = null;
      }
      setIsLoading(false); // thematic view manages its own loading state
    }

    return () => {
      isMounted = false;
      if (systemRef.current) {
        systemRef.current.stop();
        systemRef.current = null;
      }
    };
  }, [currentView, router]); // Rerun when currentView or router changes

  return (
    <div className="relative w-[100vw] h-screen -ml-[calc(50vw-50%)] flex flex-col bg-gray-950 text-white overflow-hidden">
      <div className="fixed top-4 right-4 z-[60] flex space-x-2 bg-gray-800/70 p-1 rounded-lg backdrop-blur-sm">
        <button
          onClick={() => setCurrentView('storyPoints')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors
            ${currentView === 'storyPoints' ? 'bg-indigo-600 text-white' : 'bg-transparent hover:bg-indigo-500/30 text-gray-300'}
          `}
        >
          Story Constellation
        </button>
        <button
          onClick={() => setCurrentView('thematic')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors
            ${currentView === 'thematic' ? 'bg-purple-600 text-white' : 'bg-transparent hover:bg-purple-500/30 text-gray-300'}
          `}
        >
          Storyteller Explorer
        </button>
      </div>

      {isLoading && currentView === 'storyPoints' && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-950/80 z-[100]">
          <div className="animate-pulse text-xl">Loading Story Constellation...</div>
        </div>
      )}

      {currentView === 'storyPoints' && (
        <div id="constellationContainer" className="w-full h-full flex-grow relative">
          <canvas id="constellationCanvas" ref={canvasRef} className="w-full h-full"></canvas>
          <div
            id="storyFragment"
            className="absolute bg-black bg-opacity-70 text-white p-2 rounded-md text-xs shadow-lg pointer-events-none transition-opacity duration-300 opacity-0 max-w-xs z-50"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            {/* Content injected by ConstellationSystem */}
          </div>
        </div>
      )}

      {currentView === 'thematic' && <StorytellerExplorerView />}
    </div>
  );
}
