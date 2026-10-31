// End-to-end smoke test: create project -> agent turn -> build -> preview serves files.
const BASE = process.env.BASE ?? "http://127.0.0.1:3100";

const post = (path, body) =>
  fetch(BASE + path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

async function main() {
  const created = await post("/api/projects", { name: "Smoke test" }).then((r) => r.json());
  const id = created.project.id;
  console.log("project:", id);

  const res = await post("/api/turns", {
    projectId: id,
    message: "Build a landing page for a coffee subscription called Night Owl Roasters.",
  });
  if (!res.body) throw new Error("no SSE body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  const seen = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let i;
    while ((i = buf.indexOf("\n\n")) >= 0) {
      const chunk = buf.slice(0, i);
      buf = buf.slice(i + 2);
      const line = chunk.split("\n").find((l) => l.startsWith("data: "));
      if (!line) continue;
      const ev = JSON.parse(line.slice(6));
      seen.push(ev.type);
      if (ev.type === "build_completed") console.log("build:", ev.ok, ev.ms + "ms");
      if (ev.type === "assistant") console.log("assistant:", ev.text.slice(0, 120));
      if (ev.type === "error") console.log("error:", ev.message);
      if (ev.type === "version") console.log("version:", ev.sha);
    }
  }
  console.log("events:", [...new Set(seen)].join(","));

  const proj = await fetch(`${BASE}/api/projects/${id}`).then((r) => r.json());
  console.log("files:", proj.files.map((f) => f.path).join(" "));
  console.log("versions:", proj.versions.length, "buildOk:", proj.meta.lastBuildOk);

  const html = await fetch(`${BASE}/api/preview/${id}/`).then((r) => r.text());
  console.log("preview html bytes:", html.length, "has app.js:", html.includes("assets/app.js"));
  const js = await fetch(`${BASE}/api/preview/${id}/assets/app.js`).then((r) => r.status);
  const css = await fetch(`${BASE}/api/preview/${id}/assets/app.css`).then((r) => r.status);
  console.log("asset status js/css:", js, css);
  console.log("OK");
}

main().catch((e) => {
  console.error("SMOKE FAILED:", e.message);
  process.exit(1);
});
