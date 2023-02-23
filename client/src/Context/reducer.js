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
        const updatedUserBets = [...state.user.bets, action.payload]
        return {
            ...state,
            user: {
                ...state.user,
                bets: updatedUserBets
            },
            bets: updatedBets
        }
    case 'updateBet': //payload is editedBetObj passed into function from PATCH request which has gameID, category, description and odds
        const editedUserBets = state.user.bets.map((bet) => bet.id === action.payload.id ? action.payload : bet)
        const editedBets = state.bets.map((bet) => bet.id === action.payload.id ? action.payload : bet)
        return {
            ...state,
            user: {
                ...state.user,
                bets: editedUserBets
            },
            bets: editedBets
        }
    case 'updateBetResult': //payload is regular betObj plus result
        const editedUserBetsWithResult = state.user.bets.map((bet) => bet.id === action.payload.id ? action.payload : bet)
        const editedBetsWithResult = state.bets.map((bet) => bet.id === action.payload.id ? action.payload : bet)
        const updatedUserWins = action.payload.result === "win" ? state.user.wins +=1 : state.user.wins
        const updatedUserLosses = action.payload.result === "loss" ? state.user.losses +=1 : state.user.losses
        return {
            ...state,
            user: {
                ...state.user,
                bets: editedUserBetsWithResult,
                wins: updatedUserWins,
                losses: updatedUserLosses
            },
            bets: editedBetsWithResult
        }
    case 'deleteBet':
        const betsMinusDeletedOne = state.bets.filter((bet) => bet.id !== action.payload.betID)
        //console.log('betsMinus', betsMinusDeletedOne)
        const userBetsMinusDeletedOne = state.user.bets.filter((bet) => bet.id !== action.payload.betID)
        //console.log('userBetsMinus', userBetsMinusDeletedOne)
        const commentsWithoutDeletedOne = state.comments.filter((com) => com.bet_id !== action.payload.relevantBet[0].id)
        const userCommentsWithoutDeletedOne = state.user.comments.filter((com) => com.bet_id !== action.payload.relevantBet[0].id)
        return {
            ...state,
            user: {
                ...state.user,
                bets: userBetsMinusDeletedOne,
                comments: userCommentsWithoutDeletedOne
            },
            bets: betsMinusDeletedOne,
            comments: commentsWithoutDeletedOne
        }
    case 'createComment': //payload is newCommentObj passed into function
        const updatedComments = [...state.comments, action.payload]
        const updatedUserComments = [...state.user.comments, action.payload]
        return {
            ...state,
            user: {
                ...state.user,
                comments: updatedUserComments
            },
            comments: updatedComments
        }
    case 'updateComment': //payload is editedCommentObj passed into function from PATCH request
        const editedComments = state.comments.map((com) => com.id === action.payload ? action.payload : com)
        const editedUserComments = state.user.comments.map((com) => com.id === action.payload.id ? action.payload : com)
        return {
            ...state,
            user: {
                ...state.user,
                comments: editedUserComments
            },
            comments: editedComments
        }
    case 'deleteComment':
        const commentsMinusDeletedOne = state.comments.filter((com)=> com.id !== action.payload)
        const userCommentsMinusDeletedOne = state.user.comments.filter((com)=> com.id !== action.payload)
        return {
            ...state,
            user: {
                ...state.user,
                comments: userCommentsMinusDeletedOne
            },
            comments: commentsMinusDeletedOne
        }
    default:
  }
}