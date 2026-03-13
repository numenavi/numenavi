import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema })

const main = async () => {
    try {
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Na'vi",
                imageSrc: "/NaVi.svg"
            },
            {
                id: 2,
                title: "Na'vi - Polski",
                imageSrc: "/NaVi_pl.svg"
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn basics of Na'vi",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,   // Unit 1
                order: 1,
                title: "Nouns",
            },
            {
                id: 2,
                unitId: 1,   // Unit 1
                order: 2,
                title: "Verbs",
            },
            {
                id: 3,
                unitId: 1,   // Unit 1
                order: 3,
                title: "Nouns",
            },
            {
                id: 4,
                unitId: 1,   // Unit 1
                order: 4,
                title: "Verbs",
            },
            {
                id: 5,
                unitId: 1,   // Unit 1
                order: 5,
                title: "Verbs",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,// Nouns
                type: "SELECT",
                order: 1,
                question: 'Wich one of these is the "the man"?',
            },
            {
                id: 2,
                lessonId: 1,// Nouns
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 3,
                lessonId: 1,// Nouns
                type: "SELECT",
                order: 3,
                question: 'Wich one of these is the "the woman"?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "tutan",
                audioSrc: "/man.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: false,
                text: "tuté",
                audioSrc: "/woman.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/thanator.svg",
                correct: false,
                text: "palukan",
                audioSrc: "/thanator.mp3",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                correct: true,
                text: "tutan",
                audioSrc: "/man.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "tuté",
                audioSrc: "/woman.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "palukan",
                audioSrc: "/thanator.mp3",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                imageSrc: "/man.svg",
                correct: false,
                text: "tutan",
                audioSrc: "/man.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/woman.svg",
                correct: true,
                text: "tuté",
                audioSrc: "/woman.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/thanator.svg",
                correct: false,
                text: "palukan",
                audioSrc: "/thanator.mp3",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2,// Verbs
                type: "SELECT",
                order: 1,
                question: 'Wich one of these is the "the man"?',
            },
            {
                id: 5,
                lessonId: 2,// Verbs
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 6,
                lessonId: 2,// Verbs
                type: "SELECT",
                order: 3,
                question: 'Wich one of these is the "the woman"?',
            },
        ]);


        console.log("Seeding finished")
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();