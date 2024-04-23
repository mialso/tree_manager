export type NodeState<P> = {
    type: string
    children: TreeNode<P>[]
    parent: unknown
    depth: number
}

export type TreeNode<P> = {
    type: string
    getChildren: () => TreeNode<unknown>[]
    getParent: () => unknown
    setParent: (node: unknown) => void
    setDepth: (depth: number, source: string) => void
    getDepth: () => number
    appendChild: (node: TreeNode<P>) => void
    removeChild: (node: TreeNode<P>) => void
}

type TreeNodeCreate<P> = () => TreeNode<P>


export function getSpaces(num = 0) {
    return Array(num * 4).fill(' ').join('');
}
export const nodeTitle = (state: { type: string }) => `<${state.type || 'unknown'}>`;
export const nodeBaseLog = (state: NodeState<unknown>) => `${getSpaces(state.depth)}Node<${nodeTitle(state)}>`;

export const initTreeNode = <P>(type: string, ext: Partial<TreeNode<P>>): TreeNodeCreate<P> => {
    return () => {
        const state: NodeState<P> = {
            type,
            parent: null,
            children: [],
            depth: 0,
        };
        // console.info(`${elementBaseLog(state)}: (init)`);
        return ({
            type: state.type,
            getChildren: () => state.children,
            getParent: () => state.parent,
            setParent: (node) => {
                state.parent = node
            },
            getDepth: () => state.depth,
            setDepth: (value: number, source: string) => {
                if (state.depth === value) {
                    return;
                }
                // console.log(`new depth: ${value}:${source}`)
                if (state.depth > 10) {
                    console.error(`exceed depth: ${value}:${source}`)
                    return
                }
                state.depth = value;
                if (Array.isArray(state.children)) {
                    state.children.forEach((child) => child.setDepth(value + 1, `setDepth<${state.type}>`));
                }
            },
            appendChild: (child) => {
                console.info(`${nodeBaseLog(state)}: appendChild: ${nodeTitle(child)}`);
                state.children.push(child);
                if (state.depth && Array.isArray(state.children)) {
                    state.children.forEach((child) => child.setDepth(state.depth + 1, `appendChild ${state.type}`));
                }
                ext?.appendChild && ext.appendChild(child)
            },
            removeChild: (child) => {
                console.info(`${nodeBaseLog(state)}: removeChild: ${nodeTitle(child)}`);
                state.children = state.children.filter((item) => item === child);
                ext?.removeChild && ext.removeChild(child)
            },
        });
    }
}
