import type { Event } from '../data/event'
import type { TreeNode } from "./tree"

export type Input = {
    capture: (data: Event<unknown>) => void
    bubble: (data: Event<unknown>) => void
}
export type InputProps = Partial<{
    onData: (data: Event<unknown>) => boolean
    onCreate: (data: Event<unknown>) => boolean
    onUpdate: (data: Event<unknown>) => boolean
    onDelete: (data: Event<unknown>) => boolean
}>
type InputCreate<P> = <B extends TreeNode<P>>(base: B) => B & Input

export function isInput(node: any): node is Input {
    return node && (typeof node.capture === 'function') && (typeof node.bubble === 'function')
}

export const initInput = <P extends InputProps>(type: string, props?: P): InputCreate<P> => {
    return (base) => {
        return ({
            ...base,
            capture: (data) => {
                console.log(`capture <${type}>`)
                const prevent = !!(props && props.onData && props.onData(data))
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
                console.log(`bubble <${type}>`)
                const prevent = !!(props && props.onData && props.onData(data))
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
