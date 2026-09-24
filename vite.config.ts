import { defineConfig } from "vite-plus";

const configuration = defineConfig({
    fmt: {
        printWidth: 120,
        tabWidth: 4,
        sortPackageJson: false,
    },
    lint: {
        categories: { correctness: "error" },
        options: {
            typeAware: true,
            typeCheck: true,
        },
    },
    pack: {
        entry: "./source/setup-library.ts",
        outDir: "distribution",
        copy: ["assets", "templates"],
    },
    test: { passWithNoTests: true },
});

export default configuration;
