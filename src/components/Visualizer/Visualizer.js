import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import { d3Scales } from "libraries/utilities";
import styles from "./styles";

const useStyles = makeStyles(styles);
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const t0 = Date.now();

var colorScale = d3
  .scaleLinear()
  .domain([0, 150])
  .range(["#2c7be9", "#e1799e"]);

analyser.connect(audioCtx.destination);
analyser.fftSize = 256;

const Vizualizer = () => {
  const classes = useStyles();
  const containerRef = useRef();
  const svgRef = useRef();
  const audioRef = useRef();
  const timerRef = useRef();
  const streamUrl = useSelector(({ track }) => track.stream_url);

  const draw = () => {
    const { current: svg } = svgRef;

    const w = svg.attr("width");
    const h = svg.attr("height");

    const margins = { top: 40, right: 10, bottom: 130, left: 7 };
    const dataset = Array(100)
      .fill({
        x: 0,
        y: h / 2
      })
      .map((d, idx) => ({
        x: d.x + idx / 0.1,
        y: d.y
      }));

    console.log(dataset);
    const [xScale, yScale] = d3Scales(dataset, w, h, margins);

    svg
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("fill", d => colorScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("cx", d => xScale(d.x))
      .attr("r", 5);

    svg.exit().remove();
  };

  const canPlay = () => {
    svgRef.current
      .selectAll("circle")
      .transition()
      .delay((d, idx) => idx * 50)
      .on("start", function repeat() {
        d3.active(this)
          .style("fill", d => colorScale(d.x))
          .transition()
          .style("fill", d => colorScale(d.y))
          .transition()
          // .style("fill", d => colorScale(10))
          // .transition()
          .on("start", repeat);
      });
  };

  const handlePlay = e => {
    const { current: svg } = svgRef;
    const h = svg.attr("height");
    const w = svg.attr("width");
    const bufferSize = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferSize);

    timerRef.current = d3.timer(() => {
      analyser.getByteFrequencyData(frequencyData);

      svgRef.current
        .selectAll("circle")
        .data(frequencyData)
        .attr("cy", function(d) {
          return h / 2 - d;
        })
        .attr("fill", function(d, i) {
          return colorScale(d);
        });
    });
  };

  const handlePause = () => {
    const { current: svg } = svgRef;
    const h = svg.attr("height");
    timerRef && timerRef.current.stop();

    svgRef.current
      .selectAll("circle")
      .transition()
      .ease(d3.easeCubicOut)
      .attr("cy", function(d) {
        return h / 2;
      });
  };

  const handleLoadStart = () => {};

  useEffect(() => {
    const { current: container } = containerRef;
    const { current: audio } = audioRef;

    if (!container) {
      return;
    }

    svgRef.current = d3
      .select(container)
      .append("svg")
      .attr("height", window.innerHeight - 120)
      .attr("width", window.innerWidth);

    if (audio) {
      const audioSrc = audioCtx.createMediaElementSource(audio);

      audio.volume = 1.0;
      audioSrc.connect(analyser);

      audio.addEventListener("loadstart", handleLoadStart);
      audio.addEventListener("canplay", canPlay);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
    }

    draw();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.visualizer} ref={containerRef}></div>
      <div className={classes.audio}>
        <audio
          controls="controls"
          preload="true"
          ref={audioRef}
          crossOrigin="anonymous"
          src="https://api.soundcloud.com/tracks/708026479/stream?client_id=caa597c828eaadfad140af3da084e904"
        >
          Your browser does not support HTML5 Audio!
        </audio>
      </div>
    </div>
  );
};

export default Vizualizer;
