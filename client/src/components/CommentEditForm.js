import React, {useState, useContext} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function CommentEditForm() {
    const {state, dispatch} = useContext(UserContext);
    const {id} = useParams() //this is the commentID
    const navigate = useNavigate()
    const [errorsState, setErrorsState] = useState([])

    const relevantComment = state.comments.find((com) => String(com.id) === String(id))
    //console.log('relevantCOm', relevantComment)

    const [commentEditFormData, setCommentEditFormData] = useState({
        user_id: relevantComment?.user_id,
        bet_id: relevantComment?.bet_id,
        text: relevantComment?.text,
    })

    function handleChange(event) {
        setCommentEditFormData({
            ...commentEditFormData,
            [event.target.id]: event.target.value,
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const editedCommentObj = {
            user_id: commentEditFormData.user_id,
            bet_id: commentEditFormData.bet_id,
            text: commentEditFormData.text,
        }
        fetch(`/comments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedCommentObj)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.errors) {
                updateComment(data)
                navigate('/')
            }
            else {
                setCommentEditFormData({text: ""})
                const errors = data.errors.map(e => <li>{e}</li>)
                setErrorsState(errors)
            }
        })
    }

    function updateComment(editedCommentObj) {
        dispatch({type: "updateComment", payload: editedCommentObj})
    }

    if (errorsState.length > 0)
    return (
        <div>
        <h2 className='headers'>You Are Editing The Following Comment</h2>
        <form className="commentForm" onSubmit={handleSubmit}>
                <label>Comment Text</label>
                <br />
                <input id="text" type="text" value={commentEditFormData.text} onChange={handleChange}></input>
                <br />
                <button id="submitCommentButton" type="submit">Submit</button>
                {errorsState}
        </form>
    </div>
    )
    else return (
        <div>
            <h2 className='headers'>You Are Editing The Following Comment</h2>
            <form className="commentForm" onSubmit={handleSubmit}>
                    <label>Comment Text</label>
                    <br />
                    <input id="text" type="text" value={commentEditFormData.text} onChange={handleChange}></input>
                    <br />
                    <button id="submitCommentButton" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CommentEditForm