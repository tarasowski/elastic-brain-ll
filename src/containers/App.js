import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import navigation from './Navigation'
import { view } from '../routes/index'
import { Route } from '../routes/index'
import addCourse from '../containers/AddCourse'
import addCard from '../containers/AddCard'
import learn from '../containers/Learn'
import auth from '../containers/Auth'
import home from '../containers/Home'

const { div, pre } = hh(h)

const app = dispatch => state =>
    div([
        navigation(state)(dispatch),
        Route
            .start({ path: '/', container: auth })
            .add({ path: '/add-course', container: addCourse })
            .add({ path: '/add-card', container: addCard })
            .add({ path: '/learn', container: learn })
            .add({ path: '/register', container: auth })
            .fold(routes => view(routes)(state)(dispatch)),
        pre({}, JSON.stringify(state, null, 4)),
    ])

export default app