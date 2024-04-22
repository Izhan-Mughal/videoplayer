import React, { useEffect } from "react";
import { useRef } from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";
const VideoJs = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  return (
    <>
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
    </>
  );
};

export default VideoJs;
