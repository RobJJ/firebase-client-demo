import React, { useEffect } from "react";
import { useGlobalContext } from "../Context-Reducer/Context";
//
const DebitClient = () => {
  const { id, setId, debitInfo, setDebitInfo, handleDebit } =
    useGlobalContext();
  //
  // useEffect(() => {}, [id]);
  //

  return (
    <div className="w-full h-1/2 bg-slate-400 p-2">
      {!id && <h2>Debit your client here</h2>}
      {id && (
        <div className="flex flex-col h-full w-full">
          <h2 className="text-center underline">Client Name</h2>
          <form
            onSubmit={handleDebit}
            className="w-full h-full flex flex-col p-2 bg-blue-200 gap-2"
          >
            <input
              type="date"
              className=""
              value={debitInfo.date}
              onChange={(e) =>
                setDebitInfo({ ...debitInfo, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Amount..."
              value={debitInfo.amount}
              onChange={(e) =>
                setDebitInfo({ ...debitInfo, amount: e.target.value })
              }
            />
            <input
              type="number"
              value={debitInfo.sessions}
              onChange={(e) =>
                setDebitInfo({ ...debitInfo, sessions: e.target.value })
              }
            />
            <textarea
              placeholder="Notes for debit..."
              value={debitInfo.notes}
              onChange={(e) =>
                setDebitInfo({ ...debitInfo, notes: e.target.value })
              }
            />
            <button type="submit">Debit Client</button>
          </form>
        </div>
      )}
    </div>
  );
};
//
export default DebitClient;
