import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useGame } from '../contexts/GameContext';

const researchData = [
  {
    id: 'raas',
    title: 'Research on Ransomware-as-a-Service (RaaS)',
    year: '2026',
    description: 'Studied the architecture and operational model of RaaS platforms. Explored detection strategies and mitigation techniques for ransomware threats.',
    tags: ['RaaS', 'Threat Models']
  },
  {
    id: 'swarm',
    title: 'Research on Network Swarm Optimization',
    year: '2025',
    description: 'Explored swarm-based optimization techniques for improving network efficiency. Contributed to experimental evaluation and documentation of results.',
    tags: ['Optimization', 'Swarm AI']
  }
];

const nodes = [
  { id: 'Cybersecurity', group: 1, radius: 20 },
  { id: 'Networking', group: 2, radius: 20 },
  { id: 'RaaS', group: 1, radius: 15 },
  { id: 'Threat Models', group: 1, radius: 15 },
  { id: 'Optimization', group: 2, radius: 15 },
  { id: 'Swarm AI', group: 2, radius: 15 },
  { id: 'Research on Ransomware-as-a-Service (RaaS)', group: 3, radius: 25 },
  { id: 'Research on Network Swarm Optimization', group: 3, radius: 25 }
];

const links = [
  { source: 'Research on Ransomware-as-a-Service (RaaS)', target: 'Cybersecurity', value: 2 },
  { source: 'Research on Ransomware-as-a-Service (RaaS)', target: 'RaaS', value: 2 },
  { source: 'Research on Ransomware-as-a-Service (RaaS)', target: 'Threat Models', value: 2 },
  { source: 'Cybersecurity', target: 'Threat Models', value: 1 },
  { source: 'Research on Network Swarm Optimization', target: 'Networking', value: 2 },
  { source: 'Research on Network Swarm Optimization', target: 'Optimization', value: 2 },
  { source: 'Research on Network Swarm Optimization', target: 'Swarm AI', value: 2 },
  { source: 'Networking', target: 'Optimization', value: 1 }
];

const NetworkGraph = () => {
  const containerRef = useRef();
  const svgRef = useRef();
  
  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const width = 1000;
    const height = 350;

    // Clone data and pre-seed initial positions in the center to prevent violent explosive physics
    const graphNodes = nodes.map(d => ({
      ...d,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100
    }));
    const graphLinks = links.map(d => ({...d}));

    d3.select(svgRef.current).selectAll("*").remove();
    
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("preserveAspectRatio", "xMidYMid meet");

    const simulation = d3.forceSimulation(graphNodes)
      .force("link", d3.forceLink(graphLinks).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(d => d.radius + 15));

    const link = svg.append("g")
      .attr("stroke", "rgba(255, 255, 255, 0.2)")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(graphLinks)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .selectAll("g")
      .data(graphNodes)
      .join("g")
      .call(drag(simulation));

    node.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => {
        if (d.group === 1) return "#000"; 
        if (d.group === 2) return "#000";
        return "rgba(255,255,255,0.1)"; 
      })
      .attr("stroke", d => {
        if (d.group === 1) return "#FF003C"; 
        if (d.group === 2) return "#00E5FF"; 
        return "#FFFFFF"; 
      })
      .attr("stroke-width", 2)
      .style("filter", d => {
        if (d.group === 1) return "drop-shadow(0px 0px 8px rgba(255, 0, 60, 0.8))";
        if (d.group === 2) return "drop-shadow(0px 0px 8px rgba(0, 229, 255, 0.8))";
        return "drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.5))";
      });

    node.append("text")
      .attr("dx", 15)
      .attr("dy", ".35em")
      .text(d => d.id.length > 15 ? d.id.substring(0, 15) + "..." : d.id)
      .attr("fill", "rgba(255,255,255,0.8)")
      .attr("font-family", "monospace")
      .attr("font-size", "10px");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("transform", d => `translate(${Math.max(d.radius, Math.min(width - d.radius, d.x))},${Math.max(d.radius, Math.min(height - d.radius, d.y))})`);
    });

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[350px] relative">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

const Research = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (state.viewedPapers.length === researchData.length && !state.unlockedAchievements.includes('research_scholar')) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'research_scholar' });
    }
  }, [state.viewedPapers, state.unlockedAchievements, dispatch]);

  const handleViewPaper = (id) => {
    dispatch({ type: 'VIEW_PAPER', payload: id });
  };

  return (
    <div className="flex flex-col h-full gap-6 text-white">
      {/* Top: Visualization */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-2 relative shrink-0">
        <div className="absolute top-4 left-4 text-[9px] font-code tracking-widest text-white/40 pointer-events-none z-10">
          DATA_VIZ // NODE_NETWORK (DRAG TO INTERACT)
        </div>
        <NetworkGraph />
      </div>

      {/* Bottom: Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {researchData.map(paper => {
          const isViewed = state.viewedPapers.includes(paper.id);
          return (
            <div 
              key={paper.id} 
              onClick={() => handleViewPaper(paper.id)}
              className={`bg-white/5 border border-white/10 rounded-lg p-5 cursor-crosshair transition-colors hover:bg-white/10 ${isViewed ? 'border-l-4 border-l-cyan-400' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-code bg-white/10 px-2 py-1 rounded">
                  {paper.year}
                </span>
                {isViewed && <span className="text-[10px] font-code text-cyan-400">EXTRACTED</span>}
              </div>
              
              <h3 className="text-sm font-display font-bold mb-2 uppercase leading-tight">
                {paper.title}
              </h3>
              
              <p className="text-xs font-body text-white/60 mb-4 line-clamp-3">
                {paper.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {paper.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-code text-white/40 border border-white/20 px-1.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Research;
