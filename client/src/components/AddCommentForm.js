import React, {useState, useContext} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function AddCommentForm() {
    const {state, dispatch} = useContext(UserContext);
    const {id} = useParams()
    const navigate = useNavigate()
    const [errorsState, setErrorsState] = useState([])

    const relevantBet = state.bets.find((bet) => String(bet.id) === String(id))
    //console.log('relevantBet', relevantBet)

    const [commentFormData, setcommentFormData] = useState({
        user_id: state.user.id,
        bet_id: id,
        text: "",
    })

    function handleChange(event) {
        setcommentFormData({
            ...commentFormData,
            [event.target.id]: event.target.value,
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const newCommentObj = {
            user_id: commentFormData.user_id,
            bet_id: commentFormData.bet_id,
            text: commentFormData.text,
        }
        fetch(`/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCommentObj)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.errors) {
                addComment(data)
                navigate(`/bets/${id}/comments`)
            }
            else {
                setcommentFormData({text: ""})
                const errors = data.errors.map(e => <li>{e}</li>)
                setErrorsState(errors)
            }
        })
    }

    function addComment(newCommentObj) {
        dispatch({type: "createComment", payload: newCommentObj})
    }

    return (
        <div>
            <h2 className='headers'>Leave A Comment About the Following Bet</h2>
            <h3 className='comment'>{relevantBet ? `${relevantBet.description}: ${relevantBet.odds}` : 'Loading...'}</h3>
            <form className="commentForm" onSubmit={handleSubmit}>
                    <label>Comment Text</label>
                    <br />
                    <input id="text" type="text" value={commentFormData.text} onChange={handleChange}></input>
                    <br />
                    <button id="submitCommentButton" type="submit">Submit</button>
                    {errorsState}
            </form>
        </div>
    )
}

export default AddCommentForm