import type { EventEmitter } from 'tsee'
import { initElement } from './element'

export type Stream = {
    name: string
    connect: () => void
    emitter: EventEmitter
    disconnect: () => void
}

export type StreamProps = {
    stream: Stream
}

export const createStream = initElement<StreamProps>('stream', (props) => {
    const currentStream = props.stream
    const name = currentStream.name || '';
    const handler = (data) => {
        console.log('emitter data', data)
    }
    return {
        commitMount() {
            //currentStream.connect()
            currentStream.emitter.on('data', handler)
        },
        destroy() {
            // currentStream.disconnect()
            currentStream.emitter.off('data', handler)
        },
    }
})
