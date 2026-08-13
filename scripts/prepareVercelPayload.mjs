import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const includeRoots = ["client", "server", "shared", "patches"];
const rootFiles = ["package.json", "pnpm-lock.yaml", "tsconfig.json", "vite.config.ts", "vercel.json", "components.json"];
const ignoredDirectories = new Set(["node_modules", "dist", ".git", ".manus-logs", "drizzle"]);

execFileSync(
  "pnpm",
  ["exec", "esbuild", "api/handler.ts", "--platform=node", "--packages=external", "--bundle", "--format=esm", "--outfile=api/index.js"],
  { cwd: root, stdio: "inherit" },
);

const files = [];
function addFile(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (fs.statSync(absolutePath).size > 1_000_000) return;
  files.push({ file: relativePath.split(path.sep).join("/"), data: fs.readFileSync(absolutePath, "utf8") });
}

function walk(relativeDirectory) {
  const absoluteDirectory = path.join(root, relativeDirectory);
  for (const entry of fs.readdirSync(absoluteDirectory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) walk(relativePath);
    else if (entry.isFile()) addFile(relativePath);
  }
}

for (const file of rootFiles) if (fs.existsSync(path.join(root, file))) addFile(file);
addFile("api/index.js");
for (const directory of includeRoots) if (fs.existsSync(path.join(root, directory))) walk(directory);

fs.writeFileSync(
  "/tmp/dart-flutter-vercel-deploy.json",
  JSON.stringify({
    name: "dart-flutter-learning-platform",
    target: "production",
    projectSettings: { framework: "vite", buildCommand: "pnpm build", outputDirectory: "dist/public" },
    files,
  }),
);
console.log(`Prepared ${files.length} source files for Vercel deployment.`);
