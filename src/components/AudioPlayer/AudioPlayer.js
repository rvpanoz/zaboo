import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { updateTrackData } from "actions/tracks/actions";
import styles from "./styles";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const useStyles = makeStyles(styles);

analyser.connect(audioCtx.destination);

const AudioContext = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const audioRef = useRef();
  const streamUrl = useSelector(({ track }) => track.stream_url);

  useEffect(() => {
    const { current } = audioRef;

    if (current) {
      const audioSrc = audioCtx.createMediaElementSource(audioRef.current);

      audioSrc.connect(analyser);

      analyser.fftSize = 256;
      audioRef.current.volume = 1.0;
    }
  }, []);

  useEffect(() => {
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    //copy byte frequencyData into frequencyData array
    analyser.getByteFrequencyData(frequencyData);

    dispatch(
      updateTrackData({
        frequencyData
      })
    );
  }, [streamUrl]);

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
