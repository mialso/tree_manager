export const LOG_LEVEL = {
    FATAL: 1,
    ERROR: 2,
    WARN: 3,
    INFO: 4,
    DEBUG: 5,
    TRACE: 6,
} as const

export type LogSeverity = typeof LOG_LEVEL[keyof typeof LOG_LEVEL]
