import React from 'react';
import { useModuleLifecycle } from '../manager/hooks';

export const ServiceThree = ({ depth }) => {
    useModuleLifecycle('serviceThree');
    return (
        <service name="serviceThree" depth={depth} />
    );
};
