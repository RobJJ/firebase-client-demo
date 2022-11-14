import { useEffect } from "react";
import AddClient from "./AddClient/AddClient-component";
import { useGlobalContext } from "./Context-Reducer/Context";
import ReceiptList from "./ReceiptList/ReceiptList.component";
import DebitClient from "./DebitClient/DebitClient-component";
import ListClient from "./ListClient/ListClient-component";

function App() {
  const { getAllClients } = useGlobalContext();
  //
  useEffect(() => {
    getAllClients();
  }, []);
  //
  return (
    <div className="w-screen h-screen bg-slate-800 flex p-5 gap-1">
      {/* LEFT HAND SIDE */}
      <div className="w-1/2 h-full bg-white flex flex-col p-2 gap-2">
        <AddClient />
        <ListClient />
      </div>
      {/* RIGHT HAND SIDE */}
      <div className="w-1/2 h-full bg-white flex flex-col p-2 gap-2">
        <DebitClient />
        <ReceiptList />
      </div>
    </div>
  );
}

export default App;
