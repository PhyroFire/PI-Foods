import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipeById, deleteDietFromRecipe, deleteRecipe } from "../Actions/Index";
import React from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

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
        navigate("/home");
    }

    function handleDeleteRecipe(event){
        event.preventDefault()
        dispatch(deleteRecipe(recipe.id))
        navigate("/home");
    }

    var idStep = 1
    console.log(recipe.diets)

    return (
        <div >

            <div >
                <h2>{recipe.name}</h2>

                <img src={recipe.image} alt={recipe.name} />

                <h3>Recipe ID: {recipe.id}</h3>

                <h3>Summary: </h3>
                <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />

                <p>Health Score: {recipe.health_score}</p>

            </div>

            <div >
                <h3>Diet type: </h3>
                {
                    recipe.diets && recipe.diets.map(diet => {
                        return (
                            recipe.myRecipe === true ?
                                <div key={diet.id}>
                                    <p>{diet.name}</p>
                                    <button value={diet.id} onClick={(event) => { if (window.confirm(`Are you sure to delete ${diet.name} from diets?`)) handleDeleteDiet(event) }}>Delete Diet</button>
                                </div>
                                :
                                <p>{diet}</p>
                        )
                    })
                }
            </div>
            <div>
                <h3>Steps</h3>
                {
                    recipe.step_by_step && recipe.step_by_step.map(step => {
                        return (
                            <div key={step}>
                                <p>Step N° {idStep++}</p>
                                <p>{step}</p>
                            </div>
                        )
                    })
                }
            </div>

            {
                recipe.myRecipe &&
                <div>
                    <button onClick={(event)=>{if(window.confirm("Are you sure to delete this recipe ?"))handleDeleteRecipe(event)}}>Delete Recipe</button>
                </div>
            }

            <Link to='/home'><button id="backToHome">Back to Home</button></Link>
        </div >
    )
}