import React from 'react';
import { StreamId, useStream } from './streamContext'

export const MergedSnapshot = () => {
    const product1Stream = useStream(StreamId.Product1)
    const product2tream = useStream(StreamId.Product2)
    return (
        <snapshot name="product-price" byId>
            <stream stream={product1Stream}>
                <model name="product">
                    <field name="price" />
                </model>
            </stream>
            <stream stream={product2tream}>
                <model name="product">
                    <field name="price" />
                </model>
            </stream>
        </snapshot>
    )
}

