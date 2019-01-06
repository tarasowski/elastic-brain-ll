import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { div, input, label, form, button, br, hr } = hh(h)


const inputSet = name =>
    div({}, [
        label({}, name),
        input({
            type: 'text',
            value: '',
            id: name
        })
    ])

export const Auth = () =>
    div({}, [
        form({}, [
            inputSet('email'),
            inputSet('password'),
            inputSet('username'),
            button({
                type: 'submit'
            }, 'Register'),
            br(),
            hr()
        ])
    ])