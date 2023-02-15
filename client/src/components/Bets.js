import React, {useContext} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function Bets() {
    const {state} = useContext(UserContext);
    const {id} = useParams()
    const navigate = useNavigate()

    const relevantGame = state.games?.find((game) => String(game.id) === String(id))
    //console.log('relevantGame', relevantGame)

    const relevantBets = relevantGame?.bets?.map((bet) =>(
        <ul key={bet.id}>
            <li>{bet.description}</li>
            <li>{bet.odds}</li>
            <button onClick={() => navigateToCommentForm(bet.id)}>Leave A Comment</button>
            <button onClick={() => navigateToComments(bet.id)}>See Comments</button>
    </ul>))
    
    function navigateToCommentForm(betID) {
        navigate(`/bets/${betID}/comments/new`)
    }

    function navigateToComments(betID) {
        navigate(`/bets/${betID}/comments`)
    }

    return (
        <div>
            <h2 className='headers'>{relevantGame ? `Bets Involving ${relevantGame.away_team} vs ${relevantGame.home_team}` : 'Loading...'}</h2>
            {relevantBets}
        </div>
    )
}

export default Bets