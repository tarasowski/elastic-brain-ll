import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { div, input, button } = hh(h)


export const AddCourse = ({ dispatch: { onclick, oninput } }) =>
    div({}, [
        input({
            type: 'text',
            name: 'course',
            value: '',
            id: 'course',
        }),
        button({
            type: 'submit',
            onclick
        }, 'Add Course')
    ])