import { prop, compose } from 'compose.helpers'


const filterByUrl = routes => url =>
    routes.filter(el => el.path === url)

const head = xs => xs[0]

const getContainerName = xs => prop('container', head(xs))

const loadContainer = state => dispatch => container =>
    container(state)(dispatch)

export const view = routes => state => dispatch =>
    compose(
        loadContainer(state)(dispatch),
        getContainerName,
        filterByUrl(routes),
    )(state.navigation.url)

export const Route = routes => ({
    add: x => Route([...routes, x]),
    fold: f => f(routes)
})

Route.start = x => Route([x])