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

export const OldRoot = ({depth}) => {
    useModuleLifecycle('oldRoot');
    const [rootState, setRootState] = React.useState({ status: 'NOT_READY' });
    useModuleInitTimeout(1000, setRootState);
    return (
        <ModuleOne depth={depth + 1}>
            <ServiceTwo depth={depth + 2}>
                <ServiceOne depth={depth + 3}>
                    { rootState.status === 'READY' && <PluginOne depth={depth + 4} data={{}} /> }
                </ServiceOne>
            </ServiceTwo>
            <PluginTwo depth={depth + 2} data={rootState}>
                <ServiceThree depth={depth + 3} />
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

export const Entry = ({children, depth}) => (
    <module name="ENTRY" depth={depth}>{children}</module>
)

export const EntryErrorPage = ({depth}) => (
    <plugin name="EntryErrorPage" depth={depth}/>
)

export const SpinnerPage = ({depth}) => (
    <plugin name="SpinnerPage" depth={depth}/>
)

export const AppCore = ({depth, children}) => (
    <module name="AppCore" depth={depth}>
        {children}
    </module>
)

const STATUSES_CHAIN = [EntryStatus.ERROR, EntryStatus.LOADING, EntryStatus.READY];

export const NewRoot = () => {
    const [entryStatusState, setEntryStatus] = React.useState({ status: EntryStatus.LOADING });
    const updateStatus = React.useCallback(
        ({ status }) => {
            console.info('update status: %s', status)
            setEntryStatus({ status })
        },
        [setEntryStatus],
    )
    useModuleStatusTimeout(2000, updateStatus, STATUSES_CHAIN);
    return (
        <Entry depth={1}>
            <Switch status={entryStatusState.status}>
                <control-state status={EntryStatus.ERROR} depth={2}>
                    <EntryErrorPage depth={3}/>
                </control-state>
                <control-state status={EntryStatus.LOADING} depth={2}>
                    <SpinnerPage depth={3}/>
                </control-state>
                <control-state status={EntryStatus.READY} depth={2}>
                    <AppCore depth={3}>
                        <OldRoot depth={4}/>
                    </AppCore>
                </control-state>
            </Switch>
        </Entry>
    )
}
