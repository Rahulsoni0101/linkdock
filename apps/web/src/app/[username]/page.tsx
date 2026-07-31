import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePreview } from "@/components/PagePreview";
import { API_URL } from "@/lib/api";
import type { PublicPage } from "@/lib/types";
import { ViewTracker } from "./ViewTracker";

export const dynamic = "force-dynamic";

async function getPage(username: string): Promise<PublicPage | null> {
  try {
    const res = await fetch(`${API_URL}/api/page/${username}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const page = await getPage(username);
  if (!page) return { title: "Page not found" };
  return {
    title: page.profile.seoTitle || `${page.user.displayName || page.user.username} | LinkDock`,
    description: page.profile.seoDescription || page.user.bio || `${page.user.username}'s links`,
    openGraph: {
      title: page.user.displayName || page.user.username,
      description: page.user.bio || undefined,
      type: "website",
    },
  };
}

export default async function PublicPageRoute({ params }: Props) {
  const { username } = await params;
  const page = await getPage(username);
  if (!page) notFound();

  return (
    <main className="fixed inset-0">
      <PagePreview
        displayName={page.user.displayName}
        bio={page.user.bio}
        avatar={page.user.avatar}
        profile={page.profile}
        links={page.links}
        socials={page.socials}
        interactive
      />
      <ViewTracker username={username} />
    </main>
  );
}
