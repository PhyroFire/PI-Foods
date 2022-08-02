import React from "react";
import { Link } from "react-router-dom";
import '../Style/CSS/Card.css'

export default function Card({ name, id, image, diets }) {

    return (
        <div className="card">
            <Link to={'/recipe/' + id}>
                <h3>{name}</h3>
                <div id="diets">
                {
                    diets.map(diet => {
                        return (
                            typeof diet === "string" ?
                                <span key={diet}>{diet}</span>
                                :
                                <span key={diet.name}>{diet.name}</span>
                        )
                    })
                }
                </div>
                <img src={image} alt={name} width="300" height="150" />
            </Link>
        </div>
    )
}