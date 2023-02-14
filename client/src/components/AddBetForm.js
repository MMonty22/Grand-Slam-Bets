import React, {useState, useContext} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function AddBetForm() {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate()
    const {id} = useParams()
    const [errorsState, setErrorsState] = useState([])
    const relevantGame = state.games.find((game) => String(game.id) === String(id))
    //console.log('relevantGame', relevantGame)

    const [formData, setFormData] = useState({
        category: "",
        description: "",
        odds: ""
    })

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const newBetObj = {
            game_id: id,
            category: formData.category,
            description: formData.description,
            odds: formData.odds
        }
        fetch(`/bets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBetObj)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.errors) {
                addBet(data)
                navigate(`/`)
            }
            else {
                setFormData({category: "", description: "", odds: ""})
                const errors = data.errors.map(e => <li>{e}</li>)
                setErrorsState(errors)
            }
        })
    }

    function addBet(newBetObj) {
        dispatch({type: "createBet", payload: newBetObj})
    }

    if (relevantGame === undefined)
    return(
        <div>
            <h1>Loading....</h1>
        </div>
    )
    if (errorsState.length > 0)
    return(
        <div>
            <h2>{`Adding A Bet For ${relevantGame?.away_team} vs ${relevantGame?.home_team}`}</h2>
            <form className="betForm" onSubmit={handleSubmit}>
                <label>Type</label>
                <br />
                <input id="category" type="text" placeholder="Ex: Player Prop or Moneyline" value={formData.category} onChange={handleChange}></input>
                <br />
                <label>Description</label>
                <br />
                <input id="description" type="text" placeholder="Ex: Kris Bryant to hit a home run" value={formData.description} onChange={handleChange}></input>
                <br />
                <label>Odds</label>
                <br />
                <input id="odds" type="text" placeholder="Ex: +500 or -110" value={formData.odds} onChange={handleChange}></input>
                <br />
                <button id="submitBetButton" type="submit">Submit</button>
                {errorsState}
            </form>
        </div>
    )
    else return(
        <div>
            <h2>{`Adding A Bet For ${relevantGame?.away_team} vs ${relevantGame?.home_team}`}</h2>
            <form className="betForm" onSubmit={handleSubmit}>
                <label>Type</label>
                <br />
                <input id="category" type="text" placeholder="Ex: Player Prop or Moneyline" value={formData.category} onChange={handleChange}></input>
                <br />
                <label>Description</label>
                <br />
                <input id="description" type="text" placeholder="Ex: Kris Bryant to hit a home run" value={formData.description} onChange={handleChange}></input>
                <br />
                <label>Odds</label>
                <br />
                <input id="odds" type="text" placeholder="Ex: +500 or -110" value={formData.odds} onChange={handleChange}></input>
                <br />
                <button id="submitBetButton" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddBetForm