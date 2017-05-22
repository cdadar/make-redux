const appState = {
    title: {
        text: 'React js 小书',
        color: 'red'
    },
    content: {
        text: 'React js 小书内容',
        color: 'blue'
    }
}

function renderApp(newAppState, oldAppState = {}) {
    if (newAppState === oldAppState) return
    console.log('render app...')
    renderTitle(newAppState.title)
    renderContent(newAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) return
    console.log('render title...')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent) {
    if (newContent === oldContent) return
    console.log('render content...')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
}

function dispath(action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
            break
        default:
            break
    }
}

function stateChanger(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state
    }

}

// function createStore(state, stateChanger) {
//     const listeners = []
//     const subscribe = (listener) => listeners.push(listener)
//     const getState = () => state
//     const dispatch = (action) => {
//         stateChanger(state, action)
//         listeners.forEach((listener) => listener())
//     }
//     return { getState, dispatch, subscribe }
// }

function createStore(state, stateChanger) {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = stateChanger(state, action) // 覆盖原对象
        listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe }
}

// renderApp(appState)
// dispath({ type: 'UPDATE_TITLE_TEXT', text: '<React js 小书>' })
// dispath({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
// renderApp(appState)

const store = createStore(appState, stateChanger)
let oldState = store.getState()
store.subscribe(() => {
    const newState = store.getState()
    renderApp(newState, oldState)
    oldState = newState
})

renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React js 小书》' })
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
//renderApp(store.getState())