import React from "react";
import { Link } from "react-router-dom";
import '../Style/CSS/Card.css'

export default function Card({ name, id, image, diets, health_score }) {

    function stars(number){
        if(number <= 20 ){
            return "⭐"
        }
        else if(number > 20 && number <= 40 ){
            return "⭐⭐"
        }
        else if(number > 40 && number <= 60 ){
            return "⭐⭐⭐"
        }
        else if(number > 60 && number <= 80  ){
            return "⭐⭐⭐⭐"
        }
        else if(number >= 80 ){
            return "⭐⭐⭐⭐⭐"
        }
    }

    return (
        <div className="card">
            <Link to={'/recipe/' + id}>
                <h3>{name}</h3>
                <p>{stars(health_score)}</p>
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
            </Link>
            <img src={image} alt={name} width="300" height="150" />
        </div>
    )
}