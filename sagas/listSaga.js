
import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios'
function load(authParams) {
  return axios.request({
    method: 'get',
    url: `http://jsonplaceholder.typicode.com/photos?_start=${authParams.offset}&_limit=${authParams.limit}`    
  });
}
function* loadData(action) {
  try {
    yield put({type:'LOAD_DATA_INIT'})
    const data =yield call(load,action.data)    
    yield put({
      type: 'LOAD_DATA_SUCCESS',
      data: data.data,
    });
  }
  catch (error) {
    console.log(error);
  }
};

export function* watchloadData() {  
  yield takeLatest('LOAD_DATA', loadData);
};