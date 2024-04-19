"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client"

interface StreamPlayerprops{
    user: User & {stream: Stream | null};
    stream: Stream;
    isFollowing: boolean
}
const StreamPlayer = ({user , stream , isFollowing}:StreamPlayerprops) => {
    const {
      token,
      name,
      identity
    } = useViewerToken(user.id);

    console.log("token",token);
    if(!token || !name || !identity){
      return (
        <div>
          Cannot watch stream
        </div>
      )
    }
  return (
    <div>Allowed to watch the stream</div>
  )
}

export default StreamPlayer