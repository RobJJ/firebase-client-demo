import ClientDataService from "../Firebase/Firebase-services";
//
const reducer = (state, action) => {
  if (action.type === "ADD_CLIENT") {
    return {
      ...state,
      uniqueClients: state.uniqueClients + 1,
      clients: [
        ...state.clients,
        {
          ...action.payload,
          uniqueClient: state.uniqueClients + 1,
        },
      ],
    };
  }

  return state;
};
//
export default reducer;
