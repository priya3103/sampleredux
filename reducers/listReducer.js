// Initial State
const initialState = {
  data: [],
  backup:[],
  loadingstatus:false
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_FILTER': {
      return {
        ...state,       
        data: state.data.filter(item => item.title.includes(action.value)),
      };
    }
    case 'SEARCH_FILTER_RESET': {
      return {
        ...state,
        data: state.backup,
      };
    }
    case 'LOAD_DATA_INIT': {
      return {
        ...state,        
        loadingstatus:true
      };
    }
    case 'LOAD_DATA_SUCCESS': {
      return {
        ...state,
        backup: state.data.concat(action.data),
        data: state.data.concat(action.data),
        loadingstatus:false
      };
    }
    default: {
      return state;
    }
  }
};

export default listReducer;