import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { campaigns, teamMembers } from "@/lib/db/schema";

const campaignSchema = z.object({
  name: z.string().min(2, "Name required"),
  subject: z.string().min(2, "Subject required"),
  content: z.string().min(5, "Content required"),
});

export default async function CreateCampaignPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const [membership] = await db
    .select({ teamId: teamMembers.teamId })
    .from(teamMembers)
    .where(eq(teamMembers.userId, session.userId))
    .limit(1);

  if (!membership) {
    redirect("/dashboard/campaigns");
  }

  async function createCampaign(formData: FormData) {
    "use server";
    const session = await getAuthSession();
    if (!session) redirect("/auth#signin");

    const [membership] = await db
      .select({ teamId: teamMembers.teamId })
      .from(teamMembers)
      .where(eq(teamMembers.userId, session.userId))
      .limit(1);

    if (!membership) {
      redirect("/dashboard/campaigns");
    }

    const parsed = campaignSchema.safeParse({
      name: formData.get("name"),
      subject: formData.get("subject"),
      content: formData.get("content"),
    });
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
    }
    await db.insert(campaigns).values({
      name: parsed.data.name,
      subject: parsed.data.subject,
      content: parsed.data.content,
      teamId: membership.teamId,
      createdByUserId: session.userId,
    });
    revalidatePath("/dashboard/campaigns");
    redirect("/dashboard/campaigns");
  }

  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCampaign} className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Campaign Name
              </label>
              <Input name="name" id="name" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="block font-medium">
                Subject Line
              </label>
              <Input name="subject" id="subject" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="block font-medium">
                Email Content (Markdown supported)
              </label>
              <Textarea name="content" id="content" rows={8} required />
            </div>
            <Button type="submit" className="w-full mt-2">
              Create Campaign
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}