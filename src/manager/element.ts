import { compose } from 'redux'
import { initLifecycle } from './lifecycle'
import { initInput } from './input'
import { initTreeNode } from './tree'

export const createElement = (type: string, props: unknown) => {
    return compose(
        initInput(type, props, {}),
        initLifecycle(type, props, {}),
        initTreeNode(type, {}),
    )()
}
