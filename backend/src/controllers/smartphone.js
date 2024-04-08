const {
  getSmartphonesService,
  createSmartphoneService,
  updateSmartphoneService,
  deleteSmartphoneService,
} = require("../services/smartphone");

const getSmartphonesController = async (app) => {
  app.get("/smartphones", async (_, reply) => {
    return await getSmartphonesService(reply);
  });
};

const createSmartphoneController = async (app) => {
  app.post("/smartphone", async (request, reply) => {
    return await createSmartphoneService(request.body, reply);
  });
};

const updateSmartphoneController = async (app) => {
  app.put("/smartphone/:id", async (request, reply) => {
    return await updateSmartphoneService(
      request.params.id,
      request.body,
      reply
    );
  });
};

const deleteSmartphoneController = async (app) => {
  app.delete("/smartphone/:id", async (request, reply) => {
    return await deleteSmartphoneService(request.params.id, reply);
  });
};

module.exports = {
  getSmartphonesController,
  createSmartphoneController,
  updateSmartphoneController,
  deleteSmartphoneController,
};
