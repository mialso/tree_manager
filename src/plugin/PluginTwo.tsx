import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';

export const PluginTwo = ({ data, children }) => {
    useModuleLifecycle('pluginTwo');
    if (data.status !== 'READY') {
        return null;
    }
    return (
        <plugin name="pluginTwo">
            {children}
        </plugin>
    );
};
