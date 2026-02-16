import { setLogger } from "bootpress/helpers";
import { LoggerOptions, pino } from "pino";

export function configureLogger() {
    const prettyLogConfig: LoggerOptions = process.env.PRETTY_LOGS === "true" ? {
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
            }
        }
    } : {};

    setLogger(
        pino(
            {
                level: process.env.LOG_LEVEL,
                ...prettyLogConfig
            }
        )
    );
}