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

interface WebChartInterface {
  data: Data;
  isIp?: boolean;
}

// example of data:
// {
//   links: [
//     { source: "Alvo", target: "Intercpt 2", value: 50 },
//     { source: "Alvo", target: "Intercpt 3", value: 100 },
//   ],
//   nodes: [{ id: "Alvo", group: 1 }, { id: "Intercpt 2", group: 2 }]
// }

const Chart: React.FC<WebChartInterface> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svgContainer = svgRef.current.parentElement;
    const width = svgContainer ? svgContainer.clientWidth : 928;
    const height = svgContainer ? svgContainer.clientHeight : 600;

    const color = d3
      .scaleOrdinal<number, string>()
      .domain([1, 2, 3, 4, 5, 6, 7])
      .range([
        "#FFB74D", // 6h-12h
        "#4A90E2", // 12h-18h
        "#1A237E", // 18h-00h
        "#0D0221", // 00h-6h
        "#D62727", // Targets
        "#757575", // Intercepts
        "#FFA000", // Suspects
      ]);

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    // Sort links by value to identify top 5 and next 10
    const sortedLinks = [...links].sort(
      (a, b) => (b.value || 0) - (a.value || 0)
    );
    const top5Values = new Set(
      sortedLinks.slice(0, 5).map((link) => link.value)
    );
    const next10Values = new Set(
      sortedLinks.slice(5, 15).map((link) => link.value)
    );

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-2000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1)) // Força para manter nodos no centro X
      .force("y", d3.forceY(height / 2).strength(0.1)) // Força para manter nodos no centro Y
      .force("collision", d3.forceCollide().radius(30));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "width: 100%; height: 100%; background-color: #1c1c1c")
      .attr("data-testid", "chart-svg");

    // Adicionar zoom
    const g = svg.append("g");
    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        })
    );

    const link = g
      .append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll<SVGLineElement, Link>("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value) / 2)
      .attr("stroke", (d) => {
        if (top5Values.has(d.value)) return "#ff4d4d"; // Red for top 5
        if (next10Values.has(d.value)) return "#FFA000"; // Yellow for next 10
        return "#999"; // Default gray for the rest
      });

    const node = g
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 15)
      .attr("fill", (d) => color(d.group))
      .style("cursor", "pointer")
      .on("dblclick", (_event, d) => {
        window.open(`/node/${d.id}`, "_blank");
      });

    const nodeText = g
      .append("g")
      .selectAll<SVGTextElement, Node>("text")
      .data(nodes)
      .join("text")
      .text((d) => d.id)
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")
      .attr("dy", "-2em")
      .attr("font-size", "14px"); // Aumentando o tamanho da fonte

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
