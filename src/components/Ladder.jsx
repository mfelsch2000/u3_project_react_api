import Standing from "./Standing"

const Ladder = (props) => {

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
                   <Standing 
                        key={standing.id}
                        standing={standing} 
                        selectTeam={props.selectTeam} 
                        changeInRank={props.changeInRank} 
                        getLogoAddress={props.getLogoAddress}>
                    </Standing>
                ))
               }
            </div>
        </div>
    )
}

export default Ladder