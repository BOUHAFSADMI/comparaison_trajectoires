import * as turf from '@turf/turf';
import fs from "fs";


export const getErrorEstimationV1 = (req, res) => {
    try {
        const num = req.params.num;
        const geoJsonData = readGeoJsonFile("test"+num);
        const trajectories = getTrajectories(geoJsonData);
        const errorEsimation = calculateErrorEstimation(trajectories.tRef, trajectories.tEval);
        res.json(errorEsimation);
    } catch (error) {
        res.send(error);
    }
}

export const getErrorEstimationV2 = (req, res) => {
    try {
        const tRef = req.tRef;
        const tEval = req.tEval;
        const errorEsimation = calculateErrorEstimation(tRef, tEval);
        res.json(errorEsimation);
    } catch (error) {
        res.send(error);
    }
}

export const isGeoJsonValid = (req, res, next) => {
    const data = req.body;
    if(data.features[1] === undefined)
       res.status(400).send({message: 'geoJSON file is invalid'});
    else {
        const tRef = turf.lineString(turf.coordAll(data.features[0]));
        const tEval = turf.lineString(turf.coordAll(data.features[1]));
        req.tRef = tRef;
        req.tEval = tEval;
    }
    next();
} 

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