import type { Config } from "@jest/types";
export default async (): Promise<Config.InitialOptions> => {
    return {
        preset: "ts-jest",
        displayName: {
            name: "SEEKH",
            color: "greenBright",
        },
        verbose: true,
        testMatch: ["**/**/*.test.ts"],
        testEnvironment: "node",
        detectOpenHandles: true,
        collectCoverage: true,
        forceExit: true,
    };
};