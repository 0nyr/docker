// environment variables
export const env = Deno.env.toObject();
export const HOST: string = env.HOST || '127.0.0.1';
export const PORT: number = Number(env.PORT || 8080);
