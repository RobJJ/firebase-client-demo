import AddClient from "./AddClient/AddClient-component";
import CreditClient from "./CreditClient/CreditClient.component";
import DebitClient from "./DebitClient/DebitClient-component";
import ListClient from "./ListClient/ListClient-component";

function App() {
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
        <CreditClient />
      </div>
    </div>
  );
}

export default App;
