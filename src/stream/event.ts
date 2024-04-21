type Event<P> = {
    type: string
    payload: P
    seq: number
}

export const eventUpdate = <P>(payload: P, seq: number): Event<P> => ({ type: 'UPDATE', payload, seq })
export const eventCreate = <P>(payload: P, seq: number): Event<P> => ({ type: 'CREATE', payload, seq })

