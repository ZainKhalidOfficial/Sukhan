import db from "@/db/drizzle"
import { courses } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) => {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { courseId } = await context.params;
  const id = Number(courseId);

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) => {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { courseId } = await context.params;
  const id = Number(courseId);

  const body = await req.json();

  const data = await db
    .update(courses)
    .set(body)
    .where(eq(courses.id, id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) => {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { courseId } = await context.params;
  const id = Number(courseId);

  const data = await db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning();

  return NextResponse.json(data[0]);
};
