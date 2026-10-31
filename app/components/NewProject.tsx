"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProject() {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function create() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: name || "Untitled project" }),
      });
      const json = await res.json();
      if (json?.project?.id) router.push(`/p/${json.project.id}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="new-row">
      <input
        value={name}
        placeholder="Name your project…"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") void create();
        }}
      />
      <button className="primary" onClick={() => void create()} disabled={busy}>
        {busy ? "Creating…" : "Create project"}
      </button>
    </div>
  );
}
