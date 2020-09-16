import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';

export const ServiceTwo = ({ depth, children }) => {
    useModuleLifecycle('serviceTwo');
    return (
        <service name="serviceTwo" depth={depth}>
            {children}
        </service>
    );
};
