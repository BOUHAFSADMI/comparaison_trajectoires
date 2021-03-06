const turf = require('@turf/turf');
const fs = require("fs");

/**
 * @function
 * @param {Request} req - contains in req.num the range of the file to read
 * @param {Response} res - contains the error estimation
 * @returns {Array} error estimation or error
 */
const getErrorEstimationV1 = (req, res) => {
    try {
        const num = req.params.num;
        const filename = "test"+num;
        const errorEsimation = getErrorEstimation(filename);
        res.json(errorEsimation);
    } catch (error) {
        res.send(error);
    }
}

/**
 * @function
 * @param {string} filename - The name of the file that contains the GeoJSON
 * @returns {Array} Error estimation 
 */
const getErrorEstimation = (filename) => {
    const geoJsonData = readGeoJsonFile(filename);
    const trajectories = getTrajectories(geoJsonData);
    const errorEsimation = calculateErrorEstimation(trajectories.tRef, trajectories.tEval);
    return errorEsimation;
}

/**
 * @function
 * @param {Request} req - contains two trajectory(of reference, to evaluate)
 * @param {Response} res - contains the error estimation
 * @returns {Array} error estimation  or error
 */
const getErrorEstimationV2 = (req, res) => {
    try {
        const tRef = req.tRef;
        const tEval = req.tEval;
        const errorEsimation = calculateErrorEstimation(tRef, tEval);
        res.json(errorEsimation);
    } catch (error) {
        res.send(error);
    }
}

/**
 * @function
 * @param {Request} req - contains the body to check if valid
 * @param {Response} res - send the result of body checking
 * @param {function} next - passes to the next code
 * @returns {features} trajectory of: reference, to evaluate  or error
 */
const isGeoJsonValid = (req, res, next) => {
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

/**
 * @function
 * @param {GeoJSON} tRef - Trajectory of reference 
 * @param {GeoJSON} tEval - Trajectory to evaluate
 * @returns {Array} Error estimation
 */
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

/**
 * @function
 * @param {data} data - GeoJSON FeatureCollection
 * @returns {Object} {Trajectory of reference, Trajectory to evaluate}
 */
const getTrajectories = (data) => {
    const tRef = turf.lineString(turf.coordAll(data.features[0]));
    const tEval = turf.lineString(turf.coordAll(data.features[1]));
    return {tRef: tRef, tEval: tEval};
}

/**
 * @function
 * @param {string} filename - The name of the file to read
 * @returns {GeoJSON} the file data or error
 */
const readGeoJsonFile = (filename) => {
   try {
       const data = fs.readFileSync("./tests/" + filename + ".geojson", 'utf8');
       const geoJsonObject = JSON.parse(data);
       return geoJsonObject;
   } catch (error) {
       console.log(error);
   }
}

module.exports = {
    getErrorEstimationV1: getErrorEstimationV1,
    getErrorEstimationV2: getErrorEstimationV2,
    isGeoJsonValid: isGeoJsonValid,
    getErrorEstimation: getErrorEstimation,
}