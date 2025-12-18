import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check if prisma.admin exists
    if (!prisma.admin) {
      console.error("prisma.admin is undefined");
      return NextResponse.json(
        { error: "Admin model not available. Please restart the dev server." },
        { status: 500 }
      );
    }

    const admins = await prisma.admin.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(admins);
  } catch (error: any) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch admins", 
        details: error?.message || String(error),
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if admin with this email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin with this email already exists" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password,
        role: "admin",
      },
    });

    return NextResponse.json(admin, { status: 201 });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}
