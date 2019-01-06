import {
    getInputValueFromId,
    getSelectedValue,
} from './dom'

import {
    CLEAR_ADD_CARD_TEXTAREA,
    ADD_SELECT_ATTRIBUTE
} from '../side-effects/index'

import { Task } from 'ramda-x'
import axios from 'axios'

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

const testRequest = url =>
    Task((rej, res) => axios.get(url).then(res).catch(rej))


// export const addCourse = (counter => () => ({
//     type: ADD_COURSE,
//     id: counter++,
//     course: getInputValueFromId('course'),
//     command: {
//         effect: testRequest('https://jsonplaceholder.typicode.com/todos/1')
//     }
// })
// )(0)

export const addCourse = (counter => () => ({
    type: ADD_COURSE,
    id: `course-${counter++}`,
    courseName: getInputValueFromId('course')

})
)(0)


export const addCard = (counter => () => ({
    type: ADD_CARD,
    id: counter++,
    question: getInputValueFromId('card-question'),
    answer: getInputValueFromId('card-answer'),
    course: getSelectedValue('courseList'),
    command: {
        type: CLEAR_ADD_CARD_TEXTAREA
    }
}))(0)


export const selectCourse = () => ({
    type: SELECT_COURSE,
    command: {
        type: ADD_SELECT_ATTRIBUTE
    }
})


export const addTodo = (counter => value => ({
    type: ADD_TODO,
    id: counter++,
    text: value
}))(1)

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    id
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

export const perform = dispatch => state => ({ command: { effect } }) =>
    effect !== undefined
        ? effect.fork(console.error, res => console.log('comes from performIO', res))
        : null

export const changeUrl = url => ({
    type: CHANGE_URL,
    url,
    command: {
        type: CHANGE_URL,
        url
    }
})