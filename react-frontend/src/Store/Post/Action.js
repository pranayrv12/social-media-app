import { API } from '../../Components/API/APIClient'
import { BOOKMARK_POST_REQUEST, BOOKMARK_POST_SUCCESS, BOOKMARK_POST_FAILURE } from './ActionType'
import { HIGHLIGHT_POST_REQUEST, HIGHLIGHT_POST_SUCCESS, HIGHLIGHT_POST_FAILURE } from './ActionType'
import { RETRIEVE_POST_BY_ID_REQUEST, RETRIEVE_POST_BY_ID_SUCCESS, RETRIEVE_POST_BY_ID_FAILURE } from './ActionType'
import { RETRIEVE_ALL_USER_POSTS_REQUEST, RETRIEVE_ALL_USER_POSTS_SUCCESS, RETRIEVE_ALL_USER_POSTS_FAILURE } from './ActionType'
import { RETRIEVE_ALL_USER_REPLIES_REQUEST, RETRIEVE_ALL_USER_REPLIES_SUCCESS, RETRIEVE_ALL_USER_REPLIES_FAILURE } from './ActionType'
import { RETRIEVE_POSTS_LIKED_BY_USER_REQUEST, RETRIEVE_POSTS_LIKED_BY_USER_SUCCESS, RETRIEVE_POSTS_LIKED_BY_USER_FAILURE } from './ActionType'
import { LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE, REPOST_POST_REQUEST, REPOST_POST_SUCCESS, REPOST_POST_FAILURE } from './ActionType'
import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE, CREATE_REPLY_REQUEST, CREATE_REPLY_SUCCESS, CREATE_REPLY_FAILURE } from './ActionType'
import { RETRIEVE_POSTS_BOOKMARKED_BY_USER_REQUEST, RETRIEVE_POSTS_BOOKMARKED_BY_USER_SUCCESS, RETRIEVE_POSTS_BOOKMARKED_BY_USER_FAILURE } from './ActionType'
import { DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, RETRIEVE_ALL_POSTS_REQUEST, RETRIEVE_ALL_POSTS_SUCCESS, RETRIEVE_ALL_POSTS_FAILURE } from './ActionType'

export const likePost = (postId) => async(dispatch) => {
    dispatch({ type: LIKE_POST_REQUEST })

    try {
        const response = await API.post(`/api/${postId}/like`, {})
        dispatch({ type: LIKE_POST_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: LIKE_POST_FAILURE, payload: error.message })
    }
}

export const createPost = (postData) => async(dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST })

    try {
        const response = await API.post("/api/post/create", postData)
        dispatch({ type: CREATE_POST_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: CREATE_POST_FAILURE, payload: error.message })
    }
}

export const deletePost = (postId) => async(dispatch) => {
    dispatch({ type: DELETE_POST_REQUEST })

    try {
        await API.delete(`/api/post/${postId}/delete`)
        dispatch({ type: DELETE_POST_SUCCESS, payload: postId })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: DELETE_POST_FAILURE, payload: error.message })
    }
}

export const repostPost = (postId) => async(dispatch) => {
    dispatch({ type: REPOST_POST_REQUEST })

    try {
        const response = await API.put(`/api/post/${postId}/repost`)
        dispatch({ type: REPOST_POST_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: REPOST_POST_FAILURE, payload: error.message })
    }
}

export const createReply = (postData) => async(dispatch) => {
    dispatch({ type: CREATE_REPLY_REQUEST })

    try {
        const response = await API.post("/api/post/reply", postData)
        dispatch({ type: CREATE_REPLY_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: CREATE_REPLY_FAILURE, payload: error.message })
    }
}

export const bookmarkPost = (postId) => async(dispatch) => {
    dispatch({ type: BOOKMARK_POST_REQUEST })

    try {
        const response = await API.post(`/api/${postId}/bookmark`, {})
        dispatch({ type: BOOKMARK_POST_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: BOOKMARK_POST_FAILURE, payload: error.message })
    }
}

export const highlightPost = (postId) => async(dispatch) => {
    dispatch({ type: HIGHLIGHT_POST_REQUEST })

    try {
        const response = await API.put(`/api/post/${postId}/highlight`)
        dispatch({ type: HIGHLIGHT_POST_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: HIGHLIGHT_POST_FAILURE, payload: error.message })
    }
}

export const retrieveAllPosts = () => async(dispatch) => {
    dispatch({ type: RETRIEVE_ALL_POSTS_REQUEST })

    try {
        const response = await API.get("/api/posts")
        dispatch({ type: RETRIEVE_ALL_POSTS_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_ALL_POSTS_FAILURE, payload: error.message })
    }
}

export const retrievePostById = (postId) => async(dispatch) => {
    dispatch({ type: RETRIEVE_POST_BY_ID_REQUEST })

    try {
        const response = await API.get(`/api/post/${postId}`)
        dispatch({ type: RETRIEVE_POST_BY_ID_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_POST_BY_ID_FAILURE, payload: error.message })
    }
}

export const retrieveAllUserPosts = (userId) => async(dispatch) => {
    dispatch({ type: RETRIEVE_ALL_USER_POSTS_REQUEST })

    try {
        const response = await API.get(`/api/posts/user/${userId}`)
        dispatch({ type: RETRIEVE_ALL_USER_POSTS_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_ALL_USER_POSTS_FAILURE, payload: error.message })
    }
}

export const retrieveAllUserReplies = (userId) => async(dispatch) => {
    dispatch({ type: RETRIEVE_ALL_USER_REPLIES_REQUEST })

    try {
        const response = await API.get(`/api/posts/replies/user/${userId}`)
        dispatch({ type: RETRIEVE_ALL_USER_REPLIES_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_ALL_USER_REPLIES_FAILURE, payload: error.message })
    }
}

export const retrievePostsLikedByUser = (userId) => async(dispatch) => {
    dispatch({ type: RETRIEVE_POSTS_LIKED_BY_USER_REQUEST })

    try {
        const response = await API.get(`/api/posts/user/${userId}/likes`)
        dispatch({ type: RETRIEVE_POSTS_LIKED_BY_USER_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_POSTS_LIKED_BY_USER_FAILURE, payload: error.message })
    }
}

export const retrievePostsBookmarkedByUser = (userId) => async(dispatch) => {
    dispatch({ type: RETRIEVE_POSTS_BOOKMARKED_BY_USER_REQUEST })

    try {
        const response = await API.get(`/api/posts/user/${userId}/bookmarks`)
        dispatch({ type: RETRIEVE_POSTS_BOOKMARKED_BY_USER_SUCCESS, payload: response.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: RETRIEVE_POSTS_BOOKMARKED_BY_USER_FAILURE, payload: error.message })
    }
}
