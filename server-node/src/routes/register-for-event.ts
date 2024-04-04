import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "../_errors/bad-request";

export async function registerForEvents(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/events/:eventId/attendees", {
        schema: {
            summary: 'Registra um participante para um evento específico',
            tags: ['Attendees'],
            body: z.object({
                name: z.string().min(4),
                email: z.string().email(),
            }),
            params: z.object({
                eventId: z.string().uuid(),
            }),
            response: {
                201: z.object({
                    attendeeId: z.number(),
                }),
            }
        }
    }, async (request, reply) => {
        const {eventId} = request.params;
        const {name, email} = request.body;

        const attendeeFromEmail = await prisma.attendee.findUnique({
            where: {
                eventId_email: {
                    eventId,
                    email
                
                }
            }
        });

        if(attendeeFromEmail !== null) throw new BadRequest("Attendee already registered for this event");

        const [event, amountAttendeesForEvent] = await Promise.all([
            prisma.event.findUnique({
                where: {
                    id: eventId
                }
            }),
            prisma.attendee.count({
                where: {
                    eventId
                }
            })
        ])

        if(event?.maximumAttendees && amountAttendeesForEvent >= event.maximumAttendees) throw new BadRequest("Event is full")

        const attendee = await prisma.attendee.create({
            data: {
                name,
                email,
                eventId
            }
        })

        return reply.status(201).send({attendeeId: attendee.id})
    })
}