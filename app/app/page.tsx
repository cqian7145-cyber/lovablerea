import Link from "next/link";
import { listProjects } from "@/lib/projects";
import NewProject from "@/components/NewProject";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await listProjects();

  return (
    <div className="shell">
      <aside className="rail">
        <div className="rail-top">
          <span className="logo" />
          <span className="rail-title">Foundry</span>
        </div>
        <div className="rail-section">Projects</div>
        <div className="rail-list">
          {projects.map((p) => (
            <Link key={p.id} href={`/p/${p.id}`} className="rail-item">
              {p.name}
            </Link>
          ))}
        </div>
        <div className="rail-foot">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <span className="name">Dashboard</span>
          <span className="spacer" />
          <span className="pill">local sandbox</span>
        </div>
        <div className="home">
          <div className="home-card">
            <h1>What should we build today?</h1>
            <p>
              Describe an app. The agent plans, writes real files into a per-project sandbox,
              bundles them with esbuild, and the preview reloads when the build turns green.
            </p>
            <NewProject />
            <div className="project-grid">
              {projects.map((p) => (
                <Link key={p.id} href={`/p/${p.id}`} className="project-card">
                  <strong>{p.name}</strong>
                  <span>
                    {p.lastBuildOk === true ? "Build OK" : p.lastBuildOk === false ? "Build failing" : "Not built yet"}
                    {" · "}
                    {p.versions ?? 0} versions
                  </span>
                  <span>{new Date(p.updatedAt).toLocaleString()}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
