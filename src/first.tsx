import React from 'react';
import { useModuleLifecycle, useModuleInitTimeout } from './manager/hooks';
import { PluginOne } from './plugin/pluginOne';
import { PluginTwo } from './plugin/pluginTwo';
import { ServiceOne } from './one/serviceOne';
import { ServiceTwo } from './two/serviceTwo';

/*
export const ModuleTwo = ({ depth }) => {
    const [moduleTwoState, setModuleTwoState] = React.useState({ data: 'modeleTwo', status: 'READY' });
    useModuleLifecycle('moduleTwo');
    return (
        <module name="moduleTwo" depth={depth}>
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
*/

export const Root = () => {
    useModuleLifecycle('root');
    const [rootState, setRootState] = React.useState({ status: 'NOT_READY' });
    useModuleInitTimeout(1000, setRootState);
    return (
        <ServiceTwo depth={1}>
            <ServiceOne depth={2}>
                { rootState.status === 'READY' && <PluginOne depth={3} data={{}} /> }
            </ServiceOne>
        </ServiceTwo>
    );
};
