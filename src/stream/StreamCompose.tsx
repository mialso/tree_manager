import React from 'react';
import { testProductStream } from './product'

export const MergedSnapshot = () => {
    return (
        <snapshot name="product-price" byId>
            <stream stream={testProductStream('factory-1')}>
                <model name="product">
                    <field name="price" />
                </model>
            </stream>
            <stream stream={testProductStream('factory-2')}>
                <model name="product">
                    <field name="price" />
                </model>
            </stream>
        </snapshot>
    )
}

