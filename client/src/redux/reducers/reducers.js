const reducers = (state = {}, action) => {
  switch (action.type) {
    case "NEW_MOVIE_DATA":
      return {
        ...state,
        newmoviedata: action.data,
      };
    case "BOLLYWOOD_MOVIE":
      return {
        ...state,
        bollywood: action.data,
      };

    case "HOLLYWOOD_MOVIE":
      return {
        ...state,
        hollywood: action.data,
      };
    case "ALL_MOVIE_DATA":
      return {
        ...state,
        allmoviedata: action.data,
      };

    case "SERIES":
      return {
        ...state,
        series: action.data,
      };

    default:
      return state;
  }
};

export default reducers;
