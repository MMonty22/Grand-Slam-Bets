export const initialState = {
    initialLoad: true,
    user: {},
    loggedIn: false,
    games: [],
    bets: [],
    comments: []
}

export function reducer(state, action) {
  switch (action.type) {
    case 'setUser':
        return {
            ...state,
            user: action.payload
        }
    case 'setLoad':
        return {
            ...state,
            initialLoad: false    
        }
    case 'login':
        return {
            ...state,
            user: action.payload,
            loggedIn: true
        }
    case 'signup':
        return {
            ...state,
            user: action.payload,
            loggedIn: true
        }
    case 'logout':
        return {
            ...state,
            user: {},
            loggedIn: false
        }
    case 'setLoggedIn':
        return {
            ...state,
            loggedIn: action.payload
        }
    case 'fetchUsers':
        return {
            ...state,
            users: action.payload
        }
    case 'fetchGames':
        return {
            ...state,
            games: action.payload
        }
    case 'fetchBets':
        return {
            ...state,
            bets: action.payload
        }
    case 'fetchComments':
        return {
            ...state,
            comments: action.payload
        }
    case 'createGame':
        const updatedGames = [...state.games, action.payload]
        return {
            ...state,
            user: {
                ...state.user
            },
            games: updatedGames,
        }
    default:
  }
}