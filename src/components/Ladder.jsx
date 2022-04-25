import TeamDetails from "./TeamDetails";


const Ladder = (props) => {
  
    return (
        <div className="ladder"> 
            <div className="Table-Heading">2022 AFL Ladder</div>
            <div className="ladder_headings"> 
                <div className="ladder_cell ladder_header team_standing">Position</div>
                <div className="ladder_cell ladder_header">P</div>
                <div className="ladder_cell ladder_header">W</div>
                <div className="ladder_cell ladder_header">L</div>
                <div className="ladder_cell ladder_header">D</div>
                <div className="ladder_cell ladder_header">PTS</div>
                <div className="ladder_cell ladder_header">%</div>
            </div>
            <div className="Table-Content">
               { props.ladder.map((standing) => (
                <div className="ladder_position" key={standing.id} onClick={()=>props.selectTeam(standing.id)}>
                    <div className="team_standing">
                        <div className="ladder_cell ">{standing.rank}</div>
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