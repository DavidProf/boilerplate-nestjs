----
<br />
<p align="center">
  <h2 align="center">nestjs-boilerplate</h2>

  <p align="center">
    An awesome template to start your projects!
    <br />
    <a href="https://www.google.com"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</p>

----

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Deploy](#deploy)
* [Usage/Docs](#usage)
* [Contributing](#contributing)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

A boilerplate to start new scalable projects.

Here's why:
* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating all the structure from scratch
* You should element DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes and modify this template.

A list of commonly used resources that I find helpful are listed in the acknowledgements.

### Built With
This section list any major frameworks that our boilerplate is using. Leave any add-ons/plugins for the acknowledgements section. 

* [NestJS](https://docs.nestjs.com/)
* [typescript](https://www.typescriptlang.org/)
* [mongoose](https://mongoosejs.com/)
* [amqplib](http://www.squaremobius.net/amqp.node/)
* [graygelf](https://www.npmjs.com/package/graygelf)

_feel free to remove what will not be useful_

<!-- GETTING STARTED -->
## Getting Started

See here Prerequisites and how to start the project

### Prerequisites

We mostly recommend to use yarn to manage and install the packages.

* nodejs
see how to install [here](https://nodejs.org/en/download)

* yarn
```sh
npm install yarn@latest -g
```
_You may use sudo if not installed at first_

_May you see the official docs for install:_ [docs](https://yarnpkg.com/getting-started/install)

* Mongo Database _using docker_ 
```sh
docker run -p 27017:27017 --name mongo-database -d mongo
```
_to install without docker see the docs:_ [Mongo Db installation](https://docs.mongodb.com/manual/installation/)

* RabbitMq _using docker_ 
```sh
docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq-management rabbitmq:3-management
```
_to install without docker see the docs:_ [RabbitMQ installation](https://www.rabbitmq.com/download.html)

### Start Dev

1. Clone .env.sample to .env and fill variables as needed
2. Run `yarn` to install NPM packages
```sh
yarn install
```
3. Run dev script with `yarn`
```sh
yarn start:dev
```

### Start Prod

We recommend to use docker for this.

1. Clone .env.sample to .env and fill variables as needed
2. Build the docker image
```sh
docker build . -t $APP_NAME
```
3. Create/Run the container
```sh
docker run -p $PORT:$PORT -d $APP_NAME
```
_Replace $PORT with the app port according to the `.env`_

## Deploy

_manually_

1. Clone .env.sample to .env and fill variables as needed for the correct environment

2. Build the docker image
```sh
docker build . -t $IMAGE_NAME:$VERSION
```
_Replace $IMAGE_NAME and $VERSION as well (note that the image name maybe be the docker repository name as in the deployment.yml)_

3. Log In your docker cli into ECR (Elastic container registry)
```sh
docker login --username {{username}} --password-stdin
```

4. Push the image
```sh
docker push $IMAGE_NAME:$VERSION
```

5. Apply the changes
```sh
kubectl apply -f deployment.yml
```

6. Confirm that the changes were applied and the pods are up
    - you may use
    > kubectl get pods | grep $APP_NAME

_try to see the logs, health check or anything to confirm that is everything okay_

## Usage

_Please see the [Documentation](https://www.google.com)_

## Contributing

While working on this project we recommend to:

* Use [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
* Use `yarn lint` to validate project code style
* Check if the tests are working and add tests as needed
- Check if the build with docker is working
* UPDATE THE DOCS

## Acknowledgements
* [NestJS](https://docs.nestjs.com/)
* [Docker](https://www.docker.com)
* [pm2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
* [yarn](https://yarnpkg.com/getting-started)
* [typescript](https://www.typescriptlang.org/docs)
* [express](https://expressjs.com/pt-br/4x/api.html)
* [mongoose](https://mongoosejs.com/docs/guide.html)
* [amqplib](http://www.squaremobius.net/amqp.node/channel_api.html)
* [graygelf](https://github.com/wavded/graygelf#readme)