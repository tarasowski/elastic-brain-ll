import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { div, p, span, br, hr } = hh(h)

export const Navigation = ({ state, dispatch: { onHomeClick, onAddCourseClick, onAddCardClick, onLearnClick, onRegisterClick } }) =>
    div({}, [
        span({ style: 'margin-right: 20px; margin-bottom: 20px; cursor: pointer', onclick: onHomeClick }, 'Home'),
        span({ style: 'margin-right: 20px; margin-bottom: 20px; cursor: pointer', onclick: onAddCourseClick }, 'Add Course'),
        span({ style: 'margin-right: 20px; margin-bottom: 20px; cursor: pointer', onclick: onAddCardClick }, 'Add Cards'),
        span({ style: 'margin-right: 20px; margin-bottom: 20px; cursor: pointer', onclick: onLearnClick }, 'Learn'),
        span({ style: 'margin-right: 20px; margin-bottom: 20px; cursor: pointer', onclick: onRegisterClick }, 'Register'),
        br(),
        hr(),
        br(),
    ])