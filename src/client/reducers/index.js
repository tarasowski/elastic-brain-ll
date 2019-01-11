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
    INIT,
    UPDATE_CARDS,
    GO_TO_QUESTION
} from '../actions/index'



export const visibilityFilter = (state = {
    showCourse: "cjqqxbh3h00003g5jj7867dwp",
    showAnswer: false,
    currentQuestionId: 0
}) => action => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return { ...state, showCourse: action.filter, showAnswer: false, currentQuestionId: 0 }
        case SET_SHOW_QUESTION:
            return { ...state, showAnswer: true }
        case LEARN_NEXT_QUESTION:
            return { ...state, showAnswer: false, currentQuestionId: state.currentQuestionId + 1 }
        case LEARN_START_OVER:
            return {}
        case GO_TO_QUESTION:
            return { ...state, currentQuestionId: action.questionPosition - 1 }
        default:
            return state
    }
}

const card = (state = {}) => action => {
    switch (action.type) {
        case ADD_CARD:
            return {
                cardId: action.cardId,
                question: action.question,
                answer: action.answer,
                dateAdded: action.dateAdded,
                courseId: action.courseId,
            }
        default:
            return state
    }
}


export const cards = (state = [{
    userId: "82a9e0cb-141f-4963-9bd2-5da2da015242",
    question: "Who was the first who came up with serverless?",
    answer: "It was Amazon with Lambda",
    dateAdded: "2019-01-10T18:06:25.479Z",
    courseId: "cjqqxbh3h00003g5jj7867dwp"
},
{
    userId: "82a9e0cb-141f-4963-9bd2-5da2da015242",
    question: "Now this is my next question?",
    answer: "Now this is my next answer",
    dateAdded: "2019-01-10T18:37:07.883Z",
    courseId: "cjqqxbh3h00003g5jj7867dwp"
},
{
    userId: "82a9e0cb-141f-4963-9bd2-5da2da015242",
    question: "what is all about",
    answer: "what is this all about",
    dateAdded: "2019-01-11T13:16:51.133Z",
    courseId: "cjqqxbh3h00003g5jj7867dwp"
},
{
    userId: "82a9e0cb-141f-4963-9bd2-5da2da015242",
    question: "Here is some text and now comes the code```const x => x\nconst first = x => y => x``` Here is some other text after the code",
    answer: "Here is some text and now comes the code```const x => x\nconst first = x => y => x``` Here is some other text after the code",
    dateAdded: "2019-01-11T14:57:38.045Z",
    courseId: "cjqqxbh3h00003g5jj7867dwp"
},]) => action => {
    switch (action.type) {
        case ADD_CARD:
            return [...state, card(state)(action)]
        case REMOVE_CARD:
            return state.filter(c => c.id !== action.id)
        case UPDATE_CARDS:
            return [...state, ...action.payload]
        default:
            return state
    }
}

const course = (state = {}) => action => {
    switch (action.type) {
        case ADD_COURSE:
            return {
                courseId: action.courseId,
                courseName: action.courseName
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