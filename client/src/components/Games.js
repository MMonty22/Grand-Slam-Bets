import React, {useContext} from 'react'
import ReactDOM from 'react-dom';
import {useNavigate} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function Games() {
    const {state} = useContext(UserContext);
    const navigate = useNavigate()

    //console.log('state', state)
    const gamesInfo = state.games.map((game) =>
        <ul key={game.id}>
        <li className='gameCards' onClick={() => navigateToPlayerStats(game.id)}>{`${game.away_team} vs ${game.home_team}`}</li>
    </ul>)

    function navigateToPlayerStats(gameID) {
        navigate(`/games/${gameID}`)
    }

    function navigateToAddGameForm() {
        navigate('/games/new')
    }

    function navigateToLoginPage() {
        navigate('/login')
    }

    function navigateToSignUpPage() {
        navigate('/signup')
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
    else
    return (ReactDOM.createPortal(
        <div className='modal'>
            <div className='loginModal'>
                <h2>Please Create an Account or Login</h2>
                <button className='modalButtons' onClick={navigateToSignUpPage}>Create Account</button>
                <button className='modalButtons' onClick={navigateToLoginPage}>Login</button>
            </div>
        </div>,
        document.getElementById('portal')
    ))
}

export default Games