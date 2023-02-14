import React, { useState, useContext} from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function Home() {
    const navigate = useNavigate()
    const { logout, state, dispatch } = useContext(UserContext)
    const [showBets, setShowBets] = useState(false)
    const [showComments, setShowComments] = useState(false)
    //console.log('state', state)

    const userBets = state?.user?.bets?.map((bet) => {
        return <ul key={bet.id}>
            <li>Bet: {bet.description}</li>
            <li>Odds: {bet.odds}</li>
    </ul>})

    const userComments = state.user?.comments?.map((com) => <ul key={com.id}>
        <li>{com.text}</li>
    </ul>)

    function handleShowBets() {
        setShowBets(!showBets)
    }

    function handleShowComments() {
        setShowComments(!showComments)
    }

    function handleUserLogout() {
        fetch('/logout', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                logout()
                navigate('/')
            })
    }

    if (state.initialLoad) {
        return <h3 id='loading'>"Loading..."</h3>
    }
    else if (state.loggedIn && showBets)
        return (
        <div className='home'>
            <h2>Welcome, {state.user.username}</h2>
            <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
            <br />
            <button onClick={handleShowBets}>{showBets ? "Hide My Bets" : "Show My Bets"}</button>
            <br />
            <button onClick={handleShowComments}>{showComments ? "Hide My Comments" : "Show My Comments"}</button>
            {userBets}
        </div>
    )
    else if (state.loggedIn && showComments)
        return (
        <div className='home'>
            <h2>Welcome, {state.user.username}</h2>
            <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
            <br />
            <button onClick={handleShowBets}>{showBets ? "Hide My Bets" : "Show My Bets"}</button>
            <br />
            <button onClick={handleShowComments}>{showComments ? "Hide My Comments" : "Show My Comments"}</button>
            {userComments}
        </div>
    )
    else 
        return (
            <div className='home'>
                <h2>Welcome, {state.user.username}</h2>
                <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
                <br />
                <button onClick={handleShowBets}>{showBets ? "Hide My Bets" : "Show My Bets"}</button>
                <br />
                <button onClick={handleShowComments}>{showComments ? "Hide My Comments" : "Show My Comments"}</button>
            </div>
        )
}

export default Home