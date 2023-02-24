import React, {useContext} from 'react'
import ReactDOM from 'react-dom';
import {useNavigate} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function Games() {
    const {state} = useContext(UserContext);
    const navigate = useNavigate()

    function navigateToPlayerStats(gameID) {
        navigate(`/game/${gameID}`)
    }

    function navigateToAddGameForm() {
        navigate('/game/new')
    }

    function navigateToLoginPage() {
        navigate('/login')
    }

    function navigateToSignUpPage() {
        navigate('/signup')
    }

    if (state.initialLoad) {
        return <h3 className='headers'>Loading...</h3>
    }
    else if (state.loggedIn)
    return (
        <div className='centerDiv'>
            <h3 id="addGame" onClick={() => navigateToAddGameForm()}>Add A Game</h3>
            {state.games?.map((game) => 
                <ul className='gameCards' key={game.id}>
                    <li onClick={() => navigateToPlayerStats(game.id)}>{`${game.away_team} vs ${game.home_team}`}</li>
                </ul>)}
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