import React, {useContext} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function GameStats() {
    const {state} = useContext(UserContext);
    const {id} = useParams()
    const navigate = useNavigate()

    const relevantGame = state.games.find((game) => String(game.id) === String(id))

    function navigateToBets() {
        navigate(`/games/${id}/bets`)
    }

    function navigateToAddBetForm() {
        navigate(`/games/${id}/bets/new`)
    }
    
    return (
        <div>
            <h1>{relevantGame ? `${relevantGame.away_team} vs ${relevantGame.home_team}` : 'Loading...'}</h1>
            <button onClick={navigateToBets}>See Bets Involving This Game</button>
            <button onClick={navigateToAddBetForm}>Add A Bet For This Game</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Bat Hand</th>
                        <th>PA vs L</th>
                        <th>wOBA vs L</th>
                        <th>Ex wOBA vs L</th>
                        <th>ISO vs L</th>
                        <th>Ex ISO vs L</th>
                        <th>Hard Contact Rate vs L</th>
                        <th>Ex Hard Contact vs L</th>
                        <th>wRC+ vs L</th>
                        <th>HR/FB vs L</th>
                        <th>Ex HR/FB vs L</th>
                        <th>FB Rate vs L</th>
                        <th>GB Rate vs L</th>
                        <th>BABIP vs L</th>
                        <th>K Rate vs L</th>
                        <th>Matchup Rating vs L</th>
                        <th>PA vs R</th>
                        <th>wOBA vs R</th>
                        <th>Ex wOBA vs R</th>
                        <th>ISO vs R</th>
                        <th>Ex ISO vs R</th>
                        <th>Hard Contact Rate vs R</th>
                        <th>Ex Hard Contact vs R</th>
                        <th>wRC+ vs R</th>
                        <th>HR/FB vs R</th>
                        <th>Ex HR/FB vs R</th>
                        <th>FB Rate vs R</th>
                        <th>GB Rate vs R</th>
                        <th>BABIP vs R</th>
                        <th>K Rate vs R</th>
                        <th>Matchup Rating vs R</th>
                    </tr>
                </thead>
                <tbody>
                    {relevantGame?.hitters?.map(hit => (<tr key={hit.id}>
                        <td>{hit.name}</td>
                        <td>{hit.team}</td>
                        <td>{hit.bat_hand}</td>
                        <td>{hit.pa_vs_l}</td>
                        <td>{hit.woba_vs_l}</td>
                        <td>{hit.ex_woba_vs_l}</td>
                        <td>{hit.iso_vs_l}</td>
                        <td>{hit.ex_iso_vs_l}</td>
                        <td>{hit.hard_contact_pct_vs_l}</td>
                        <td>{hit.ex_hard_contact_vs_l}</td>
                        <td>{hit.wrc_plus_vs_l}</td>
                        <td>{hit.hr_per_fb_vs_l}</td>
                        <td>{hit.ex_hr_per_fb_vs_l}</td>
                        <td>{hit.fbpct_vs_l}</td>
                        <td>{hit.gbpct_vs_l}</td>
                        <td>{hit.babip_vs_l}</td>
                        <td>{hit.kpct_vs_l}</td>
                        <td>{hit.matchup_rating_vs_l}</td>
                        <td>{hit.pa_vs_r}</td>
                        <td>{hit.woba_vs_r}</td>
                        <td>{hit.ex_woba_vs_r}</td>
                        <td>{hit.iso_vs_r}</td>
                        <td>{hit.ex_iso_vs_r}</td>
                        <td>{hit.hard_contact_pct_vs_r}</td>
                        <td>{hit.ex_hard_contact_vs_r}</td>
                        <td>{hit.wrc_plus_vs_r}</td>
                        <td>{hit.hr_per_fb_vs_r}</td>
                        <td>{hit.ex_hr_per_fb_vs_r}</td>
                        <td>{hit.fbpct_vs_r}</td>
                        <td>{hit.gbpct_vs_r}</td>
                        <td>{hit.babip_vs_r}</td>
                        <td>{hit.kpct_vs_r}</td>
                        <td>{hit.matchup_rating_vs_r}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default GameStats