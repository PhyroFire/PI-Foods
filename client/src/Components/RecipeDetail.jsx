import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipeById, deleteDietFromRecipe, deleteRecipe } from "../Actions/Index";
import React from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import '../Style/CSS/RecipeDetail.css'

export default function Detail() {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const recipe = useSelector(state => state.recipe)
    const { id } = useParams() // usa el parametro de la URL

    useEffect(() => {
        dispatch(getRecipeById(id))
    }, [])

    function handleDeleteDiet(event) {

        event.preventDefault()
        let data = {
            recipeId: recipe.id,
            dietId: event.target.value
        }
        dispatch(deleteDietFromRecipe(data))
        navigate(`/home`);
    }

    function handleDeleteRecipe(event) {
        event.preventDefault()
        dispatch(deleteRecipe(recipe.id))
        navigate("/home");
    }

    return (
        <div className="RecipeDetail">
            <div id="dataRecipe">
                <h1>{recipe.name}</h1>

                <img src={recipe.img} alt={recipe.name} />

                <h2>Recipe ID: </h2>
                <p>{recipe.id}</p>

                <h2>Health Score: </h2>
                <h1>{recipe.health_score}</h1>

                <h2>Summary: </h2>
                <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />

            </div>


            <div id="diet_step">
                <div >
                    <h2>Diet type: </h2>
                    {
                        recipe.diets && recipe.diets.map(diet => {
                            return (
                                recipe.myRecipe === true ?
                                    <div key={diet.id}>
                                        <p>{diet.name}</p>
                                        <button value={diet.id} onClick={(event) => { if (window.confirm(`Are you sure to delete ${diet.name} from diets?`)) handleDeleteDiet(event) }}>Delete Diet</button>
                                    </div>
                                    :
                                    <p key={diet}>{diet}</p>
                            )
                        })
                    }
                </div>
                <div>
                    <h2>Steps</h2>
                    {
                        recipe.step_by_step && recipe.step_by_step.map((step, index) => {
                            return (
                                <div key={step}>
                                    <h3>Step N°{index + 1}</h3>
                                    <p>{step}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <nav id="detailNav">
                <div>
                {
                    recipe.myRecipe &&
                    <div>
                        <button onClick={(event) => { if (window.confirm("Are you sure to delete this recipe ?")) handleDeleteRecipe(event) }}>Delete Recipe</button>
                    </div>
                }
                </div>
                <Link to='/home'><button id="backToHome">Back to Home</button></Link>
            </nav>
        </div>
    )
}