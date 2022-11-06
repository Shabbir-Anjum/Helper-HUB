import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authReducer';
import customerReducer from './customerReducer';
import employeeReducer from './employeeReducer'
import orderReducer from './orderReducer'

const persistConfig = {
  key: 'helperhub',
  storage,
  blacklist:['auth.loading']
};

const rootReducer= combineReducers({
  auth: authReducer,
  customer:customerReducer,
  employee:employeeReducer,
  order:orderReducer,
});

export default persistReducer(persistConfig, rootReducer);