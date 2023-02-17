import React, { useState, useContext} from 'react'
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function Home() {
    const navigate = useNavigate()
    const { logout, state, dispatch } = useContext(UserContext)
    const [showTodaysBets, setShowTodaysBets] = useState(false)
    const [showOldBets, setShowOldBets] = useState(false)
    const [showTodayComments, setShowTodayComments] = useState(false)
    const [showOldComments, setShowOldComments] = useState(false)
    //console.log('state', state)
    
    const currentDate = new Date().toLocaleDateString("en-US")
    //console.log('currentDate', currentDate)

    const todaysUserBets = state.user?.bets?.map((bet) => {
        const betDate = new Date(bet.created_at).toLocaleDateString("en-US")
        //console.log('betDate', betDate)
        if (betDate === currentDate) {
        return (
            <ul className='userBets' key={bet.id}>
                <li onClick={() => navigateToGame(bet.game_id)}>Bet: {bet.description}</li>
                <li>Odds: {bet.odds}</li>
                <button className='editButton' onClick={() => navigateToBetEditForm(bet.id)}>✏️</button>
                <button className='deleteButton' onClick={() => handleBetDelete(bet.id)}>❌</button>
            </ul>   
            )
        }
    })

    const todaysUserComments = state.user?.comments?.map((com) => {
        const comDate = new Date(com.created_at).toLocaleDateString("en-US")
        if (comDate === currentDate) {
        return (
            <ul className='userComments' key={com.id}>
                <li onClick={() => navigateToBetComments(com.bet_id)}>{com.text}</li>
                <button className='editButton' onClick={() => navigateToCommentEditForm(com.id)}>✏️</button>
                <button className='deleteButton' onClick={() => handleCommentDelete(com.id)}>❌</button>
            </ul>
            )
        }
    })

    function navigateToGame(gameID) {
        navigate(`/games/${gameID}`)
    }

    function navigateToBetComments(betID) {
        navigate(`/bets/${betID}/comments`)
    }

    function navigateToBetEditForm(betID) {
        navigate(`/bets/${betID}/edit`)
    }

    function navigateToCommentEditForm(comID) {
        navigate(`/comments/${comID}/edit`)
    }

    function handleBetDelete(betID) {
        fetch(`/bets/${betID}`, {
            method: 'DELETE',
        })
        .then(res => removeBet(betID))
    }

    function handleCommentDelete(comID) {
        fetch(`/comments/${comID}`, {
            method: 'DELETE',
        })
        .then(res => removeComment(comID))
    }

    function removeBet(betID) {
        dispatch({type: "deleteBet", payload: betID})
    }

    function removeComment(comID) {
        dispatch({type: "deleteComment", payload: comID})
    }

    function handleShowTodaysBets() {
        setShowTodaysBets(!showTodaysBets)
    }

    function handleShowOldBets() {
        setShowOldBets(!showOldBets)
    }

    function handleShowTodayComments() {
        setShowTodayComments(!showTodayComments)
    }

    function handleShowOldComments() {
        setShowOldComments(!showOldComments)
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

    function navigateToLoginPage() {
        navigate('/login')
    }

    function navigateToSignUpPage() {
        navigate('/signup')
    }

    const olderBets = state.user?.bets?.map((bet) => {
        const betDate = new Date(bet.created_at).toLocaleDateString("en-US")
        if (betDate < currentDate) {
            return (
                <ul className='userBets' key={bet.id}>
                <li>Bet: {bet.description}</li>
                <li>Odds: {bet.odds}</li>
                <button className='deleteButton' onClick={() => handleBetDelete(bet.id)}>❌</button>
              </ul>
            )
        }
    })

    const olderComments = state.user?.comments?.map((com) => {
        const comDate = new Date(com.created_at).toLocaleDateString("en-US")
        if (comDate < currentDate) {
            return (
                <ul className='userComments' key={com.id}>
                <li>{com.text}</li>
                <button className='deleteButton' onClick={() => handleCommentDelete(com.id)}>❌</button>
              </ul>
            )
        }
    })

    if (state.initialLoad) {
        return <h3 className='headers'>"Loading..."</h3>
    }
    else if (state.loggedIn && showTodaysBets)
        return (
        <div className='home'>
            <h2>Hello {state.user.username}</h2>
            <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
            <br />
            <button onClick={handleShowTodaysBets}>{showTodaysBets ? "Hide Bets You Made Today" : "See Bets You Made Today"}</button>
            <br />
            {todaysUserBets}
            <br />
            <button onClick={handleShowTodayComments}>{showTodayComments ? "Hide Comments You Made Today" : "See Comments You Made Today"}</button>
            <br />
            <button onClick={handleShowOldBets}>{showOldBets ? "Hide Old Bets You Made" : "See Old Bets You Made"}</button>
            <br />
            <button onClick={handleShowOldComments}>{showOldComments ? "Hide Old Comments You Made" : "See Old Comments You Made"}</button>
        </div>
    )
    else if (state.loggedIn && showTodayComments)
        return (
        <div className='home'>
            <h2>Hello {state.user.username}</h2>
            <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
            <br />
            <button onClick={handleShowTodaysBets}>{showTodaysBets ? "Hide Bets You Made Today" : "See Bets You Made Today"}</button>
            <br />
            <button onClick={handleShowTodayComments}>{showTodayComments ? "Hide Comments You Made Today" : "See Comments You Made Today"}</button>
            <br />
            {todaysUserComments}
            <br />
            <button onClick={handleShowOldBets}>{showOldBets ? "Hide Old Bets You Made" : "See Old Bets You Made"}</button>
            <br />
            <button onClick={handleShowOldComments}>{showOldComments ? "Hide Old Comments You Made" : "See Old Comments You Made"}</button>
        </div>
    )
    else if (state.loggedIn && showOldBets)
        return (
        <div className='home'>
            <h2>Hello {state.user.username}</h2>
            <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
            <br />
            <button onClick={handleShowTodaysBets}>{showTodaysBets ? "Hide Bets You Made Today" : "See Bets You Made Today"}</button>
            <br />
            <button onClick={handleShowTodayComments}>{showTodayComments ? "Hide Comments You Made Today" : "See Comments You Made Today"}</button>
            <br />
            <button onClick={handleShowOldBets}>{showOldBets ? "Hide Old Bets You Made" : "See Old Bets You Made"}</button>
            <br />
            {olderBets}
            <br />
            <button onClick={handleShowOldComments}>{showOldComments ? "Hide Old Comments You Made" : "See Old Comments You Made"}</button>
        </div>
    )
    else if (state.loggedIn && showOldComments)
        return (
        <div className='home'>
            <h2>Hello {state.user.username}</h2>
            <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
            <br />
            <button onClick={handleShowTodaysBets}>{showTodaysBets ? "Hide Bets You Made Today" : "See Bets You Made Today"}</button>
            <br />
            <button onClick={handleShowTodayComments}>{showTodayComments ? "Hide Comments You Made Today" : "See Comments You Made Today"}</button>
            <br />
            <button onClick={handleShowOldBets}>{showOldBets ? "Hide Old Bets You Made" : "See Old Bets You Made"}</button>
            <br />
            <button onClick={handleShowOldComments}>{showOldComments ? "Hide Old Comments You Made" : "See Old Comments You Made"}</button>
            <br />
            {olderComments}
        </div>
    )
    else if (state.loggedIn)
        return (
            <div className='home'>
                <h2>Hello {state.user.username}</h2>
                <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
                <br />
                <button onClick={handleShowTodaysBets}>{showTodaysBets ? "Hide Bets You Made Today" : "See Bets You Made Today"}</button>
                <br />
                <button onClick={handleShowTodayComments}>{showTodayComments ? "Hide Comments You Made Today" : "See Comments You Made Today"}</button>
                <br />
                <button onClick={handleShowOldBets}>{showOldBets ? "Hide Old Bets You Made" : "See Old Bets You Made"}</button>
                <br />
                <button onClick={handleShowOldComments}>{showOldComments ? "Hide Old Comments You Made" : "See Old Comments You Made"}</button>
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

export default Home