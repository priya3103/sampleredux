
import { all, fork} from 'redux-saga/effects';
import { watchloadData } from './listSaga';
export function* rootSaga () {
  yield all([
    fork(watchloadData)    
  ]);
};