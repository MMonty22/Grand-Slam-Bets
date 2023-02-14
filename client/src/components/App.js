import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import { UserProvider } from '../Context/UserContext';
import SignUp from './Signup';
import Login from './Login';
import NavBar from './NavBar'
import Home from './Home';
import Games from './Games';
import AddGameForm from './AddGameForm';
import GameStats from './GameStats';
import AddBetForm from './AddBetForm';
import Bets from './Bets';
import BetComments from './BetComments';
import BetEditForm from './BetEditForm';
import AddCommentForm from './AddCommentForm';
import CommentEditForm from './CommentEditForm';

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
            <Route path="/games/:id" element={<GameStats />}/>
            <Route path="/games/:id/bets" element={<Bets />} />
            <Route path="/games/:id/bets/new" element={<AddBetForm />} />
            <Route path="/bets/:id/edit" element={<BetEditForm />} />
            <Route path="/bets/:id/comments" element={<BetComments />} />
            <Route path="/bets/:id/comments/new" element={<AddCommentForm />} />
            <Route path="/comments/:id/edit" element={<CommentEditForm />} />
          </Routes>
      </UserProvider>
    </div>
  );
}

export default App;