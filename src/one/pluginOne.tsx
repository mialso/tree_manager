import React from 'react';
import { useModuleLifecycle } from '../hooks';

export function PluginModuleOne({ depth }) {
    useModuleLifecycle('PluginModuleOne');
    return (
        <plugin />
    );
}
