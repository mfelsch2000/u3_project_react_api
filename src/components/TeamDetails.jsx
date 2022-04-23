import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, LOGO_URL } from '../globals'

const TeamDetails = (props) => {

    const [teamDetails, setTeamDetails] = useState(null)

    useEffect(()=>{
        const getTeam = async () => {
            //console.log("Team details, get team = " + props.teamId)
            const resp = await axios.get(`${BASE_URL}/?q=teams;team=${props.teamId};format=json`)
            setTeamDetails(resp.data.teams[0])
        }
        getTeam()

      }, [props.teamId])

    return (
        <div>
            { teamDetails ? 
                (
                    <div>
                        <img src={`${LOGO_URL}${teamDetails.logo}`} alt="logo"></img>
                        <p>{teamDetails.name}</p>
                    </div>
                ):( 
                    <p>Team details loadings ...</p>
                )
            }
        </div>
    )
}

//https://squiggle.com.au/wp-content/themes/squiggle/assets/images/Adelaide.png
export default TeamDetails