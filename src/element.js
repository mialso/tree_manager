import { MODULE_READY } from './message.js';
import { ModuleOne } from './moduleOne.js';

export function getSpaces(num = 0) {
    return Array(num * 4).fill(' ').join('');
}

const moduleRegistry = {
    moduleOne: (context) => new Promise((resolve) => {
        setTimeout(() => resolve(ModuleOne(context)), 2000);
    }),
};

export function createElement(type, props, { dispatch }) {
    const state = {
        children: [],
        type,
        props,
    };
    return {
        appendChild(child) {
            console.info(`${getSpaces(state.props.depth)}Element [${state.type}]: appendChild`);
            state.children.push(child);
        },
        removeChild(child) {
            console.info(`${getSpaces(state.props.depth)}Element [${state.type}]: removeChild`);
            state.children = state.children.filter((item) => item === child);
        },
        commitMount() {
            console.info(`${getSpaces(state.props.depth)}Element [${state.type}]: commitMount`);
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
            console.info(`${getSpaces(state.props.depth)}Element [${state.type}]: commitUpdate`);
            state.props = { ...state.props, ...newProps };
        },
    };
}
