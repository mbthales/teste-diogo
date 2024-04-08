const prisma = require("../../prisma");

const getSmartphonesRepository = async () => {
  return await prisma.smartphone.findMany();
};

const createSmartphoneRepository = async (data) => {
  return await prisma.smartphone.create({
    data,
  });
};

const updateSmartphoneRepository = async (id, data) => {
  return await prisma.smartphone.update({
    where: { id },
    data,
  });
};

const deleteSmartphoneRepository = async (id) => {
  return await prisma.smartphone.delete({
    where: { id },
  });
};

module.exports = {
  createSmartphoneRepository,
  getSmartphonesRepository,
  updateSmartphoneRepository,
  deleteSmartphoneRepository,
};
