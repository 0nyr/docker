# [build & run with Docker]
# build : docker build -t onyr/deno_first_test .
# run : docker run -it --init -p 8080:8080 onyr/deno_first_test

# [build & run with docker-compose]
# build : docker-compose build
# launch : docker-compose up deno


# image : https://hub.docker.com/r/hayd/alpine-deno
FROM hayd/alpine-deno:1.5.2 

LABEL version="1.0"
LABEL description="First test of building an image from Dockerfile"

ENV PORT=8080

EXPOSE ${PORT}

WORKDIR /app

# Prefer not to run as root
USER deno

# Cache the dependencies as a layer (the following two steps are re-run 
# only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files 
# used in main.ts.
COPY ./params/deps.ts params/

# RUN ["deno", "cache" "./params/deps.ts"] # error ?!
RUN deno cache ./params/deps.ts

COPY . .
RUN ["deno", "cache", "index.ts"]

CMD ["run", "--allow-net", "--allow-env", "index.ts"]