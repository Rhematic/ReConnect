const resourceReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RESOURCE":
      return action.payload;
    default:
      return state;
  }
};

module.exports = resourceReducer;
