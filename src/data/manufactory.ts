import { EventEmitter } from 'tsee';
import type { Stream } from '../manager/stream'
import { eventCreate, eventUpdate } from './event';

const createId = (count: number) => `test-factory-${count}`

type Manufactory = {
    id: string
    name: string
}
const createManufactory = ({ name, id }: Partial<Manufactory>): Manufactory => ({
    id,
    name,
})

export const testManufactoryStream = (): Stream => {
    const emitter = new EventEmitter()
    let intervalId: NodeJS.Timeout | null = null
    const initialManufactoryData: Manufactory[] = [
        createManufactory({ name: 'first', id: createId(1) }),
        createManufactory({ name: 'second', id: createId(2) }),
    ]
    let blockCount = initialManufactoryData.length - 1
    const connect = () => {
        if (intervalId) return
        intervalId = setInterval(() => {
            const itemIndex = blockCount % 2
            const currentManufactory: Manufactory | undefined = initialManufactoryData[itemIndex]
            if (currentManufactory) {
                const updated = {
                    ...currentManufactory,
                    name: `${currentManufactory.name}-upd-${blockCount}`,
                }
                emitter.emit('data', eventUpdate(updated, blockCount))
                blockCount++
            }
        }, 4000)
        initialManufactoryData.forEach((manufactory, index) => {
            emitter.emit('data', eventCreate(manufactory, index))
        })
    }
    const disconnect = () => {
        if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
            blockCount = 0
        }
    }

    return {
        name: 'testManufactoryStream <1>',
        connect,
        disconnect,
        emitter,
    }
}
