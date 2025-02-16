/* eslint-disable */
import { useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/fonts";
import { staticFile, OffthreadVideo } from "remotion";
import { Timer } from "lucide-react";

const fontFamily = "Audiowide";
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
void loadFont({
  family: fontFamily,
  url: staticFile("/fonts/Audiowide-Regular.ttf"),
  weight: "400",
});

export const TimerXXX: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalSeconds = 60; // Countdown from 60 seconds
  const framesPerMs = 1000 / fps; // Conversion factor

  // Calculate time left
  const elapsedFrames = Math.min(frame, totalSeconds * fps);
  const secondsLeft = Math.max(
    totalSeconds - Math.floor(elapsedFrames / fps),
    0,
  );
  const millisecondsLeft = Math.max(
    999 - Math.floor((elapsedFrames % fps) * framesPerMs),
    0,
  );

  // Format MM:SS:MS
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const milliseconds = String(millisecondsLeft).padStart(3, "0"); // Ensure 3 digits

  return (
    <div
      style={{
        fontSize: 100,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
      }}
    >
      {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${milliseconds}`}
    </div>
  );
};

export const Stopwatch: React.FC<{
  videoUrl: string;
  sessionName: string;
  numberOfLaps: number;
  firstLapStartTime: number;
  parsedLapTimes: string[];
}> = ({
  videoUrl,
  sessionName,
  numberOfLaps,
  firstLapStartTime,
  parsedLapTimes,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const formatTime = (elapsedTimeInLap: number) => {
    const minutes = Math.floor(elapsedTimeInLap / 60);
    const seconds = Math.floor(elapsedTimeInLap % 60);
    const milliseconds = Math.round((elapsedTimeInLap % 1) * 1000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
  };

  const lapTimes = parsedLapTimes.map(Number);
  const startFrame = firstLapStartTime * fps;
  const adjustedFrame = Math.max(frame - startFrame, 0);
  const adjustedSeconds = adjustedFrame / fps;

  let currentIndex = 0;
  let accumulatedTime = 0;
  let lastFinalFrame = 0;

  let currentLap = 0;
  const finalLap = numberOfLaps;
  let lastLapTime = 0;
  let lastTimeDiff = 0;
  let bestTimeDiff = 0;
  let lastLapTimeDiffColor = "green";
  let bestLapTimeDiffColor = "orange";
  let bestLapTime = 9999999;
  let formattedLastLapTime = "00:00.000";
  let formattedBestLapTime = "00:00.000";

  for (let i = 0; i < lapTimes.length; i++) {
    const lapTime = lapTimes[i];

    if (i !== 0) {
      lastLapTime = lapTimes[i - 1];
      if (i > 1) {
        const lastLaptimeDiff = Math.abs(lastLapTime - lapTimes[i - 2]);
        const lastLapSign = lastLapTime - lapTimes[i - 2] >= 0 ? "+" : "-";
        if (lastLapSign === "+") {
          lastLapTimeDiffColor = "orange";
        } else {
          lastLapTimeDiffColor = "green";
        }
        lastTimeDiff =
          lastLapSign +
          (lastLaptimeDiff >= 60
            ? formatTime(lastLaptimeDiff)
            : lastLaptimeDiff.toFixed(3));
        const timeDiff = Math.abs(lastLapTime - bestLapTime);
        const sign = lastLapTime - bestLapTime >= 0 ? "+" : "-";
        if (sign === "+") {
          bestLapTimeDiffColor = "orange";
        } else {
          bestLapTimeDiffColor = "purple";
        }
        bestTimeDiff =
          sign + (timeDiff >= 60 ? formatTime(timeDiff) : timeDiff.toFixed(3));
      }
      formattedLastLapTime = formatTime(lastLapTime);
      if (lastLapTime < bestLapTime) {
        bestLapTime = lastLapTime;
        formattedBestLapTime = formatTime(bestLapTime);
      }
    }

    if (i === lapTimes.length - 1) {
      lastFinalFrame =
        Math.floor((accumulatedTime + lapTime) * fps) + startFrame;
    }

    if (adjustedSeconds < accumulatedTime + lapTime) {
      currentIndex = i;
      break;
    }

    accumulatedTime += lapTime;
  }

  if (frame >= startFrame) {
    currentLap = currentIndex + 1;
    if (frame > lastFinalFrame && lastFinalFrame !== 0) {
      lastLapTime = lapTimes[lapTimes.length - 1];
      currentLap = numberOfLaps;
      const lastLaptimeDiff = Math.abs(
        lastLapTime - lapTimes[lapTimes.length - 2],
      );
      const lastLapSign =
        lastLapTime - lapTimes[lapTimes.length - 2] >= 0 ? "+" : "-";
      if (lastLapSign === "+") {
        lastLapTimeDiffColor = "orange";
      } else {
        lastLapTimeDiffColor = "green";
      }
      lastTimeDiff =
        lastLapSign +
        (lastLaptimeDiff >= 60
          ? formatTime(lastLaptimeDiff)
          : lastLaptimeDiff.toFixed(3));
      formattedLastLapTime = formatTime(lastLapTime);
      const timeDiff = Math.abs(lastLapTime - bestLapTime);
      const sign = lastLapTime - bestLapTime >= 0 ? "+" : "-";
      bestTimeDiff =
        sign + (timeDiff >= 60 ? formatTime(timeDiff) : timeDiff.toFixed(3));
      if (sign === "+") {
        bestLapTimeDiffColor = "orange";
      } else {
        bestLapTimeDiffColor = "purple";
      }
      if (lastLapTime < bestLapTime) {
        bestLapTime = lastLapTime;
        formattedBestLapTime = formatTime(bestLapTime);
      }
    }
  }

  if (frame < startFrame) {
    currentLap = 0;
  }

  const elapsedTimeInLap = adjustedSeconds - accumulatedTime;
  const formattedTime =
    frame > lastFinalFrame && lastFinalFrame !== 0
      ? "00:00.000"
      : formatTime(elapsedTimeInLap);

  return (
    <div
      style={{
        fontFamily: "Audiowide",
        width: "100%",
        height: "100%",
        // backgroundColor: "orange",
        color: "white",
      }}
    >
      <div
        style={{
          width: "27.5%",
          marginLeft: "2rem",
          marginTop: "2rem",
          // borderTop: "15px solid rgba(245, 245, 245, 0.5)",
          // borderLeft: "15px solid rgba(245, 245, 245, 0.5)",
          // borderBottom: "15px solid rgba(245, 245, 245, 0.5)",
          borderRadius: "25px",
          backgroundColor: "rgba(245, 245, 245, 0.5)",
          padding: "15px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(50, 50, 50, 0.75)",
            borderRadius: "13.75px",
            height: "100%",
            display: "inline-block",
            width: "100%",
            padding: "5px",
          }}
        >
          <div
            style={{
              // backgroundColor: "#07168a",
              height: "100%",
              display: "inline-block",
              width: "100%",
              padding: "10px",
              borderRadius: "8.125px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                // backgroundColor: "rgba(50, 50, 50, 0.95)",
                // padding: "5px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5%",
                  borderBottom: "1px solid rgb(245, 245, 245)",
                  paddingBottom: "15px",
                }}
              >
                <img
                  src={staticFile("/images/sk.png")}
                  alt="logo"
                  style={{ width: "33%" }}
                />
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "center",
                    color: "rgb(200,200,200)",
                  }}
                >
                  {sessionName ? sessionName : "PREVIEW"}
                </span>
              </div>
              <div
                style={{
                  borderBottom: "1px solid rgb(245, 245, 245)",
                  paddingBottom: "2px",
                  paddingTop: "4px",
                  fontSize: 35,
                  color: "rgb(200,200,200)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: "25%",
                  paddingRight: "25%",
                  lineHeight: "50px",
                }}
              >
                <span
                  style={{
                    fontStyle: "italic",
                    textAlign: "center",
                    marginRight: "10%",
                  }}
                >
                  LAP
                </span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "white", fontSize: 50, lineHeight: 0 }}>
                    {currentLap}
                  </span>
                  <span style={{ verticalAlign: "text-top" }}>
                    /{numberOfLaps ? numberOfLaps : 99}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5%",
                  paddingTop: "8px",
                }}
              >
                <Timer style={{ width: "20%", height: "50px" }} />
                <span
                  style={{
                    fontSize: 50,
                    fontWeight: "bold",
                    width: "100%",
                    lineHeight: "50px",
                  }}
                >
                  {formattedTime}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  fontSize: 25,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5%",
                    width: "100%",
                    justifyContent: "space-between",
                    padding: "0 5% 0 5%",
                  }}
                >
                  <span>LAST:</span>
                  <div
                    style={{
                      display: "flex",
                      width: "70%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{formattedLastLapTime}</span>
                    {lastTimeDiff != 0 ? (
                      <span style={{ color: lastLapTimeDiffColor }}>
                        {lastTimeDiff}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5%",
                    width: "100%",
                    justifyContent: "space-between",
                    padding: "0 5% 0 5%",
                    lineHeight: "20px",
                  }}
                >
                  <span>BEST:</span>
                  <div
                    style={{
                      display: "flex",
                      width: "70%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{formattedBestLapTime}</span>
                    {bestTimeDiff != 0 ? (
                      <span style={{ color: bestLapTimeDiffColor }}>
                        {bestTimeDiff}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {videoUrl && (
        <OffthreadVideo
          src={videoUrl}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute", // Allows it to be positioned behind
            top: 0,
            left: 0,
            zIndex: -1, // Places it behind everything
          }}
        />
      )}
    </div>
  );
};
export { Timer };
