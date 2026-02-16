import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["index.ts"],
    outDir: "dist",
    clean: true,
    bundle: true,
    minify: true,
    treeshake: true,
})