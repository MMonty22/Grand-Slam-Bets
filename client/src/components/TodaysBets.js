import React, { useContext} from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function TodaysBets({currentDate, handleBetDelete}) {
    const { state } = useContext(UserContext)
    const navigate = useNavigate()

    function navigateToBetEditForm(betID) {
        navigate(`/bets/${betID}/edit`)
    }

    function navigateToGame(gameID) {
        navigate(`/games/${gameID}`)
    }

    return (
        <div>
            {state.user?.bets?.map((bet) => {
                const betDate = new Date(bet.created_at).toLocaleDateString("en-US")
                //console.log('betDate', betDate)
                if (betDate === currentDate) {
                return (
                    <ul className='userBets' key={bet.id}>
                        <li onClick={() => navigateToGame(bet.game_id)}>Bet: {bet.description}</li>
                        <li>Odds: {bet.odds}</li>
                        <br></br>
                        <button className='editButton' onClick={() => navigateToBetEditForm(bet.id)}>✏️</button>
                        <button className='deleteButton' onClick={() => handleBetDelete(bet.id)}>❌</button>
                    </ul>   
                    )
                }
                else return ""
            })} 
        </div>
    )
}

export default TodaysBets