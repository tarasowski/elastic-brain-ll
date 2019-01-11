import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { h1, div, input, label, form, button, br, hr, pre, code, p } = hh(h)


const inputSet = name => type => id =>
    div({}, [
        label({}, name),
        input({
            type,
            value: '',
            id
        })
    ])

const registrationForm = onSignUpClick =>
    div({}, [
        form({}, [
            h1({}, 'Registration'),
            inputSet('Username')('text')('register-username'),
            inputSet('Password')('password')('register-password'),
            inputSet('Email')('email')('register-email'),
            button({
                type: 'button',
                onclick: onSignUpClick,
            }, 'Register'),
            br(),
            hr()
        ])
    ])

const confirmationForm = onConfirmationClick =>
    div({}, [
        form({}, [
            h1({}, 'Confirmation'),
            inputSet('Username')('text')('confirmation-username'),
            inputSet('Code')('text')('confirmation-code'),
            button({
                type: 'button',
                onclick: onConfirmationClick
            }, 'Confirm'),
            br(),
            hr()
        ])
    ])

const loginForm = onLoginClick =>
    div({}, [
        form({}, [
            h1({}, 'Login'),
            inputSet('Username')('text')('login-username'),
            inputSet('Password')('password')('login-password'),
            button({
                type: 'button',
                onclick: onLoginClick
            }, 'Login'),
            br(),
            hr()
        ])
    ])


export const Auth = ({ state: { isOnline },
    dispatch: {
        onRegisterClick,
        onConfirmationClick,
        onLoginClick } }) =>
    isOnline
        ? div({}, [
            h1({}, '<br>Welcome to Elastic Brain<br>'),
            pre({}, '<br>Hello<br>World'),
        ])
        : div({}, [
            loginForm(onLoginClick),
            registrationForm(onRegisterClick),
            confirmationForm(onConfirmationClick),
        ])