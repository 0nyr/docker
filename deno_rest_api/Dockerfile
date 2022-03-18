# [build & run with Docker]
# build : docker build -t onyr/deno_rest_api .
# run : docker run -it --init -p 8080:8080 onyr/deno_first_test

# [build & run with docker-compose]
# build : docker-compose build
# launch : docker-compose up deno


# image : https://hub.docker.com/r/hayd/alpine-deno
FROM hayd/alpine-deno:1.5.2

LABEL version="1.0"
LABEL description="Deno rest api pseudo-server (no db)"

ENV PORT=8080
ENV HOST=0.0.0.0

EXPOSE ${PORT}

WORKDIR /app

# Prefer not to run as root
USER deno

COPY ./data/ data/
COPY ./errors/*.ts errors/
COPY ./libs/*.ts libs/
COPY ./params/*.ts params/
COPY ./routes/*.ts routes/
COPY ./*.ts .


# RUN ["deno", "cache" "./params/deps.ts"] # error ?!
RUN deno cache ./params/deps.ts
RUN ["deno", "cache", "index.ts"]

CMD ["run", "--allow-net", "--allow-env", "index.ts"]
