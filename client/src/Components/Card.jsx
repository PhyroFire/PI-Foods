import React from "react";
import { Link } from "react-router-dom";
import '../Style/CSS/Card.css'

export default function Card({ name, id, image, diets, health_score }) {

    function stars(health_score){
        if(health_score <= 20 ){
            return "⭐"
        }
        else if(health_score > 20 && health_score <= 40 ){
            return "⭐⭐"
        }
        else if(health_score > 40 && health_score <= 60  ){
            return "⭐⭐⭐"
        }
        else if(health_score > 60 && health_score <= 80  ){
            return "⭐⭐⭐⭐"
        }
        else if(health_score <= 80 ){
            return "⭐⭐⭐⭐⭐"
        }
        console.log(health_score)
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