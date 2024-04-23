import type { EventEmitter } from 'tsee'
import { compose } from 'redux'
import { initLifecycle } from './lifecycle'
import { initInput } from './input'
import { initTreeNode } from './tree'

export type Stream = {
    name: string
    connect: () => void
    emitter: EventEmitter
    disconnect: () => void
}

export type StreamProps = {
    stream: Stream
}

export const createStream = (props: StreamProps) => {
    const currentStream = props.stream
    const name = currentStream.name || '';
    const handler = (data) => {
        console.log('emitter data', data)
    }
    return compose(
        initInput('snapshot', props, {}),
        initLifecycle('snapshot', props, {
            commitMount() {
                //currentStream.connect()
                currentStream.emitter.on('data', handler)
            },
            destroy() {
                // currentStream.disconnect()
                currentStream.emitter.off('data', handler)
            },
        }),
        initTreeNode('snapshot', {}),
    )()
}
