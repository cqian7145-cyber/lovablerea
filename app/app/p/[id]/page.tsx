import { notFound } from "next/navigation";
import { readMeta } from "@/lib/projects";
import Workspace from "@/components/Workspace";

export const dynamic = "force-dynamic";

export default async function ProjectPage(ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const meta = await readMeta(id);
    return <Workspace id={id} initialName={meta.name} />;
  } catch {
    notFound();
  }
}
