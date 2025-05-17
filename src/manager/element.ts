import { compose } from 'redux'
import { initLifecycle, LifecycleExt } from './lifecycle'
import { initInput } from './input'
import { initTreeNode, TreeNodeExt } from './tree'

export const createElement = <P>(type: string, props: unknown, ext?: TreeNodeExt<P> & LifecycleExt<P>) => {
    return compose(
        initInput(props),
        initLifecycle(props, {}),
        initTreeNode(ext || {}),
    )({ type })
}
