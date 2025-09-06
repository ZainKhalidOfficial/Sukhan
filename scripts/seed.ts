import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle({ client: sql, schema });

const main = async() => {
    try{
        console.log("Seeding Database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "IELTS (Academic)",
                imageSrc: "/uk.svg"
            },
            {
                id: 2,
                title: "OET (Healthcare)",
                imageSrc: "/oet.svg"
            }
        ])

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, //IELTS (Academic)
                title: "Unit 1",
                description: "Learn the basics of IELTS",
                order: 1
            }
        ])

        await db.insert(schema.lessons).values([{
            id: 1,
            unitId: 1, //Unit 1 (Learn the basics of IELTS)
            order: 1,
            title: "Nouns",
        },
        {
            id: 2,
            unitId: 1, //Unit 1 (Learn the basics of IELTS)
            order: 2,
            title: "Nouns",
        },
        {
            id: 3,
            unitId: 1, //Unit 1 (Learn the basics of IELTS)
            order: 3,
            title: "Nouns",
        },
        {
            id: 4,
            unitId: 1, //Unit 1 (Learn the basics of IELTS)
            order: 4,
            title: "Nouns",
        },
        {
            id: 5,
            unitId: 1, //Unit 1 (Learn the basics of IELTS)
            order: 5,
            title: "Nouns",
        }
     ]);

     await db.insert(schema.challenges).values([
        {
            id: 1,
            lessonId: 1, //Nouns
            type: "SELECT",
            order: 1,
            question: 'Which one of these is the "the man"?'
        },
     ]);

     await db.insert(schema.challengeOptions).values([
        {
            id: 1,
            challengeId: 1, //'Which one of these is the "the man"?'
            imageSrc: "/man.svg",
            correct: true,
            text: "el hombre",
            audioSrc: "/es_man.mp3",
        },
        {
            id: 2,
            challengeId: 1, 
            imageSrc: "/woman.svg",
            correct: false,
            text: "la mujer",
            audioSrc: "/es_woman.mp3",
        },
        {
            id: 3,
            challengeId: 1, 
            imageSrc: "/robot.svg",
            correct: false,
            text: "el robot",
            audioSrc: "/es_robot.mp3",
        },
     ])

        console.log("Seeding Finished!")

    } catch(error) {
        console.error(error)
        throw new Error("Failed to seed the database");
    }
};

main();