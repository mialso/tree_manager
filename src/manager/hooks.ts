import React from 'react';
import { dispatch } from '../bus/messageBus';
import { MODULE_MOUNT, MODULE_UNMOUNT } from '../bus/message';

export function useModuleLifecycle(moduleId) {
    React.useEffect(() => {
        dispatch(`${MODULE_MOUNT}_${moduleId}`);
        return () => {
            dispatch(`${MODULE_UNMOUNT}_${moduleId}`);
        };
    }, []);
}

export function useModuleInitTimeout(msec, setState) {
    React.useEffect(() => {
        setTimeout(() => setState({ status: 'READY' }), msec);
        setTimeout(() => setState({ status: 'NOT_READY' }), msec * 2);
        return () => {
            setState({ status: 'NOT_READY' });
        };
    }, [msec, setState]);
}

export function useModuleStatusTimeout(msec, setState, statuses) {
    React.useEffect(() => {
        setTimeout(() => setState({ status: statuses[1] }), msec);
        setTimeout(() => setState({ status: statuses[2] }), msec * 2);
        setTimeout(() => setState({ status: statuses[0] }), msec * 3);
        return () => {
            setState({ status: statuses[0] });
        };
    }, [msec, setState, statuses]);
}
