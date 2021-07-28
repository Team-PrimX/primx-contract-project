import { combineReducers } from 'redux';
const today = new Date().toISOString().substring(0, 10);


// ⬇ estimatesReducer:
export const estimatesReducer = (state = {
  measurement_units: 'imperial',
  country: 'United States',
  date_created: today,
}, action) => {
  switch (action.type) {
    case 'FETCH_ESTIMATE':
      return action.payload;
    case 'SET_ESTIMATE':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  } // End switch
}; // End estimatesReducer

export default estimatesReducer;