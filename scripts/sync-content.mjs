import { readFile, writeFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const catalogFile = args.includes("--catalog") ? args[args.indexOf("--catalog") + 1] : undefined;
const tag = args.includes("--tag") ? args[args.indexOf("--tag") + 1] : undefined;
if (args.includes("--catalog") && (!catalogFile || catalogFile.startsWith("--") || !tag || tag.startsWith("--"))) {
  throw new Error("Usage: node scripts/sync-content.mjs --catalog <path> --tag <published-tag>");
}
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
    manifest.agent.instructions = source.replace(/\r\n?/g, "\n").replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/u, "").trim();
    await writeFile(file, JSON.stringify(manifest, null, 2) + "\n");
  }
  manifests.push(manifest);
}
if (catalogFile) {
  const catalog = JSON.parse(await readFile(catalogFile, "utf8"));
  catalog.skills = manifests.map(manifest => ({
    ...manifest,
    source: {
      url: "https://github.com/cad-lab-ai/cad-lab-skills.git", subdir: manifest.id,
      ...catalog.skills.find(entry => entry.id === manifest.id)?.source,
      ref: tag,
    },
  }));
  await writeFile(catalogFile, JSON.stringify(catalog, null, 2) + "\n");
}
