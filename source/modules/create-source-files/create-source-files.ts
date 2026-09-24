import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

export async function createSourceFiles(temporaryDirectoryPath: string, libraryName: string): Promise<void> {
    const sourceDirectoryPath = path.join(temporaryDirectoryPath, "source");
    const sourceDirectoryExists = existsSync(sourceDirectoryPath);

    if (sourceDirectoryExists) throw new Error("Source directory already exists");

    await fs.mkdir(sourceDirectoryPath);

    const libraryFileLines = [
        "export function add(firstNumber: number, secondNumber: number): number {",
        "    return firstNumber + secondNumber;",
        "}",
    ];

    const testFileLines = [
        'import { describe, expect, it } from "vite-plus/test";',
        "",
        `import { add } from "./${libraryName}";`,
        "",
        'describe("add", () => {',
        '    it("adds two numbers together", () => {',
        "        expect(add(1, 2)).toBe(3);",
        "    });",
        "});",
    ];

    await Promise.all([
        fs.writeFile(path.join(sourceDirectoryPath, `${libraryName}.ts`), libraryFileLines.join("\n")),
        fs.writeFile(path.join(sourceDirectoryPath, `${libraryName}.test.ts`), testFileLines.join("\n")),
    ]);
}
