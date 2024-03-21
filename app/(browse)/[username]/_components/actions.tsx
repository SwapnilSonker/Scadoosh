"use client"
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";


interface ActionsProps{
    isFollowing:boolean;
    userId:string;
}

const Actions = ({isFollowing , userId}:ActionsProps) => {
    const [isPending , startTransition] = useTransition();

    const handleFollow = () =>{
        startTransition(() =>{
        onFollow(userId)
        .then((data: any) => toast.success(`You are now following ${data?.following?.username}`))
        .catch(() => toast.error("Something went wrong"))
        });
    }

    const handleUnFollow = () =>{
        startTransition(() =>{
        onUnfollow(userId)
        .then((data: any) => toast.success(`You have unfollowed ${data?.following?.username}`))
        .catch(() => toast.error("Something went wrong"))
        });
    }

    const onClick = () =>{
        if(isFollowing){
            handleUnFollow();
        }
        else{
            handleFollow();
        }
    }
  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button>Block</Button>
    </>
  );
}

export default Actions