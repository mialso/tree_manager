import { TreeNode, getSpaces } from "./tree"

export type Lifecycle<P> = {
    commitUpdate: (props: P) => void
    getProps: () => P
    commitMount: () => void
    destroy: () => void
}
export const OWN_PROP_KEYS = ['children', 'key'];

export const elementBaseLog = (getDepth: () => number, type: string) => `${getSpaces(getDepth())}Element<${type}>`;

type ElementCreate<P> = <B extends TreeNode<P>>(base: B) => B & Lifecycle<P>
// type ElementInit<P> = (p: P) => Partial<Lifecycle<P>>


export const initLifecycle = <P>(props: P, ext?: Partial<Lifecycle<P>>): ElementCreate<P> => {
    return (base) => {
        const state = {
            props
        }
        const log = (base: TreeNode<P>, text: string) => {
            console.info(`${elementBaseLog(base.getDepth, base.type)}: ${text}`);
        }
        return ({
            ...base,
            getProps: () => state.props,
            commitMount: () => {
                log(base, 'commitMount');
                ext?.commitMount && ext.commitMount()
            },
            commitUpdate: (newProps) => {
                if (typeof newProps !== 'object') {
                    return
                }
                const propsString = Object.keys(newProps)
                    .filter((key) => !OWN_PROP_KEYS.includes(key))
                    .reduce((acc, key) => {
                        if (state.props[key] !== newProps[key]) {
                            return acc.concat(` ${key}`);
                        }
                        return acc;
                    }, '');
                log(base, `commitUpdate: ${propsString}`);
                // TODO: just update
                state.props = newProps
                // state.props = { ...state.props, ...newProps };
                ext?.commitUpdate && ext.commitUpdate(newProps)
            },
            destroy: () => {
                log(base, 'destroy')
                const children = base.getChildren()
                children.forEach((child: any) => child.destroy());
                // TODO: before children destroy?
                ext?.destroy && ext.destroy()
            },
        });
    }
}
