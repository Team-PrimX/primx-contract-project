import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker saga to GET all estimates
function* fetchAllEstimates() {
    try {
        // GET all estimates
        const estimates = yield axios.get('/api/estimates/all');
        // OPTION: run the math function on the saved array of objects here to mutate them into more complete objects

        // send results to adminEstimates reducer
        yield put({ type: 'SET_ADMIN_ESTIMATES', payload: estimates.data });
        

    }
    catch (error) {
        console.log('Error with fetchAllEstimates in adminEstimates Saga:', error);
    }
    
}

// worker saga to make a PUT request to update that was changed in the AdminEstimatesGrid Data Grid
function* editEstimateData(action) {
    try {
        // action.payload is an object with the id, a dbColumn that tells column to be edited, and a newValue that contains the requested change
        yield axios.put(`/api/estimates/${action.payload.id}`, action.payload);

    }
    catch (error) {
        console.log('Error with editEstimateData in the adminEstimates Saga', error);
    }
}



// watcher saga to look for admin estimate requests
function* adminEstimatesSaga() {
    // request to GET all estimates
    yield takeLatest('FETCH_ALL_ESTIMATES', fetchAllEstimates);
    // request to edit a single piece of data in an estimate
    yield takeLatest('EDIT_ESTIMATE_DATA', editEstimateData)
}

export default adminEstimatesSaga;