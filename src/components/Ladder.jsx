import TeamDetails from "./TeamDetails";


const Ladder = (props) => {
  
    return (
        <div className="ladder">
           { props.ladder.map((standing) => (
                    <div className="standing" key={standing.id}> 
                         <img src={`${props.logoAddress(standing.id)}`} alt="logo"></img>
                        <span className="teamName">{standing.rank}</span> 
                        <span className="teamName" onClick={()=>props.selectTeam(standing.id)}>{standing.name}</span> 
                        <span className="games">{standing.wins}</span>
                        <span className="games">{standing.losses}</span>
                        <span className="games">{standing.draws}</span>
                        <span className="percentage">{standing.percentage.toFixed(1)}</span>
                    </div>
                ))
           }
        </div>
    )
}

export default Ladder