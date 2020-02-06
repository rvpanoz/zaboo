import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();

const Vizualizer = () => {
  const audioRef = useRef();
  const streamUrl = useSelector(({ track }) => track.stream_url);

  useEffect(() => {
    const { current } = audioRef;

    if (current) {
      const audioSrc = audioCtx.createMediaElementSource(audioRef.current);

      audioSrc.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 256;
      audioRef.current.volume = 1.0;
    }
  }, []);

  return (
    <div>
      <audio
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

export default Vizualizer;
