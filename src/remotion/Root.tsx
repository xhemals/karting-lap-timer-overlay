/* eslint-disable */
import React from "react";
import { Composition, getInputProps } from "remotion";
// import { MyComposition } from "./Composition";
import { Timer, Stopwatch } from "./timer";

export const RemotionRoot: React.FC = () => {
  const inputProps = getInputProps();
  const duration = (inputProps.duration as number) ?? 15;
  return (
    <>
      <Composition
        id="lapTimer"
        component={Stopwatch}
        durationInFrames={60 * duration}
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
