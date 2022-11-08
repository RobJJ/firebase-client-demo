import React, { useEffect } from "react";
import { useGlobalContext } from "../Context-Reducer/Context";
//
const DebitClient = () => {
  const { id, setId, debitInfo, setDebitInfo, handleDebit } =
    useGlobalContext();
  //
  useEffect(() => {}, [id]);
  //
  return (
    <div className="w-full h-1/2 bg-slate-400 p-2">
      {!id && <h2>Debit your client here</h2>}
      {id && (
        <div className="flex flex-col h-full w-full">
          <h2 className="text-center underline">Client Name</h2>
          <form
            onSubmit={handleDebit}
            className="w-full h-full flex flex-col p-2 bg-blue-200"
          >
            <input type="date" className="" />
            <input type="text" placeholder="Amount..." />
            <input type="number" />
            <textarea placeholder="Notes for debit..."></textarea>
            <button type="submit">Debit Client</button>
          </form>
        </div>
      )}
    </div>
  );
};
//
export default DebitClient;
