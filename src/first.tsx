import React from 'react';
import { useModuleLifecycle } from './manager/hooks';
import { PluginModuleOne } from './one/pluginOne';
import { PluginTwo } from './two/pluginTwo';

export const PluginOne = ({ depth, moduleTwoData, setModuleTwoState }) => {
    useModuleLifecycle('PluginTwo');
    if (moduleTwoData.status === 'READY') {
        return (
            <plugin name="pluginOne" depth={depth}>
                <PluginModuleOne depth={depth + 1} />
            </plugin>
        );
    }
    return null;
};

export const ModuleTwo = ({ depth }) => {
    const [moduleTwoState, setModuleTwoState] = React.useState({ data: 'modeleTwo', status: 'READY' });
    useModuleLifecycle('moduleTwo');
    return (
        <module name="moduleTwo" depth={depth}>
            <PluginOne depth={depth + 1} moduleTwoData={moduleTwoState} setModuleTwoState={setModuleTwoState} />
            <PluginTwo depth={depth + 1} moduleTwoData={moduleTwoState} setModuleTwoState={setModuleTwoState} />
        </module>
    );
};

export const ModuleOne = ({ depth }) => {
    useModuleLifecycle('moduleOne');
    return (
        <module name="moduleOne" depth={depth} />
    );
};

export const ServiceOne = ({ depth, children }) => {
    useModuleLifecycle('serviceOne');
    return (
        <service name="serviceOne" depth={depth}>
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
