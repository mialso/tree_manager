import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';

export function PluginModuleOne({ depth }) {
    useModuleLifecycle('PluginModuleOne');
    return (
        <plugin name="PluginModuleOne" depth={depth}/>
    );
}
