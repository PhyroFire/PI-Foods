import React from "react"
import Card from "../Components/Card"

import { getAllRecipes } from "../Actions/Index";
import { useDispatch } from "react-redux";

export default function Recipes({ currentRecipes }) {

    const dispatch = useDispatch()
    function handleButton(event) {
        event.preventDefault()
        dispatch(getAllRecipes())
    }

    return (
        <div className="Cards">
            {
                currentRecipes.length > 0 ?

                    typeof currentRecipes === "object" ?

                        currentRecipes.map(recipe => {
                            return (
                                <div key={recipe.id} >
                                    <Card name={recipe.name} id={recipe.id} image={recipe.image} diets={recipe.diets} />
                                </div>
                            )
                        })
                        :
                        <button onClick={event => handleButton(event)}>
                            NOT FOUND
                        </button>
                    :
                    <div>
                        <h5>Loading...</h5>

                    </div>
            }
        </div>
    )
}