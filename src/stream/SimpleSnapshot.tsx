import React from 'react';
import { Event } from '../data/event'
import { MergedSnapshot } from './StreamCompose';
import { StreamId, useStream, StreamContext, streamById } from './streamContext'

export const TreeManager = () => {
    return (
        <StreamContext.Provider value={streamById}>
            <SimpleSnapshot />
            {/*<MergedSnapshot />*/}
        </StreamContext.Provider>
    )
}

export const SimpleSnapshot = () => {
    const prodStream = useStream(StreamId.Product1)
    const onData = (data: Event<unknown>) => {
        console.log(`SimpleSnapshot: onData: ${data.type}`)
        return true
    }
    return (
        <snapshot name="product-price" byId onData={onData}>
            <stream stream={prodStream}>
                <model name="product" >
                    <field name="price" />
                </model>
            </stream >
        </snapshot >
    )
}
