import React, {useContext} from 'react'
import {useParams} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function BetComments() {
    const {state} = useContext(UserContext);
    const {id} = useParams()

    const relevantBet = state.bets?.find((bet) => String(bet.id) === String(id))
    //console.log('relevantBet', relevantBet)

    const relevantComs = state.comments?.filter((com) => com.bet_id === relevantBet?.id)
    //console.log('releComs', relevantComs)

    return (
        <div className='betComments'>
            <h3 className='headers'>{relevantBet ? `Comments for ${relevantBet.description}: ${relevantBet.odds}` : 'Loading...'}</h3>
            {relevantComs?.map((com) => {
                const relevantUser = state.users.find(u => u.id === com.user_id)
                //console.log('RU', relevantUser)
                return <div key={com.id}>
                    <p>{`${relevantUser.username} said: ${com.text}`}</p>
            </div>
            })}
        </div>
    )
}

export default BetComments