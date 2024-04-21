import { EventEmitter } from 'tsee';
import type { Stream } from '../manager/stream'

const createId = (count: number) => `test-id-${count}`

type Product = {
    id: string
    price: number
    name: string
    factoryId: string
}
const createProduct = ({ factoryId, name, id }: Partial<Product>): Product => ({
    id,
    price: 0,
    factoryId,
    name,
})

type Event<P> = {
    type: string
    payload: P
    seq: number
}

const eventUpdate = <P>(payload: P, seq: number): Event<P> => ({ type: 'UPDATE', payload, seq })
const eventCreate = <P>(payload: P, seq: number): Event<P> => ({ type: 'CREATE', payload, seq })

const productNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']

export const testProductStream = (factoryId = 'test-factory-1'): Stream => {
    const emitter = new EventEmitter()
    let intervalId: NodeJS.Timeout | null = null
    let blockCount = 0
    let productCount = 0
    const connect = () => {
        let currentProduct: Product | null = null
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
        emitter,
    }
}
