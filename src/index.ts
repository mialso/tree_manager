import React from 'react';
import { Root } from './first';
import { createReconciler } from './moduleRenderer';
import { createElement } from './element';
import { dispatch } from './messageBus';
import { TREE_MOUNT } from './message';

const renderer = createReconciler();
const rootElement = createElement('root', {}, { dispatch: () => { console.info('ROOT DISPATCH') } });
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
