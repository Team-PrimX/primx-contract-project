import {
  put,
  takeLatest
} from 'redux-saga/effects';
import axios from 'axios';
import useEstimateCalculations from '../../hooks/useEstimateCalculations';
import removeTimestamps from '../../hooks/removeTimestamps';

// Saga Worker to create a GET request for first estimate
function* fetchFirstEstimateQuery(action) {
  const licenseeId = action.payload.licensee_id
  const estimateNumber = action.payload.estimate_number

  try {
    const response = yield axios.get('/api/estimates/lookup/:estimates', {
      params: {
        estimateNumber: estimateNumber,
        licenseeId: licenseeId
      }
    })
    yield put({
      type: 'SET_FIRST_ESTIMATE_QUERY_RESULT',
      payload: response.data[0]
    })
    yield put({
      type: 'SET_ESTIMATE_COMBINED_DATA',
      payload: response.data[0]
    })
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// Saga Worker to create a GET request for second estimate
function* fetchSecondEstimateQuery(action) {
  const licenseeId = action.payload.licensee_id
  const estimateNumber = action.payload.estimate_number

  try {
    const response = yield axios.get('/api/estimates/lookup/:estimates', {
      params: {
        estimateNumber: estimateNumber,
        licenseeId: licenseeId
      }
    })
    yield put({
      type: 'SET_SECOND_ESTIMATE_QUERY_RESULT',
      payload: response.data[0]
    })
    yield put({
      type: 'SET_ESTIMATE_COMBINED_DATA',
      payload: response.data[0]
    })
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// Saga Worker to create a GET request for third estimate
function* fetchThirdEstimateQuery(action) {
  const licenseeId = action.payload.licensee_id
  const estimateNumber = action.payload.estimate_number

  try {
    const response = yield axios.get('/api/estimates/lookup/:estimates', {
      params: {
        estimateNumber: estimateNumber,
        licenseeId: licenseeId
      }
    })
    yield put({
      type: 'SET_THIRD_ESTIMATE_QUERY_RESULT',
      payload: response.data[0]
    })
    yield put({
      type: 'SET_ESTIMATE_COMBINED_DATA',
      payload: response.data[0]
    })
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// Saga worker to run the math machine on the combined estimates object:
function* handleCalculatedCombinedEstimate(action) {
  // Save a mutated object with the calculation values
  const calculatedCombinedEstimate = useEstimateCalculations(action.payload);
  yield put({
    type: 'SET_CALCULATED_COMBINED_ESTIMATE',
    payload: calculatedCombinedEstimate
  });
} // End

// Combined estimate saga to fetch estimate for combined cost
function* combineEstimatesSaga() {
  // Makes a GET request for the first search Query
  yield takeLatest('FETCH_FIRST_ESTIMATE_QUERY', fetchFirstEstimateQuery);
  // GET request for the second search Query
  yield takeLatest('FETCH_SECOND_ESTIMATE_QUERY', fetchSecondEstimateQuery);
  // GET request for third search Query
  yield takeLatest('FETCH_THIRD_ESTIMATE_QUERY', fetchThirdEstimateQuery);
  // Makes the math machine run on the combined estimates:
  yield takeLatest('HANDLE_CALCULATED_COMBINED_ESTIMATE', handleCalculatedCombinedEstimate);
}

export default combineEstimatesSaga;