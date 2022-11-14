import React from "react";
import { useGlobalContext } from "../Context-Reducer/Context";
//
const ReceiptList = () => {
  const { editClient, id } = useGlobalContext();
  return (
    <div className="w-full h-1/2 bg-slate-400">
      {!id && <h2>RECEIPT LIST</h2>}
      {id && (
        <div className="flex flex-col h-full w-full">
          <div className="w-full text-center underline p-2">
            <h2>Receipt List : {editClient.name}</h2>
          </div>
          <div className="flex flex-col gap-1  h-full w-full p-2">
            {editClient.debits.map((debit) => {
              return (
                <div
                  key={debit.id}
                  className="flex justify-around bg-white rounded-lg"
                >
                  <div>{debit.date}</div>
                  <div>{debit.amount}</div>
                  <div>{debit.sessions}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
//
export default ReceiptList;
//
