import React, {useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function SignUp({username, setUsername, password, setPassword, passwordConfirmation, setPasswordConfirmation, errors, setErrors}) {
    const navigate = useNavigate()
    const {signup} = useContext(UserContext);

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
            const errors = user.errors.map(e => <li>{e}</li>)
            setErrors(errors)
          }
        });
    }
  
    return (
      <div className='signUpForm'>
        <h2>Create An Account</h2>
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
          {errors}
        </ul>
      </div>
    );
}

export default SignUp