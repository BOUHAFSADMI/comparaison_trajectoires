import * as turf from '@turf/turf';
import fs from "fs";

const calculateErrorEstimation = (tRef, tEval) => {
    const tEvalCoords = turf.getCoords(tEval);
    var estimation = [];
    var nearestPoint;
    tEvalCoords.forEach(point => {
        nearestPoint = turf.nearestPointOnLine(tRef, point);
        estimation.push(nearestPoint.properties.dist);
    });
    return estimation;
}

const getTrajectories = (data) => {
    const tRef = turf.lineString(turf.coordAll(data.features[0]));
    const tEval = turf.lineString(turf.coordAll(data.features[1]));
    return {tRef: tRef, tEval: tEval};
}

const readGeoJsonFile = (filename) => {
   try {
    const data = fs.readFileSync("./tests/" + filename + ".geojson", 'utf8');
    const geoJsonObject = JSON.parse(data);
    return geoJsonObject;
   } catch (error) {
       console.log(error);
   }
}

const geoJsonData = readGeoJsonFile("test1");
const trajectories = getTrajectories(geoJsonData);
const errorEsimation = calculateErrorEstimation(trajectories.tRef, trajectories.tEval);

console.log(errorEsimation);
