import React, {useState, useContext} from 'react'
import { UserContext } from '../Context/UserContext';

function EnterResult ({bet}) {
    const { dispatch } = useContext(UserContext)
    const [result, setResult] = useState(false)
    const [errorsState, setErrorsState] = useState([])

    function handleResultState() {
        setResult(!result)
    }

    const winObj = {
        game_id: bet.game_id,
        category: bet.category,
        description: bet.description,
        odds: bet.odds,
        result: "win"
    }

    function handleWin() {
        fetch(`/bets/${bet.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(winObj)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.errors) {
                addResult(data)
            }
            else {
                const errors = data.errors.map(e => <li className='errors'>{e}</li>)
                setErrorsState(errors)
            }
        })
    }

    const lossObj = {
        game_id: bet.game_id,
        category: bet.category,
        description: bet.description,
        odds: bet.odds,
        result: "loss"
    }

    function handleLoss() {
        fetch(`/bets/${bet.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lossObj)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.errors) {
                addResult(data)
            }
            else {
                const errors = data.errors.map(e => <li className='errors'>{e}</li>)
                setErrorsState(errors)
            }
        })
    }

    function addResult(betWithResult) {
        dispatch({type: "updateBetResult", payload: betWithResult})
    }

    if (errorsState.length > 0)
    return (
        <div>
        <button onClick={handleResultState}>{result ? "Hide Result" : "Enter Result"}</button>
        {result ?  
            (<div>
                <button onClick={handleWin} id='wButton'>W</button>
                <button onClick={handleLoss} id='lButton'>L</button>
            </div>) : ""}
        {errorsState}
    </div> 
    )
    else if (bet.result === "win" || bet.result === "loss")
    return (
        <div>
            <p>Result: {bet.result}</p>
        </div>
    )
    else return (
        <div>
            <button onClick={handleResultState}>{result ? "Hide Result" : "Enter Result"}</button>
            {result ?  
                (<div>
                    <button onClick={handleWin} id='wButton'>W</button>
                    <button onClick={handleLoss} id='lButton'>L</button>
                </div>) : ""}
        </div>
    )
}

export default EnterResult