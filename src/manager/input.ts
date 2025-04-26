import type { Event } from '../data/event'
import type { TreeNode } from "./tree"

export type Input = {
    capture: (data: Event) => void
    bubble: (data: Event) => void
}
export type InputProps = Partial<{
    onData: (data: Event) => boolean
    onCtrl: (data: Event) => boolean
    onCreate: (data: Event) => boolean
    onUpdate: (data: Event) => boolean
    onDelete: (data: Event) => boolean
}>
type InputCreate<P> = <B extends TreeNode<P>>(base: B) => B & Input

export function isInput(node: any): node is Input {
    return node
        && (typeof node.capture === 'function')
        && (typeof node.bubble === 'function')
}

export const initInput = <P extends InputProps>(ext?: P): InputCreate<P> => {
    return (base) => {
        return ({
            ...base,
            capture: (data) => {
                console.log(`capture <${base.type}>`, data)
                const prevent = !!(ext && ext.onCtrl && ext.onCtrl(data))
                // const prevent = !!(ext.capture && ext.capture())
                if (prevent) {
                    return
                }
                base.getChildren().forEach((child) => {
                    if (isInput(child)) {
                        child.capture(data)
                    }
                })
            },
            bubble: (data) => {
                console.log(`bubble <${base.type}>`, data)
                const prevent = !!(ext && ext.onData && ext.onData(data))
                if (prevent) {
                    return
                }
                const parent = base.getParent() as Input
                if (isInput(parent)) {
                    parent.bubble(data)
                }
            },
        })
    }
}
