import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service';
import React from 'react'

const ChatPage = async() => {

    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);

    if(!stream){
        throw new Error("Stream not found");
    }

  return (
    <div className='p-6'>
        <div className='mb-4'>
            <h1 className='text-2xl font-bold'>
                Chat Settings
            </h1>
        </div>
        <div className='space-y-4'>

        </div>
    </div>
  )
}

export default ChatPage