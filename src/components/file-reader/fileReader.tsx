"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
import changeFileExtension from "change-file-extension";
import { Button } from "@/components/ui/button";

import { useAppSelector, useAppDispatch } from "@/app/hooks";

import { setFileInfo, setFileURL } from "@/components/file-reader/fileSlice";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  width: "100%",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function StyledDropzone(_props: Record<string, never>) {
  const fileURL = useAppSelector((state) => state.file.fileURL);
  const fileInfo = useAppSelector((state) => state.file.fileInfo);

  const dispatch = useAppDispatch();
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "video/*": [] },
      maxFiles: 1,
      onDropAccepted: (acceptedFile) => {
        if (acceptedFile[0]) {
          dispatch(setFileURL(URL.createObjectURL(acceptedFile[0])));
          const video = document.createElement("video");
          video.src = URL.createObjectURL(acceptedFile[0]);
          video.onloadedmetadata = () => {
            dispatch(
              setFileInfo({
                name: changeFileExtension(acceptedFile[0]!.name, ""),
                type: acceptedFile[0]!.type,
                duration: video.duration,
              }),
            );
          };
        }
      },
    });
  const videoRef = useRef<HTMLVideoElement>(null);
  const seconds = useAppSelector((state) => state.lapTimes.firstLapStartTime);

  useEffect(() => {
    if (videoRef.current) {
      if (seconds) {
        videoRef.current.currentTime = seconds;
      }
    }
  }, [seconds]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  function removeVideo() {
    dispatch(setFileURL(null));
    dispatch(setFileInfo(null));
  }

  return (
    <div className="flex min-h-32 w-1/2 flex-col items-center justify-center gap-4">
      {!fileInfo ? (
        <div {...getRootProps({ style: style as React.CSSProperties })}>
          <input {...getInputProps()} />
          <p>Drag a file here, or click to select file</p>
        </div>
      ) : (
        <Button onClick={removeVideo}>Remove Video</Button>
      )}
      {fileInfo && (
        <div>
          {fileURL && fileInfo?.type.startsWith("video") && (
            <video controls src={fileURL} width="100%" ref={videoRef} />
          )}
          <p>{fileInfo.name}</p>
          <p>{fileInfo.duration} seconds</p>
        </div>
      )}
    </div>
  );
}

<StyledDropzone />;
