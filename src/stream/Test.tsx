import React from 'react';
import { testProductStream } from './product'

export const TestIndex = () => {
    return (
        <stream stream={testProductStream}>
            <model name="product">
                <field name="price" />
            </model>
        </stream>
    )
}
