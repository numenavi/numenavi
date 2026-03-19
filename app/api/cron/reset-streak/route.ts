// app/api/cron/reset-streak/route.ts
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { lt, and, isNotNull } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const isVercelCron = request.headers.get('x-vercel-cron') === 'true';
    const authHeader = request.headers.get('authorization');
    const secret = authHeader?.replace('Bearer ', '');
    
    const validSecret = process.env.CRON_SECRET;
    
    if (!isVercelCron && secret !== validSecret) {
      console.warn('Unauthorized access attempt to cron endpoint');
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    const now = new Date();
    const cutoffTime = new Date(now);
    cutoffTime.setHours(cutoffTime.getHours() - 24);

    const usersToReset = await db.query.userProgress.findMany({
      where: and(
        lt(userProgress.lastActivityDate, cutoffTime),
        sql`${userProgress.streak} > 0`,
        isNotNull(userProgress.lastActivityDate)
      ),
      columns: {
        userId: true,
        streak: true
      }
    });

    if (usersToReset.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: "No streaks to reset",
        timestamp: now.toISOString()
      });
    }

    const userIds = usersToReset.map(u => u.userId);
    
    const result = await db.update(userProgress)
      .set({ streak: 0 })
      .where(sql`${userProgress.userId} IN (${userIds.join(',')})`)
      .returning({ userId: userProgress.userId });

    console.log(`[VERCEL CRON] Reset ${result.length} streaks at ${now.toISOString()}`);

    return NextResponse.json({ 
      success: true, 
      resetCount: result.length,
      timestamp: now.toISOString()
    });

  } catch (error) {
    console.error("[VERCEL CRON] Error:", error);
    return NextResponse.json(
      { error: "Failed to reset streaks" }, 
      { status: 500 }
    );
  }
}