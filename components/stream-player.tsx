"use client"

import { Stream, User } from "@prisma/client"

interface StreamPlayerprops{
    user: User & {stream: Stream | null};
    stream: Stream;
    isFollowing: boolean
}
const StreamPlayer = ({user , stream}:StreamPlayerprops) => {
  return (
    <div>StreamPlayer</div>
  )
}

export default StreamPlayer