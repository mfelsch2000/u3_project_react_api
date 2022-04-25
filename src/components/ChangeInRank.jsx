import { useState, useEffect } from 'react'

const ChangeInRank = (props) => {

    const change = props.changeInRank

    const isUp = (change === "Up")
    const isDown = (change === "Down")

    return (
        <span>
        { 
            isUp ? 
                (<img className="rankChange" src="https://upload.wikimedia.org/wikipedia/commons/3/36/Up_green_arrow.png"></img>)
                : ( 
                isDown ?                 
                (<img className="rankChange" src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Down_red_arrow.png"></img>)
                : ("-") )
        }
        </span>
    )
    }

export default ChangeInRank