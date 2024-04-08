import SmartphoneForm from "./SmartphoneForm";

function AddSmartphoneView() {
  const createSmartphoneRequest = async (data) => {
    const url = `${
      import.meta.env.API_URL || "http://localhost:3000"
    }/smartphone`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  return (
    <SmartphoneForm
      onSubmitAction={createSmartphoneRequest}
      initialValues={{}}
      submitButtonText="Adicionar"
      successMessage="Celular adicionado com sucesso!"
    />
  );
}

export default AddSmartphoneView;
