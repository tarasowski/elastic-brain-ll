import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { compose, filter, prop } from 'compose.helpers'

const { div, br, hr, h2, button, h3, p, ul, li } = hh(h)

const byCourse = visibilityFilter => card =>
    card.course.course === visibilityFilter.showCourse

const length = xs => xs.length
const position = n => xs => n !== undefined ? xs[n] : xs[0]
const question = o => prop('question', o)
const answer = o => prop('answer', o)

const numberOfQuestions = visibilityFilter => cards =>
    compose(length,
        filter(byCourse(visibilityFilter))
    )(cards)

const showCourses = cards => ({ onCourseClick }) =>
    cards.map(el => li({ onclick: onCourseClick, id: el.id }, `Id: - ${el.id} - Name: ${el.courseName} `))

const showProgress = visibilityFilter => cards =>
    p({}, `
        ${visibilityFilter.currentQuestionId + 1} 
        of 
        ${compose(
        length,
        filter(byCourse(visibilityFilter))
    )(cards)}`)

const showQuestion = visibilityFilter => onShowQuestionClick => cards =>
    div({}, [
        h3({}, 'Question'),
        compose(
            question,
            position(visibilityFilter.currentQuestionId),
            filter(byCourse(visibilityFilter)),
        )(cards),
        br(),
        br(),
        button({
            type: 'button',
            onclick: onShowQuestionClick,
        }, 'Show Answer'),
        showProgress(visibilityFilter)(cards)
    ])

const nextQuestion = visibilityFilter => onNextQuestionClick => cards =>
    div({}, [
        h3({}, 'Question'),
        compose(
            question,
            position(visibilityFilter.currentQuestionId),
            filter(byCourse(visibilityFilter)),
        )(cards),
        h3({}, 'Answer'),
        compose(
            answer,
            position(visibilityFilter.currentQuestionId),
            filter(byCourse(visibilityFilter)),
        )(cards),
        br(),
        br(),
        button({
            type: 'button',
            onclick: onNextQuestionClick
        }, 'Next Question'),
        showProgress(visibilityFilter)(cards)
    ])

const startOver = visibilityFilter => onStartOverClick => cards =>
    div({}, [
        h3({}, 'Question'),
        compose(
            question,
            position(visibilityFilter.currentQuestionId),
            filter(byCourse(visibilityFilter)),
        )(cards),
        h3({}, 'Answer'),
        compose(
            answer,
            position(visibilityFilter.currentQuestionId),
            filter(byCourse(visibilityFilter)),
        )(cards),
        br(),
        br(),
        button({
            type: 'button',
            onclick: onStartOverClick
        }, 'Start Over'),
        showProgress(visibilityFilter)(cards)
    ])

const showCard = visibilityFilter => ({ onShowQuestionClick, onNextQuestionClick, onStartOverClick }) => cards =>
    visibilityFilter.showAnswer === false
        ? showQuestion(visibilityFilter)(onShowQuestionClick)(cards)
        : (visibilityFilter.currentQuestionId + 1) >= numberOfQuestions(visibilityFilter)(cards)
            ? startOver(visibilityFilter)(onStartOverClick)(cards)
            : nextQuestion(visibilityFilter)(onNextQuestionClick)(cards)

const cardView = visibilityFilter => dispatch => cards =>
    (Object.keys(visibilityFilter).length === 0 && visibilityFilter.constructor === Object)
        ? div({}, [
            p({}, 'Please choose your course you want to learn!')
        ])
        : showCard(visibilityFilter)(dispatch)(cards)

export const Learn = ({ state: { cards, courses, visibilityFilter }, dispatch }) =>
    div({}, [
        br(),
        h2({}, 'Learn'),
        br(),
        h3({}, 'Courses'),
        ul({}, showCourses(courses)(dispatch)),
        cardView(visibilityFilter)(dispatch)(cards),
        hr(),
    ])