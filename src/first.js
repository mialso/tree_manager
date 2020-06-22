import React from 'react';
import { useModuleLifecycle } from './hooks.js';

export const PluginModuleOne = ({ depth }) => {
    const e = React.createElement;
    useModuleLifecycle('PluginModuleOne');
    return e('PluginModuleOne', { depth: depth + 1 });
};

export const PluginOne = ({ depth }) => {
    const e = React.createElement;
    useModuleLifecycle('PluginTwo');
    return e('PluginOne', { depth }, [PluginModuleOne({ depth: depth + 1 })]);
};

export const ModuleTwo = ({ depth }) => {
    const e = React.createElement;
    useModuleLifecycle('moduleTwo');
    return e('moduleTwo', { depth }, [PluginOne({ depth: depth + 1 })]);
};

export const ModuleOne = ({ depth }) => {
    const e = React.createElement;
    useModuleLifecycle('moduleOne');
    return e('moduleOne', { depth });
};

export const serviceOne = ({ depth, children }) => {
    const e = React.createElement;
    useModuleLifecycle('serviceOne');
    return e('serviceOne', { depth }, children);
};

export const root = () => {
    const e = React.createElement;
    useModuleLifecycle('root');
    return e(serviceOne, { depth: 1 }, [
        ModuleOne({ depth: 2 }),
        ModuleTwo({ depth: 2 }),
    ]);
};
