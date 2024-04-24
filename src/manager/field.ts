import { Event } from '../data/event'
import { compose } from 'redux'
import { initLifecycle } from './lifecycle'
import { Input, initInput, isInput } from './input'
import { TreeNode, initTreeNode } from './tree'

export type Field = {
    name: string
}

export type FieldProps = {
    name: string
    onData: (data: Event<unknown>) => any
}

export const createField = (props: FieldProps) => {
    let node: (Input & TreeNode<FieldProps>) | null = null
    const onData = (data: Event<unknown>) => {
        // TODO: break the call stack ???
        const nextData = !!data.payload[props.name]
        if (nextData && node) {
            const pNode = node.getParent()
            if (isInput(pNode)) {
                pNode.bubble(data)
            }
            return true
        }
        return false
    }

    node = compose(
        initInput('field', { onData }),
        initLifecycle('field', props, {}),
        initTreeNode('field', {}),
    )()
    return node
}
