import React, { useEffect } from 'react';
import { testProductStream } from './product'

export const TestIndex = () => {
  const { connect, disconnect, emitter } = testProductStream()
  
  useEffect(() => {
    emitter.on('data', (data) => {
      console.log('emitter data', data)
    })
    connect()
    return () => disconnect()
  }, [])

  return (
    <stream>
      <model name="product">
        <field name="price" />
      </model>
    </stream>
  )
}
