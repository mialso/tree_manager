import { createStream, StreamProps } from "./stream"

export type Named = {
    type: string
    name: string
}
export type Element<P> = Named & {
    setDepth: (depth: number) => void
    appendChild: (element: Element<P>) => void
    removeChild: (element: Element<P>) => void
    commitUpdate: (props: P) => void
    commitMount: () => void
    destroy: () => void
}
export type Props = {
    name?: string
}
export type State<P> = Named & {
    children: Element<P>[]
    depth: number
    props: P
}

export function getSpaces(num = 0) {
    return Array(num * 4).fill(' ').join('');
}

/*
const defaultOptions = {
    dispatch: (message) => console.info('DEFAULT_DISPATCH: %s', message),
};
*/
export const OWN_PROP_KEYS = ['children', 'key'];

export const elementTitle = (state: Named) => `<${state.type || ''}> ${state.name ? `[${state.name}]` : ''}`;
export const elementLog = (state: State<unknown>) => `${getSpaces(state.depth)}Element${elementTitle(state)}`;

export function createElement(item: string, props: Props): Element<Props | StreamProps> {
    const type = item;
    const name = props.name || '';
    const state: State<Props> = {
        children: [],
        name,
        type,
        depth: 0,
        props,
    };
    console.info(`${elementLog(state)}: (init)`);
    switch (type) {
        case 'stream': return createStream(props as StreamProps)
        default: break
    }

    return {
        type,
        name,
        setDepth(value: number) {
            if (state.depth === value) {
                return;
            }
            state.depth = value;
            if (Array.isArray(state.children)) {
                state.children.forEach((child) => child.setDepth(value + 1));
            }
        },
        appendChild(child) {
            console.info(`${elementLog(state)}: appendChild: ${elementTitle(child)}`);
            state.children.push(child);
            if (state.depth && Array.isArray(state.children)) {
                state.children.forEach((child) => child.setDepth(state.depth + 1));
            }
        },
        removeChild(child) {
            console.info(`${elementLog(state)}: removeChild: ${elementTitle(child)}`);
            state.children = state.children.filter((item) => item === child);
        },
        commitMount() {
            console.info(`${elementLog(state)}: commitMount`);
        },
        commitUpdate(newProps) {
            if (typeof newProps !== 'object') {
                return
            }
            const propsString = Object.keys(newProps)
                .filter((key) => !OWN_PROP_KEYS.includes(key))
                .reduce((acc, key) => {
                    if (state.props[key] !== newProps[key]) {
                        return acc.concat(` ${key}=${JSON.stringify(newProps[key])}`);
                    }
                    return acc;
                }, '');
            console.info(`${elementLog(state)}: commitUpdate: ${propsString}`);
            state.props = { ...state.props, ...newProps };
        },
        destroy() {
            console.info(`${elementLog(state)}: (destroy)`);
            if (Array.isArray(state.children)) {
                state.children.forEach((child) => child.destroy());
            }
        },
    };
}
