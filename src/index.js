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

function renderApp(appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}

function renderTitle(title) {
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent(content) {
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
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

function stateChanger(state,action){
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color
            break
        default:
            break
    }

}

function createStore(state, stateChanger) {
    const getState = () => state
    const dispath = (action) => stateChanger(state, action)
    return { getState, dispath }
}

// renderApp(appState)
// dispath({ type: 'UPDATE_TITLE_TEXT', text: '<React js 小书>' })
// dispath({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
// renderApp(appState)

const store=createStore(appState,stateChanger)
renderApp(store.getState())
store.dispath({ type: 'UPDATE_TITLE_TEXT', text: '《React js 小书》' })
store.dispath({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
renderApp(store.getState())