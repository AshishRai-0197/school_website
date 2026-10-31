import knex from "knex";
import knexConfig from "@/knexfile";
import { NextResponse } from "next/server";

const kn = knex(knexConfig.development);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ search_id: string }> }
) {
  try {
    const { search_id } = await params;
    const schoolDetails = await kn("school")
      .where("name", search_id)
      .select("*");

    return NextResponse.json({
      message: "Search completed successfully",
      schoolDetails,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
