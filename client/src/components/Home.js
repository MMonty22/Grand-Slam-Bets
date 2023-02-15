import React, { useState, useContext} from 'react'
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function Home() {
    const navigate = useNavigate()
    const { logout, state, dispatch } = useContext(UserContext)
    const [showBets, setShowBets] = useState(false)
    const [showComments, setShowComments] = useState(false)
    //console.log('state', state)

    const userBets = state.user?.bets?.map((bet) => <ul className='userBets' key={bet.id}>
            <li>Bet: {bet.description}</li>
            <li>Odds: {bet.odds}</li>
            <button className='editButton' onClick={() => navigateToBetEditForm(bet.id)}>✏️</button>
            <button className='deleteButton' onClick={() => handleBetDelete(bet.id)}>❌</button>
    </ul>)

    const userComments = state.user?.comments?.map((com) => <ul className='userComments' key={com.id}>
        <li>{com.text}</li>
        <button className='editButton' onClick={() => navigateToCommentEditForm(com.id)}>✏️</button>
        <button className='deleteButton' onClick={() => handleCommentDelete(com.id)}>❌</button>
    </ul>)

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

    function navigateToLoginPage() {
        navigate('/login')
    }

    function navigateToSignUpPage() {
        navigate('/signup')
    }

    if (state.initialLoad) {
        return <h3 id='loading'>"Loading..."</h3>
    }
    else if (state.loggedIn && showBets)
        return (
        <div className='home'>
            <h2>Hello {state.user.username}</h2>
            <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
            <br />
            <button onClick={handleShowBets}>{showBets ? "Hide My Bets" : "Show My Bets"}</button>
            <br />
            {userBets}
            <br />
            <button onClick={handleShowComments}>{showComments ? "Hide My Comments" : "Show My Comments"}</button>
        </div>
    )
    else if (state.loggedIn && showComments)
        return (
        <div className='home'>
            <h2>Hello {state.user.username}</h2>
            <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
            <br />
            <button onClick={handleShowBets}>{showBets ? "Hide My Bets" : "Show My Bets"}</button>
            <br />
            <button onClick={handleShowComments}>{showComments ? "Hide My Comments" : "Show My Comments"}</button>
            <br />
            {userComments}
        </div>
    )
    else if (state.loggedIn)
        return (
            <div className='home'>
                <h2>Hello {state.user.username}</h2>
                <button className='logoutButton' onClick={handleUserLogout}>Logout</button>
                <br />
                <button onClick={handleShowBets}>{showBets ? "Hide My Bets" : "Show My Bets"}</button>
                <br />
                <button onClick={handleShowComments}>{showComments ? "Hide My Comments" : "Show My Comments"}</button>
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