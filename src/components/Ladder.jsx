const Ladder = (props) => {
    console.log("Props count" + props.ladder.length)
    console.log(props.ladder[0])
   // console.log(props.ladder[0].id)
    return (
        <div className="ladder">
           { props.ladder.map((standing) => (
                    <div className="standing" key={standing.id}> 
                        <span className="teamName">{standing.rank}</span> 
                        <span className="teamName" onClick={()=>props.selectTeam(standing.id)}>{standing.name}</span> 
                        <span className="games">{standing.wins}</span>
                        <span className="games">{standing.losses}</span>
                        <span className="percentage">{standing.percentage.toFixed(1)}</span>
                    </div>
                ))
           }
        </div>
    )
}

export default Ladder