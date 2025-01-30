import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GraphData, Node } from './types';
import { sampleData } from './sampleData';
import InfoPanel from './InfoPanel';
import GraphControls from './GraphControls';

const NetworkGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Create main group for graph
    const g = svg.append('g');

    // Create force simulation
    const simulation = d3.forceSimulation(sampleData.nodes as any)
      .force('link', d3.forceLink(sampleData.links)
        .id((d: any) => d.id)
        .distance(150)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Create links
    const links = g.append('g')
      .selectAll('line')
      .data(sampleData.links)
      .join('line')
      .attr('stroke', '#ddd')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create node groups
    const nodes = g.append('g')
      .selectAll('g')
      .data(sampleData.nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
      });

    // Add circular clips for images
    nodes.append('defs')
      .append('clipPath')
      .attr('id', (d: Node) => `clip-${d.id}`)
      .append('circle')
      .attr('r', 20);

    // Add images to nodes
    nodes.append('image')
      .attr('xlink:href', (d: Node) => d.imageUrl)
      .attr('clip-path', (d: Node) => `url(#clip-${d.id})`)
      .attr('x', -20)
      .attr('y', -20)
      .attr('width', 40)
      .attr('height', 40)
      .attr('preserveAspectRatio', 'xMidYMid slice');

    // Add circular border
    nodes.append('circle')
      .attr('r', 20)
      .attr('fill', 'none')
      .attr('stroke', (d: Node) => {
        switch (d.type) {
          case 'article': return '#4A90E2';
          case 'author': return '#50C878';
          case 'topic': return '#FF6B6B';
          case 'meme': return '#FFB347';
          default: return '#999';
        }
      })
      .attr('stroke-width', 3);

    // Add labels to nodes
    nodes.append('text')
      .text((d: Node) => d.title)
      .attr('x', 25)
      .attr('y', 5)
      .attr('font-size', '12px')
      .attr('fill', '#666')
      .attr('stroke', 'white')
      .attr('stroke-width', 0.5)
      .attr('paint-order', 'stroke');

    // Update positions on each tick
    simulation.on('tick', () => {
      links
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodes.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  const handleZoomIn = () => {
    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(
        (d3.zoom() as any).scaleBy, 1.2
      );
  };

  const handleZoomOut = () => {
    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(
        (d3.zoom() as any).scaleBy, 0.8
      );
  };

  const handleReset = () => {
    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(
        (d3.zoom() as any).transform,
        d3.zoomIdentity
      );
  };

  return (
    <div className="relative w-full h-screen bg-gray-50">
      <svg
        ref={svgRef}
        className="w-full h-full"
        onClick={() => setSelectedNode(null)}
      />
      <InfoPanel
        selectedNode={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
      <GraphControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
      />
    </div>
  );
};

export default NetworkGraph;