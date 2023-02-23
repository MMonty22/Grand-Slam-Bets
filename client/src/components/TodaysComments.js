import React, { useContext} from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function TodaysComments({currentDate, handleCommentDelete}) {
    const { state, } = useContext(UserContext)
    const navigate = useNavigate()

    function navigateToBetComments(betID) {
        navigate(`/bets/${betID}/comments`)
    }

    function navigateToCommentEditForm(comID) {
        navigate(`/comments/${comID}/edit`)
    }

    return (
        <div className='todaysComments'>
            {state.user?.comments?.map((com) => {
            const comDate = new Date(com.created_at).toLocaleDateString("en-US")
            if (comDate === currentDate) {
            return (
                <ul className='userComments' key={com.id}>
                    <li onClick={() => navigateToBetComments(com.bet_id)}>{com.text}</li>
                    <br></br>
                    <button className='editButton' onClick={() => navigateToCommentEditForm(com.id)}>✏️</button>
                    <button className='deleteButton' onClick={() => handleCommentDelete(com.id)}>❌</button>
                </ul>
                )
            }
            else return ""
        })}
        </div>
    )
}

export default TodaysComments