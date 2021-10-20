import {
  combineReducers
} from 'redux';

// Handles the query of a user entering estimate numbers to combine:
export const combineQuery = (state = {
  licensee_id: 0,
  estimate_number: "",
  second_estimate_number: "",
  third_estimate_number: ""
}, action) => {
  switch (action.type) {
    case 'SET_COMBINE_QUERY':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  } // End switch
}; // End searchQuery

// searchedEstimate comes from the licenseeForm saga, which sends back a single estimate object from the DB after running the useEstimateCalculations
// function on it
export const firstCombinedEstimate = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FIRST_ESTIMATE_QUERY_RESULT':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End searchedEstimate

// secondSearchedEstimate comes from multipleEstimate Saga, which adds returns another estimate object from DB after running useEstimateCalculations
export const secondCombinedEstimate = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SECOND_ESTIMATE_QUERY_RESULT':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End searchedEstimate

// ThirdSearchedEstimate comes from multipleEstimate Saga, which adds returns another estimate object from DB after running useEstimateCalculations
export const thirdCombinedEstimate = (state = {}, action) => {
  switch (action.type) {
    case 'SET_THIRD_ESTIMATE_QUERY_RESULT':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End searchedEstimate

export const combinedEstimatesTotal = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ESTIMATE_COMBINED_RESULT':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End searchedEstimate


export default combineReducers({
  combineQuery,
  firstCombinedEstimate,
  secondCombinedEstimate,
  thirdCombinedEstimate,
  combinedEstimatesTotal,
});
