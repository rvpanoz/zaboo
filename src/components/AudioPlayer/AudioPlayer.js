import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { updateTrackData } from "actions/tracks/actions";
import * as d3 from "d3";
import styles from "./styles";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const useStyles = makeStyles(styles);

analyser.connect(audioCtx.destination);
analyser.fftSize = 256;

const AudioContext = () => {
  const classes = useStyles();
  const audioRef = useRef();
  const streamUrl = useSelector(({ track }) => track.stream_url);

  useEffect(() => {
    const bufferSize = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferSize);
    analyser.getByteFrequencyData(frequencyData);
  }, [streamUrl]);

  useEffect(() => {
    const { current } = audioRef;

    if (current) {
      const audioSrc = audioCtx.createMediaElementSource(current);
      current.volume = 1.0;
      audioSrc.connect(analyser);
    }
  }, []);

  return (
    <div className={classes.root}>
      <audio
        controls="controls"
        preload="true"
        ref={audioRef}
        crossOrigin="anonymous"
        src={streamUrl}
      >
        Your browser does not support HTML5 Audio!
      </audio>
    </div>
  );
};

export default AudioContext;
