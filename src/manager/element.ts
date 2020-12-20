export function getSpaces(num = 0) {
    return Array(num * 4).fill(' ').join('');
}

/*
const defaultOptions = {
    dispatch: (message) => console.info('DEFAULT_DISPATCH: %s', message),
};
*/

const moduleLog = (state) => `${getSpaces(state.props.depth)}Element<${state.type}> ${state.name ? `[${state.name}]` : ''}`;

export function createElement(item, props) {
// export function createElement(item, props, options = defaultOptions) {
    // const { dispatch } = options;
    const type = item;
    const name = props.name || '';
    const state = {
        children: [],
        name,
        type,
        props,
    };
    console.info(`${moduleLog(state)}: create(mount|render)`);
    return {
        type,
        name,
        appendChild(child) {
            console.info(`${moduleLog(state)}: appendChild: <${child.name || child.type}>`);
            state.children.push(child);
        },
        removeChild(child) {
            console.info(`${moduleLog(state)}: removeChild: <${child.name || child.type}>`);
            state.children = state.children.filter((item) => item === child);
        },
        commitMount() {
            console.info(`${moduleLog(state)}: commitMount`);
        },
        commitUpdate(newProps) {
            console.info(`${moduleLog(state)}: commitUpdate`);
            state.props = { ...state.props, ...newProps };
        },
        destroy() {
            console.info(`${moduleLog(state)}: destroy`);
        },
    };
}
