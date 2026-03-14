import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Na v'i", imageSrc: "/NaVi.svg" },
      ])
      .returning();

    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Greetings", order: 1 },
            { unitId: unit.id, title: "Pronouns", order: 2 },
            { unitId: unit.id, title: "I am / You are", order: 3 },
            { unitId: unit.id, title: "Animals", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'How do you say "Hello"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'How can you translate "I see you"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these you can translate as "Eywa is with you"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: 'Hello',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Translate: "Eywa is with you"',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'How to say "See you soon"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'How to translate: "Eywa ngahu"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: 'See you soon',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "kaltxì",
                  audioSrc: "/hello.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Oel ngati kameie",
                  audioSrc: "/oel-ngati-kameie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Kiyevame",
                  audioSrc: "/see-you-soon.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Oel ngati kameie",
                  audioSrc: "/oel-ngati-kameie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Eywa ngahu",
                  audioSrc: "/eywa-ngahu.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "kaltxì",
                  audioSrc: "/hello.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Oel ngati kameie",
                  audioSrc: "/oel-ngati-kameie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Kiyevame",
                  audioSrc: "/see-you-soon.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Eywa ngahu",
                  audioSrc: "/eywa-ngahu.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Oel ngati kameie",
                  audioSrc: "/oel-ngati-kameie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Eywa ngahu",
                  audioSrc: "/eywa-ngahu.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "kaltxì",
                  audioSrc: "/hello.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Eywa ngahu",
                  audioSrc: "/eywa-ngahu.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Oel ngati kameie",
                  audioSrc: "/oel-ngati-kameie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Kiyevame",
                  audioSrc: "/see-you-soon.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Oel ngati kameie",
                  audioSrc: "/oel-ngati-kameie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Kiyevame",
                  audioSrc: "/see-you-soon.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Eywa ngahu",
                  audioSrc: "/eywa-ngahu.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Hello",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "how are you",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Eywa is with you",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Oel ngati kameie",
                  audioSrc: "/oel-ngati-kameie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Kiyevame",
                  audioSrc: "/see-you-soon.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Eywa ngahu",
                  audioSrc: "/eywa-ngahu.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
