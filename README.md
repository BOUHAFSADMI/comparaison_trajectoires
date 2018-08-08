# Technical Test INRIA(Comparaison de trajectoires)

## Getting Started

Because TurfJS have bug with Eclipse Vert.x so REST API is exposed uding NodeJS server with ExpressJS.

### prerequists

Have NodeJS and NPM.

### Installing

to install dependencies:
```
npm install
```

to start the server:
```
npm start
```

## Running the tests

to run unit tests use:
```
npm test
``` 

to try the app manually you can either GET th url: ```http://localhost:3000/test/:range```, with range is the test's range, here we have 7 tests so ranges are 1, 2, 3, 4, 5, 6 or 7.

or you can POST to the url ```http://localhost:3000/test```, this requires to include a GeoJSON FeatureCollection in the body with two features the first one if trajectory refernce and the second is the trajectory to evaluate.

## Code analysis

to run code analysis use:

```
gulp
```

## Deployment

The application is deployed in Docker Hub 
* (https://hub.docker.com/r/sadmi/comparaison_trajectoires/)

## Built With

* [NodeJS] (https://nodejs.org/en/)
* [ExpressJS] (https://expressjs.com/)
* [TurfJS] (http://turfjs.org)
* [geoJSON] (http://geojson.org/)
* [Gulp] (https://gulpjs.com/)
* [Docker] (https://www.docker.com/)


usefull website for geoJSON trjacories creation: 
* [geojson.io] (http://geojson.io)

## Documentation

* [Doc] (https://github.com/BOUHAFSADMI/comparaison_trajectoires/tree/master/out)

## Authors

* **BOUHAFS SADMI** 
