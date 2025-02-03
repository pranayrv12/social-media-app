import { LOGOUT, DELETE_USER_NOTIFICATIONS, MARK_ALL_USER_NOTIFICATIONS_AS_READ } from './ActionType'
import { RETRIEVE_USER_PROFILE_REQUEST, RETRIEVE_USER_PROFILE_SUCCESS, RETRIEVE_USER_PROFILE_FAILURE } from './ActionType'
import { SIGN_IN_USER_WITH_GOOGLE_REQUEST, SIGN_IN_USER_WITH_GOOGLE_SUCCESS, SIGN_IN_USER_WITH_GOOGLE_FAILURE } from './ActionType'
import { RETRIEVE_USER_NOTIFICATIONS_REQUEST, RETRIEVE_USER_NOTIFICATIONS_SUCCESS, RETRIEVE_USER_NOTIFICATIONS_FAILURE } from './ActionType'
import { RETRIEVE_USERS_EXCLUDING_FOLLOWED_REQUEST, RETRIEVE_USERS_EXCLUDING_FOLLOWED_SUCCESS, RETRIEVE_USERS_EXCLUDING_FOLLOWED_FAILURE } from './ActionType'
import { SIGN_IN_USER_REQUEST, SIGN_IN_USER_SUCCESS, SIGN_IN_USER_FAILURE, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILURE } from './ActionType'
import { FOLLOW_UNFOLLOW_USER_REQUEST, FOLLOW_UNFOLLOW_USER_SUCCESS, FOLLOW_UNFOLLOW_USER_FAILURE, RETRIEVE_USER_BY_ID_REQUEST, RETRIEVE_USER_BY_ID_SUCCESS, RETRIEVE_USER_BY_ID_FAILURE } from './ActionType'
import { SIGN_UP_USER_REQUEST, SIGN_UP_USER_SUCCESS, SIGN_UP_USER_FAILURE, SEARCH_USERS_BY_NAME_OR_EMAIL_REQUEST, SEARCH_USERS_BY_NAME_OR_EMAIL_SUCCESS, SEARCH_USERS_BY_NAME_OR_EMAIL_FAILURE } from './ActionType'

const initialState = {
    jwt: null,
    user: null,
    error: null,
    loading: false,
    findUser: null,
    searchResult: [],
    filteredUsers: [],
    notifications: [],
    updateUserProfile: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_USER_REQUEST:
        case SIGN_UP_USER_REQUEST:
        case RETRIEVE_USER_BY_ID_REQUEST:
        case FOLLOW_UNFOLLOW_USER_REQUEST:
        case RETRIEVE_USER_PROFILE_REQUEST:
        case SIGN_IN_USER_WITH_GOOGLE_REQUEST:
        case RETRIEVE_USER_NOTIFICATIONS_REQUEST:
        case RETRIEVE_USERS_EXCLUDING_FOLLOWED_REQUEST:
            return { ...state, error: null, loading: true }

        case SIGN_IN_USER_FAILURE:
        case SIGN_UP_USER_FAILURE:
        case UPDATE_USER_PROFILE_FAILURE:
        case RETRIEVE_USER_BY_ID_FAILURE:
        case FOLLOW_UNFOLLOW_USER_FAILURE:
        case RETRIEVE_USER_PROFILE_FAILURE:
        case SIGN_IN_USER_WITH_GOOGLE_FAILURE:
        case RETRIEVE_USER_NOTIFICATIONS_FAILURE:
        case SEARCH_USERS_BY_NAME_OR_EMAIL_FAILURE:
        case RETRIEVE_USERS_EXCLUDING_FOLLOWED_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case SEARCH_USERS_BY_NAME_OR_EMAIL_REQUEST:
            return { ...state, error: null, loading: true, searchResult: [] }

        case DELETE_USER_NOTIFICATIONS:
            return { ...state, error: null, loading: false, notifications: [] }

        case SIGN_IN_USER_SUCCESS:
        case SIGN_UP_USER_SUCCESS:
        case SIGN_IN_USER_WITH_GOOGLE_SUCCESS:
            return { ...state, error: null, loading: false, jwt: action.payload }

        case RETRIEVE_USER_PROFILE_SUCCESS:
            return { ...state, error: null, loading: false, user: action.payload }

        case UPDATE_USER_PROFILE_REQUEST:
            return { ...state, error: null, loading: true, updateUserProfile: false }

        case RETRIEVE_USER_BY_ID_SUCCESS:
            return { ...state, error: null, loading: false, findUser: action.payload }

        case FOLLOW_UNFOLLOW_USER_SUCCESS:
            return { ...state, error: null, loading: false, findUser: action.payload }

        case SEARCH_USERS_BY_NAME_OR_EMAIL_SUCCESS:
            return { ...state, error: null, loading: false, searchResult: action.payload }

        case RETRIEVE_USER_NOTIFICATIONS_SUCCESS:
            return { ...state, error: null, loading: false, notifications: action.payload }

        case RETRIEVE_USERS_EXCLUDING_FOLLOWED_SUCCESS:
            return { ...state, error: null, loading: false, filteredUsers: action.payload }

        case UPDATE_USER_PROFILE_SUCCESS:
            return { ...state, error: null, loading: false, updateUserProfile: true, user: action.payload }

        case MARK_ALL_USER_NOTIFICATIONS_AS_READ:
            return { ...state, error: null, loading: false, notifications: state.notifications.map(notification => ({...notification, read: true})) }

        case LOGOUT:
            return { ...initialState }

        default:
            return state
    }
}
