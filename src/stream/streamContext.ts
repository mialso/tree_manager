import { createContext, useContext, useEffect } from 'react';
import { testManufactoryStream } from '../data/manufactory'
import { testProductStream } from '../data/product'
import { Stream } from '../manager/stream';

export const PRODUCT_STREAM_1 = 'product-stream-1'
export const PRODUCT_STREAM_2 = 'product-stream-2'
export const MANUFACTORY_STREAM = 'manufactory-stream'

export enum StreamId {
    Product1 = PRODUCT_STREAM_1,
    Product2 = PRODUCT_STREAM_2,
    Manufactory = MANUFACTORY_STREAM,
}

export const streamById = {
    [StreamId.Product1]: testProductStream(StreamId.Product1),
    [StreamId.Product2]: testProductStream(StreamId.Product2),
    [StreamId.Manufactory]: testManufactoryStream(),
}

export const StreamContext = createContext(streamById)

export const useStream = (id: StreamId): Stream => {
    const streamById = useContext(StreamContext)
    const stream: Stream = streamById[id]
    useEffect(() => {
        // TODO: double check lifecycle to match with <stream/> consumer
        stream.connect()
        return () => stream.disconnect()
    }, [id])
    return stream
}

