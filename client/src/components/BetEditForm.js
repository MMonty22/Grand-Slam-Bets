import React, {useState, useContext} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function BetEditForm() {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate()
    const {id} = useParams()
    const [errorsState, setErrorsState] = useState([])
    const relevantBet = state.bets.find((bet) => String(bet.id) === String(id))

    const [editFormData, setEditFormData] = useState({
        category: relevantBet?.category,
        description: relevantBet?.description,
        odds: relevantBet?.odds
    })

    function handleChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.id]: event.target.value,
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const editedBetObj = {
            game_id: relevantBet.game_id,
            category: editFormData.category,
            description: editFormData.description,
            odds: editFormData.odds
        }
        fetch(`/bets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedBetObj)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.errors) {
                updateBet(data)
                navigate(`/`)
            }
            else {
                setEditFormData({category: "", description: "", odds: ""})
                const errors = data.errors.map(e => <li>{e}</li>)
                setErrorsState(errors)
            }
        })
    }

    function updateBet(editedBetObj) {
        dispatch({type: "updateBet", payload: editedBetObj})
    }

    if (errorsState.length > 0)
    return(
        <div>
            <form className="betForm" onSubmit={handleSubmit}>
                <label>Type</label>
                <br />
                <input id="category" type="text" value={editFormData.category} onChange={handleChange}></input>
                <br />
                <label>Description</label>
                <br />
                <input id="description" type="text" value={editFormData.description} onChange={handleChange}></input>
                <br />
                <label>Odds</label>
                <br />
                <input id="odds" type="text" value={editFormData.odds} onChange={handleChange}></input>
                <br />
                <button id="submitBetButton" type="submit">Submit</button>
                {errorsState}
            </form>
        </div>
    )
    else return(
        <div>
            <form className="betForm" onSubmit={handleSubmit}>
                <label>Type</label>
                <br />
                <input id="category" type="text" value={editFormData.category} onChange={handleChange}></input>
                <br />
                <label>Description</label>
                <br />
                <input id="description" type="text" value={editFormData.description} onChange={handleChange}></input>
                <br />
                <label>Odds</label>
                <br />
                <input id="odds" type="text" value={editFormData.odds} onChange={handleChange}></input>
                <br />
                <button id="submitBetButton" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default BetEditForm