'use strict'
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    ADD_CARD,
    REMOVE_CARD,
    ADD_COURSE,
    REMOVE_COURSE,
    SET_SHOW_QUESTION,
    LEARN_NEXT_QUESTION,
    LEARN_START_OVER,
    CHANGE_URL,
} from '../actions/index'



const todo = (state = {}) => action => {
    switch (action.type) {
        case ADD_TODO:
            return {
                id: action.id,
                text: action.text,
                completed: false,
            }
        case TOGGLE_TODO:
            return state.id === action.id
                ? { ...state, completed: !state.completed }
                : state
        default:
            return state
    }
}

export const todos = (state = []) => action => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, todo(state)(action)]
        case TOGGLE_TODO:
            return state.map(td => todo(td)(action))
        default:
            return state
    }
}

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
        course: "course-0"
    }
}, {
    id: 1,
    question: "my #2 question",
    answer: "my #2 answer",
    course: {
        course: "course-0"
    }
},
{
    id: 2,
    question: "my #3 question",
    answer: "my #3 answer",
    course: {
        course: "course-0"

    }
}
]) => action => {
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
                courseName: action.courseName
            }
        default:
            return state
    }
}

export const courses = (state = [{
    id: "course-0",
    courseName: "first"
}]) => action => {
    switch (action.type) {
        case ADD_COURSE:
            return [...state, course(state)(action)]
        case REMOVE_COURSE:
            return state.filter(c => c.id !== action.id)
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