"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/app/hooks";
import { useState } from "react";

export default function RenderButton() {
  const [showCommand, setShowCommand] = useState(false);
  const [command, setCommand] = useState("");
  const fileName = useAppSelector((state) => state.file.fileInfo?.name);
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

  function renderCommand() {
    setShowCommand(false);
    if (
      sessionName &&
      numberOfLaps &&
      parsedLapTimes &&
      firstLapStartTime &&
      videoDuration
    ) {
      setShowCommand(true);
      setCommand(
        `npx remotion render src/remotion/index.tsx lapTimer out/${fileName}-overlay.mov --props='{"sessionName":"${sessionName}", "numberOfLaps":"${numberOfLaps}", "parsedLapTimes":${JSON.stringify(parsedLapTimes)}, "firstLapStartTime":"${firstLapStartTime}", "duration":"${videoDuration}"}' --concurrency="90%"`,
      );
    }
  }
  return (
    <div className="flex w-1/2 flex-col items-center justify-center gap-4">
      <Button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          renderCommand();
        }}
      >
        Render
      </Button>
      {showCommand && (
        <Textarea id="command" value={command} readOnly className="h-32" />
      )}
    </div>
  );
}
