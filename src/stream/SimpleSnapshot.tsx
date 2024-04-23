import React from 'react';
import { MergedSnapshot } from './StreamCompose';
import { StreamId, useStream, StreamContext, streamById } from './streamContext'

export const TreeManager = () => {
    return (
        <StreamContext.Provider value={streamById}>
            <SimpleSnapshot />
            <MergedSnapshot />
        </StreamContext.Provider>
    )
}

export const SimpleSnapshot = () => {
    const prodStream = useStream(StreamId.Product1)
    return (
        <snapshot name="product-price" byId>
            <stream stream={prodStream}>
                <model name="product" >
                    <field name="price" />
                </model>
            </stream >
        </snapshot >
    )
}
