import "dotenv/config"

interface EnvSchema {
    SQLITE_DB: string
}

function validateEnv(env: Partial<EnvSchema>) {
    if (typeof env?.SQLITE_DB !== "string") {
        throw Error("Invalid env!")
    }
}

function getEnv(): EnvSchema {
    const env = process.env as any
    validateEnv(env);
    return env;
}

export const env = getEnv();