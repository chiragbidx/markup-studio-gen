import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { campaigns, teamMembers, users } from "@/lib/db/schema";

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const [membership] = await db
    .select({ teamId: teamMembers.teamId, userId: teamMembers.userId })
    .from(teamMembers)
    .where(eq(teamMembers.userId, session.userId))
    .limit(1);

  if (!membership) {
    redirect("/dashboard/campaigns");
  }

  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.id, params.id))
    .limit(1);

  if (!campaign || campaign.teamId !== membership.teamId) {
    notFound();
  }

  const [creator] = await db
    .select({ firstName: users.firstName, lastName: users.lastName })
    .from(users)
    .where(eq(users.id, campaign.createdByUserId))
    .limit(1);

  async function deleteCampaign() {
    "use server";
    await db.delete(campaigns).where(eq(campaigns.id, campaign.id));
    redirect("/dashboard/campaigns");
  }

  return (
    <div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>
            {campaign.name}
            <span className="block text-sm text-muted-foreground font-medium mt-1">{campaign.subject}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Content:</strong>
            <div className="mt-2 px-2 py-1 rounded bg-muted/60 text-sm whitespace-pre-wrap">{campaign.content}</div>
          </div>
          <div>
            <strong>Created by:</strong> {creator?.firstName} {creator?.lastName}
          </div>
          <form action={deleteCampaign} className="pt-4 flex flex-col gap-2">
            <Button type="submit" variant="destructive">
              Delete Campaign
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}