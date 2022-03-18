# deno_first_test


[docker image with deno](https://hub.docker.com/r/hayd/alpine-deno)

[docker image with deno example | GitHub](https://github.com/hayd/deno-docker/blob/master/example/Dockerfile)

### Build

> **NB :** Testé avec Docker et docker-compose !!!! C'est incroyable !

##### docker

`docker build -t onyr/deno_first_test .`

##### docker-compose

`docker run -it --init -p 8080:8080 onyr/deno_first_test Server started on port 8080`

### Run

##### docker

`docker-compose build`

##### docker-compose

`docker-compose up deno`

### remove

> **NB :** To be removed, first, determine the IMAGE ID of the container.

`docker image rm [IMAGE_ID] -f`

```shell
 ❮ onyr ★  kenzae❯ ❮ ~❯❯ docker images
REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
onyr/deno_first_test   latest              3afd082c975e        41 minutes ago      66.4MB
onyr/cheers2019        latest              d15c2e306807        5 hours ago         4.01MB
<none>                 <none>              62fce89709fa        5 hours ago         357MB
hayd/alpine-deno       1.5.2               856e86e9669e        11 days ago         66.1MB
hello-world            latest              bf756fb1ae65        10 months ago       13.3kB
golang                 1.11-alpine         e116d2efa2ab        15 months ago       312MB
docker/doodle          cheers              82b1ca5c25eb        17 months ago       3.76MB
 ❮ onyr ★  kenzae❯ ❮ ~❯❯ docker rm 3afd082c975e -f
Error: No such container: 3afd082c975e
 ❮ onyr ★  kenzae❯ ❮ ~❯❯ docker images
REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
onyr/deno_first_test   latest              3afd082c975e        42 minutes ago      66.4MB
onyr/cheers2019        latest              d15c2e306807        5 hours ago         4.01MB
<none>                 <none>              62fce89709fa        5 hours ago         357MB
hayd/alpine-deno       1.5.2               856e86e9669e        11 days ago         66.1MB
hello-world            latest              bf756fb1ae65        10 months ago       13.3kB
golang                 1.11-alpine         e116d2efa2ab        15 months ago       312MB
docker/doodle          cheers              82b1ca5c25eb        17 months ago       3.76MB
 ❮ onyr ★  kenzae❯ ❮ ~❯❯ docker image rm 3afd082c975e -f
Untagged: onyr/deno_first_test:latest
Deleted: sha256:3afd082c975ef4a794949a2988276f18db1b52c856bd536fffc3bf0a829be6d8
Deleted: sha256:30e3b48b9904c37dfcc8199b1da8fded24361b469d137135172056af2aebd6a0
Deleted: sha256:d0eaf7ad94cf45cd4e1e1f23919f33d11df4a0d568539b88d1319afa7384ff41
Deleted: sha256:c8f086d4da9696910644fa9fcc518d80cdec72d52645da98688322f37b0bb7c8

```
