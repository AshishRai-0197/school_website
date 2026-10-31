import knex from "knex";
import knexConfig from "@/knexfile";
import { NextResponse } from "next/server";

const kn = knex(knexConfig.development);

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ update_id: string }> }
) {
  try {
    const { update_id } = await params;
    const { name, email, contact_Number, year_experience, job_title } =
      await request.json();

    const updateNow = await kn("school")
      .where({ id: update_id })
      .update({ name, email, contact_Number, year_experience, job_title });

    if (updateNow === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Updated successfully", updateNow },
      { status: 202 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Interal server error" });
  }
}
