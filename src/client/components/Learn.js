import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { compose, filter, prop, fold, trace, map, chain } from 'compose.helpers'
import { parseMarkDown } from '../utils/parseMarkdown'

const { div, br, hr, h2, button, h3, p, ul, li, pre, code, input } = hh(h)

// highlights ```in the card as code. It's string modification!
const parseMd = parseMarkDown({ p, pre, code })

const byCourse = visibilityFilter => card =>
    card.courseId === visibilityFilter.showCourse

const length = xs => xs.length
const position = n => xs => n !== undefined ? xs[n] : xs[0]
const question = o => parseMd(prop('question', o))
const answer = o => parseMd(prop('answer', o))

const numberOfQuestions = visibilityFilter => cards =>
    compose(length,
        filter(byCourse(visibilityFilter))
    )(cards)

const showCourses = cards => ({ onCourseClick }) =>
    cards.map(el => li({ onclick: onCourseClick, id: el.courseId }, `Id: - ${el.courseId} - Name: ${el.courseName} `))

const numberOfCards = visibilityFilter => cards =>
    compose(
        length,
        filter(byCourse(visibilityFilter))
    )(cards)

const goToQuestion = onGoToQuestionClick =>
    div({}, [
        input({
            type: 'text',
            id: 'go-to-question',
            style: 'margin-right: 20px;'
        }),
        button({
            type: 'button',
            onclick: onGoToQuestionClick,
        }, 'Go To Question')
    ])

const showProgress = visibilityFilter => onGoToQuestionClick => cards =>
    div({}, [
        p({}, `
        ${visibilityFilter.currentQuestionId + 1} 
        of 
        ${numberOfCards(visibilityFilter)(cards)}`),
        goToQuestion(onGoToQuestionClick)
    ])

const showQuestion = visibilityFilter => ({ onShowQuestionClick, onGoToQuestionClick }) => cards =>
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
        showProgress(visibilityFilter)(onGoToQuestionClick)(cards)
    ])

const nextQuestion = visibilityFilter => ({ onNextQuestionClick, onGoToQuestionClick }) => cards =>
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
        showProgress(visibilityFilter)(onGoToQuestionClick)(cards)
    ])

const startOver = visibilityFilter => ({ onStartOverClick, onGoToQuestionClick }) => cards =>
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
        showProgress(visibilityFilter)(onGoToQuestionClick)(cards)
    ])

const showCard = visibilityFilter => ({ onShowQuestionClick, onNextQuestionClick, onStartOverClick, onGoToQuestionClick }) => cards =>
    visibilityFilter.showAnswer === false
        ? showQuestion(visibilityFilter)({ onShowQuestionClick, onGoToQuestionClick })(cards)
        : (visibilityFilter.currentQuestionId + 1) >= numberOfQuestions(visibilityFilter)(cards)
            ? startOver(visibilityFilter)({ onStartOverClick, onGoToQuestionClick })(cards)
            : nextQuestion(visibilityFilter)({ onNextQuestionClick, onGoToQuestionClick })(cards)

const cardView = visibilityFilter => dispatch => cards =>
    (Object.keys(visibilityFilter).length === 0 && visibilityFilter.constructor === Object)
        ? div({}, [
            p({}, 'Please choose your course you want to learn!')
        ])
        : cards[0].courseId === visibilityFilter.showCourse
            ? showCard(visibilityFilter)(dispatch)(cards)
            : div({}, [
                button({
                    type: 'button',
                    onclick: dispatch.onStartOverClick,
                }, 'Go Back'),
                p({}, 'Please add some cards to this course in order to start to learn!')
            ])

const displayCourses = ({ visibilityFilter, courses }) => dispatch =>
    (Object.keys(visibilityFilter).length === 0 && visibilityFilter.constructor === Object)
        ? div({}, [
            h3({}, 'Courses'),
            ul({}, showCourses(courses)(dispatch))
        ])
        : div({})

export const Learn = ({ state: { cards, courses, visibilityFilter }, dispatch }) =>
    div({}, [
        br(),
        h2({}, 'Learn'),
        br(),
        displayCourses(({ visibilityFilter, courses }))(dispatch),
        cardView(visibilityFilter)(dispatch)(cards),
        hr(),
    ])