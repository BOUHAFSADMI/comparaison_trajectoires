const controller = require("../controllers/controller");

const routes = (app) => {
    app.route('/test/:num')
    .get(controller.getErrorEstimationV1);

    app.route('/test')
    .post(controller.isGeoJsonValid, controller.getErrorEstimationV2);
}

module.exports = routes;