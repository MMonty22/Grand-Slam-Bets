import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import { UserProvider } from '../Context/UserContext';
import SignUp from './SignUp';
import Login from './Login';
import NavBar from './NavBar'
import Home from './Home';
import Games from './Games';
import AddGameForm from './AddGameForm';

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [errors, setErrors] = useState([])

  return (
    <div className="App">
      <UserProvider>
      <NavBar />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp username={username} setUsername={setUsername} password={password} setPassword={setPassword} passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation} errors={errors} setErrors={setErrors}/>}/>
          <Route exact path="/login" element={<Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation} errors={errors} setErrors={setErrors}/>} />
          <Route exact path="/games" element={<Games />}/>
          <Route exact path="/games/new" element={<AddGameForm />}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
