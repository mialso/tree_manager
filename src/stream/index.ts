import React from 'react';
import { TreeManager } from './SimpleSnapshot';
import { createReconciler } from '../moduleRenderer';
import { createElement } from '../manager/element';

const renderer = createReconciler();
const rootElement = createElement('root', {});
const container = renderer.createContainer(rootElement, false, false);
const parentComponent = null;
renderer.updateContainer(
    React.createElement(TreeManager),
    container,
    parentComponent,
    () => {
        console.info(`[TestIndex---] ${new Date().getSeconds()}`);
    },
);

