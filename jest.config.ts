import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "@/core/(.*)": "<rootDir>/src/core/$1",
        "@/adapters/(.*)": "<rootDir>/src/adapters/$1",
        "@/frameworks/(.*)": "<rootDir>/src/frameworks/$1",
        "@/data/(.*)": "<rootDir>/src/data/$1",
        "@/utils/(.*)": "<rootDir>/src/utils/$1",
        "@/services/(.*)": "<rootDir>/src/services/$1",
        "@/mocks/(.*)": "<rootDir>/tests/mocks/$1",
        "@/config/(.*)": "<rootDir>/config/$1",
    },
};

export default config;
