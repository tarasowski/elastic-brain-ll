import { combineReducers } from '../utils/combine-reducers'
import { cards, courses, visibilityFilter, navigation } from '../reducers/index'


export const store = combineReducers({
    cards: cards, // key = state field, value = reducer function
    courses: courses, // key = state field, value = reducer function
    visibilityFilter: visibilityFilter,
    navigation: navigation // key = state field, value = reducer function
})


