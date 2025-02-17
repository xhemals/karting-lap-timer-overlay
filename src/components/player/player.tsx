/* eslint-disable */
import { Player } from "@remotion/player";
import { Stopwatch } from "@/remotion/timer";
import { useAppSelector, useAppDispatch } from "@/app/hooks";

export const Preview: React.FC = () => {
  const videoURL = useAppSelector((state) => state.file.fileURL);
  const sessionName = useAppSelector((state) => state.sessionName.sessionName);
  const numberOfLaps = useAppSelector((state) => state.lapTimes.numberOfLaps);
  const parsedLapTimes = useAppSelector(
    (state) => state.lapTimes.parsedLapTimes,
  );
  const firstLapStartTime = useAppSelector(
    (state) => state.lapTimes.firstLapStartTime,
  );
  const videoDuration = useAppSelector(
    (state) => state.file.fileInfo?.duration ?? 1,
  );
  const fps = 60;
  return (
    <>
      {videoURL && (
        <Player
          component={Stopwatch}
          durationInFrames={Math.floor(videoDuration * fps)}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={fps}
          style={{ width: "50%" }}
          controls
          inputProps={{
            videoUrl: videoURL,
            sessionName: sessionName,
            numberOfLaps: numberOfLaps,
            firstLapStartTime: firstLapStartTime,
            parsedLapTimes: parsedLapTimes,
          }}
        />
      )}
    </>
  );
};
