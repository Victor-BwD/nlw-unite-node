import fastify from "fastify";
import {serializerCompiler, validatorCompiler} from 'fastify-type-provider-zod'
import { createEvent } from "./routes/create-event";
import { registerForEvents } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getEvent);
app.register(createEvent);
app.register(registerForEvents);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees)


app.listen({port: 3333}).then(() => {
    console.log("Server is running on port 3333");
});