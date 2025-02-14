import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { setSessionName } from "@/components/session-name/sessionNameSlice";

import { Input } from "@/components/ui/input";

export default function SessionName() {
  const sessionName = useAppSelector((state) => state.sessionName.sessionName);
  const dispatch = useAppDispatch();

  return (
    <div className="flex w-1/2 flex-row items-center justify-center gap-4">
      <label htmlFor="sessionName">Session Name</label>
      <Input
        type="text"
        id="sessionName"
        value={sessionName}
        onChange={(e) => dispatch(setSessionName(e.target.value))}
        className="w-1/4"
      />
    </div>
  );
}
