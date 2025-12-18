import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { format = "csv", filters = {} } = body;

    // Build where clause from filters (similar to GET endpoint)
    const where: any = {};

    if (filters.search) {
      where.email = {
        contains: filters.search,
      };
    }

    if (filters.tier) {
      where.tier = parseInt(filters.tier);
    }

    if (filters.currentApp) {
      where.currentApp = filters.currentApp;
    }

    if (filters.sendToCountry) {
      where.sendToCountry = filters.sendToCountry;
    }

    if (filters.researchFollowUp) {
      where.researchFollowUp = filters.researchFollowUp;
    }

    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) {
        where.createdAt.gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        const endDate = new Date(filters.dateTo);
        endDate.setHours(23, 59, 59, 999);
        where.createdAt.lte = endDate;
      }
    }

    // Fetch all matching records
    const data = await prisma.waitlist.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (format === "json") {
      return NextResponse.json(data, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="waitlist-export-${new Date().toISOString().split("T")[0]}.json"`,
        },
      });
    }

    // Convert to CSV
    if (data.length === 0) {
      return NextResponse.json({ error: "No data to export" }, { status: 400 });
    }

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = (row as any)[header];
            if (value === null || value === undefined) return "";
            if (value instanceof Date) {
              return value.toISOString();
            }
            const stringValue = String(value);
            if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          })
          .join(",")
      ),
    ];

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="waitlist-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}

