import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        globals: true,
        coverage: {
            provider: "v8",
            reportsDirectory: "coverage",
            reporter: ["text", "html", "lcov"],
            all: true,
            include: ["src/**/*.ts"],
            exclude: [
                "src/pl/**",
                "src/dal/students.sample.json",
                "src/domain/IStudentRepository.ts",
                "src/domain/DiplomaWithHonors.ts"
            ]
        }
    }
})
