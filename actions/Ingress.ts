"use server"

import{
    type CreateIngressOptions,
    IngressAudioEncodingPreset,
    IngressClient, IngressInput,
    IngressVideoEncodingPreset,
    RoomServiceClient,
} from "livekit-server-sdk"

import { db } from "@/lib/db"
import { getSelf } from "@/lib/auth-service"
import { TrackSource } from "livekit-server-sdk/dist"
import { revalidatePath } from "next/cache"

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!) 
const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

export const createIngress = async(ingressType:IngressInput) => {
    const self = await getSelf();

    

    const options: CreateIngressOptions ={
        name: self.username,
        roomName:self.id,
        participantName:self.username,
        participantIdentity:self.id
    }

    if(ingressType === IngressInput.WHIP_INPUT){
        options.bypassTranscoding = true;
    }
    else{
        options.video={
            source: TrackSource.CAMERA,
            value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS       
    };
    options.audio = {
        source: TrackSource.MICROPHONE,
        preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    };
    }

    const ingress = await ingressClient.createIngress(
        ingressType,
        options
    )

    if(!ingress || !ingress.url || !ingress.streamKey){
        throw new Error("Failed to create ingress");
    }

    await db.stream.update({
        where: {userId: self.id},
        data:{
            ingressId: ingress.ingressId,
            serverUrl:ingress.url,
            streamKey: ingress.streamKey
        }
    });

    revalidatePath(`/u/${self.username}/keys`)
}
