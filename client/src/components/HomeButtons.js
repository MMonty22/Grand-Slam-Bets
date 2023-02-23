import React, {useContext} from 'react'
import { UserContext } from '../Context/UserContext';

function HomeButtons({handleUserLogout, handleShowTodaysBets, showTodaysBets, handleShowTodayComments, showTodayComments, handleShowOldBets, showOldBets, handleShowOldComments, showOldComments}) {
    const {state} = useContext(UserContext)

    return (
        <div className='container'>
            <h2 className='headers'>Hi {state.user.username}</h2>
            <p className='headers'>Your Record: {`${state.user?.wins} wins - ${state.user?.losses} losses`}</p>
            <div className='home'>
                <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
                <button id='todayBets' onClick={handleShowTodaysBets}>{showTodaysBets ? "Hide Bets You Made Today" : "See Bets You Made Today"}</button>
                <button id='todayComments' onClick={handleShowTodayComments}>{showTodayComments ? "Hide Comments You Made Today" : "See Comments You Made Today"}</button>
                <button id='oldBets' onClick={handleShowOldBets}>{showOldBets ? "Hide Old Bets You Made" : "See Old Bets You Made"}</button>
                <button id='oldComments' onClick={handleShowOldComments}>{showOldComments ? "Hide Old Comments You Made" : "See Old Comments You Made"}</button>
            </div>
        </div>
    )
}

export default HomeButtons