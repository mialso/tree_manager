import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';

export const ServiceThree = () => {
    useModuleLifecycle('serviceThree');
    return (
        <service name="serviceThree" />
    );
};
