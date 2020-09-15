import React from 'react';
import { useModuleLifecycle } from '../hooks';
import { PluginModuleOne } from '../one/pluginOne';

export const PluginTwo = ({ depth, moduleTwoData, setModuleTwoState }) => {
    useModuleLifecycle('PluginTwo');
    if (moduleTwoData.status === 'READY') {
        return (
            <PluginModuleOne depth={depth + 1} />
        );
    } else {
        return null;
    }
};
