import { useLocation } from "react-router-dom";
import SmartphoneForm from "./SmartphoneForm";

function UpdateSmartphone() {
  const location = useLocation();
  const { id, marca, modelo, memoria, lancamento } = location.state;

  const updateSmartphoneRequest = async (data) => {
    const url = `${
      import.meta.env.API_URL || "http://localhost:3000"
    }/smartphone/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  return (
    <SmartphoneForm
      onSubmitAction={updateSmartphoneRequest}
      initialValues={{
        marca,
        modelo,
        memoria,
        lancamento: new Date(lancamento).toISOString().split("T")[0],
      }}
      submitButtonText="Alterar"
      successMessage="Celular atualizado com sucesso!"
    />
  );
}

export default UpdateSmartphone;