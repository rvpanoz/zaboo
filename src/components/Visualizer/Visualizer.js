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
  .domain([0, 99])
  .range(["#c85bbf", "#5b71c8"]);

analyser.connect(audioCtx.destination);
analyser.fftSize = 256;

const bufferSize = analyser.frequencyBinCount;
const frequencyData = new Uint8Array(bufferSize);

const Vizualizer = () => {
  const classes = useStyles();
  const containerRef = useRef();
  const svgRef = useRef();
  const audioRef = useRef();
  const timerRef = useRef();
  const streamUrl = useSelector(({ track }) => track.stream_url);

  const draw = () => {
    const { current: svg } = svgRef;

    const w = parseInt(svg.attr("width"));
    const h = parseInt(svg.attr("height"));
    const margins = { top: 0, right: 10, bottom: 0, left: 10 };

    const dataset = Array(33)
      .fill({
        x: 0,
        y: 0
      })
      .map((d, idx) => ({
        x: d.x + idx * 10,
        y: d.y
      }));

    const [xScale] = d3Scales(dataset, w, h, margins);

    svg
      .selectAll("bar")
      .data(dataset)
      .enter()
      .append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) {
        return xScale(d.x) - 2;
      })
      .attr("width", 5)
      .attr("y", h / 2 - 10)
      .attr("height", 5);

    svg
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("fill", function(d, i) {
        return colorScale(d.x);
      })
      .attr("cx", function(d, i) {
        return xScale(d.x);
      })
      .attr("cy", function(d, i) {
        return h / 2;
      })
      .attr("r", 5);

    svg.exit().remove();
  };

  const handleCanPlay = () => {};

  const handlePlay = e => {
    const { current: svg } = svgRef;
    const h = svg.attr("height");
    const w = svg.attr("width");

    timerRef.current = d3.timer(() => {
      analyser.getByteFrequencyData(frequencyData);

      svgRef.current
        .selectAll("rect")
        .data(frequencyData)
        .attr("y", function(d) {
          return h / 2 - d;
        })
        .attr("fill", function(d, i) {
          return colorScale(d);
        });

      svg
        .selectAll("circle")
        .data(frequencyData)
        .attr("cy", function(d, i) {
          return h / 2 + d;
        });
    });
  };

  const handlePause = () => {
    const { current: svg } = svgRef;
    const h = svg.attr("height");

    timerRef && timerRef.current.stop();

    svg
      .selectAll("rect")
      .transition()
      .ease(d3.easeCubicOut)
      .attr("y", h / 2);

    svg
      .selectAll("circle")
      .transition()
      .ease(d3.easeCubicOut)
      .attr("cy", h / 2);
  };

  const handleLoadStart = () => {
    draw();
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

    if (audio) {
      const audioSrc = audioCtx.createMediaElementSource(audio);

      audio.src =
        "https://api.soundcloud.com/tracks/708026479/stream?client_id=caa597c828eaadfad140af3da084e904";
      audio.volume = 0.1;
      audioSrc.connect(analyser);

      addListeners();
    }

    return () => {
      removeListeners();
    };
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
          src=""
        >
          Your browser does not support HTML5 Audio!
        </audio>
      </div>
    </div>
  );
};

export default Vizualizer;
