import { EventEmitter } from 'tsee';

const createId = (count) => `test-id-${count}`

const createProduct = ({ factoryId, name, id }) => ({
  price: 0,
  factoryId,
  name,
})

const eventUpdate = (payload, seq) => ({ type: 'UPDATE', payload, seq })
const eventCreate = (payload, seq) => ({ type: 'CREATE', payload, seq })

const productNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']

export const testProductStream = (factoryId = 'test-factory-1') => {
  const emitter = new EventEmitter()
  let intervalId = null
  let blockCount = 0
  let productCount = 0
  const connect = () => {
    let currentProduct = null
    intervalId = setInterval(() => {
      if ((blockCount % 3) === 0) {
        currentProduct = createProduct({
          factoryId,
          name: 'default',
          id: createId(productCount),
        })
        emitter.emit('data', eventCreate(currentProduct, blockCount))
        productCount++
      } else if ((blockCount % 3) === 1) {
        currentProduct = {
          ...currentProduct,
          price: currentProduct.price + blockCount,
        }
        emitter.emit('data', eventUpdate(currentProduct, blockCount))
      } else if ((blockCount % 3) === 2) {
        currentProduct = {
          ...currentProduct,
          name: productNames[productCount - 1],
        }
        emitter.emit('data', eventUpdate(currentProduct, blockCount))
      }
      blockCount++
    }, 1000)
  }
  const disconnect = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
      blockCount = 0
      productCount = 0
    }
  }

  return {
    connect,
    disconnect,
    emitter
  }
}
