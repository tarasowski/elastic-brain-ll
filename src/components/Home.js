import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { div, br, hr, h1 } = hh(h)

export const Home = ({ state, dispatch }) =>
    div({}, [
        h1({}, 'Home of Elastic Brain'),
        hr(),
        br(),
        br()
    ])