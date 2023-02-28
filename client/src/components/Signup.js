import React, {useState, useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function SignUp({username, setUsername, password, setPassword, passwordConfirmation, setPasswordConfirmation}) {
    const navigate = useNavigate()
    const {signup} = useContext(UserContext)
    const [errorsState, setErrorsState] = useState([])

    function handleSubmit(event) {
      event.preventDefault();
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          password_confirmation: passwordConfirmation,
        }),
      })
        .then((res) => res.json())
        .then(user => {
          if (!user.errors) {
            signup(user)
            navigate('/')
          }
          else {
            setUsername("")
            setPassword("")
            setPasswordConfirmation("")
            const errors = user.errors.map(e => <li className='errors'>{e}</li>)
            setErrorsState(errors)
          }
        });
    }
  
    if (errorsState.length > 0)
    return (
      <div className='signUpForm'>
        <h2 className='headers'>Create An Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <br/>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/> 
          <br/>
          <label>Password:</label>
          <br/>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <br/>
          <label>Confirm Password:</label>
          <br/>
          <input type="password" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
          <br/>
          <button type="submit">Submit</button>
        </form>
        <ul>
          {errorsState}
        </ul>
      </div>
    )
    else return (
      <div className='signUpForm'>
        <h2 className='headers'>Create An Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <br/>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/> 
          <br/>
          <label>Password:</label>
          <br/>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <br/>
          <label>Confirm Password:</label>
          <br/>
          <input type="password" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
}

export default SignUp