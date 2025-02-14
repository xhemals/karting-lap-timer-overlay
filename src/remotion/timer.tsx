import { useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/fonts";
import { staticFile, OffthreadVideo } from "remotion";
import { Timer } from "lucide-react";

const fontFamily = "Audiowide";
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
loadFont({
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

export const Stopwatch: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalSeconds = frame / fps;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds % 1) * 1000);

  // Ensuring leading zeros for all values
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;

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
          width: "25%",
          marginLeft: "2rem",
          marginTop: "2rem",
          // borderTop: "15px solid rgba(245, 245, 245, 0.5)",
          // borderLeft: "15px solid rgba(245, 245, 245, 0.5)",
          // borderBottom: "15px solid rgba(245, 245, 245, 0.5)",
          borderRadius: "25px 0 0 25px",
          backgroundColor: "rgba(245, 245, 245, 0.5)",
          padding: "15px 0 15px 15px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(50, 50, 50, 0.75)",
            borderRadius: "13.75px 0 0 13.75px",
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
              borderRadius: "8.125px 0 0 8.125px",
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
                    fontSize: 35,
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "center",
                    color: "rgb(200,200,200)",
                  }}
                >
                  QUALIFYING
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
                <span style={{ fontStyle: "italic", textAlign: "center" }}>
                  LAP
                </span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "white", fontSize: 50, lineHeight: 0 }}>
                    5
                  </span>
                  <span style={{ verticalAlign: "text-top" }}>/17</span>
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
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};
