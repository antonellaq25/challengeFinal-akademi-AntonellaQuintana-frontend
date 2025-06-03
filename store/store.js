import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from "./reducers/authReducer";
import { courseReducer, courseDetailReducer } from "./reducers/courseReducer";
import { userReducer } from "./reducers/userReducer";
import { enrollmentReducer } from "./reducers/enrollmentReducer";
import { gradeReducer } from './reducers/gradeReducer';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedAuth = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : undefined;

const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    users: userReducer,
    enrollmentList: enrollmentReducer,
    courseDetail: courseDetailReducer,
    grade: gradeReducer,
});

const store = createStore(
    rootReducer,
    { auth: persistedAuth },
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
    const { auth } = store.getState();
    localStorage.setItem('auth', JSON.stringify(auth));
});

export default store;