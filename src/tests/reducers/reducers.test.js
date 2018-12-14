const rewire = require('rewire')
const expect = require('expect')
const deepFreeze = require('../../../node_modules/deep-freeze')
const reducers = rewire('../build/reducers/index')
const todos = reducers.__get__('todos')
const todoApp = reducers.__get__('todoApp')


const testAddTodo = before => action => after =>
    expect(
        todos(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)


testAddTodo([])({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
})([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    }
])

const testSetVisitiblityFilter = before => action => after =>
    expect(
        todoApp(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)

testSetVisitiblityFilter('')(
    {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'SHOW_COMPLETED'
    })
    ({
        todos: [],
        temp: {},
        visibilityFilter: 'SHOW_COMPLETED'
    })

const testToggleTodo = before => action => after =>
    expect(
        todos(deepFreeze(before))(deepFreeze(action)) // reducer must be a pure function, therefore we use deepFreeze to make the values immutable so if reducers tries to modify a value instead of returning a new one, it's going to show an error: TypeError: Cannot assign to read only property 'completed' of object '#<Object>' 
    ).toEqual(after)

testToggleTodo([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: false
    }
])(
    {
        id: 1,
        type: 'TOGGLE_TODO'
    }
)([
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: true
    }
])