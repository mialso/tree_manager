import React from 'react';
import { root } from './first.js';
import { createReconciler } from './moduleRenderer.js';
import { createElement } from './element.js';
import { dispatch } from './messageBus.js';
import { TREE_MOUNT } from './message.js';

const renderer = createReconciler();
const rootElement = createElement('root', {}, {});
const container = renderer.createContainer(rootElement, false);
const parentComponent = null;
renderer.updateContainer(
    React.createElement(root),
    container,
    parentComponent,
    () => {
        dispatch(TREE_MOUNT);
    },
);
