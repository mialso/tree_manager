import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';

export const PluginTwo = ({ depth, moduleTwoData }) => {
    useModuleLifecycle('pluginTwo');
    if (moduleTwoData.status !== 'READY') {
        return null;
    }
    return (
        <plugin name="pluginTwo" depth={depth} />
    );
};
