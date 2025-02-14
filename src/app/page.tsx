"use client";
// import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
// import { api, HydrateClient } from "@/trpc/server";

import { store } from "@/store";
import { Provider } from "react-redux";

import StyledDropzone from "@/components/file-reader/fileReader";
import LapTimes from "@/components/lap-times/lapTimes";
import SessionName from "@/components/session-name/sessionName";
import { Preview } from "@/components/player/player";

export default function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    // <HydrateClient>
    <Provider store={store}>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1>Karting Lap Timer</h1>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <SessionName />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <StyledDropzone />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <LapTimes />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Preview />
      </div>
    </Provider>
    // </HydrateClient>
  );
}
