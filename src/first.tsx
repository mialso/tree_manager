import React from 'react';
import { useModuleLifecycle } from './hooks.js';
import { PluginModuleOne } from './one/pluginOne';

export const PluginOne = ({ depth, moduleTwoData, setModuleTwoState }) => {
    useModuleLifecycle('PluginTwo');
    if (moduleTwoData.status === 'READY') {
        return (
            <plugin depth={depth}>
                <PluginModuleOne depth={depth + 1} />
            </plugin>
        );
    } else {
        return null;
    }
};

export const ModuleTwo = ({ depth }) => {
    const [moduleTwoState, setModuleTwoState] = React.useState({ data: 'modeleTwo', status: 'READY' });
    useModuleLifecycle('moduleTwo');
    return (
        <module depth={depth}>
            <PluginOne depth={depth + 1} moduleTwoData={moduleTwoState} setModuleTwoState={setModuleTwoState} />
        </module>
    );
};

export const ModuleOne = ({ depth }) => {
    useModuleLifecycle('moduleOne');
    return (
        <module depth={depth} />
    );
};

export const ServiceOne = ({ depth, children }) => {
    useModuleLifecycle('serviceOne');
    return (
        <service depth={depth}>
            {children}
        </service>
    );
};

export const Root = () => {
    useModuleLifecycle('root');
    return (
        <ServiceOne depth={1}>
            <ModuleOne depth={2} />
            <ModuleTwo depth={2} />
        </ServiceOne>
    );
};
