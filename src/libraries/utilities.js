import * as d3 from "d3";

export const d3Scales = (dataset, maxWidth, maxHeight, margins) => {
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d.x)])
    .range([margins.left, maxWidth - margins.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d.x)])
    .range([margins.top, maxHeight - margins.bottom]);

  return [xScale, yScale];
};
