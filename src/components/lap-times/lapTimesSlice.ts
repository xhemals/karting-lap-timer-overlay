import type { RootState } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LapTimesState {
  parsedLapTimes: string[];
  numberOfLaps: number;
  firstLapStartTime: number;
}

const initialState: LapTimesState = {
  parsedLapTimes: [],
  numberOfLaps: 0,
  firstLapStartTime: 0,
};

export const lapTimesSlice = createSlice({
  name: "lapTimes",
  initialState,
  reducers: {
    setParsedLapTimes: (
      state,
      action: PayloadAction<LapTimesState["parsedLapTimes"]>,
    ) => {
      state.parsedLapTimes = action.payload;
    },
    setNumberOfLaps: (
      state,
      action: PayloadAction<LapTimesState["numberOfLaps"]>,
    ) => {
      state.numberOfLaps = action.payload;
    },
    setFirstLapStartTime: (
      state,
      action: PayloadAction<LapTimesState["firstLapStartTime"]>,
    ) => {
      state.firstLapStartTime = action.payload;
    },
  },
});

export const { setParsedLapTimes, setNumberOfLaps, setFirstLapStartTime } =
  lapTimesSlice.actions;

export const selectParsedLapTimes = (state: RootState) =>
  state.lapTimes.parsedLapTimes;

export default lapTimesSlice.reducer;
