import { compose, trace } from 'compose.helpers'
import { addSelectAttribute } from './dom'
import { login, register, confirmRegister } from './auth'
import {
    addCourse,
    addCard,
    initLoadContentFromServer,
} from './graphql'
import { saveTokenToCookie } from './cookie'
import {
    CHANGE_URL,
    REGISTER_ACCOUNT,
    CLEAR_ADD_CARD_TEXTAREA,
    ADD_SELECT_ATTRIBUTE,
    CONFIRM_ACCOUNT,
    LOGIN_ACCOUNT,
    ADD_COURSE,
    registrationSuccess,
    confirmationSuccess,
    loginSuccess,
    updateCourses,
    updateCards,
    SAVE_ACCESS_TOKEN,
    INIT
} from '../actions/index'

const initCards = dispatch => payload =>
    dispatch(updateCards(payload.cards.data.data.getAllCards.items))

const initCourses = dispatch => payload =>
    (dispatch(updateCourses(payload.courses.data.data.getAllCourses.items[0].courses)), payload)

const initialize = dispatch => payload =>
    compose(
        initCards(dispatch),
        initCourses(dispatch)
    )(payload)

export const perform = dispatch => state => ({ command }) => {
    switch (command.type) {
        case CLEAR_ADD_CARD_TEXTAREA:
            document.getElementById('card-question').value = ''
            document.getElementById('card-answer').value = ''
            addCard(state.profile.accessToken)(command)
                .fork(console.error, x => x)
            break
        case ADD_SELECT_ATTRIBUTE:
            addSelectAttribute()
            break
        case CHANGE_URL:
            history.pushState({ url: command.url }, null, command.url)
            break
        case REGISTER_ACCOUNT:
            register(command.username)(command.password)(command.email)
                .then(data => dispatch(registrationSuccess(data)),
                    console.error)
            break
        case CONFIRM_ACCOUNT:
            confirmRegister(command.username)(command.code)
                .then(() => dispatch(confirmationSuccess()), console.error)
            break
        case LOGIN_ACCOUNT:
            login(command.username)(command.password)
                .then(data => dispatch(loginSuccess(data)),
                    console.error)
            break
        case ADD_COURSE:
            addCourse(state.profile.accessToken)(command)
                .fork(console.error, res => dispatch(updateCourses(res.data.data.addNewCourse.courses)))
        case SAVE_ACCESS_TOKEN:
            saveTokenToCookie(state.profile.accessToken)
            initLoadContentFromServer(state.profile.accessToken)
                .fork(console.error, res => initialize(dispatch)(res))
            break
        case INIT:
            command.accessToken !== null
                ? initLoadContentFromServer(state.profile.accessToken)
                    .fork(console.error, res => initialize(dispatch)(res))
                : null
            break
        default:
            return state
    }
}