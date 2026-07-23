import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import { Portfolio } from "../../../lib/models/Portfolio";
import { defaultPortfolioData } from "../../../lib/adminStorage";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Find the single portfolio document
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      console.log("No portfolio data found in database. Seeding with default data...");
      portfolio = await Portfolio.create(defaultPortfolioData);
    }
    
    return NextResponse.json(portfolio);
  } catch (error: any) {
    console.error("GET /api/portfolio failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio data: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Simple authentication check using custom header
    const password = request.headers.get("x-admin-password");
    if (password !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access: Invalid system password." },
        { status: 401 }
      );
    }

    const body = await request.json();

    await connectToDatabase();

    // Update the single portfolio document, or create one if it doesn't exist
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      {},
      {
        developerInfo: body.developerInfo,
        skills: body.skills,
        projects: body.projects,
        experience: body.experience,
        education: body.education,
        certificates: body.certificates
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedPortfolio);
  } catch (error: any) {
    console.error("POST /api/portfolio failed:", error);
    return NextResponse.json(
      { error: "Failed to save portfolio data: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
