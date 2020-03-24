// Initial State
const initialState = {
  data: [],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_FILTER': {
      return {
        ...state,
        data: state.data.filter(item => item.title.includes(action.value)),
      };
    }
    case 'LOAD_DATA_SUCCESS': {
      return {
        ...state,
        data: state.data.concat(action.data),
      };
    }
    default: {
      return state;
    }
  }
};

export default listReducer;