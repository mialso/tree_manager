import React from 'react';
import { useModuleLifecycle, useModuleInitTimeout } from './manager/hooks';
import { PluginOne } from './plugin/PluginOne';
import { PluginTwo } from './plugin/PluginTwo';
import { ServiceOne } from './one/ServiceOne';
import { ServiceTwo } from './two/ServiceTwo';
import { ServiceThree } from './two/ServiceThree';

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
*/

export const ModuleOne = ({ depth, children }) => {
    useModuleLifecycle('moduleOne');
    return (
        <module name="moduleOne" depth={depth}>
            {children}
        </module>
    );
};

export const Root = () => {
    useModuleLifecycle('root');
    const [rootState, setRootState] = React.useState({ status: 'NOT_READY' });
    useModuleInitTimeout(1000, setRootState);
    return (
        <ModuleOne depth={1}>
            <ServiceTwo depth={2}>
                <ServiceOne depth={3}>
                    { rootState.status === 'READY' && <PluginOne depth={4} data={{}} /> }
                </ServiceOne>
            </ServiceTwo>
            <PluginTwo depth={2} data={rootState}>
                <ServiceThree depth={3} />
            </PluginTwo>
        </ModuleOne>
    );
};
