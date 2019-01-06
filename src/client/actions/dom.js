import { Either } from 'lambda.either'
import { compose, fold, chain, map } from 'compose.helpers'

// wrapped in fromNullable because it can return a null
const getElement = id =>
    Either.fromNullable(document.getElementById(id))

const result = e =>
    fold(err => err, data => data)(e)

const getSelectedOptionsValue = el =>
    Either.fromNullable(el.options[el.selectedIndex])

const getValue = el =>
    Either.fromNullable(el.value)

export const getInputValueFromId = id =>
    compose(
        result,
        chain(getValue),
        getElement
    )(id)


export const getSelectedValue = id =>
    compose(
        fold(err => err, x => x),
        map(el => el.id),
        chain(getSelectedOptionsValue),
        getElement
    )(id)

