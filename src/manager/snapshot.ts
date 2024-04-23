import { compose } from 'redux'
import { initLifecycle } from './lifecycle'
import { initInput } from './input'
import { initTreeNode } from './tree'

export type SnapshotProps = {
    name: string
}

export const createSnapshot = (props: SnapshotProps) => {
    return compose(
        initInput('snapshot', props, {}),
        initLifecycle('snapshot', props, {}),
        initTreeNode('snapshot', {}),
    )()
}
