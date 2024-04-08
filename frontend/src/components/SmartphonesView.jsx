import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Btn from "./Btn";
import AlertModal from "./AlertModal";
import BtnModal from "./BtnModal";

function SmartphonesView() {
  const [smartphones, setSmartphones] = useState([]);
  const [smartphoneId, setSmartphoneId] = useState(null);

  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [deleteModalIsActived, setDeleteModalIsActived] = useState(false);

  const fetchSmartphones = async () => {
    const url = `${
      import.meta.env.VITE_API_URL || "http://localhost:3000"
    }/smartphones`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      setApiError(data.error);
      return;
    }

    setSmartphones(data);

    setTimeout(() => {
      setApiLoading(false);
    }, 500);
  };

  const formattedDate = (isoDate) => {
    const date = new Date(isoDate);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const deleteSmartphone = async () => {
    const url = `${
      import.meta.env.VITE_API_URL || "http://localhost:3000"
    }/smartphone/${smartphoneId}`;

    await fetch(url, {
      method: "DELETE",
    });

    setDeleteModalIsActived(false);
    fetchSmartphones();
  };

  useEffect(() => {
    fetchSmartphones();
  }, []);

  return (
    <>
      {apiLoading ? (
        <p className="text-center">Carregando...</p>
      ) : apiError ? (
        <p className="text-center">{apiError}</p>
      ) : (
        <>
          <div className="w-2/4 max-[600px]:w-full mt-20">
            <Btn isLink={true} to="/add">
              Adicionar Celular
            </Btn>
          </div>
          {smartphones.length === 0 ? (
            <p className="text-center">Nenhum celular cadastrado.</p>
          ) : (
            <div className="overflow-auto">
              <table className="w-3/4 mx-auto mb-6">
                <thead className="bg-slate-400">
                  <tr>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Capacidade de Memória (GB)</th>
                    <th>Fabricante</th>
                    <th>Data de Lançamento</th>
                    <th>Alterar</th>
                    <th>Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {smartphones.map(
                    ({
                      id,
                      marca,
                      modelo,
                      memoria,
                      lancamento,
                      fabricante,
                    }) => (
                      <tr key={id}>
                        <td>{marca}</td>
                        <td>{modelo}</td>
                        <td>{memoria}</td>
                        <td>{fabricante}</td>
                        <td>{formattedDate(lancamento)}</td>
                        <td>
                          <Link
                            to={`/update/${id}`}
                            state={{
                              id,
                              marca,
                              modelo,
                              memoria,
                              fabricante,
                              lancamento,
                            }}
                            className="border-b-2 border-slate-950 hover:border-slate-800 hover:text-slate-800"
                          >
                            Alterar
                          </Link>
                        </td>
                        <td>
                          <button
                            className="border-b-2 border-slate-950 hover:border-slate-800 hover:text-slate-800"
                            onClick={() => {
                              setSmartphoneId(id);
                              setDeleteModalIsActived(true);
                            }}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      {deleteModalIsActived && (
        <AlertModal modalType="alert">
          <h2 className="text-lg ">
            Tem certeza que deseja excluir este celular?
          </h2>
          <div className="flex justify-center gap-10 mt-4">
            <BtnModal btnFunc={() => deleteSmartphone()}>Sim</BtnModal>
            <BtnModal btnFunc={() => setDeleteModalIsActived(false)}>
              {" "}
              Não{" "}
            </BtnModal>
          </div>
        </AlertModal>
      )}
    </>
  );
}

export default SmartphonesView;
