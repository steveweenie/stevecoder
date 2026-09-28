// Creates a transparent PNG for every image slot in lib/*.ts that has no file yet.
// The labeled dashed box behind each <Slot> shows through until a real image replaces the file.
// Usage: npm run placeholders
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const PNG_1x1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
  "base64",
);
const files = new Set();
for (const f of readdirSync(join(root, "lib")).filter((f) => f.endsWith(".ts"))) {
  const src = readFileSync(join(root, "lib", f), "utf8");
  for (const m of src.matchAll(/img\(\s*"([^"]+)"/g)) files.add(m[1]);
}
let made = 0;
for (const file of files) {
  const out = join(root, "public/images", file);
  if (existsSync(out)) continue;
  if (!file.endsWith(".png")) {
    console.warn(`missing real image: public/images/${file}`);
    continue;
  }
  writeFileSync(out, PNG_1x1);
  made++;
}
console.log(`${files.size} slots, ${made} placeholders created`);
