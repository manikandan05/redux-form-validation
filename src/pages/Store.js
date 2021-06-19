//import { createStore } from 'redux';
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

// // The below two lines required for immutable sample for other samples these lines must be comment
// import { combineReducers } from 'redux-immutablejs';
// import { reducer as reduxFormReducer } from 'redux-form/immutable';

let reducer = combineReducers({
    form: reduxFormReducer
});

let store = createStore(reducer);

export default store;