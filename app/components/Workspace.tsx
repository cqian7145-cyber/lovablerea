"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Meta = {
  id: string;
  name: string;
  updatedAt: string;
  lastBuildOk: boolean | null;
  lastBuildMs: number | null;
  lastError: string | null;
  lastCommit: string | null;
  versions: number;
};

type Version = { sha: string; date: string; subject: string };
type FileEntry = { path: string; size: number };

type TurnEvent =
  | { type: "status"; text: string }
  | { type: "plan"; steps: string[] }
  | { type: "tool_call"; id: string; name: string; args: Record<string, unknown> }
  | { type: "tool_result"; id: string; name: string; ok: boolean; result: unknown }
  | { type: "file_edited"; path: string }
  | { type: "build_started" }
  | { type: "build_completed"; ok: boolean; ms: number; buildId: string; errors: unknown[] }
  | { type: "assistant"; text: string }
  | { type: "version"; sha: string | null }
  | { type: "error"; message: string }
  | { type: "done"; provider: string; steps: number };

type Item =
  | { kind: "user"; text: string }
  | { kind: "assistant"; text: string }
  | { kind: "event"; event: TurnEvent };

export default function Workspace({ id, initialName }: { id: string; initialName: string }) {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [versions, setVersions] = useState<Version[]>([]);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"preview" | "files" | "versions">("preview");
  // Starts at 0 on the server and on the first client render (identical HTML),
  // then becomes a real timestamp after mount so the iframe never hydrates with
  // a mismatched src.
  const [previewKey, setPreviewKey] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreviewKey(Date.now());
  }, []);

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/projects/${id}`, { cache: "no-store" });
    if (!res.ok) return;
    const json = await res.json();
    setMeta(json.meta);
    setFiles(json.files ?? []);
    setVersions(json.versions ?? []);
  }, [id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    timelineRef.current?.scrollTo({ top: timelineRef.current.scrollHeight });
  }, [items]);

  const openFile = useCallback(
    async (path: string) => {
      setSelected(path);
      const res = await fetch(`/api/projects/${id}/files?path=${encodeURIComponent(path)}`);
      const json = await res.json();
      setCode(json.content ?? json.error ?? "");
    },
    [id],
  );

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);
    setItems((prev) => [...prev, { kind: "user", text }]);

    try {
      const res = await fetch("/api/turns", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectId: id, message: text }),
      });
      if (!res.body) throw new Error("no stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n\n")) >= 0) {
          const chunk = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            let event: TurnEvent;
            try {
              event = JSON.parse(line.slice(6));
            } catch {
              continue;
            }
            handleEvent(event);
          }
        }
      }
    } catch (err) {
      setItems((prev) => [
        ...prev,
        { kind: "event", event: { type: "error", message: (err as Error).message } },
      ]);
    } finally {
      setBusy(false);
      void refresh();
    }
  }

  function handleEvent(event: TurnEvent) {
    if (event.type === "assistant") {
      setItems((prev) => [...prev, { kind: "assistant", text: event.text }]);
    } else {
      setItems((prev) => [...prev, { kind: "event", event }]);
    }
    if (event.type === "build_completed" && event.ok) setPreviewKey(Date.now());
  }

  async function revert(sha: string) {
    setBusy(true);
    try {
      await fetch(`/api/projects/${id}/revert`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sha }),
      });
      setPreviewKey(Date.now());
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shell">
      <aside className="rail">
        <div className="rail-top">
          <span className="logo" />
          <span className="rail-title">Foundry</span>
        </div>
        <div className="rail-section">Workspace</div>
        <div className="rail-list">
          <a className="rail-item" href="/">
            ← All projects
          </a>
          <div className="rail-section">Files</div>
          {files.map((f) => (
            <button
              key={f.path}
              className={`rail-item ${selected === f.path ? "active" : ""}`}
              style={{ textAlign: "left", border: "none", width: "100%" }}
              onClick={() => {
                setTab("files");
                void openFile(f.path);
              }}
            >
              {f.path}
            </button>
          ))}
        </div>
        <div className="rail-foot">{meta?.lastCommit ? `HEAD ${meta.lastCommit}` : "no commits yet"}</div>
      </aside>

      <main className="main">
        <div className="topbar">
          <span className="name">{meta?.name ?? initialName}</span>
          {meta?.lastBuildOk === true && <span className="pill ok">build ok · {meta.lastBuildMs}ms</span>}
          {meta?.lastBuildOk === false && <span className="pill bad">build failing</span>}
          <span className="spacer" />
          <button onClick={() => setPreviewKey(Date.now())}>Refresh preview</button>
        </div>

        <div className="split">
          <section className="chat">
            <div className="timeline" ref={timelineRef}>
              {items.length === 0 && (
                <div className="event">
                  <span className="dot" />
                  Describe the app you want. The agent writes files, builds, and the preview reloads.
                </div>
              )}
              {items.map((item, i) => {
                if (item.kind === "user") {
                  return (
                    <div key={i} className="msg user">
                      <div className="role">You</div>
                      {item.text}
                    </div>
                  );
                }
                if (item.kind === "assistant") {
                  return (
                    <div key={i} className="msg assistant">
                      <div className="role">Agent</div>
                      {item.text}
                    </div>
                  );
                }
                return <EventRow key={i} event={item.event} />;
              })}
              {busy && (
                <div className="event work">
                  <span className="dot" />
                  working…
                </div>
              )}
            </div>

            <div className="composer">
              <textarea
                value={input}
                placeholder="Describe a change or a new app…"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void send();
                }}
              />
              <div className="composer-row">
                <button className="primary" onClick={() => void send()} disabled={busy || !input.trim()}>
                  {busy ? "Working…" : "Send"}
                </button>
                <span className="hint">Cmd/Ctrl + Enter</span>
                <span className="spacer" />
                <span className="hint">{meta?.versions ?? 0} versions</span>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="tabs">
              {(["preview", "files", "versions"] as const).map((t) => (
                <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                  {t === "preview" ? "Preview" : t === "files" ? "Files" : "Versions"}
                </button>
              ))}
              <span className="spacer" />
              <span className="hint">{meta?.lastError ? "last build failed" : "sandbox: local esbuild"}</span>
            </div>

            {tab === "preview" && (
              <div className="frame-wrap">
                <iframe
                  key={previewKey}
                  title="Project preview"
                  src={`/api/preview/${id}/?v=${previewKey}`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            )}

            {tab === "files" && (
              <div className="files">
                <div className="file-list">
                  {files.map((f) => (
                    <button
                      key={f.path}
                      className={selected === f.path ? "active" : ""}
                      onClick={() => void openFile(f.path)}
                    >
                      {f.path}
                    </button>
                  ))}
                </div>
                <pre className="code">{code || "Select a file…"}</pre>
              </div>
            )}

            {tab === "versions" && (
              <div className="versions">
                {versions.length === 0 && <div className="hint">No versions yet — send a prompt to create one.</div>}
                {versions.map((v) => (
                  <div key={v.sha} className="version">
                    <span className="sha">{v.sha}</span>
                    <span className="subject">{v.subject}</span>
                    <button onClick={() => void revert(v.sha)} disabled={busy}>
                      Revert
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function EventRow({ event }: { event: TurnEvent }) {
  switch (event.type) {
    case "status":
      return (
        <div className="event work">
          <span className="dot" />
          {event.text}
        </div>
      );
    case "plan":
      return (
        <div className="plan">
          <ul>
            {event.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      );
    case "tool_call":
      return (
        <div className="event work">
          <span className="dot" />
          <code>{event.name}</code>
          {typeof event.args?.path === "string" ? <span>{event.args.path as string}</span> : null}
        </div>
      );
    case "tool_result": {
      const r = event.result as Record<string, unknown> | undefined;
      const detail =
        event.name === "run_build"
          ? r?.ok
            ? `built in ${r.ms}ms`
            : `${(r?.errors as unknown[])?.length ?? 0} error(s)`
          : event.name === "read_file"
            ? `${String(r?.bytes ?? "")} bytes`
            : "";
      return (
        <div className={`event ${event.ok ? "ok" : "bad"}`}>
          <span className="dot" />
          <code>{event.name}</code>
          <span>{detail}</span>
        </div>
      );
    }
    case "file_edited":
      return (
        <div className="event">
          <span className="dot" />
          Edited <code>{event.path}</code>
        </div>
      );
    case "build_started":
      return (
        <div className="event work">
          <span className="dot" />
          Building…
        </div>
      );
    case "build_completed":
      return (
        <div className={`event ${event.ok ? "ok" : "bad"}`}>
          <span className="dot" />
          {event.ok ? `Build ok · ${event.ms}ms` : `Build failed · ${event.errors.length} error(s)`}
        </div>
      );
    case "version":
      return (
        <div className="event ok">
          <span className="dot" />
          {event.sha ? `Version ${event.sha}` : "No file changes to commit"}
        </div>
      );
    case "error":
      return (
        <div className="event bad">
          <span className="dot" />
          {event.message}
        </div>
      );
    case "done":
      return (
        <div className="event">
          <span className="dot" />
          turn complete · {event.provider} · {event.steps} steps
        </div>
      );
    default:
      return null;
  }
}
