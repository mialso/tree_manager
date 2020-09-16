import { MODULE_READY } from '../bus/message';
import { ModuleOne } from '../moduleOne';

export function getSpaces(num = 0) {
    return Array(num * 4).fill(' ').join('');
}

const moduleRegistry = {
    moduleOne: (context) => new Promise((resolve) => {
        setTimeout(() => resolve(ModuleOne(context)), 2000);
    }),
};

const defaultOptions = {
    dispatch: (message) => console.info('DEFAULT_DISPATCH: %s', message),
};

export function createElement(item, props, options = defaultOptions) {
    const { dispatch } = options;
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
            debugger
            console.info(`${getSpaces(state.props.depth)}Element [${state.type}:<${state.name}>]: appendChild: <${child.name}>`);
            state.children.push(child);
        },
        removeChild(child) {
            debugger
            console.info(`${getSpaces(state.props.depth)}Element [${state.type}]: removeChild`);
            state.children = state.children.filter((item) => item === child);
        },
        commitMount() {
            debugger
            console.info(`${getSpaces(state.props.depth)}Element [${state.type}:<${state.name}>]: commitMount`);
            const getModule = moduleRegistry[type];
            if (!getModule) {
                return;
            }
            getModule({ getState: () => state }).then((module) => {
                dispatch(`${MODULE_READY}: ${type}`);
                dispatch(module.doSmth());
            });
        },
        commitUpdate(newProps) {
            debugger
            console.info(`${getSpaces(state.props.depth)}Element [${state.type}:<${state.name}>]: commitUpdate`);
            state.props = { ...state.props, ...newProps };
        },
    };
}
