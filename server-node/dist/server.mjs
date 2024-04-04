import {
  registerForEvents
} from "./chunk-QXK43CSO.mjs";
import {
  errorHandler
} from "./chunk-RICBW5JA.mjs";
import {
  checkIn
} from "./chunk-NOXS36V5.mjs";
import {
  createEvent
} from "./chunk-JKNXXWPY.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-RDI4JMKF.mjs";
import {
  getEventAttendees
} from "./chunk-HYR75YQ6.mjs";
import {
  getEvent
} from "./chunk-YHV6OTLN.mjs";
import "./chunk-UX6HP52O.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xE3o da API para o back-end da aplica\xE7\xE3o Pass.in",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(getEvent);
app.register(createEvent);
app.register(registerForEvents);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("Server is running on port 3333");
});
