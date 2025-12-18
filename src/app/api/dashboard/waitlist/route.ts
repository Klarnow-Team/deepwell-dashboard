import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  CurrentApp,
  SendToCountry,
  Frequency,
  ResearchFollowUp,
} from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "25");
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Filters
    const search = searchParams.get("search") || "";
    const tier = searchParams.get("tier");
    const currentApp = searchParams.get("currentApp") as CurrentApp | null;
    const sendToCountry = searchParams.get("sendToCountry") as SendToCountry | null;
    const researchFollowUp = searchParams.get("researchFollowUp") as ResearchFollowUp | null;
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    // Build where clause
    const where: any = {};

    if (search) {
      where.email = {
        contains: search,
      };
    }

    if (tier) {
      where.tier = parseInt(tier);
    }

    if (currentApp) {
      where.currentApp = currentApp;
    }

    if (sendToCountry) {
      where.sendToCountry = sendToCountry;
    }

    if (researchFollowUp) {
      where.researchFollowUp = researchFollowUp;
    }

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        where.createdAt.lte = endDate;
      }
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get data and total count
    const [data, total] = await Promise.all([
      prisma.waitlist.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.waitlist.count({ where }),
    ]);

    // Calculate statistics
    const [totalCount, tier1Count, tier2Count, tier3Count, recent24h] =
      await Promise.all([
        prisma.waitlist.count(),
        prisma.waitlist.count({ where: { tier: 1 } }),
        prisma.waitlist.count({ where: { tier: 2 } }),
        prisma.waitlist.count({ where: { tier: 3 } }),
        prisma.waitlist.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        }),
      ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      stats: {
        total: totalCount,
        tier1: tier1Count,
        tier2: tier2Count,
        tier3: tier3Count,
        recent24h,
      },
    });
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist data" },
      { status: 500 }
    );
  }
}

