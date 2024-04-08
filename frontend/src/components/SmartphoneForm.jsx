import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import AlertModal from "./AlertModal";
import Btn from "./Btn";
import BtnModal from "./BtnModal";

import { smartphoneFormSchema } from "../validators/smartphoneForm";

const SmartphoneForm = ({
  onSubmitAction,
  initialValues,
  submitButtonText,
  successMessage,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(smartphoneFormSchema),
  });

  const [errorApi, setErrorApi] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

  const onSubmit = async (data) => {
    const result = await onSubmitAction(data);

    if (result.error) {
      setErrorApi(result.error);
      return;
    }

    setErrorApi(null);
    setSuccessModal(true);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="border-2 border-solid border-slate-900 p-3 flex flex-col gap-6 px-12 py-6">
          <legend className="p-4">Celular</legend>
          <label>
            Marca
            <input
              type="text"
              {...register("marca", { required: true, maxLength: 20 })}
            />
            <span className="max-[500px]:text-xs">{errors.marca?.message}</span>
          </label>
          <label>
            Modelo
            <input
              type="text"
              {...register("modelo", { required: true, maxLength: 20 })}
            />
            <span className="max-[500px]:text-xs">
              {errors.modelo?.message}
            </span>
          </label>
          <label>
            Memória
            <input
              type="number"
              {...register("memoria", { required: true, max: 24 })}
            />
            <span className="max-[500px]:text-xs">
              {errors.memoria?.message}
            </span>
          </label>
          <label>
            Data de Lançamento
            <input
              type="date"
              {...register("lancamento", { required: true })}
            />
            <span className="max-[500px]:text-xs">
              {errors.lancamento?.message}
            </span>
          </label>
        </fieldset>
        <span className="text-center mt-4 text-base">
          {errorApi && errorApi}
        </span>
        <div className="flex gap-7 justify-center mt-6">
          <Btn isLink={true} to="/">
            Cancelar
          </Btn>
          <Btn type="submit">{submitButtonText}</Btn>
        </div>
      </form>
      {successModal && (
        <AlertModal modalType="success">
          <h2 className="text-lg ">{successMessage}</h2>
          {submitButtonText === "Adicionar" ? (
            <div className="flex justify-center gap-10 mt-4">
              <BtnModal isLink={true} to="/">
                Voltar
              </BtnModal>
              <BtnModal btnFunc={() => setSuccessModal(false)}>
                Adicionar outro
              </BtnModal>
            </div>
          ) : (
            <BtnModal isLink={true} to="/">
              Voltar
            </BtnModal>
          )}
        </AlertModal>
      )}
    </div>
  );
};

export default SmartphoneForm;
