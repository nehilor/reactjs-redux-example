import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import carsReducer from './reducers/cars.reducers'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(carsReducer, composedEnhancer)
export default store