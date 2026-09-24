#!/usr/bin/env node
import { program } from "@commander-js/extra-typings";
import { name, version } from "../package.json";
import { existsSync } from "fs";
import { copyAssetsDirectory } from "./modules/copy-assets-directory/copy-assets-directory";
import { createSourceFiles } from "./modules/create-source-files/create-source-files";
import { createTemporaryDirectory } from "./modules/temporary-directory/create-temporary-directory";
import { installTemporaryDirectory } from "./modules/temporary-directory/install-temporary-directory";
import { renderTemplates } from "./modules/render-templates/render-templates";

program
    .name(name)
    .description("This tool helps to scaffold a library that you can publish to NPM.")
    .version(version)
    .argument("library-name", "Name of the library")
    .requiredOption("--personal-github-username <string>", "Your github username")
    .requiredOption("--personal-name <string>", "Your personal name")
    .requiredOption("--personal-email <string>", "Your personal email")
    .option("--directory <string>", "Path where the library should be located (e.g. `../example`)")
    .action(async (libraryName, { personalGithubUsername, personalName, personalEmail, directory }) => {
        const libraryDirectoryPath = directory ?? libraryName;
        const libraryDirectoryExists = existsSync(libraryDirectoryPath);

        if (libraryDirectoryExists) throw new Error(`Library directory already exists at '${libraryDirectoryPath}'.`);

        const temporaryDirectoryPath = await createTemporaryDirectory();
        const currentDirectoryPath = import.meta.dirname;

        await Promise.all([
            copyAssetsDirectory(currentDirectoryPath, temporaryDirectoryPath),
            createSourceFiles(temporaryDirectoryPath, libraryName),
            renderTemplates(
                currentDirectoryPath,
                temporaryDirectoryPath,
                libraryName,
                personalGithubUsername,
                personalName,
                personalEmail,
            ),
        ]);

        await installTemporaryDirectory(temporaryDirectoryPath, libraryDirectoryPath);
    });

program.parse();
