import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';
import { PluginModuleOne } from '../one/pluginOne';

export const PluginTwo = ({ depth, moduleTwoData, setModuleTwoState }) => {
    useModuleLifecycle('pluginTwo');
    if (moduleTwoData.status !== 'READY') {
        return null;
    }
    return (
        <plugin name="pluginTwo" depth={depth}>
            <PluginModuleOne depth={depth + 1} />
        </plugin>
    );
};
