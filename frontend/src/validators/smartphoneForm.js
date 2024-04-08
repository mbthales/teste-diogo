import { z } from "zod";

export const smartphoneFormSchema = z.object({
  marca: z
    .string()
    .min(3, "Marca precisa ter pelo menos 3 letras")
    .max(20, "Marca pode ter até 20 letras"),
  modelo: z
    .string()
    .min(3, "Modelo precisa ter pelo menos 3 letras")
    .max(20, "Modelo pode ter até 20 letras"),
  memoria: z.coerce
    .number()
    .min(2, "Memória precisa ser maior que 1")
    .max(18, "Memória precisa ser menor que 19"),
  lancamento: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === "invalid_date" ? "Selecione uma data" : defaultError,
    }),
  }),
  fabricante: z.string().min(1, "Fabricante não pode ser vazio"),
});
