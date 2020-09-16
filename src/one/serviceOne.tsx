import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';

export const ServiceOne = ({ depth, children }) => {
    useModuleLifecycle('serviceOne');
    return (
        <service name="serviceOne" depth={depth}>
            {children}
        </service>
    );
};

