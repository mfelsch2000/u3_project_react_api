import ChangeInRank from "./ChangeInRank";
import TeamDetails from "./TeamDetails";


const Ladder = (props) => {
    const gotFocus = () => {
        console.log("Focus / unfocus")
    } 
    return (
        <div className="Ladder-Container"> 
            <h3 className="Ladder-Title">2022 AFL Premiership Ladder</h3>
            <div className="Ladder-Heading-Container"> 
                <div className="ladder_cell ladder_header team_standing">Position</div>
                <div className="ladder_cell ladder_header">P</div>
                <div className="ladder_cell ladder_header">W</div>
                <div className="ladder_cell ladder_header">L</div>
                <div className="ladder_cell ladder_header">D</div>
                <div className="ladder_cell ladder_header">PTS</div>
                <div className="ladder_cell ladder_header ladder_percentage">%</div>
            </div>
            <div className="Table-Content">
               { props.ladder.map((standing) => (
                <div className="Ladder_Row"
                     key={standing.id} 
                     onFocus={()=>console.log('Focused on input')} 
                     onBlur={()=>{gotFocus()}}
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
                ))
               }
            </div>
        </div>
    )
}

export default Ladder