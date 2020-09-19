import React from 'react';
import { Root, NewRoot } from './Root';
import { createReconciler } from './moduleRenderer';
import { createElement } from './manager/element';
import { dispatch } from './bus/messageBus';
import { TREE_MOUNT } from './bus/message';

const renderer = createReconciler();
const rootElement = createElement('root', {});
// const rootElement = createElement('root', {}, { dispatch: () => { console.info('ROOT'); } });
const container = renderer.createContainer(rootElement, false, false);
const parentComponent = null;
renderer.updateContainer(
    React.createElement(NewRoot),
    container,
    parentComponent,
    () => {
        dispatch(TREE_MOUNT);
    },
);
