export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const ADD_TODO_TEXT = 'ADD_TODO_TEXT'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


export const addTodoText = value => ({
    type: ADD_TODO_TEXT,
    text: value,
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