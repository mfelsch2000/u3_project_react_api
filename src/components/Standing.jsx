import { useState, useEffect } from 'react'
import ChangeInRank from "./ChangeInRank";


const Standing = (props) => {

    const standing = props.standing

    const [isHovered, setIsHovered] = useState(false)


    const getClass = ()  => {
        return isHovered ? "Ladder_Row selectable" : "Ladder_Row "
    }

    return (
        <div className={getClass()}
            key={standing.id} 
            onMouseOver={()=>{setIsHovered(true)}}
            onMouseOut={()=>{setIsHovered(false)}}
            onClick={()=>props.selectTeam(standing.id)}>
            <div className="team_standing">
                <div className="ladder_cell">{standing.rank}</div>
                <div className="ladder_change-in-rank">
                    <ChangeInRank changeInRank={props.changeInRank(standing.id)}></ChangeInRank>
                </div>
                <img className="ladder_cell smallLogo" src={`${props.getLogoAddress(standing.id)}`} alt="logo" ></img>
                <div className="ladder_cell ladder_team_name" >{standing.name}</div>
            </div>
            <div className="ladder_cell">{standing.played}</div>
            <div className="ladder_cell">{standing.wins}</div>
            <div className="ladder_cell">{standing.losses}</div>
            <div className="ladder_cell">{standing.draws}</div>
            <div className="ladder_cell">{standing.pts}</div>
            <div className="ladder_cell ladder_percentage">{standing.percentage.toFixed(1)}</div>
        </div>
    )

}

export default Standing