import React, { useContext} from 'react'
import { UserContext } from '../Context/UserContext';
import EnterResult from './EnterResult';

function OlderBets({currentDate, handleBetDelete}) {
    const { state, } = useContext(UserContext)

    return (
        <div className='olderBets'>
            {state.user?.bets?.map((bet) => {
            const betDate = new Date(bet.created_at).toLocaleDateString("en-US")
            if (betDate < currentDate) {
                return (
                    <ul className='userBets' key={bet.id}>
                    <li>Bet: {bet.description}</li>
                    <li>Odds: {bet.odds}</li>
                    <br/>
                    <button className='deleteButton' onClick={() => handleBetDelete(bet.id)}>❌</button>
                    <EnterResult bet={bet}/>
                </ul>
                )
        }
        else return ""
    })
}
        </div>
    )
}

export default OlderBets