import { Player } from "@remotion/player";
import { Stopwatch } from "@/remotion/timer";
import { useAppSelector, useAppDispatch } from "@/app/hooks";

export const Preview: React.FC = () => {
  const videoURL = useAppSelector((state) => state.file.fileURL);
  const videoDuration = useAppSelector(
    (state) => state.file.fileInfo?.duration ?? 1,
  );
  const fps = 60;
  return (
    <>
      {videoURL && (
        <Player
          component={Stopwatch}
          durationInFrames={videoDuration * fps}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={fps}
          style={{ width: "50%" }}
          controls
          inputProps={{ videoUrl: videoURL }}
        />
      )}
    </>
  );
};
