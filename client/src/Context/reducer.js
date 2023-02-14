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
    case 'createBet': //payload is newBetObj and id passed into POST request
        const updatedBets = [...state.bets, action.payload]
        const updatedUserBets = [...state.user.bets, action.payload.newBetObj]
        return {
            ...state,
            user: {
                ...state.user,
                bets: updatedUserBets
            },
            bets: updatedBets
        }
    case 'updateBet': //payload is editedBetObj passed into function from PATCH request
        const editedUserBets = state.user.bets.map((bet) => bet.id === action.payload.id ? action.payload : bet)
        const editedBets = state.bets.map((bet) => bet.id === action.payload ? action.payload : bet)
        return {
            ...state,
            user: {
                ...state.user,
                bets: editedUserBets
            },
            bets: editedBets
        }
    case 'deleteBet':
        const betsMinusDeletedOne = state.bets.filter((bet)=> bet.id !== action.payload)
        //console.log('betsMinus', betsMinusDeletedOne)
        const userBetsMinusDeletedOne = state.user.bets.filter((bet)=> bet.id !== action.payload)
        //console.log('userBetsMinus', userBetsMinusDeletedOne)
        return {
            ...state,
            user: {
                ...state.user,
                bets: userBetsMinusDeletedOne
            },
            bets: betsMinusDeletedOne
        }
    default:
  }
}