import { combineReducers } from 'redux';

// Set default to true to turn on: 
const backdropReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOADING_SCREEN_ON':
      return true;
    case 'LOADING_SCREEN_OFF':
      return false;
    default:
      return state;
  }
};

// Set default to 'none' to turn on: 
const isLoading = (state = '', action) => {
  switch (action.type) {
    case 'LOADING_SCREEN_ON':
      return 'none';
    case 'LOADING_SCREEN_OFF':
      return "";
    default:
      return state;
  }
};

export default combineReducers({
  backdropReducer,
  isLoading,
});
