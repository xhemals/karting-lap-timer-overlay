"use client";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  setParsedLapTimes,
  setNumberOfLaps,
  setFirstLapStartTime,
} from "@/components/lap-times/lapTimesSlice";

export default function LapTimeInput() {
  const dispatch = useAppDispatch();
  const [allLapTimes, setAllLapTimes] = useState<string>("");
  const [firstLapTimeStamp, setFirstLapTimeStamp] = useState<string>("");

  function parseLapTimes() {
    const rawLapTimes = allLapTimes.split(/\s+/);
    const parsedTimestamps = rawLapTimes.map((time) => {
      if (time.includes(":")) {
        const [minutes = 0, seconds = 0] = time.split(":").map(parseFloat);
        return String((minutes * 60 + seconds).toFixed(3));
      }
      return String(parseFloat(time).toFixed(3));
    });
    dispatch(setNumberOfLaps(parsedTimestamps.length));
    dispatch(setParsedLapTimes(parsedTimestamps));
  }

  function parseVideoTimestamp(timestamp: string) {
    setFirstLapTimeStamp(timestamp);
    const parts = timestamp.split(":").map(parseFloat);
    let parsedTimestamp;

    if (
      parts.length === 3 &&
      parts[0] !== undefined &&
      parts[1] !== undefined &&
      parts[2] !== undefined
    ) {
      // Format: hh:mm:ss.ss
      parsedTimestamp = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (
      parts.length === 2 &&
      parts[0] !== undefined &&
      parts[1] !== undefined
    ) {
      // Format: mm:ss.ss
      parsedTimestamp = parts[0] * 60 + parts[1];
    }

    if (parsedTimestamp) {
      dispatch(setFirstLapStartTime(parsedTimestamp));
    }
  }

  return (
    <div className="flex w-1/2 flex-col items-center justify-center gap-4">
      <div className="flex w-1/2 flex-row items-center justify-center gap-4">
        <label htmlFor="firstLapStartTime">Timestamp of first lap</label>
        <Input
          type="text"
          id="firstLapStartTime"
          value={firstLapTimeStamp}
          onChange={(e) => parseVideoTimestamp(e.target.value)}
          className="w-1/4"
        />
      </div>
      <label htmlFor="rawLapTimes">Raw lap times</label>
      <Textarea
        id="rawLapTimes"
        onChange={(e) => setAllLapTimes(e.target.value)}
        value={allLapTimes}
        className="h-32"
      />
      <Button onClick={parseLapTimes}>Submit lap times</Button>
    </div>
  );
}
