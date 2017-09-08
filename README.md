# CircleCI artifacts redirector

Path resolver and redirect server of [CircleCI](https://circleci.com/)'s [build artifacts](https://circleci.com/docs/2.0/artifacts/).

## Getting started

### Run by [docker](https://hub.docker.com/r/yhatt/circleci-artifacts-redirector/)

With this command, the redirect server will be listening on port 8080:

```bash
$ docker run -d -p 8080:80 yhatt/circleci-artifacts-redirector
```

### Run express server

```bash
$ git clone https://github.com/yhatt/circleci-artifacts-redirector.git

$ npm install
$ npm start
```

## How to use

You can access to the CircleCI build artifact URL with redirect. It would resolve from the path specified by query options.

```
http://localhost:8080/?path=artifact.html&user=yhatt&project=circleci-artifacts-redirector&token=xxxxxxxxxxxxxxxx
```

#### Options

##### Reqruied

- `user`: User name of repository.
- `project`: Project name of repository.
- `token`: CircleCI's API token for build artifacts. You could create it in [User Settings > Personal API Tokens](https://circleci.com/account/api) on CircleCI.
- `path`: The path to build artifact.

##### Optional

- `vcs`: VCS type to pass to API. (`github` by default)
- `branch`: The name of branch that you want to get artifacts. (`master` by default)
- `build`: Build number of CircleCI. (`latest` by default)
- `filter`: Restricts which builds are returned. [See CircleCI API reference.](https://circleci.com/docs/api/v1-reference/#build-artifacts-latest)

## Configuration

### Environments

- `CIRCLECI_ARTIFACTS_REDIRECTOR_PORT`: Listening port of express server (`8080` by default with running locally)

### [direnv](http://direnv.net/) support

You can configure specific envs if you are using [direnv](http://direnv.net/) and allowed it.

```bash
$ direnv allow
$ cp ./.envrc.local{.example,}
$ vi ./.envrc.local
```

## Author

Yuki Hattori ([@yhatt](https://github.com/yhatt/))

## License

This plugin releases under the [MIT License](https://github.com/yhatt/circleci-artifacts-redirector/blob/master/LICENSE).
