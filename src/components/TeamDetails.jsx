import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const TeamDetails = (props) => {

    const [teamDetails, setTeamDetails] = useState(null)

    useEffect(()=>{
        const getTeam = async () => {
            const resp = await axios.get(`${BASE_URL}/?q=teams;team=${props.teamId};format=json`)
            console.log(resp.data.teams)
            setTeamDetails(resp.data.teams[0])
        }
        getTeam()
      }, [])

    return (
        <div>
            { teamDetails ? 
                (
                    <p>{teamDetails.name}</p>
                ):( 
                    <p>Teams details loadings ...</p>
                )
            }
        </div>
    )
}

export default TeamDetails