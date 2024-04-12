export function getSpaces(num = 0) {
    return Array(num * 4).fill(' ').join('');
}

/*
const defaultOptions = {
    dispatch: (message) => console.info('DEFAULT_DISPATCH: %s', message),
};
*/

const elementTitle = (state) => `<${state.type || ''}> ${state.name ? `[${state.name}]` : ''}`
const elementLog = (state) => `${getSpaces(state.depth)}Element${elementTitle(state)}`;

export function createElement(item, props) {
// export function createElement(item, props, options = defaultOptions) {
    // const { dispatch } = options;
    const type = item;
    const name = props.name || '';
    const state = {
        children: [],
        name,
        type,
        depth: 0,
        props,
    };
    console.info(`${elementLog(state)}: (init)`);
    return {
        type,
        name,
        setDepth(value) {
            if (state.depth === value) {
                return;
            }
            state.depth = value
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
            console.info(`${elementLog(state)}: commitUpdate`);
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
