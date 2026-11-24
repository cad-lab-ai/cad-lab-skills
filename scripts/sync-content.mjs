import { readFile, writeFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifests = [];
for (const item of await readdir(root, { withFileTypes: true })) {
  if (!item.isDirectory() || !item.name.startsWith("cad-lab-")) continue;
  const file = path.join(root, item.name, "skill-package.json");
  const manifest = JSON.parse(await readFile(file, "utf8"));
  if (manifest.agent) {
    const source = await readFile(path.join(root,item.name,"prompt.md"),"utf8").catch(error => {
      if (error.code !== "ENOENT") throw error;
      return readFile(path.join(root,item.name,"skills",manifest.skill,"SKILL.md"),"utf8");
    });
    manifest.agent.instructions = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/u, "").trim();
    await writeFile(file, JSON.stringify(manifest, null, 2) + "\n");
  }
  manifests.push(manifest);
}
const catalogIndex = process.argv.indexOf("--catalog");
if (catalogIndex !== -1) {
  const file = process.argv[catalogIndex + 1];
  if (!file) throw new Error("--catalog requires a path");
  const catalog = JSON.parse(await readFile(file, "utf8"));
  catalog.skills = manifests.map(manifest => ({
    ...manifest,
    source: catalog.skills.find(entry => entry.id === manifest.id)?.source ?? {
      url: "https://github.com/cad-lab-ai/cad-lab-skills.git", ref: "main", subdir: manifest.id,
    },
  }));
  await writeFile(file, JSON.stringify(catalog, null, 2) + "\n");
}
