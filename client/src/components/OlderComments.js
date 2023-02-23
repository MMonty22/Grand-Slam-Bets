import React, { useContext} from 'react'
import { UserContext } from '../Context/UserContext';

function OlderComments({currentDate, handleCommentDelete}) {
    const { state, } = useContext(UserContext)

    return (
        <div className='olderComments'>
            {state.user?.comments?.map((com) => {
            const comDate = new Date(com.created_at).toLocaleDateString("en-US")
            if (comDate < currentDate) {
                return (
                    <ul className='userComments' key={com.id}>
                    <li>{com.text}</li>
                    <br></br>
                    <button className='deleteButton' onClick={() => handleCommentDelete(com.id)}>❌</button>
                </ul>
                )
            }
            else return ""
        })}
        </div>
    )
}

export default OlderComments