import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import viewModel from "@/models/viewModel";

export async function createViewers(request) {
  try {
    await dbConnect();

    // ✅ Extract IP from request headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("host");

    // ✅ Store in database
    const viewData = new viewModel({ ip });
    await viewData.save();

    return NextResponse.json(
      { message: "Visitor recorded", ip },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving view", error: error.message },
      { status: 500 }
    );
  }
}

export async function getViewers() {
  try {
    await dbConnect();
    const data = await viewModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
