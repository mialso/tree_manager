import type { EventEmitter } from 'tsee'
import type { Element, State } from './element'
import { elementLog, elementTitle, OWN_PROP_KEYS } from './element'

export type Stream = {
    connect: () => void
    emitter: EventEmitter
    disconnect: () => void
}

export type StreamProps = {
    stream: () => Stream
}

export function createStream(props: StreamProps): Element<StreamProps> {
    const type = 'stream'
    const name = props.stream?.name || '';
    const state: State<StreamProps> = {
        children: [],
        name,
        type,
        depth: 0,
        props,
    };
    const currentStream = props.stream()
    currentStream.emitter.on('data', (data) => {
        console.log('emitter data', data)
    })
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
            currentStream.connect()
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
            currentStream.disconnect()
            if (Array.isArray(state.children)) {
                state.children.forEach((child) => child.destroy());
            }
        },
    };
}
