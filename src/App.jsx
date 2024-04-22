import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VideoJS from "./VideoJs";

function App() {
  const [count, setCount] = useState(0);
  const playerRef = useRef(null);
  const myDoubleClickHandler = (event) => {
    // I am Accessing the player through playerRe
    const player = playerRef.current;
    if (player) {
      console.log("hi");
      console.log(player.currentTime());

      const playerRect = player.el().getBoundingClientRect();
      const clickX = event.clientX - playerRect.left;
      const playerWidth = playerRect.width;

      // I'm Calculating the click position relative to the player width
      const relativePosition = clickX / playerWidth;

      // I'm Calculating the time difference based on the relative position
      const timeDifference = relativePosition < 0.5 ? -10 : 10;

      // I'm Updating the current time accordingly
      player.currentTime(player.currentTime() + timeDifference);
    }
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },
    userActions: {
      doubleClick: myDoubleClickHandler,
    },
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://cdn.pixabay.com/video/2023/09/23/181916-867576005_large.mp4",
        type: "video/mp4",
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  return (
    <>
      <div>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1>
        Videojs Player Task By
        <a href="mailto:izhanmughal11@gmail.com"> Izhan Mughal </a>
      </h1>
      <div
        className="videojs"
        style={{
          margin: "auto",
          height: "250px",
          marginBottom: "50px",
        }}
      >
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </>
  );
}

export default App;
