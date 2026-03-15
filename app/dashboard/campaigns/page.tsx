import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { campaigns, teamMembers, users } from "@/lib/db/schema";

export default async function CampaignsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const [membership] = await db
    .select({ teamId: teamMembers.teamId })
    .from(teamMembers)
    .where(eq(teamMembers.userId, session.userId))
    .limit(1);

  if (!membership) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No team access</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You must be a member of a team to view or create campaigns.</p>
        </CardContent>
      </Card>
    );
  }

  const allCampaigns = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.teamId, membership.teamId));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
        <Button asChild>
          <Link href="/dashboard/campaigns/create">Create campaign</Link>
        </Button>
      </div>
      {allCampaigns.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="mb-4">No campaigns found yet.</p>
            <Button asChild>
              <Link href="/dashboard/campaigns/create">Start new campaign</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allCampaigns.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle>{c.name}</CardTitle>
                <div className="text-sm text-muted-foreground font-medium truncate">{c.subject}</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground truncate">{c.content.slice(0, 120)}…</div>
                <Button className="w-full" asChild variant="secondary">
                  <Link href={`/dashboard/campaigns/${c.id}`}>View details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}