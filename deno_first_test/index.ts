// GitHub : https://github.com/FrancescoXX/deno-docker
// Article : https://dev.to/francescoxx/docker-deno-containerize-a-deno-hello-world-server-1ha1 
import { serve } from "./params/deps.ts";

const PORT: number = Number(Deno.env.get("PORT"));

const server = serve({ port: PORT });

const body = new TextEncoder().encode("Hello World\n");

console.log(`Server started on port ${PORT}`);
for await (const req of server) {
    req.respond({ body });
}