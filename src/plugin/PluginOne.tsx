import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';

export function PluginOne({ depth, data }) {
    useModuleLifecycle('pluginOne');
    if (data.status !== 'READY') {
        return null;
    }
    return (
        <plugin name="pluginOne" depth={depth} />
    );
}
