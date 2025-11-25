import db from "@/db/drizzle"
import { challengeOptions } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ challengeOptionId: string }> }
) {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }
  const { challengeOptionId } = await context.params;
  const id = Number(challengeOptionId);

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, id),
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ challengeOptionId: string }> }
) {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }
  const { challengeOptionId } = await context.params;
  const id = Number(challengeOptionId);
  const body = await req.json();

  const data = await db
    .update(challengeOptions)
    .set(body)
    .where(eq(challengeOptions.id, id))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ challengeOptionId: string }> }
) {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { challengeOptionId } = await context.params;
  const id = Number(challengeOptionId);

  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, id))
    .returning();

  return NextResponse.json(data[0]);
}
