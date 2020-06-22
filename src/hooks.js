import React from 'react';
import { dispatch } from './messageBus.js';
import { MODULE_MOUNT, MODULE_UNMOUNT } from './message.js';

export function useModuleLifecycle(moduleId) {
    React.useEffect(() => {
        dispatch(`${MODULE_MOUNT}_${moduleId}`);
        return () => {
            dispatch(`${MODULE_UNMOUNT}_${moduleId}`);
        };
    });
}
