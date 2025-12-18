import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/auth";

const SESSION_COOKIE_NAME = "admin_session";

export async function POST() {
  try {
    // Delete session using the auth utility
    await deleteSession();
    
    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    
    // Explicitly clear the cookie in the response by setting it to expire
    response.cookies.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
