import { NextResponse } from "next/server";
import { getFilters, saveFilters } from "@/lib/db";

export async function GET() {
  try {
    const filters = await getFilters();
    return NextResponse.json({ filters });
  } catch (error) {
    console.error("Failed to get filters:", error);
    return NextResponse.json({ error: "Failed to fetch filters" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { filters } = await req.json();
    await saveFilters(filters);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save filters:", error);
    return NextResponse.json({ error: "Failed to save filters" }, { status: 500 });
  }
}
