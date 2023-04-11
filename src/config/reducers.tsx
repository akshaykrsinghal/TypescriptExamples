const {combineReducers} = require('redux');

//@ts-ignore
const INITAL_STATE = {
  files: null,
};

const dataReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {...state, files: action.payload};
    case 'DELETE_DATE':
      return INITAL_STATE;
    default:
      return state;
  }
};

const reducers = combineReducers({
  data: dataReducer,
});

export default reducers;
