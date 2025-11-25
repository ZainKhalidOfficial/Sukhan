import db from "@/db/drizzle"
import { units } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ unitId: string }> }
) => {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { unitId } = await context.params;
  const id = Number(unitId);

  const data = await db.query.units.findFirst({
    where: eq(units.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ unitId: string }> }
) => {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { unitId } = await context.params;
  const id = Number(unitId);

  const body = await req.json();

  const data = await db
    .update(units)
    .set(body)
    .where(eq(units.id, id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ unitId: string }> }
) => {
    const isAdmin = await getIsAdmin();
    
    if(!isAdmin) {
        return new NextResponse("Unauthorized", {status: 401});
    }

  const { unitId } = await context.params;
  const id = Number(unitId);

  const data = await db
    .delete(units)
    .where(eq(units.id, id))
    .returning();

  return NextResponse.json(data[0]);
};
