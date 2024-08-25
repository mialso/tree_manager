export type Event<P = unknown, M = unknown> = {
    type: string
    payload: P
    meta?: M
}

