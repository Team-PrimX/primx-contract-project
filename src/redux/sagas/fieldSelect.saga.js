import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import createProductPriceObject from '../../hooks/createProductPriceObject';


function* fetchFieldSelect() {
    // fetch all active companies for estimate create Select menu
    yield put({type: 'FETCH_ACTIVE_COMPANIES'});
    // fe
    yield put({type: 'FETCH_PLACEMENT_TYPES'});


    // Fetching products
    try {
        const response = yield axios.get('/api/products');

        // use the createProductPriceObject function to convert the returned product array into an object
        const productObject = createProductPriceObject(response.data);
        
        // set product object in reducer
        yield put({
          type: 'SET_PRODUCTS_OBJECT',
          payload: productObject
        });
      } catch (error) {
        console.log('error with fetchProducts in field select saga', error);
      }

      // Fetching shipping costs/state
      try {
        //GET all shipping costs
        const shippingCosts = yield axios.get('/api/shippingcosts');
        console.log('shippingCosts.data -->', shippingCosts.data);

        //send results to shippingCosts reducer
        yield put({type: 'SET_SHIPPING_COSTS', payload: shippingCosts.data});
    } catch (error) {
        console.log('error with fetchShippingCosts in field select saga', error);   
    }

    // Fetching floor types
    try {
        //GET all floor types
        const floorTypes = yield axios.get('/api/floortypes');
        console.log('floorTypes.data', floorTypes.data);

        //send results to floorTypes reducer
        yield put({type: 'SET_FLOOR_TYPES', payload: floorTypes.data});
    } catch (error) {
        console.log('error with fetchAllFloorTypes in field select saga', error);    
    }

  }


function* fieldSelectSaga() {
    yield takeLatest('FETCH_FIELD_SELECT', fetchFieldSelect);
}

export default fieldSelectSaga;