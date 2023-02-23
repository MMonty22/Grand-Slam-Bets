import React, { useState, useContext} from 'react'
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../Context/UserContext';
import TodaysBets from './TodaysBets';
import TodaysComments from './TodaysComments';
import OlderBets from './OlderBets';
import OlderComments from './OlderComments';
import HomeButtons from './HomeButtons';

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

    function handleBetDelete(betID) {
        const relevantBet = state.bets.filter((bet) => bet.id === betID)
        fetch(`/bets/${betID}`, {
            method: 'DELETE',
        })
        .then(res => removeBet(betID, relevantBet))
    }

    function removeBet(betID, relevantBet) {
        dispatch({type: "deleteBet", payload: {betID, relevantBet}})
    }

    function handleCommentDelete(comID) {
        fetch(`/comments/${comID}`, {
            method: 'DELETE',
        })
        .then(res => removeComment(comID))
    }

    function removeComment(comID) {
        dispatch({type: "deleteComment", payload: comID})
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
        return <h3 className='headers'>Loading...</h3>
    }
    else if (state.loggedIn && showTodaysBets)
        return (
        <div className='container'>
            <HomeButtons handleUserLogout={handleUserLogout} handleShowTodaysBets={handleShowTodaysBets} showTodaysBets={showTodaysBets} handleShowTodayComments={handleShowTodayComments} showTodayComments={showTodayComments} handleShowOldBets={handleShowOldBets} showOldBets={showOldBets} handleShowOldComments={handleShowOldComments} showOldComments={showOldComments} />
            <br />
            {<TodaysBets currentDate={currentDate} handleBetDelete={handleBetDelete}/>}
        </div>
    )
    else if (state.loggedIn && showTodayComments)
        return (
        <div className='container'>
            <HomeButtons handleUserLogout={handleUserLogout} handleShowTodaysBets={handleShowTodaysBets} showTodaysBets={showTodaysBets} handleShowTodayComments={handleShowTodayComments} showTodayComments={showTodayComments} handleShowOldBets={handleShowOldBets} showOldBets={showOldBets} handleShowOldComments={handleShowOldComments} showOldComments={showOldComments} />
            <br />
            {<TodaysComments currentDate={currentDate} handleCommentDelete={handleCommentDelete}/>}
        </div>
    )
    else if (state.loggedIn && showOldBets)
        return (
        <div className='container'>
            <HomeButtons handleUserLogout={handleUserLogout} handleShowTodaysBets={handleShowTodaysBets} showTodaysBets={showTodaysBets} handleShowTodayComments={handleShowTodayComments} showTodayComments={showTodayComments} handleShowOldBets={handleShowOldBets} showOldBets={showOldBets} handleShowOldComments={handleShowOldComments} showOldComments={showOldComments} />
            <br />
            {<OlderBets currentDate={currentDate} handleBetDelete={handleBetDelete}/>}
        </div>
    )
    else if (state.loggedIn && showOldComments)
        return (
        <div className='container'>
            <HomeButtons handleUserLogout={handleUserLogout} handleShowTodaysBets={handleShowTodaysBets} showTodaysBets={showTodaysBets} handleShowTodayComments={handleShowTodayComments} showTodayComments={showTodayComments} handleShowOldBets={handleShowOldBets} showOldBets={showOldBets} handleShowOldComments={handleShowOldComments} showOldComments={showOldComments} />
            <br />
            {<OlderComments currentDate={currentDate} handleCommentDelete={handleCommentDelete}/>}
        </div>
    )
    else if (state.loggedIn)
        return (
            <div className='container'>
            <HomeButtons handleUserLogout={handleUserLogout} handleShowTodaysBets={handleShowTodaysBets} showTodaysBets={showTodaysBets} handleShowTodayComments={handleShowTodayComments} showTodayComments={showTodayComments} handleShowOldBets={handleShowOldBets} showOldBets={showOldBets} handleShowOldComments={handleShowOldComments} showOldComments={showOldComments} />
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