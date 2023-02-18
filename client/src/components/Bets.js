import React, {useContext} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function Bets() {
    const {state} = useContext(UserContext);
    const {id} = useParams()
    const navigate = useNavigate()

    const relevantGame = state.games?.find((game) => String(game.id) === String(id))
    //console.log('relevantGame', relevantGame)

    const relevantBets = state.bets?.filter((bet) => String(bet.game_id) === String(id))
    //console.log('relevantBets', relevantBets)
    
    function navigateToCommentForm(betID) {
        navigate(`/bets/${betID}/comments/new`)
    }

    function navigateToComments(betID) {
        navigate(`/bets/${betID}/comments`)
    }

    return (
        <div className='centerDiv'>
            <h2 className='headers'>{relevantGame ? `Bets Involving ${relevantGame.away_team} vs ${relevantGame.home_team}` : 'Loading...'}</h2>
            {relevantBets?.map((bet) =>(
                <ul className='bets' key={bet.id}>
                    <li>{bet.description}: {bet.odds}</li>
                    <button onClick={() => navigateToCommentForm(bet.id)}>Leave A Comment</button>
                    <button onClick={() => navigateToComments(bet.id)}>See Comments</button>
            </ul>))}
        </div>
    )
}

export default Bets