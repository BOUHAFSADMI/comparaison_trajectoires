import {getErrorEstimationV1, getErrorEstimationV2, isGeoJsonValid} from "../controllers/controller";

const routes = (app) => {
    app.route('/test/:num')
    .get(getErrorEstimationV1);

    app.route('/test')
    .post(isGeoJsonValid, getErrorEstimationV2);
}

export default routes;