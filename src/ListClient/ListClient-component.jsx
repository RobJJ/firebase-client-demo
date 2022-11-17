import React, { useEffect } from "react";
import { useGlobalContext } from "../Context-Reducer/Context";
import DebitClient from "../DebitClient/DebitClient-component";
import { v4 as uuidv4 } from "uuid";

//
const ListClient = () => {
  const {
    clients,
    handleDelete,
    setId,
    setDebitInfo,
    debitInfo,
    setEditClient,
    currentUser,
  } = useGlobalContext();
  //
  //
  return (
    <div className="w-full h-1/2 bg-slate-400 flex flex-col">
      <h2 className="w-full p-2 bg-pink-300 text-center">List CLIENT COMP</h2>
      <section className="w-full h-full bg-purple-200 p-2">
        <div className="w-full h-full bg-purple-300 p-2 flex flex-col gap-1">
          {clients.map((client) => {
            return (
              <div
                key={client.id}
                className="flex w-full bg-white justify-around p-2"
              >
                <h2>{client.name}</h2>

                <div className="bg-red-300">
                  <button onClick={() => handleDelete(client.id)} type="button">
                    Delete
                  </button>
                </div>
                <div className="bg-green-300">
                  <button
                    onClick={() => {
                      // setDebitInfo({ ...setDebitInfo, id: uuidv4() });
                      setEditClient({ ...client });
                      setId(client.id);
                    }}
                    type="button"
                  >
                    Debit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
//
export default ListClient;
