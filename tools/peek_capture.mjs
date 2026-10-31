import fs from "node:fs/promises";

const root = JSON.parse(
  (await fs.readFile(process.argv[2], "utf8")).replace(/^\uFEFF/, ""),
);

function size(v) {
  try {
    return JSON.stringify(v).length;
  } catch {
    return -1;
  }
}

for (const [k, v] of Object.entries(root)) {
  console.log(
    k.padEnd(24),
    Array.isArray(v) ? `array(${v.length})` : typeof v,
    size(v),
  );
}
