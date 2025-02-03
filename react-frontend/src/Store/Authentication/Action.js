import axios from 'axios'
import { API, API_BASE_URL } from '../../Components/API/APIClient'
import { LOGOUT, DELETE_USER_NOTIFICATIONS, MARK_ALL_USER_NOTIFICATIONS_AS_READ } from './ActionType'
import { RETRIEVE_USER_PROFILE_REQUEST, RETRIEVE_USER_PROFILE_SUCCESS, RETRIEVE_USER_PROFILE_FAILURE } from './ActionType'
import { SIGN_IN_USER_WITH_GOOGLE_REQUEST, SIGN_IN_USER_WITH_GOOGLE_SUCCESS, SIGN_IN_USER_WITH_GOOGLE_FAILURE } from './ActionType'
import { RETRIEVE_USER_NOTIFICATIONS_REQUEST, RETRIEVE_USER_NOTIFICATIONS_SUCCESS, RETRIEVE_USER_NOTIFICATIONS_FAILURE } from './ActionType'
import { RETRIEVE_USERS_EXCLUDING_FOLLOWED_REQUEST, RETRIEVE_USERS_EXCLUDING_FOLLOWED_SUCCESS, RETRIEVE_USERS_EXCLUDING_FOLLOWED_FAILURE } from './ActionType'
import { SIGN_IN_USER_REQUEST, SIGN_IN_USER_SUCCESS, SIGN_IN_USER_FAILURE, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILURE } from './ActionType'
import { FOLLOW_UNFOLLOW_USER_REQUEST, FOLLOW_UNFOLLOW_USER_SUCCESS, FOLLOW_UNFOLLOW_USER_FAILURE, RETRIEVE_USER_BY_ID_REQUEST, RETRIEVE_USER_BY_ID_SUCCESS, RETRIEVE_USER_BY_ID_FAILURE } from './ActionType'
import { SIGN_UP_USER_REQUEST, SIGN_UP_USER_SUCCESS, SIGN_UP_USER_FAILURE, SEARCH_USERS_BY_NAME_OR_EMAIL_REQUEST, SEARCH_USERS_BY_NAME_OR_EMAIL_SUCCESS, SEARCH_USERS_BY_NAME_OR_EMAIL_FAILURE } from './ActionType'

export const logoutUser = () => async(dispatch) => {
    localStorage.removeItem("jwt")
    dispatch({ type: LOGOUT, payload: null })
}

export const deleteUserNotifications = () => async(dispatch) => {
    try {
        await API.delete("/api/notifications/delete")
        dispatch({ type: DELETE_USER_NOTIFICATIONS, payload: [] })
    } catch (error) {
        console.log('Error', error)
    }
}

export const markAllUserNotificationsAsRead = () => async(dispatch) => {
    try {
        await API.put("/api/notifications/markAllAsRead")
        dispatch({ type: MARK_ALL_USER_NOTIFICATIONS_AS_READ })
    } catch (error) {
        console.log('Error', error)
    }
}

export const retrieveUserById = (userId) => async(dispatch) => {
    dispatch({ type: RETRIEVE_USER_BY_ID_REQUEST })

    try {
        const response = await API.get(`/api/user/${userId}`)
        const user = response.data
        dispatch({ type: RETRIEVE_USER_BY_ID_SUCCESS, payload: user })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_USER_BY_ID_FAILURE, error: error.message })
    }
}

export const updateUserProfile = (userData) => async(dispatch) => {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST })

    try {
        const response = await API.put(`/api/user/update`, userData)
        const user = response.data
        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: user })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: error.message })
    }
}

export const followUnfollowUser = (userId) => async(dispatch) => {
    dispatch({ type: FOLLOW_UNFOLLOW_USER_REQUEST })

    try {
        const response = await API.put(`/api/user/${userId}/follow`)
        const user = response.data
        dispatch({ type: FOLLOW_UNFOLLOW_USER_SUCCESS, payload: user })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: FOLLOW_UNFOLLOW_USER_FAILURE, payload: error.message })
    }
}

export const retrieveUserProfile = (jwt) => async(dispatch) => {
    dispatch({ type: RETRIEVE_USER_PROFILE_REQUEST })

    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
            headers : {
                "Authorization" : `Bearer ${jwt}`
            }
        })
        const user = response.data
        
        dispatch({ type: RETRIEVE_USER_PROFILE_SUCCESS, payload: user })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_USER_PROFILE_FAILURE, payload: error.message })
    }
}

export const signInUser = (loginData) => async(dispatch) => {
    dispatch({ type: SIGN_IN_USER_REQUEST })

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, loginData)
        const user = response.data

        if(user.jwt){
            localStorage.setItem("jwt", user.jwt)
        }
        dispatch({ type: SIGN_IN_USER_SUCCESS, payload: user })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: SIGN_IN_USER_FAILURE, payload: error.message })
    }
}

export const signUpUser = (signupData) => async(dispatch) => {
    dispatch({ type: SIGN_UP_USER_REQUEST })

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, signupData)
        const user = response.data

        if(user.jwt){
            localStorage.setItem("jwt", user.jwt)
        }
        dispatch({ type: SIGN_UP_USER_SUCCESS, payload: user })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: SIGN_UP_USER_FAILURE, payload: error.message })
    }
}

export const retrieveUserNotifications = () => async(dispatch) => {
    dispatch({ type: RETRIEVE_USER_NOTIFICATIONS_REQUEST })

    try {
        const response = await API.get("/api/notifications")
        const notifications = response.data
        dispatch({ type: RETRIEVE_USER_NOTIFICATIONS_SUCCESS, payload: notifications })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_USER_NOTIFICATIONS_FAILURE, error: error.message })
    }
}

export const searchUsersByNameOrEmail = (query) => async(dispatch) => {
    dispatch({ type: SEARCH_USERS_BY_NAME_OR_EMAIL_REQUEST })

    try {
        const response = await API.get(`/api/users/search?query=${query}`)
        const user = response.data
        dispatch({ type: SEARCH_USERS_BY_NAME_OR_EMAIL_SUCCESS, payload: user })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: SEARCH_USERS_BY_NAME_OR_EMAIL_FAILURE, payload: error.message })
    }
}

export const signInUserWithGoogle = (loginData) => async(dispatch) => {
    dispatch({ type: SIGN_IN_USER_WITH_GOOGLE_REQUEST })

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin/google`, loginData)
        const user = response.data

        if(user.jwt){
            localStorage.setItem("jwt", user.jwt)
        }
        dispatch({ type: SIGN_IN_USER_WITH_GOOGLE_SUCCESS, payload: user.jwt })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: SIGN_IN_USER_WITH_GOOGLE_FAILURE, payload: error.message })
    }
}

export const retrieveUsersExcludingFollowed = (userId) => async(dispatch) => {
    dispatch({ type: RETRIEVE_USERS_EXCLUDING_FOLLOWED_REQUEST })

    try {
        const response = await API.get(`api/users/${userId}/excluding-followed`)
        dispatch({ type: RETRIEVE_USERS_EXCLUDING_FOLLOWED_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_USERS_EXCLUDING_FOLLOWED_FAILURE, payload: error.message })
    }
}
