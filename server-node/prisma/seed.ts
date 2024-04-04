import { prisma } from "../src/lib/prisma";

async function seed() {
    await prisma.event.create({
        data: {
            id: "6a700ff1-96d3-4d09-a967-0de3449a83db",
            title: "Event 1",
            slug: "event-1",
            details: "Event 1 details",
            maximumAttendees: 100,
        }
        
    })
}

seed().then(() => {
    console.log("Seed complete");
    prisma.$disconnect();
})