const {
  getSmartphonesRepository,
  createSmartphoneRepository,
  updateSmartphoneRepository,
  deleteSmartphoneRepository,
} = require("../repositories/smartphone");
const {
  createSmartphoneSchema,
  updateSmartphoneSchema,
} = require("../validators/smartphone");

const getSmartphonesService = async (reply) => {
  try {
    const smartphones = await getSmartphonesRepository();

    return reply.status(200).send(smartphones);
  } catch (error) {
    console.log(error);

    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

const createSmartphoneService = async (body, reply) => {
  try {
    const validatedBody = createSmartphoneSchema.safeParse(body);

    if (!validatedBody.success) {
      return reply
        .status(400)
        .send({ error: "Invalid body", details: validatedBody.error.issues });
    }

    await createSmartphoneRepository(validatedBody.data);

    return reply.status(201).send({ msg: "Smartphone created" });
  } catch (error) {
    console.log(error);

    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

const updateSmartphoneService = async (id, body, reply) => {
  try {
    const validatedBody = updateSmartphoneSchema.safeParse(body);

    if (!validatedBody.success) {
      return reply
        .status(400)
        .send({ error: "Invalid body", details: validatedBody.error.issues });
    }

    const isBodyDataEmpty = Object.keys(validatedBody.data).length === 0;

    if (isBodyDataEmpty) {
      return reply.status(400).send({ error: "You need to update something" });
    }

    await updateSmartphoneRepository(id, validatedBody.data);

    return reply.status(200).send({ msg: "Smartphone updated" });
  } catch (error) {
    console.log(error);

    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteSmartphoneService = async (id, reply) => {
  try {
    await deleteSmartphoneRepository(id);

    return reply.status(200).send({ msg: "Smartphone deleted" });
  } catch (error) {
    console.log(error);

    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  getSmartphonesService,
  createSmartphoneService,
  updateSmartphoneService,
  deleteSmartphoneService,
};
