import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";

const Vizualizer = () => {
  const containerRef = useRef();
  const timer = useRef();
  const svg = useRef();

  const visualize = () => {
    //color
    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    //copy byte frequencyData into frequencyData array
    // this.analyser.getByteFrequencyData(frequencyData);

    var arc = d3
      .arc()
      .startAngle(function(d, i) {
        return 0;
      })
      .endAngle(function(d, i) {
        return 2 * Math.PI;
      })
      .innerRadius(function(d) {
        return d / 2;
      })
      .outerRadius(function(d) {
        return d;
      });

    svg.current
      .select("g")
      .selectAll("path")
      .data([])
      .attr("d", arc)
      .attr("fill", function(d, i) {
        return colors(function(d, i) {
          return d * i + Math.floor(Math.random() * 100);
        });
      });

    //clean up
    svg.current.exit().remove();
  };

  useEffect(() => {
    const { current } = containerRef;

    if (current) {
      svg.current = d3
        .select(current)
        .append("svg")
        .attr("height", 400)
        .attr("width", 400);

      //start visualization using d3.timer function
      timer.current = d3.timer(visualize);
    }
  }, []);

  return <div ref={containerRef}></div>;
};

export default Vizualizer;
