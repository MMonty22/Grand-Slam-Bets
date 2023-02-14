import React, {useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function Games() {
    const {state} = useContext(UserContext);
    const navigate = useNavigate()

    //console.log('state', state)
    const gamesInfo = state.games.map((game) =>
        <ul key={game.id}>
        <li className='gameLis' onClick={() => navigateToPlayerStats(game.id)}>{`${game.away_team} vs ${game.home_team}`}</li>
    </ul>)

    function navigateToPlayerStats(gameID) {
        navigate(`/games/${gameID}`)
    }

    function navigateToAddGameForm() {
        navigate('/games/new')
    }

    if (state.initialLoad) {
        return <h3 id='loading'>"Loading..."</h3>
    }
    else if (state.loggedIn)
    return (
        <div>
            <h3 id="addGame" onClick={() => navigateToAddGameForm()}>Add A Game</h3>
            {gamesInfo}
        </div>
    )
}

export default Games