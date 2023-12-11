declare global {
    namespace NodeJS {
        interface ProcessEnv {
            LOG_LEVEL: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace',
            PRETTY_LOGS: 'true' | 'false',
            PORT: String
        }
    }
}

export { }