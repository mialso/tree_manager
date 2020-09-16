import React from 'react';
import { dispatch } from '../bus/messageBus';
import { MODULE_MOUNT, MODULE_UNMOUNT } from '../bus/message';

export function useModuleLifecycle(moduleId) {
    React.useEffect(() => {
        dispatch(`${MODULE_MOUNT}_${moduleId}`);
        return () => {
            dispatch(`${MODULE_UNMOUNT}_${moduleId}`);
        };
    });
}
