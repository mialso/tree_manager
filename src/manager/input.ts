import { TreeNode } from "./tree"

export type Input = {
    capture: () => boolean
    bubble: () => boolean
}
type InputCreate<P> = <B extends TreeNode<P>>(base: B) => B & Input

function isInput(node: any): node is Input {
    return node && (typeof node.capture === 'function') && (typeof node.bubble === 'function')
}

export const initInput = <P>(type: string, props: P, ext: Partial<Input>): InputCreate<P> => {
    return (base) => {
        return ({
            ...base,
            capture: () => {
                const prevent = !!(ext.capture && ext.capture())
                if (prevent) {
                    return true
                }
                base.getChildren().forEach((child) => {
                    if (isInput(child)) {
                        child.capture()
                    }
                })
                return false
            },
            bubble: () => {
                const prevent = !!(ext.bubble && ext.bubble())
                if (prevent) {
                    return true
                }
                const parent = base.getParent() as Input
                if (isInput(parent)) {
                    parent.bubble()
                }
                return false
            },
        })
    }
}
