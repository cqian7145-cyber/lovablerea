import { NextRequest } from "next/server";
import { createProject, listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await listProjects();
  return Response.json({ projects });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const project = await createProject(String(body?.name ?? "Untitled project"));
  return Response.json({ project }, { status: 201 });
}
