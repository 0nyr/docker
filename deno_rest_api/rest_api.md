# REST API server on Deno

### Useful links

[tuto link | API on Deno + Oak](https://www.geekyhacker.com/2020/05/21/build-rest-apis-with-deno-and-oak/)

### Objective

We are going to create the following APIs:

* `GET /` – displays welcome page
* `GET /v1/users` – returns a list of users
* `GET /v1/users/:id` – gets a user by id
* `POST /v1/users` – creates a new user
* `PUT /v1/users/:id` – update an existing user
* `DELETE /v1/users/:id` – deletes a user by id

### run

`deno run --allow-net --allow-env ./index.ts`

### docker

> **ERR :** Impossible to access the api server

```
 ❮ onyr ★  kenzae❯ ❮ ~❯❯ curl localhost:8080
curl: (56) Recv failure: Connection reset by peer
```

According to [StackOverflow](https://stackoverflow.com/questions/54760101/curl-56-recv-failure-connection-reset-by-peer-docker) the problem comes from the inside of the app !

> Make sure you run your service as `0.0.0.0:{port}` rather than `127.0.0.1:{port}`.

Fix : set up a `ENV PORT=0.0.0.0` inside the dockerfile so that the deno app is listening to `0.0.0.0` address !
