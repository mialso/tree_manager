import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';

export const ServiceOne = ({ children }) => {
    useModuleLifecycle('serviceOne');
    return (
        <service name="serviceOne">
            {children}
        </service>
    );
};
