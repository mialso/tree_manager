import ReactReconciler from 'react-reconciler';
import { OWN_PROP_KEYS } from './manager/lifecycle';
import { createElement } from './manager/element';

export const instanceCreator = ({ getInstance }) => (type: string, props, _containerElem) => {
    // return createElement(type, props, { dispatch });
    const instance = getInstance(type, props)
    if (!instance) {
        return createElement(type, props);
    }
    return instance
}

export function appendInitialChild(parentInstance, child) {
    // console.log('appendInitialChild')
    child.setParent(parentInstance)
    return parentInstance.appendChild(child);
}

export function finalizeInitialChildren() {
    return true;
}

export function createTextInstance(text) {
    return { data: text };
}

export function getPublicInstance(instance) {
    return instance;
}

export function prepareForCommit() { }

export function prepareUpdate() {
    return true;
}

export function resetAfterCommit() { }

export function resetTextContent() { }

export function commitTextUpdate() { }

export function removeChild(parentInstance, child) {
    if (typeof child.destroy === 'function') {
        child.destroy();
    }
    return parentInstance.removeChild(child);
}

export function removeChildFromContainer(container, child) {
    console.log('removeChildFromContainer')
}

export function insertBefore() { }

export function appendChildToContainer(container, child) {
    child.setDepth(1, 'appendChildToContainer')
    return container.appendChild(child);
}

export function appendChild(parentInstance, child) {
    // console.log('appendChild')
    return parentInstance.appendChild(child);
}

export function shouldSetTextContent() {
    return false;
}

export function getRootHostContext() {
    return {};
}

export function getChildHostContext() {
    return {};
}

export function commitUpdate(instance, uP, t, oldProps, newProps) {
    const hasUpdate = Object.keys(newProps)
        .filter((key) => !OWN_PROP_KEYS.includes(key))
        .reduce((acc, key) => {
            return acc || (oldProps[key] !== newProps[key])
        }, false)
    if (hasUpdate) {
        instance.commitUpdate(newProps);
    }
}

export function commitMount(instance) {
    return instance.commitMount();
}

export function shouldDeprioritizeSubtree() {
    return true;
}

export function scheduleDeferredCallback() { }

export function cancelDeferredCallback() { }

export function setTimeout(handler, timeout) {
    return setTimeout(handler, timeout);
}

export function clearTimeout(handle) {
    return clearTimeout(handle);
}

export function createReconciler({ getInstance }) {
    const hostConfig = {
        createInstance: instanceCreator({ getInstance }),
        appendInitialChild,
        finalizeInitialChildren,
        createTextInstance,
        getPublicInstance,
        prepareForCommit,
        prepareUpdate,
        resetAfterCommit,
        resetTextContent,
        commitTextUpdate,
        removeChild,
        removeChildFromContainer,
        insertBefore,
        appendChildToContainer,
        appendChild,
        shouldSetTextContent,
        getRootHostContext,
        getChildHostContext,
        now: Date.now,
        commitUpdate,
        commitMount,
        shouldDeprioritizeSubtree,
        scheduleDeferredCallback,
        cancelDeferredCallback,
        setTimeout,
        clearTimeout,
        noTimeout: -1,
        isPrimaryRenderer: true,
        supportsMutation: true,
        supportsPersistence: false,
        supportsHydration: false,
    };
    return ReactReconciler(hostConfig);
}
