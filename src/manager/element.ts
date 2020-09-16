export function getSpaces(num = 0) {
    return Array(num * 4).fill(' ').join('');
}

/*
const defaultOptions = {
    dispatch: (message) => console.info('DEFAULT_DISPATCH: %s', message),
};
*/

const moduleLog = (state) => `${getSpaces(state.props.depth)}Element [${state.name}]`;

export function createElement(item, props) {
// export function createElement(item, props, options = defaultOptions) {
    // const { dispatch } = options;
    const type = item;
    const name = props.name || 'unknown';
    const state = {
        children: [],
        name,
        type,
        props,
    };
    return {
        name,
        appendChild(child) {
            console.info(`${moduleLog(state)}: appendChild: <${child.name}>`);
            state.children.push(child);
        },
        removeChild(child) {
            console.info(`${moduleLog(state)}: removeChild`);
            state.children = state.children.filter((item) => item === child);
        },
        commitMount() {
            console.info(`${moduleLog(state)}: commitMount`);
        },
        commitUpdate(newProps) {
            console.info(`${moduleLog(state)}: commitUpdate`);
            state.props = { ...state.props, ...newProps };
        },
    };
}
