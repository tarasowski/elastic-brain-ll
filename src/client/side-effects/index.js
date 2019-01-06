import { addSelectAttribute } from './dom'
import { CHANGE_URL } from '../actions/index'
export const CLEAR_ADD_CARD_TEXTAREA = 'CLEAR_ADD_CARD_TEXTAREA'
export const ADD_SELECT_ATTRIBUTE = 'ADD_SELECT_ATTRIBUTE'

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
        default:
            return {}
    }
}