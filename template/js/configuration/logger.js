import { setLogger } from "bootpress/helpers/index.js";
import { pino } from "pino";

export function configureLogger() {
    const prettyLogConfig = process.env.PRETTY_LOGS === "true" ? {
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