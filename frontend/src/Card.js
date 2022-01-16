import React from "react"
import oko from "./images/oko.png"
import potions from "./images/potions.png"

export default function Card(props) {
    return (
        <div className="card">
            <img src={require(`${props.image}`)} className="image"/>
            <div className="card--info">
                <div>
                    <span className="card--DJ">⚡️{props.DJ}</span>
                    <span className="card--city" >{props.city}</span>
                </div>
                <p className="card--title">{props.title}</p>
                <p className="card--description">{props.description}</p>
                <button onClick={props.handleClick} className="mint-button">Mint {props.title}</button>
            </div>
        </div>
    )
}