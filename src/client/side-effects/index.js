import { addSelectAttribute } from './dom'
import { login, register, confirmRegister } from './auth'
import { addCategory } from './graphql'
import {
    CHANGE_URL,
    REGISTER_ACCOUNT,
    CLEAR_ADD_CARD_TEXTAREA,
    ADD_SELECT_ATTRIBUTE,
    CONFIRM_ACCOUNT,
    LOGIN_ACCOUNT,
    ADD_COURSE,
    registrationSuccess,
    registrationFailure,
    confirmationSuccess,
    loginSuccess
} from '../actions/index'


export const perform = dispatch => state => ({ command }) => {
    switch (command.type) {
        case CLEAR_ADD_CARD_TEXTAREA:
            document.getElementById('card-question').value = ''
            document.getElementById('card-answer').value = ''
            return {}
        case ADD_SELECT_ATTRIBUTE:
            addSelectAttribute()
            return {}
        case CHANGE_URL:
            history.pushState({ url: command.url }, null, command.url)
            return {}
        case REGISTER_ACCOUNT:
            register(command.username)(command.password)(command.email)
                .then(data => dispatch(registrationSuccess(data)),
                    console.error)
            return {}
        case CONFIRM_ACCOUNT:
            confirmRegister(command.username)(command.code)
                .then(() => dispatch(confirmationSuccess()), console.error)
            return {}
        case LOGIN_ACCOUNT:
            login(command.username)(command.password)
                .then(data => dispatch(loginSuccess(data)),
                    console.error)
            return {}
        case ADD_COURSE:
            addCategory(state.profile.accessToken)(command)
                .fork(console.error, console.log)
        default:
            return {}
    }
}