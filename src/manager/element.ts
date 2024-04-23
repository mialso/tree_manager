export type Named = {
    type: string
    name?: string
}
export type Element<P> = Named & {
    setDepth: (depth: number, source: string) => void
    appendChild: (element: Element<P>) => void
    removeChild: (element: Element<P>) => void
    commitUpdate: (props: P) => void
    commitMount: () => void
    destroy: () => void
}
export type Props = {
    name?: string
}
export type StateBase<P> = {
    type: string
    children: Element<P>[]
    depth: number
    props: P
}

export type State<P> = Named & StateBase<P>

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
export const elementBaseLog = (state: StateBase<unknown>) => `${getSpaces(state.depth)}Element<${state.type}>`;

type ElementRun<P> = (defType: string, props: P) => Element<P>
type ElementInit<P> = (p: P) => Partial<Element<P>>
export const initElement = <P>(type: string, initEl: ElementInit<P>): ElementRun<P> => {
    return (defType, props) => {
        const state: StateBase<P> = {
            type,
            children: [],
            depth: 0,
            props: {} as P,
        };
        if (!state.type) {
            state.type = defType
        }
        state.props = props
        // console.info(`${elementBaseLog(state)}: (init)`);
        const ext = initEl(props)
        return ({
            type: state.type,
            setDepth(value: number, source: string) {
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
            appendChild(child) {
                console.info(`${elementBaseLog(state)}: appendChild: ${elementTitle(child)}`);
                state.children.push(child);
                if (state.depth && Array.isArray(state.children)) {
                    state.children.forEach((child) => child.setDepth(state.depth + 1, `appendChild ${state.type}`));
                }
                ext?.appendChild && ext.appendChild(child)
            },
            removeChild(child) {
                console.info(`${elementBaseLog(state)}: removeChild: ${elementTitle(child)}`);
                state.children = state.children.filter((item) => item === child);
                ext?.removeChild && ext.removeChild(child)
            },
            commitMount() {
                console.info(`${elementBaseLog(state)}: commitMount`);
                ext?.commitMount && ext.commitMount()
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
                console.info(`${elementBaseLog(state)}: commitUpdate: ${propsString}`);
                // TODO: just update
                state.props = { ...state.props, ...newProps };
                ext?.commitUpdate && ext.commitUpdate(newProps)
            },
            destroy() {
                console.info(`${elementBaseLog(state)}: (destroy)`);
                if (Array.isArray(state.children)) {
                    state.children.forEach((child) => child.destroy());
                }
                // TODO: before children destroy?
                ext?.destroy && ext.destroy()
            },
        });
    }
}

export const createElement = initElement('', () => ({}))
