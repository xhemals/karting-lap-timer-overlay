import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "@/components/file-reader/fileSlice";
import sessionNameSlice from "@/components/session-name/sessionNameSlice";
import lapTimesSlice from "@/components/lap-times/lapTimesSlice";

export const store = configureStore({
  reducer: {
    sessionName: sessionNameSlice,
    file: fileSlice,
    lapTimes: lapTimesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
