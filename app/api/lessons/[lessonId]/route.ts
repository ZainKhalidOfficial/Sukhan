import db from "@/db/drizzle"
import { lessons } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ lessonId: string }> }
) => {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { lessonId } = await context.params;
  const id = Number(lessonId);

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ lessonId: string }> }
) => {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { lessonId } = await context.params;
  const id = Number(lessonId);

  const body = await req.json();

  const data = await db
    .update(lessons)
    .set(body)
    .where(eq(lessons.id, id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ lessonId: string }> }
) => {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { lessonId } = await context.params;
  const id = Number(lessonId);

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, id))
    .returning();

  return NextResponse.json(data[0]);
};
