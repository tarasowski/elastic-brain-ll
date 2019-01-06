import { Either } from 'lambda.either'
import { compose, map } from 'compose.helpers'

// wrapped in fromNullable because it can return a null
const getElement = id =>
    Either.fromNullable(document.getElementById(id))

const getOptions = el =>
    el.options[el.selectedIndex]

const addSelect = el =>
    el.setAttribute('selected', true)

export const addSelectAttribute = id =>
    compose(
        map(addSelect),
        map(getOptions),
        getElement
    )(id)
