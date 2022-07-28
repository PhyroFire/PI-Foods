import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, id, image, diets }) {

    return (
        <div className="card">
            <Link to={'/recipe/' + id}>
                <h3>{name}</h3>
                {
                    diets.map(diet => {
                        return (
                            typeof diet === "string" ?
                                <p key={diet}>{diet}</p>
                                :
                                <p key={diet.name}>{diet.name}</p>
                        )
                    })
                }
                <img src={image} alt={name} width="300" height="150" />
            </Link>
        </div>
    )
}