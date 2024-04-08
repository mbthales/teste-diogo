const {
  getSmartphonesController,
  createSmartphoneController,
  updateSmartphoneController,
  deleteSmartphoneController,
} = require("./controllers/smartphone");

const routes = (app) => {
  getSmartphonesController(app);
  createSmartphoneController(app);
  updateSmartphoneController(app);
  deleteSmartphoneController(app);
};

module.exports = routes;
