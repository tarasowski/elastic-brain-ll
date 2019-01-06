const expect = require('expect')
const deepFreeze = require('../../../node_modules/deep-freeze')
const { todos } = require('../build/reducers')
const { store } = require('../build/store/configureStore')
const { cards, courses, input } = require('../build/reducers')
const {
    ADD_CARD,
    REMOVE_CARD,
    ADD_COURSE,
    REMOVE_COURSE,
    INPUT_COURSE
} = require('../build/actions')


const testAddCard = before => action => after => {
    expect(
        cards(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)
}


testAddCard([])(
    {
        type: ADD_CARD,
        id: 0,
        question: 'What is redux?',
        answer: 'Redux is state management',
        course: 'functional programming'
    }
)([
    {
        id: 0,
        question: 'What is redux?',
        answer: 'Redux is state management',
        course: 'functional programming'
    }
])

const testRemoveCard = before => action => after =>
    expect(
        cards(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)

testRemoveCard([
    {
        id: 5
    },
    {
        id: 6
    }
])({
    type: REMOVE_CARD,
    id: 5
})([{ id: 6 }])

const testAddCourse = before => action => after =>
    expect(
        courses(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)


testAddCourse([])(
    {
        type: ADD_COURSE,
        course: 'functional programming',
        id: 1
    }
)(
    [
        {
            id: 1,
            course: 'functional programming'
        }
    ]
)

const removeCourse = before => action => after =>
    expect(
        courses(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)

removeCourse(
    [
        {
            id: 0,
            course: 'functional programming'
        },
        {
            id: 1,
            course: 'serverless'
        }
    ]
)({
    type: REMOVE_COURSE,
    id: 0
})(
    [
        {
            id: 1,
            course: 'serverless'
        }
    ]
)

const testinputCourse = before => action => after =>
    expect(
        input(deepFreeze(before))(deepFreeze(action))
    ).toEqual(after)

testinputCourse({})(
    {
        type: INPUT_COURSE,
        courseName: 'functional programming'
    }
)(
    {
        courseName: 'functional programming'
    }
)

// const testAddTodo = before => action => after =>
//     expect(
//         todos(deepFreeze(before))(deepFreeze(action))
//     ).toEqual(after)


// testAddTodo([])({
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Learn Redux'
// })([
//     {
//         id: 0,
//         text: 'Learn Redux',
//         completed: false
//     }
// ])

// const testSetVisitiblityFilter = before => action => after =>
//     expect(
//         store(deepFreeze(before))(deepFreeze(action))
//     ).toEqual(after)

// testSetVisitiblityFilter('')(
//     {
//         type: 'SET_VISIBILITY_FILTER',
//         filter: 'SHOW_COMPLETED'
//     })
//     ({
//         todos: [],
//         visibilityFilter: 'SHOW_COMPLETED'
//     })

// const testToggleTodo = before => action => after =>
//     expect(
//         todos(deepFreeze(before))(deepFreeze(action)) // reducer must be a pure function, therefore we use deepFreeze to make the values immutable so if reducers tries to modify a value instead of returning a new one, it's going to show an error: TypeError: Cannot assign to read only property 'completed' of object '#<Object>' 
//     ).toEqual(after)

// testToggleTodo([
//     {
//         id: 0,
//         text: 'Learn Redux',
//         completed: false
//     },
//     {
//         id: 1,
//         text: 'Go shopping',
//         completed: false
//     }
// ])(
//     {
//         id: 1,
//         type: 'TOGGLE_TODO'
//     }
// )([
//     {
//         id: 0,
//         text: 'Learn Redux',
//         completed: false
//     },
//     {
//         id: 1,
//         text: 'Go shopping',
//         completed: true
//     }
// ])