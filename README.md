# chess-service

Chess as Service

## Install

    $ git clone https://github.com/kfengbest/chess-service.git
    $ chess-service
    $ npm install

## Install and run mongodb in local with docker

    $ docker pull mongo
    $ docker image inspect mongo
    $ docker run -d  --name mongo-on-docker  -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=qwe123 mongo


## Running the project

    $ npm start

## Coding test

    $ npm test

## API Usage

