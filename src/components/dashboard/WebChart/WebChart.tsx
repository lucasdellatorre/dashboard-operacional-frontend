import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  value: number;
}

interface Data {
  links: Link[];
  nodes: Node[];
}

// example of data:
// {
//   links: [
//     { source: "Alvo", target: "Intercpt 2", value: 50 },
//     { source: "Alvo", target: "Intercpt 3", value: 100 },
//   ],
//   nodes: [{ id: "Alvo", group: 1 }, { id: "Intercpt 2", group: 2 }]
// }

const Chart: React.FC<{ data: Data }> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 928;
    const height = 600;
    const color = d3
      .scaleOrdinal<number, string>()
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      .range(d3.schemeCategory10);

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(100) // Distance between nodes
      )
      .force("charge", d3.forceManyBody().strength(-2000)) // Strength of the repulsion force between nodes
      .force("center", d3.forceCenter(width / 2, height / 2)) // Center of the simulation
      .force("collision", d3.forceCollide().radius(40)); // Collision force between nodes

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")
      .attr("data-testid", "chart-svg");

    const link = svg
      .append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll<SVGLineElement, Link>("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value) / 2)
      .attr("stroke", (d) => (d.value > 500 ? "#ff4444" : "#999")); // Color the links that have more than 500 value

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2) // Width of the lines contorning the nodes
      .selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 15)
      .attr("fill", (d) => color(d.group))
      .on("dblclick", (_event, d) => {
        // opens node info with double click
        window.open(`/node/${d.id}`, "_blank");
      });

    const nodeText = svg
      .append("g")
      .selectAll<SVGTextElement, Node>("text")
      .data(nodes)
      .join("text")
      .text((d) => d.id)
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")
      .attr("dy", "-1.5em");

    node.call(
      d3
        .drag<SVGCircleElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    function ticked() {
      link
        .attr("x1", (d) => (d.source as Node).x || 0)
        .attr("y1", (d) => (d.source as Node).y || 0)
        .attr("x2", (d) => (d.target as Node).x || 0)
        .attr("y2", (d) => (d.target as Node).y || 0);

      node.attr("cx", (d) => d.x || 0).attr("cy", (d) => d.y || 0); // Node position

      nodeText.attr("x", (d) => d.x || 0).attr("y", (d) => d.y || 0); // Node text
    }

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    simulation.on("tick", ticked);

    return () => {
      simulation.stop();
    };
  }, [data]);

  return <svg ref={svgRef} />;
};

export default Chart;
