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

POST `/games` Create a new chess game

    $ curl --request POST http://localhost:3000/games

GET `/games/:id` Fetech game's current state

    $ curl GET http://localhost:3000/games/61a29d2be49cb4a2ff3f16b7

GET `/games/:id/legal-moves/:from` Fetch potential spece for any piece from current position

    $ curl GET 'http://localhost:3000/games/61a283fd2830d5685f9eaa/legal-moves/a1'


POST `/games/:id/moves/:from/:to` Update game with a new move

    $ curl --request POST 'http://localhost:3000/games/61a29d2be49cb4a2ff3f16b7/moves/a2/a4'

GET `/games/:id/history-moves` Fetch history of all moves for a game

    $ curl GET 'http://localhost:3000/games/61a283fd2830d5685f9eaa56/history-moves'