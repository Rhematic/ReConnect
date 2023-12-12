const eventReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENT":
      return action.payload;

      // case "EDIT_EVENT":
      //   return state.map((event) =>
      //     event.id === action.payload.eventId ? { ...event, ...action.payload.eventData } : event
      //   );
  
      // case "DELETE_EVENT":
      //   return state.filter((event) => event.id !== action.payload);
    case "UNSET_EVENT":
      return [];
    default:
      return state;
  }
};

export default eventReducer;
