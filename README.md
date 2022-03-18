# Docker

### Useful links

[Dockerfile reference](https://docs.docker.com/engine/reference/builder/#from) (official)

##### github

[set of Docker examples | GitHub | docker/doodle](https://github.com/docker/doodle)


### Useful tutos

[install Docker on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) (official)

[post install steps Docker](https://docs.docker.com/engine/install/linux-postinstall/) (official)

[Docker Install &amp; set up](https://blog.ssdnodes.com/blog/getting-started-docker-vps/) (good)

[Learn Docker in 7 easy Steps | Fireship](https://youtu.be/gAkwW2tuIqE) (video)

[Docker full intro | NetworkChuck](https://youtu.be/eGz9DS-aIeY) (video)

[GitHub Actions + Docker + Kubernetes](https://www.digitalocean.com/blog/how-to-deploy-to-digitalocean-kubernetes-with-github-actions/) (DigitalOcean)

[Deploying to DigitalOcean With GitHub Actions](https://www.digitalocean.com/community/tech_talks/deploying-to-digitalocean-with-github-actions)

[Docker &amp; VPS tutos](https://blog.ssdnodes.com/blog/tag/docker/)

##### deno + Docker + postGres

[HTTP API Server | GitHub](https://github.com/TomFern/addressbook-deno) (good, with db migration)

##### Docker compose

[Docker compose | GitHub](https://github.com/docker/compose)

[install Docker Compose](https://docs.docker.com/compose/install/) official

##### Portainer

[Portainer CE Overview](https://www.portainer.io/portainer-ce/)

[Portainer FAQ](https://www.portainer.io/documentation/)

[Using Portainer To Manage Your Docker Containers Easily](https://blog.ssdnodes.com/blog/portainer-docker-management/) (complete)

### Commands

##### docker

A list of [commands | FreeCodeCamp](https://www.freecodecamp.org/news/docker-image-guide-how-to-remove-and-delete-docker-images-stop-containers-and-remove-all-volumes/)

`docker ps` : list all running containers on the system.

`docker info` : give general info about docker.

`docker images` : displays all images of docker.

`docker inspect [IMAGE_NAME]` : get more about a specific image.

`docker inspect [IMAGE_ID]` : get more about a specific image.

`docker image rm [IMAGE_ID] -f` : remove the image directly. Here `-f` forces the execution, because otherwise you would get an error if the image is referenced by more than 1 tag.

`docker push ???` : command used to push (upload) a docker container to a container registry somewhere (docker hub, Amazon ECR...)

##### docker-compose

A `docker-compose.yml` file is requiered to use, but is very easy to build. It make possible to set rules for multiple container sharing using `volumes`. It also make it possible communication between containers with `service`. See the [Fireship video](https://youtu.be/gAkwW2tuIqE) on the topic for a quick recap.

`docker-compose build` : build a container from the `docker-compose.yml` file.

`docker-compose up [CONTAINER_NAME]` : run the specified container.

`docker-compose down` : shut down all containers.

##### what is docker-compose for ?

See [on StackOverflow](https://stackoverflow.com/questions/29480099/whats-the-difference-between-docker-compose-vs-dockerfile).

Docker Compose (herein referred to as compose) will use the Dockerfile if you add the build command to your project's `docker-compose.yml`.

Your Docker workflow should be to build a suitable `Dockerfile` for each image you wish to create, then use compose to assemble the images using the `build` command.

### Notes

**@Cyril RICHARD**

> 1/ Solution pour un dev seul : Docker c'est souvent un peu overkill, et
> ça dépend des habitudes de chacun mais ça reste exploitable.
> Pour la gestion des multiples services, un docker compose fait
> l'affaire.
> Pour centraliser la gestion des container: Portainer.

##### Installation process of Docker

1. Install Docker Engine
2. Modify user rights
3. Install Docker compose

**check installation :**

```shell
 ❮ onyr ★  kenzae❯ ❮ ~❯❯ docker --version
Docker version 19.03.13, build 4484c46d9d
 ❮ onyr ★  kenzae❯ ❮ ~❯❯ docker-compose --version
docker-compose version 1.27.4, build 40524192
```

##### Uninstallation

**docker**

1. Uninstall the Docker Engine, CLI, and Containerd packages:
   ```
   $ sudo apt-get purge docker-ce docker-ce-cli containerd.io
   ```
2. Images, containers, volumes, or customized configuration files on your host
   are not automatically removed. To delete all images, containers, and
   volumes:
   ```
   $ sudo rm -rf /var/lib/docker
   ```

**docker-compose**

To uninstall Docker Compose if you installed using `curl`:

```
sudo rm /usr/local/bin/docker-compose
```

**What is Portainer :**

Portainer allows you to easily build, manage and maintain containerized environments without the need to know CLI, YAML or any other complex syntax. It makes life simple, but not at the expense of functionality or capability. In fact, quite the opposite

### Errors

##### group permissions not loaded

> Got permission denied while trying to connect to the Docker daemon socket

Solution available [here](https://linuxhandbook.com/docker-permission-denied/).

`newgrp docker` : load new groups policy (allows to skip reboot. Need to be used on every terminal where the `docker` command will run.

```
 ❮ onyr ★  kenzae❯ ❮ cheers2019❯❯ docker ps
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.40/containers/json: dial unix /var/run/docker.sock: connect: permission denied
 ❮ onyr ★  kenzae❯ ❮ cheers2019❯❯ sudo groupadd docker
[sudo] password for onyr: 
groupadd: group 'docker' already exists
 ❮ onyr ★  kenzae❯ ❮ cheers2019❯❯ sudo usermod -aG docker $USER
 ❮ onyr ★  kenzae❯ ❮ cheers2019❯❯ groups
onyr adm dialout cdrom sudo audio dip plugdev lpadmin sambashare
 ❮ onyr ★  kenzae❯ ❮ cheers2019❯❯ groups onyr
onyr : onyr adm dialout cdrom sudo audio dip plugdev lpadmin sambashare docker
 ❮ onyr ★  kenzae❯ ❮ cheers2019❯❯ newgrp docker
 ❮ onyr ★  kenzae❯ ❮ cheers2019❯❯ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

```
