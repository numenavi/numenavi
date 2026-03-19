"use server";

import db from "@/db/drizzle";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscription();

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    });

    if (!challenge) {
        throw new Error("Challenge not found");
    }

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if (
        currentUserProgress.hearts === 0 && 
        !isPractice && 
        !userSubscription?.isActive
    ) {
        return { error: "hearts" };
    }

    let newStreak: number;

    if (!currentUserProgress.lastActivityDate) {
        newStreak = 1;
    } else {
        const last = new Date(currentUserProgress.lastActivityDate);
        last.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
            (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 0) {
            newStreak = currentUserProgress.streak;
        } else if (diffDays === 1) {
            newStreak = currentUserProgress.streak + 1;
        } else {
            newStreak = 1;
        }
    }

    if (isPractice) {
        await db.update(challengeProgress).set({
            completed: true,
        })
        .where(
            eq(challengeProgress.id, existingChallengeProgress.id)
        );

        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 7),
            points: currentUserProgress.points + 10,
            streak: newStreak,
            lastActivityDate: new Date(),
        }).where(eq(userProgress.userId, userId));

        revalidatePath("/shop");
        revalidatePath("/learn");
        revalidatePath("/lesson");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
        revalidatePath(`/lesson/${lessonId}`);
        return;
    }

    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed: true,
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10,
        hearts: currentUserProgress.hearts,
        streak: newStreak,
        lastActivityDate: new Date(),
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};