import React, {useState, useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function AddGameForm() {
    const {dispatch} = useContext(UserContext);
    const navigate = useNavigate()
    const [errorsState, setErrorsState] = useState([])
    const teamAbbrevitions = ["ARI", "ATL", "BAL", "BOS", "CHC", "CHW", "CIN", "CLE", "COL", "DET", "HOU", "KCR", "LAA", "LAD", "MIA", "MIL", "MIN", "NYM", "NYY", "OAK", "PHI", "PIT", "SDP", "SEA", "SFG", "STL", "TBR", "TEX", "TOR", "WSN"]

    const [formData, setFormData] = useState({
        away_team: "",
        away_team_SP: "",
        home_team: "",
        home_team_SP: ""
    })
    //console.log('formData', formData)

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const newGameObj = {
            away_team: formData.away_team,
            away_team_SP: formData.away_team_SP,
            home_team: formData.home_team,
            home_team_SP: formData.home_team_SP
        }
        fetch(`/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGameObj)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.errors) {
                addGame(data)
                navigate(`/game`)
            }
            else {
                setFormData({away_team: "", home_team: ""})
                const errors = data.errors.map(e => <li className='errors'>{e}</li>)
                setErrorsState(errors)
            }
        })
    }

    function addGame(newGameObj) {
        dispatch({type: "createGame", payload: newGameObj})
    }

    if (errorsState.length > 0)
    return(
        <div>
            <form className="gameForm" onSubmit={handleSubmit}>
                {errorsState}
                <label>Away Team</label>
                <br></br>
                <select onChange={handleChange} id="away_team" value={formData.away_team}>
                    {teamAbbrevitions.map((team) => <option key={team} >{team}</option>)}
                </select>
                <br></br>
                <label>Away Team Starting Pitcher</label>
                <br></br>
                <input id="away_team_SP" type="text" placeholder="Ex: Kerry Wood" value={formData.away_team_SP} onChange={handleChange}></input>
                <br></br>
                <label>Home Team</label>
                <br></br>
                <select onChange={handleChange} id="home_team" value={formData.home_team}>
                    {teamAbbrevitions.map((team) => <option key={team} >{team}</option>)}
                </select>
                <br></br>
                <label>Home Team Starting Pitcher</label>
                <br></br>
                <input id="home_team_SP" type="text" placeholder="Ex: Randy Johnson" value={formData.home_team_SP} onChange={handleChange}></input>
                <br></br>
                <button id="submitGameButton" type="submit">Submit</button>
            </form>
        </div>
    )
    else return(
        <div>
            <form className="gameForm" onSubmit={handleSubmit}>
                <label>Away Team</label>
                <br></br>
                <select onChange={handleChange} id="away_team" value={formData.away_team}>
                    {teamAbbrevitions.map((team) => <option key={team}>{team}</option>)}
                </select>
                <br></br>
                <label>Away Team Starting Pitcher</label>
                <br></br>
                <input  id="away_team_SP" type="text" placeholder="Ex: Kerry Wood" value={formData.away_team_SP} onChange={handleChange}></input>
                <br></br>
                <label>Home Team</label>
                <br></br>
                <select onChange={handleChange} id="home_team" value={formData.home_team}>
                    {teamAbbrevitions.map((team) => <option key={team}>{team}</option>)}
                </select>
                <br></br>
                <label>Home Team Starting Pitcher</label>
                <br></br>
                <input id="home_team_SP" type="text" placeholder="Ex: Randy Johnson" value={formData.home_team_SP} onChange={handleChange}></input>
                <br></br>
                <button id="submitGameButton" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddGameForm