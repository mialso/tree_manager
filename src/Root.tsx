import React from 'react';
import { useModuleLifecycle, useModuleInitTimeout, useModuleStatusTimeout } from './manager/hooks';
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

export const Switch = ({status, children}) => {
    let element, match
    React.Children.forEach(children, (child) => {
        if (match) {
            return
        }
        element = child
        if (child.props.status === status) {
            match = true
        }

    })
    return match
        // ? React.Children.only(element.children)
        ? element
        : null
}

enum EntryStatus {
    ERROR = 'ENTRY_ERROR',
    LOADING  = 'ENTRY_LOADING',
    READY = 'ENTRY_READY',
}

export const Entry = ({children}) => (
    <module name="ENTRY" depth={1}>{children}</module>
)

export const EntryErrorPage = () => (
    <plugin name="EntryErrorPage" depth={2}/>
)

export const SpinnerPage = () => (
    <plugin name="SpinnerPage" depth={2}/>
)

export const AppCore = () => (
    <module name="AppCore" depth={2} />
)

const STATUSES_CHAIN = [EntryStatus.ERROR, EntryStatus.LOADING, EntryStatus.READY];

export const NewRoot = () => {
    const [entryStatusState, setEntryStatus] = React.useState({ status: EntryStatus.LOADING });
    useModuleStatusTimeout(2000, setEntryStatus, STATUSES_CHAIN);
    return (
        <Entry>
            <Switch status={entryStatusState.status}>
                <control-state status={EntryStatus.ERROR}>
                    <EntryErrorPage />
                </control-state>
                <control-state status={EntryStatus.LOADING}>
                    <SpinnerPage/>
                </control-state>
                <control-state status={EntryStatus.READY}>
                    <AppCore/>
                </control-state>
            </Switch>
        </Entry>
    )
}
