import db from "@/db/drizzle"
import { challenges } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ challengeId: string }> }
) => {

    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { challengeId } = await context.params;
  const id = Number(challengeId);

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ challengeId: string }> }
) => {

    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { challengeId } = await context.params;
  const id = Number(challengeId);

  const body = await req.json();

  const data = await db
    .update(challenges)
    .set(body)
    .where(eq(challenges.id, id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ challengeId: string }> }
) => {

    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { challengeId } = await context.params;
  const id = Number(challengeId);

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, id))
    .returning();

  return NextResponse.json(data[0]);
};