const zod = require("zod");

const createSmartphoneSchema = zod.object({
  marca: zod.string().trim().min(5).max(20),
  modelo: zod.string().trim().min(5).max(20),
  memoria: zod.number(),
  lancamento: zod.string(),
});

const updateSmartphoneSchema = createSmartphoneSchema.partial();

module.exports = { createSmartphoneSchema, updateSmartphoneSchema };
