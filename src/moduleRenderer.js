import ReactReconciler from 'react-reconciler';
import { createElement } from './manager/element';
import { dispatch } from './bus/messageBus';

export function createInstance(type, props) {
    return createElement(type, props, { dispatch });
}

export function appendInitialChild(parentInstance, child) {
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

export function prepareForCommit() {}

export function prepareUpdate() {
    return true;
}

export function resetAfterCommit() {}

export function resetTextContent() {}

export function commitTextUpdate() {}

export function removeChild(parentInstance, child) {
    if (typeof child.destroy === 'function') {
        child.destroy();
    }
    return parentInstance.removeChild(child);
}

export function removeChildFromContainer() {}

export function insertBefore() {}

export function appendChildToContainer(container, child) {
    return container.appendChild(child);
}

export function appendChild(parentInstance, child) {
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

export function commitUpdate(instance, uP, t, o, newProps) {
    return instance.commitUpdate(newProps);
}

export function commitMount(instance) {
    return instance.commitMount();
}

export function shouldDeprioritizeSubtree() {
    return true;
}

export function scheduleDeferredCallback() {}

export function cancelDeferredCallback() {}

export function setTimeout(handler, timeout) {
    return setTimeout(handler, timeout);
}

export function clearTimeout(handle) {
    return clearTimeout(handle);
}

export function createReconciler() {
    const hostConfig = {
        createInstance,
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
