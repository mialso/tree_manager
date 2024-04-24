import type { EventEmitter } from 'tsee'
import { compose } from 'redux'
import { initLifecycle } from './lifecycle'
import { Input, initInput } from './input'
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
    let node: Input | null = null
    const handler = (data) => {
        if (node) {
            node.capture(data)
        }
    }
    node = compose(
        initInput('stream'),
        initLifecycle('stream', props, {
            commitMount() {
                //currentStream.connect()
                currentStream.emitter.on('data', handler)
            },
            destroy() {
                // currentStream.disconnect()
                currentStream.emitter.off('data', handler)
            },
        }),
        initTreeNode('stream', {}),
    )()
    return node
}
