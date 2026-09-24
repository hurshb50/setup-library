import path from "path";
import fs from "fs/promises";
import { afterEach, describe, expect, it } from "vite-plus/test";
import { createSourceFiles } from "./create-source-files";
import { TemporaryDirectoryManager } from "../temporary-directory/temporary-directory-manager";

const temporaryDirectories = new TemporaryDirectoryManager();

afterEach(() => temporaryDirectories.removeAll());

describe("createSourceFiles", () => {
    it("creates the source directory with a library file and a test file named after the library", async () => {
        const temporaryDirectoryPath = await temporaryDirectories.create();

        await createSourceFiles(temporaryDirectoryPath, "my-library");

        const libraryFileContent = await fs.readFile(
            path.join(temporaryDirectoryPath, "source", "my-library.ts"),
            "utf8",
        );
        const testFileContent = await fs.readFile(
            path.join(temporaryDirectoryPath, "source", "my-library.test.ts"),
            "utf8",
        );

        expect(libraryFileContent.length).toBeGreaterThan(0);
        expect(testFileContent).toContain('from "./my-library"');
    });

    it("throws when the source directory already exists", async () => {
        const temporaryDirectoryPath = await temporaryDirectories.create();
        await fs.mkdir(path.join(temporaryDirectoryPath, "source"));

        await expect(createSourceFiles(temporaryDirectoryPath, "my-library")).rejects.toThrow(
            "Source directory already exists",
        );
    });
});
