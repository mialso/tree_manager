import { compose } from 'redux'
import { initLifecycle } from './lifecycle'
import { initInput } from './input'
import { initTreeNode } from './tree'

export const createElement = (type: string, props: unknown) => {
    return compose(
        initInput(props),
        initLifecycle(props, {}),
        initTreeNode({}),
    )({ type })
}
