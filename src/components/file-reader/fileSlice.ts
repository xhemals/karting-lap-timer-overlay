import type { RootState } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FileState {
  fileURL: string | null;
  fileInfo: {
    name: string;
    type: string;
    duration: number;
  } | null;
}

const initialState: FileState = {
  fileURL: null,
  fileInfo: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFileURL: (state, action: PayloadAction<FileState["fileURL"]>) => {
      state.fileURL = action.payload;
    },
    setFileInfo: (state, action: PayloadAction<FileState["fileInfo"]>) => {
      state.fileInfo = action.payload;
    },
  },
});

export const { setFileURL, setFileInfo } = fileSlice.actions;

export const selectFile = (state: RootState) => state.file;

export default fileSlice.reducer;
