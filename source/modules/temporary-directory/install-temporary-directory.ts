import childProcess from "child_process";
import fs from "fs/promises";

export async function installTemporaryDirectory(
    temporaryDirectoryPath: string,
    libraryDirectoryPath: string,
): Promise<void> {
    childProcess.execSync("vp install", { cwd: temporaryDirectoryPath, stdio: "inherit" });
    await fs.cp(temporaryDirectoryPath, libraryDirectoryPath, { recursive: true });
    childProcess.execSync("git init -b main", { cwd: libraryDirectoryPath, stdio: "inherit" });
    childProcess.execSync("vp check --fix", { cwd: libraryDirectoryPath, stdio: "inherit" });
}
