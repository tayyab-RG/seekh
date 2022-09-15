import type { Config } from "@jest/types";
export default async (): Promise<Config.InitialOptions> => {
    return {
        preset: "ts-jest",
        displayName: {
            name: "SEEKH-SDK",
            color: "greenBright",
        },
        verbose: true,
        testMatch: ["**/**/test.spec.ts"],
        testEnvironment: "node",
        detectOpenHandles: true,
        collectCoverage: true,
        forceExit: true,
    };
};