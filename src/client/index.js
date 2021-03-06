import createElement from 'virtual-dom/create-element';
import { diff, patch } from 'virtual-dom';
import view from './containers/App'
import { store } from './store/configureStore'
import { perform } from './side-effects/index'
import { init } from './actions/index'


function render(update, view, node) {
  let state = update({})(init())
  let currentView = view(dispatch)(state)
  let rootNode = createElement(currentView)
  perform(dispatch)(state)(init())
  node.appendChild(rootNode)
  function dispatch(action) {
    state = update(state)(action)
    action.command !== undefined ? perform(dispatch)(state)(action) : null
    const updatedView = view(dispatch)(state)
    const patches = diff(currentView, updatedView)
    rootNode = patch(rootNode, patches)
    currentView = updatedView
  }
}

const rootNode = document.getElementById('app')


render(store, view, rootNode)

