import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// Saga Worker to create a GET request for Estimate DB at estimate number & licensee ID
function* fetchEstimateQuery(action) {
    const estimateNumber = action.payload.estimate_number
    const licenseeId = action.payload.licensee_id

    console.log('IN SAGA -->Estimate Order For Lookup:', estimateNumber, ' Licensee ID:', licenseeId);

    try {
        const response = yield axios.get('/api/estimates/lookup/:estimates',
            {
                params: {
                    estimateNumber: estimateNumber,
                    licenseeId: licenseeId
                }
            })

        //take response from DB and insert into Admin Reducer
        yield put({ type: 'SET_ESTIMATE_QUERY_RESULT', payload: response.data });
    }

    catch (error) {
        console.log('User get request failed', error);
    }
}

// Saga Worker to add estimate into table
function* AddEstimate(action) {
    try {
        const response = yield axios.post('/api/estimates', action.payload);
        console.log('action payload:', action.payload);
        

        // need to send the user to the search estimates results page using the newly created estimate number
        console.log('response from DB:', response.data);
        // response.data is currently a newly created estimate_number and the licensee_id that was selected for the post
        yield action.payload.history.push(`/lookup/${response.data.licensee_id}/${response.data.estimate_number}`);
        // yield put({ type: "SET_ESTIMATE" });
    }

    catch (error) {
        console.log('User POST request failed', error);
    }
}

// companies saga to fetch companies
function* licenseeFormSaga() {
    yield takeLatest('ADD_ESTIMATE', AddEstimate);
    yield takeLatest('FETCH_ESTIMATE_QUERY', fetchEstimateQuery)
}

export default licenseeFormSaga;