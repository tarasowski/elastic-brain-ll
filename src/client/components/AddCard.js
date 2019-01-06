import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { Either } from 'lambda.either'

const { div, button, h3, br, hr, textarea, select, option, input } = hh(h)


const area = name => id =>
    div({}, [
        h3({}, name),
        textarea({
            type: 'text',
            name: id,
            id
        })
    ])

const optionCourses = courses =>
    courses.map(c =>
        Either.fromNullable(c)
            .fold(err => option({}, ''), c => option({ value: c.courseName, id: `${c.id}` }, c.courseName)))

const dropdown = onCourseSelect => courses => {
    return div({}, [
        select({
            id: 'courseList',
            onchange: onCourseSelect
        }, [
                option({ value: '--Please choose a category--' }, '--Please choose a category--'),
                Either.of(courses)
                    .map(optionCourses)
                    .fold(err => option({}, ''), opt => opt)
            ])
    ])

}


export const AddCard = ({ state: { courses }, dispatch: { onAddCardClick, onCourseSelect, clearOnClick } }) =>
    div({}, [
        hr(),
        area('Your Question')('card-question'),
        area('Your Answer')('card-answer'),
        br(),
        dropdown(onCourseSelect)(courses),
        br(),
        button({
            type: 'submit',
            onclick: onAddCardClick
        }, 'Add Card'),
        hr()
    ])


