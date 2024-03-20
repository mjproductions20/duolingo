import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

interface Option {
  correct: boolean;
  text: string;
}

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async (): Promise<void> => {
  try {
    console.log("Seeding database");

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
      .values([{ title: "Spanish", imageSrc: "/es.svg" }])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id!,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id!,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        // Insert 10 unique lessons
        for (let lessonOrder = 1; lessonOrder <= 10; lessonOrder++) {
          const lessonTitle = `Lesson ${lessonOrder}`;
          const lessonDescription = `Description for ${lessonTitle}`;

          const lessonData = {
            unitId: unit.id!,
            title: lessonTitle,
            description: lessonDescription,
            order: lessonOrder,
          };

          const insertedLesson = await db
            .insert(schema.lessons)
            .values(lessonData)
            .returning();

          const lesson = insertedLesson[0];

          // Generate and insert 10 unique challenges for each lesson
          for (let challengeOrder = 1; challengeOrder <= 10; challengeOrder++) {
            const challengeQuestion = generateChallengeQuestion(
              challengeOrder,
              lessonTitle
            );

            const insertedChallenge = await db
              .insert(schema.challenges)
              .values({
                lessonId: lesson.id!,
                type: "SELECT",
                question: challengeQuestion,
                order: challengeOrder,
              })
              .returning();

            const challenge = insertedChallenge[0];

            // Generate and insert challenge options
            const options = generateChallengeOptions(
              challengeOrder,
              lessonTitle
            );
            shuffleArray(options); // Shuffle options to break consistency

            await db.insert(schema.challengeOptions).values(
              options.map((option, index) => ({
                challengeId: challenge.id!,
                ...option,
                order: index + 1,
              }))
            );
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

// Function to generate challenge question
function generateChallengeQuestion(
  challengeOrder: number,
  lessonTitle: string
): string {
  switch (challengeOrder) {
    case 1:
      return `What is the Spanish word for "house" in ${lessonTitle}?`;
    case 2:
      return `What is the Spanish word for "dog" in ${lessonTitle}?`;
    case 3:
      return `What is the Spanish translation for "word" in ${lessonTitle}?`;
    case 4:
      return `What is the Spanish translation for "cat" in ${lessonTitle}?`;
    case 5:
      return `What is the Spanish word for "book" in ${lessonTitle}?`;
    case 6:
      return `What is the Spanish translation for "ball" in ${lessonTitle}?`;
    case 7:
      return `What is the Spanish word for "school" in ${lessonTitle}?`;
    case 8:
      return `What is the Spanish translation for "pen" in ${lessonTitle}?`;
    case 9:
      return `What is the Spanish translation for "apple" in ${lessonTitle}?`;
    default:
      return `What is the Spanish word for "tree" in ${lessonTitle}?`;
  }
}

// Function to generate challenge options
function generateChallengeOptions(
  challengeOrder: number,
  lessonTitle: string
): Option[] {
  switch (challengeOrder) {
    case 1:
      return [
        { correct: true, text: "La casa" },
        { correct: false, text: "El carro" },
        { correct: false, text: "El libro" },
      ];
    case 2:
      return [
        { correct: true, text: "El perro" },
        { correct: false, text: "El gato" },
        { correct: false, text: "El pájaro" },
      ];
    case 3:
      return [
        { correct: true, text: "Palabra" },
        { correct: false, text: "Lápiz" },
        { correct: false, text: "Bolígrafo" },
      ];
    case 4:
      return [
        { correct: true, text: "El gato" },
        { correct: false, text: "El perro" },
        { correct: false, text: "El pájaro" },
      ];
    case 5:
      return [
        { correct: true, text: "El libro" },
        { correct: false, text: "La mesa" },
        { correct: false, text: "La silla" },
      ];
    case 6:
      return [
        { correct: true, text: "Pelota" },
        { correct: false, text: "Libro" },
        { correct: false, text: "Silla" },
      ];
    case 7:
      return [
        { correct: true, text: "Escuela" },
        { correct: false, text: "Libro" },
        { correct: false, text: "Pluma" },
      ];
    case 8:
      return [
        { correct: true, text: "Pluma" },
        { correct: false, text: "Libro" },
        { correct: false, text: "Pelota" },
      ];
    case 9:
      return [
        { correct: true, text: "Manzana" },
        { correct: false, text: "Banana" },
        { correct: false, text: "Naranja" },
      ];
    default:
      return [
        { correct: true, text: "Árbol" },
        { correct: false, text: "Flor" },
        { correct: false, text: "Hierba" },
      ];
  }
}

// Function to shuffle array
function shuffleArray(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
