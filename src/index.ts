import React from 'react';
import { Root } from './first';
import { createReconciler } from './moduleRenderer';
import { createElement } from './manager/element';
import { dispatch } from './bus/messageBus';
import { TREE_MOUNT } from './bus/message';

const renderer = createReconciler();
const rootElement = createElement('root', {}, { dispatch: () => { console.info('ROOT DISPATCH'); } });
const container = renderer.createContainer(rootElement, false, false);
const parentComponent = null;
renderer.updateContainer(
    React.createElement(Root),
    container,
    parentComponent,
    () => {
        dispatch(TREE_MOUNT);
    },
);
