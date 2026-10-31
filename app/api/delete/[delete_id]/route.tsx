import knex from "knex";
import knexConfig from "@/knexfile";
import { NextResponse } from "next/server";

const kn = knex(knexConfig.development);

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ delete_id: string }> }
) {
  try {
    const { delete_id } = await params;
    const deleteEach = await kn("school").where({ id: delete_id }).del();

    if (deleteEach === 0) {
      return NextResponse.json({ error: "Unable to delete" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Successfully deleted" },
      { status: 202 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" },{status:500});
  }
}
