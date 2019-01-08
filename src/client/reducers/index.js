'use strict'
import {
    SET_VISIBILITY_FILTER,
    ADD_CARD,
    REMOVE_CARD,
    ADD_COURSE,
    REMOVE_COURSE,
    SET_SHOW_QUESTION,
    LEARN_NEXT_QUESTION,
    LEARN_START_OVER,
    CHANGE_URL,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE,
    CONFIRMATION_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_ACCOUNT,
    UPDATE_COURSES,
    INIT
} from '../actions/index'



export const visibilityFilter = (state = {}) => action => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return { ...state, showCourse: action.filter, showAnswer: false, currentQuestionId: 0 }
        case SET_SHOW_QUESTION:
            return { ...state, showAnswer: true }
        case LEARN_NEXT_QUESTION:
            return { ...state, showAnswer: false, currentQuestionId: state.currentQuestionId + 1 }
        case LEARN_START_OVER:
            return {}
        default:
            return state
    }
}

const card = (state = {}) => action => {
    switch (action.type) {
        case ADD_CARD:
            return {
                id: action.id,
                question: action.question,
                answer: action.answer,
                course: { id: action.course.id, course: action.course }
            }
        default:
            return state
    }
}


export const cards = (state = [{
    id: 0,
    question: "my #1 question",
    answer: "my #1 answer",
    course: {
        course: "cjqnfrvnh00003g5je59bhv9m"
    }
}, {
    id: 1,
    question: "my #2 question",
    answer: "my #2 answer",
    course: {
        course: "cjqnfrvnh00003g5je59bhv9m"
    }
}]) => action => {
    switch (action.type) {
        case ADD_CARD:
            return [...state, card(state)(action)]
        case REMOVE_CARD:
            return state.filter(c => c.id !== action.id)
        default:
            return state
    }
}

const course = (state = {}) => action => {
    switch (action.type) {
        case ADD_COURSE:
            return {
                id: action.id,
                name: action.courseName
            }
        default:
            return state
    }
}

export const courses = (state = []) => action => {
    switch (action.type) {
        case ADD_COURSE:
            return [...state, course(state)(action)]
        case REMOVE_COURSE:
            return state.filter(c => c.id !== action.id)
        case UPDATE_COURSES:
            return [...action.payload]
        default:
            return state
    }
}

export const navigation = (state = { url: '/' }) => action => {
    switch (action.type) {
        case CHANGE_URL:
            return { ...state, url: action.url }
        default:
            return state
    }
}

export const profile = (state = { isOnline: false }) => action => {
    switch (action.type) {
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                username: action.payload.user.username,
                userId: action.payload.userSub,
                confirmed: action.payload.userConfirmed,
                isOnline: false
            }
        case CONFIRMATION_SUCCESS:
            return {
                ...state,
                confirmed: true,
                isOnline: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                userId: action.payload.signInUserSession.idToken.payload.sub,
                accessToken: action.payload.signInUserSession.accessToken.jwtToken,
                confirmed: true,
                isOnline: true
            }
        case INIT:
            return {
                ...state,
                isOnline: action.payload !== null ? true : false,
                accessToken: action.payload
            }
        default:
            return state
    }
}