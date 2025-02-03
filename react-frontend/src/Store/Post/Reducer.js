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

const initialState = {
    posts: [],
    data: null,
    post: null,
    error: null,
    replies: [],
    loading: false
}

export const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case LIKE_POST_REQUEST:
        case CREATE_POST_REQUEST:
        case DELETE_POST_REQUEST:
        case REPOST_POST_REQUEST:
        case CREATE_REPLY_REQUEST:
        case BOOKMARK_POST_REQUEST:
        case HIGHLIGHT_POST_REQUEST:
        case RETRIEVE_POST_BY_ID_REQUEST:
        case RETRIEVE_POSTS_LIKED_BY_USER_REQUEST:
        case RETRIEVE_POSTS_BOOKMARKED_BY_USER_REQUEST:
            return { ...state, error: null, loading: true }

        case RETRIEVE_ALL_POSTS_REQUEST:
        case RETRIEVE_ALL_USER_POSTS_REQUEST:
            return { ...state, error: null, posts: [], loading: true }

        case RETRIEVE_ALL_USER_REPLIES_REQUEST:
            return { ...state, error: null, replies: [], loading: true }

        case LIKE_POST_FAILURE:
        case CREATE_POST_FAILURE:
        case DELETE_POST_FAILURE:
        case REPOST_POST_FAILURE:
        case CREATE_REPLY_FAILURE:
        case BOOKMARK_POST_FAILURE:
        case HIGHLIGHT_POST_FAILURE:
        case RETRIEVE_ALL_POSTS_FAILURE:
        case RETRIEVE_POST_BY_ID_FAILURE:
        case RETRIEVE_ALL_USER_POSTS_FAILURE:
        case RETRIEVE_ALL_USER_REPLIES_FAILURE:
        case RETRIEVE_POSTS_LIKED_BY_USER_FAILURE:
        case RETRIEVE_POSTS_BOOKMARKED_BY_USER_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case CREATE_REPLY_SUCCESS:
        case RETRIEVE_POST_BY_ID_SUCCESS:
            return { ...state, error: null, loading: false, post: action.payload }

        case RETRIEVE_ALL_POSTS_SUCCESS:
        case RETRIEVE_ALL_USER_POSTS_SUCCESS:
            return { ...state, error: null, loading: false, posts: action.payload }

        case LIKE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                like: action.payload,
                likedPosts: action.payload.liked ? 
                [...state.likedPosts, action.payload.post] : 
                state.likedPosts.filter(post => post.id !== action.payload.post.id)
            }

        case REPOST_POST_SUCCESS:
            return { ...state, error: null, loading: false, repost: action.payload }

        case RETRIEVE_ALL_USER_REPLIES_SUCCESS:
            return { ...state, error: null, loading: false, replies: action.payload }

        case DELETE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                posts: state.posts.filter((post) => post.id !== action.payload),
                replies: state.replies.filter((reply) => reply.id !== action.payload)
            }

        case RETRIEVE_POSTS_LIKED_BY_USER_SUCCESS:
            return { ...state, error: null, loading: false, likedPosts: action.payload }

        case BOOKMARK_POST_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                bookmark: action.payload,
                bookmarkedPosts: action.payload.bookmarked ? 
                [...state.bookmarkedPosts, action.payload.post] : 
                state.bookmarkedPosts.filter(post => post.id !== action.payload.post.id)
            }

        case RETRIEVE_POSTS_BOOKMARKED_BY_USER_SUCCESS:
            return { ...state, error: null, loading: false, bookmarkedPosts: action.payload }

        case CREATE_POST_SUCCESS:
            return { ...state, error: null, loading: false, posts: [action.payload, ...state.posts] }

        case HIGHLIGHT_POST_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                posts: state.posts.map(post => post.id === action.payload.id ? { ...post, highlight: action.payload.highlight } : post),
                replies: state.replies.map(reply => reply.id === action.payload.id ? { ...reply, highlight: action.payload.highlight } : reply)
            }

        default:
            return state
    }
}
