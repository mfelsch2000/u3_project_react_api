import { useState, useEffect } from 'react'
import { BASE_URL, LOGO_URL } from '../globals'
import Snapshot from './Snapshot'

const TeamDetails = (props) => {

    const [team, setTeam] = useState(null)

    useEffect(()=>{
                
       // console.log("TD: " + props.team.id)
        setTeam(props.team)

      }, [props.team])

    return (
        <div>
            { team ? 
                (
                    <div className="Team-View">
                        <div className="Team-View-Logo-Name-Container">
                            <h3>{team.name}</h3>
                            <img className="Logo-large" src={props.getLogoAddress(props.team.id)} alt="logo"></img>
                        </div>
                        <div className="Team-View-Details-Container">
                            <Snapshot 
                                team={team} 
                                currentStanding={props.currentStanding}
                                getLogoAddress={props.getLogoAddress}
                                changeInRank={props.changeInRank} >
                            </Snapshot>
                        </div>
                    </div>
                ):( 
                    <p>Team details loadings ...</p>
                )
            }
        </div>
    )
}

export default TeamDetails

/*
.team_stats_cell {
  border: 0.05em;
  border-style: dotted;
}
*/