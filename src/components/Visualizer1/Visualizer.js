import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import styles from "./styles";

const useStyles = makeStyles(styles);
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const t0 = Date.now();

var colorScale = d3
  .scaleLinear()
  .domain([0, 99])
  .range(["#c85bbf", "#5b71c8"]);

analyser.connect(audioCtx.destination);
analyser.fftSize = 256;

const bufferSize = analyser.frequencyBinCount;
const frequencyData = new Uint8Array(bufferSize);
const margins = { top: 0, right: 10, bottom: 0, left: 10 };

const Vizualizer = () => {
  const classes = useStyles();
  const containerRef = useRef();
  const svgRef = useRef();
  const audioRef = useRef();
  const timerRef = useRef();
  const streamUrl = useSelector(({ track }) => track.stream_url);

  const draw = () => {
    const { current: svg } = svgRef;
    const n = 21;
    const WIDTH = svg.attr("width");
    const HEIGHT = svg.attr("height");

    const lines = svg.append("g").attr("class", "lines");
    const dataset = d3.range(n).map(function(d) {
      return { y: parseInt(d3.randomUniform(0, HEIGHT - 10)()) };
    });

    const xScale = d3
      .scaleLinear()
      .domain([0, n - 1])
      .range([0, WIDTH]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.y)])
      .range([0, HEIGHT]);

    // d3's line generator
    const line = d3
      .line()
      .x(function(d, i) {
        return xScale(i);
      })
      .y(function(d) {
        return yScale(d.y);
      })
      .curve(d3.curveMonotoneX);

    lines
      .append("path")
      .datum(dataset)
      .attr("class", classes.line)
      .attr("d", line);
  };

  const handleCanPlay = () => {};

  const handlePlay = e => {};

  const handlePause = () => {
    const { current: svg } = svgRef;
    const h = svg.attr("height");

    timerRef && timerRef.current.stop();

    const group1 = svg.selectAll("g.group1");

    group1
      .selectAll("circle")
      .transition()
      .ease(d3.easeCubicOut)
      .attr("cy", h / 2);
  };

  const handleLoadStart = () => {
    // draw();
  };

  const addListeners = () => {
    const { current: audio } = audioRef;

    const eventHandlers = {
      loadstart: handleLoadStart,
      canplay: handleCanPlay,
      play: handlePlay,
      pause: handlePause
    };

    for (let handler in eventHandlers) {
      audio.addEventListener(handler, eventHandlers[handler]);
    }

    window.addEventListener("resize", draw);
  };

  const removeListeners = () => {
    const { current: audio } = audioRef;

    const eventHandlers = {
      loadstart: handleLoadStart,
      canplay: handleCanPlay,
      play: handlePlay,
      pause: handlePause
    };

    for (let handler in eventHandlers) {
      audio.addEventListener(handler, eventHandlers[handler]);
    }

    window.removeEventListener("resize", draw);
  };

  useEffect(() => {
    const { current: container } = containerRef;
    const { current: audio } = audioRef;

    if (!container) {
      return;
    }

    svgRef.current = d3
      .select(container)
      .append("svg")
      .attr("height", container.offsetHeight)
      .attr("width", container.offsetWidth);

    const audioSrc = audioCtx.createMediaElementSource(audio);

    audio.volume = 0.1;
    audioSrc.connect(analyser);

    addListeners();

    draw();

    return () => {
      removeListeners();
    };
  }, []);

  useEffect(() => {
    const { current: audio } = audioRef;

    if (audio) {
      audio.src = streamUrl;
    }
  }, [streamUrl]);

  return (
    <div className={classes.root}>
      <div className={classes.visualizer} ref={containerRef}></div>
      <div className={classes.audio}>
        <audio
          controls="controls"
          preload="true"
          ref={audioRef}
          crossOrigin="anonymous"
          src=""
        >
          Your browser does not support HTML5 Audio!
        </audio>
      </div>
    </div>
  );
};

export default Vizualizer;
