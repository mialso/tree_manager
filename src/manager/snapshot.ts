import { compose } from 'redux'
import type { Event } from '../data/event'
import { initLifecycle } from './lifecycle'
import { initInput } from './input'
import { initTreeNode } from './tree'

export type SnapshotProps = {
    name: string
    onData: (data: Event<unknown>) => boolean
}

export const createSnapshot = (props: SnapshotProps) => {
    return compose(
        initInput('snapshot', props),
        initLifecycle('snapshot', props, {}),
        initTreeNode('snapshot', {}),
    )()
}
