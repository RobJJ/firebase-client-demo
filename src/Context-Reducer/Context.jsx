import React, { useContext, useState, useReducer } from "react";
import reducer from "./Reducer";
import ClientDataService from "../Firebase/Firebase-services";
//
const AppContext = React.createContext();
//
// Initial State
const initialState = {
  clients: [],
  // loading: false,
  focused: {},
  uniqueClients: 0,
};
// Client Default
const clientTemplate = {
  name: "",
  joined: "",
  debits: [],
  credits: [],
};
//
const AppProvider = ({ children }) => {
  //   const [clientCollection, setClientCollection] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [client, setClient] = useState(clientTemplate);
  //
  // Methods
  const submitNewClient = async (e) => {
    // console.log("Event: ", e);
    e.preventDefault();
    const dateJoined = new Date().toISOString().slice(0, 10);

    await ClientDataService.addClient({ ...client, joined: dateJoined });
    dispatch({ type: "ADD_CLIENT", payload: { client, dateJoined } });
    setClient(clientTemplate);
  };
  return (
    <AppContext.Provider
      value={{
        client,
        setClient,
        submitNewClient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
//
//
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
