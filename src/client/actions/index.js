import cuid from 'cuid'
import { getCookieAccessToken } from './cookie'
import {
    getInputValueFromId,
    getSelectedValue,
} from './dom'


export const INIT = 'INIT'
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const ADD_COURSE = 'ADD_COURSE'
export const REMOVE_COURSE = 'REMOVE_COURSE'
export const SELECT_COURSE = 'SELECT_COURSE'
export const UPDATE_STATE = 'UPDATE_STATE'
export const FILTER_CARDS = 'FILTER_CARDS'
export const SET_SHOW_QUESTION = 'SET_SHOW_QUESTION'
export const LEARN_NEXT_QUESTION = 'LEARN_NEXT_QUESTION'
export const LEARN_START_OVER = 'LEARN_START_OVER'
export const CHANGE_URL = 'CHANGE_URL'
export const REGISTER_ACCOUNT = 'REGISTER_ACCOUNT'
export const CLEAR_ADD_CARD_TEXTAREA = 'CLEAR_ADD_CARD_TEXTAREA'
export const ADD_SELECT_ATTRIBUTE = 'ADD_SELECT_ATTRIBUTE'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE'
export const CONFIRM_ACCOUNT = 'CONFIRM_ACCOUNT'
export const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT'
export const CONFIRMATION_SUCCESS = 'CONFIRMATION_SUCCESS'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const UPDATE_COURSES = 'UPDATE_COURSES'
export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN'
export const UPDATE_CARDS = 'UPDATE_CARDS'
export const GO_TO_QUESTION = 'GO_TO_QUESTION'

export const init = (token = getCookieAccessToken()) => ({
    type: INIT,
    payload: token,
    command: {
        type: INIT,
        accessToken: token
    }
})

export const goToQuestion = () => ({
    type: GO_TO_QUESTION,
    questionPosition: getInputValueFromId('go-to-question')
})

export const updateCards = data => ({
    type: UPDATE_CARDS,
    payload: data
})

export const updateCourses = data => ({
    type: UPDATE_COURSES,
    payload: data
})

export const registrationSuccess = data => ({
    type: REGISTRATION_SUCCESS,
    payload: data
})
export const registrationFailure = err => ({
    type: REGISTRATION_FAILURE,
    payload: err
})

export const confirmationSuccess = msg => ({
    type: CONFIRMATION_SUCCESS,
    payload: msg
})

export const loginSuccess = data => ({
    type: LOGIN_SUCCESS,
    payload: data,
    command: {
        type: SAVE_ACCESS_TOKEN
    }
})

export const loginAccount = () => ({
    type: LOGIN_ACCOUNT,
    command: {
        type: LOGIN_ACCOUNT,
        username: getInputValueFromId('login-username'),
        password: getInputValueFromId('login-password'),
    }
})

export const confirmAccount = () => ({
    type: CONFIRM_ACCOUNT,
    command: {
        type: CONFIRM_ACCOUNT,
        username: getInputValueFromId('confirmation-username'),
        code: getInputValueFromId('confirmation-code'),
    }
})

export const registerAccount = () => ({
    type: REGISTER_ACCOUNT,
    command: {
        type: REGISTER_ACCOUNT,
        username: getInputValueFromId('register-username'),
        password: getInputValueFromId('register-password'),
    }
})

export const addCourse = (courseId = cuid()) => ({
    type: ADD_COURSE,
    courseId,
    courseName: getInputValueFromId('course'),
    command: {
        type: ADD_COURSE,
        courseId,
        courseName: getInputValueFromId('course'),
    }

})

export const addCard = (
    cardId = cuid(),
    dateAdded = new Date().toISOString(),
    question = getInputValueFromId('card-question'),
    answer = getInputValueFromId('card-answer'),
    courseId = getSelectedValue('courseList')
) => ({
    type: ADD_CARD,
    cardId,
    question,
    answer,
    dateAdded,
    courseId,
    command: {
        type: CLEAR_ADD_CARD_TEXTAREA,
        cardId,
        question,
        answer,
        dateAdded,
        courseId
    }
})


export const selectCourse = () => ({
    type: SELECT_COURSE,
    command: {
        type: ADD_SELECT_ATTRIBUTE
    }
})


export const setVisiblityFilter = filter => ({
    type: SET_VISIBILITY_FILTER,
    filter
})

export const setShowQuestion = () => ({
    type: SET_SHOW_QUESTION,
})

export const learnNextQuestion = () => ({
    type: LEARN_NEXT_QUESTION,
})

export const learnStartOver = () => ({
    type: LEARN_START_OVER
})


export const changeUrl = url => ({
    type: CHANGE_URL,
    url,
    command: {
        type: CHANGE_URL,
        url
    }
})