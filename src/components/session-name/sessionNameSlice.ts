import type { RootState } from "@/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SessionNameState {
  sessionName: string;
}

const initialState: SessionNameState = {
  sessionName: "",
};

export const sessionNameSlice = createSlice({
  name: "sessionName",
  initialState,
  reducers: {
    setSessionName: (
      state,
      action: PayloadAction<SessionNameState["sessionName"]>,
    ) => {
      state.sessionName = action.payload;
    },
  },
});

export const { setSessionName } = sessionNameSlice.actions;

export const selectSessionName = (state: RootState) =>
  state.sessionName.sessionName;

export default sessionNameSlice.reducer;
