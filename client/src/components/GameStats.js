import React, {useContext} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { UserContext } from '../Context/UserContext';

function GameStats() {
    const {state} = useContext(UserContext);
    const {id} = useParams()
    const navigate = useNavigate()

    const relevantGame = state.games.find((game) => String(game.id) === String(id))
    //console.log('rg', relevantGame)

    function navigateToBets() {
        navigate(`/game/${id}/bets`)
    }

    function navigateToAddBetForm() {
        navigate(`/game/${id}/bets/new`)
    }
    
    return (
        <div className='gameStats'>
            <h1 id='gameStateH1'>{relevantGame ? `${relevantGame.away_team} vs ${relevantGame.home_team}` : 'Loading...'}</h1>
            <button onClick={navigateToBets}>See Bets Involving This Game</button>
            <button onClick={navigateToAddBetForm}>Add A Bet For This Game</button>
            <br />
            <table className='pitcherTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Throw Hand</th>
                        <th>IP vs L</th>
                        <th>wOBA Allowed vs L</th>
                        <th>K Rate vs L</th>
                        <th>BB Rate vs L</th>
                        <th>xFIP vs L</th>
                        <th>Hard Contact vs L</th>
                        <th>Soft Contact vs L</th>
                        <th>HR/FB vs L</th>
                        <th>BABIP vs L</th>
                        <th>GB Rate vs L</th>
                        <th>LD Rate vs L</th>
                        <th>FB Rate vs L</th>
                        <th>ISO vs L</th>
                    </tr>
                </thead>
                <tbody>
                    {relevantGame?.pitchers?.map(pit => (<tr key={pit.id}>
                        <td>{pit.name}</td>
                        <td>{pit.team}</td>
                        <td>{pit.throw_hand}</td>
                        <td>{pit.ip_vs_l}</td>
                        <td>{pit.woba_vs_l.toFixed(3)}</td>
                        <td>{pit.kpct_vs_l.toFixed(3)}</td>
                        <td>{pit.bbpct_vs_l.toFixed(3)}</td>
                        <td>{pit.xfip_vs_l.toFixed(3)}</td>
                        <td>{pit.hard_contact_pct_vs_l.toFixed(3)}</td>
                        <td>{pit.soft_contact_pct_vs_l.toFixed(3)}</td>
                        <td>{pit.hr_per_fb_vs_l.toFixed(3)}</td>
                        <td>{pit.babip_vs_l.toFixed(3)}</td>
                        <td>{pit.gbpct_vs_l.toFixed(3)}</td>
                        <td>{pit.ldpct_vs_l.toFixed(3)}</td>
                        <td>{pit.fbpct_vs_l.toFixed(3)}</td>
                        <td>{pit.iso_vs_l.toFixed(3)}</td>
                    </tr>))}
                </tbody>
            </table>
            <table className='hitterTable'>
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
                    </tr>
                </thead>
                <tbody>
                    {relevantGame?.hitters?.map(hit => (<tr key={hit.id}>
                        <td>{hit.name}</td>
                        <td>{hit.team}</td>
                        <td>{hit.bat_hand}</td>
                        <td>{hit.pa_vs_l}</td>
                        <td>{hit.woba_vs_l.toFixed(3)}</td>
                        <td>{hit.ex_woba_vs_l.toFixed(3)}</td>
                        <td>{hit.iso_vs_l.toFixed(3)}</td>
                        <td>{hit.ex_iso_vs_l.toFixed(3)}</td>
                        <td>{hit.hard_contact_pct_vs_l.toFixed(3)}</td>
                        <td>{hit.ex_hard_contact_vs_l.toFixed(3)}</td>
                        <td>{hit.wrc_plus_vs_l}</td>
                        <td>{hit.hr_per_fb_vs_l.toFixed(3)}</td>
                        <td>{hit.ex_hr_per_fb_vs_l.toFixed(3)}</td>
                        <td>{hit.fbpct_vs_l.toFixed(3)}</td>
                        <td>{hit.gbpct_vs_l.toFixed(3)}</td>
                        <td>{hit.babip_vs_l.toFixed(3)}</td>
                        <td>{hit.kpct_vs_l.toFixed(3)}</td>
                        <td>{hit.matchup_rating_vs_l.toFixed(3)}</td>
                    </tr>))}
                </tbody>
            </table>
            <table className='pitcherTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Throw Hand</th>
                        <th>IP vs R</th>
                        <th>wOBA Allowed vs R</th>
                        <th>K Rate vs R</th>
                        <th>BB Rate vs R</th>
                        <th>xFIP vs R</th>
                        <th>Hard Contact vs R</th>
                        <th>Soft Contact vs R</th>
                        <th>HR/FB vs R</th>
                        <th>BABIP vs R</th>
                        <th>GB Rate vs R</th>
                        <th>LD Rate vs R</th>
                        <th>FB Rate vs R</th>
                        <th>ISO vs R</th>
                    </tr>
                </thead>
                <tbody>
                    {relevantGame?.pitchers?.map(pit => (<tr key={pit.id}>
                        <td>{pit.name}</td>
                        <td>{pit.team}</td>
                        <td>{pit.throw_hand}</td>
                        <td>{pit.ip_vs_r}</td>
                        <td>{pit.woba_vs_r.toFixed(3)}</td>
                        <td>{pit.kpct_vs_r.toFixed(3)}</td>
                        <td>{pit.bbpct_vs_r.toFixed(3)}</td>
                        <td>{pit.xfip_vs_r.toFixed(3)}</td>
                        <td>{pit.hard_contact_pct_vs_r.toFixed(3)}</td>
                        <td>{pit.soft_contact_pct_vs_r.toFixed(3)}</td>
                        <td>{pit.hr_per_fb_vs_r.toFixed(3)}</td>
                        <td>{pit.babip_vs_r.toFixed(3)}</td>
                        <td>{pit.gbpct_vs_r.toFixed(3)}</td>
                        <td>{pit.ldpct_vs_r.toFixed(3)}</td>
                        <td>{pit.fbpct_vs_r.toFixed(3)}</td>
                        <td>{pit.iso_vs_r.toFixed(3)}</td>
                    </tr>))}
                </tbody>
            </table>
            <table className='hitterTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Bat Hand</th>
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
                        <td>{hit.pa_vs_r}</td>
                        <td>{hit.woba_vs_r.toFixed(3)}</td>
                        <td>{hit.ex_woba_vs_r.toFixed(3)}</td>
                        <td>{hit.iso_vs_r.toFixed(3)}</td>
                        <td>{hit.ex_iso_vs_r.toFixed(3)}</td>
                        <td>{hit.hard_contact_pct_vs_r.toFixed(3)}</td>
                        <td>{hit.ex_hard_contact_vs_r.toFixed(3)}</td>
                        <td>{hit.wrc_plus_vs_r}</td>
                        <td>{hit.hr_per_fb_vs_r.toFixed(3)}</td>
                        <td>{hit.ex_hr_per_fb_vs_r.toFixed(3)}</td>
                        <td>{hit.fbpct_vs_r.toFixed(3)}</td>
                        <td>{hit.gbpct_vs_r.toFixed(3)}</td>
                        <td>{hit.babip_vs_r.toFixed(3)}</td>
                        <td>{hit.kpct_vs_r.toFixed(3)}</td>
                        <td>{hit.matchup_rating_vs_r.toFixed(3)}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default GameStats