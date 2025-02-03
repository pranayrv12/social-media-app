import { thunk } from 'redux-thunk'
import { postReducer } from './Post/Reducer'
import { themeReducer } from './Theme/Reducer'
import { authReducer } from './Authentication/Reducer'
import { combineReducers, applyMiddleware, legacy_createStore } from 'redux'

const rootReducers = combineReducers({
	auth: authReducer,
	post: postReducer,
	theme: themeReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))
