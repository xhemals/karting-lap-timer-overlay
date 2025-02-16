import React from "react";
import { Composition } from "remotion";
// import { MyComposition } from "./Composition";
import { Timer, Stopwatch } from "./timer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="lapTimer"
        component={Stopwatch}
        durationInFrames={60 * 15}
        fps={60}
        width={1920}
        defaultProps={{
          videoUrl: "",
          sessionName: "",
          numberOfLaps: 0,
          firstLapStartTime: 0,
          parsedLapTimes: [],
        }}
        height={1080}
      />
    </>
  );
};
