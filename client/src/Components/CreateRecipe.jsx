import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getAllDiets } from "../Actions/Index";

export default function CreateRecipe() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const diets = useSelector(state => state.diets)


    const [input, setInput] = useState({
        name: "",
        summary: "",
        health_score: 0,
        step_by_step : [],
        diets: [],
        img: "",
    })

    useEffect(() => {
        dispatch(getAllDiets())
    }, [])


    function handleInput(event) {
        event.preventDefault()
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSelectDiet(event) {
        event.preventDefault()
        if (event.target.value !== "Diet") {
            let valorFiltrado = input.diets.find(diet => diet === event.target.value)
            if (!valorFiltrado) {
                setInput({
                    ...input,
                    diets: [...input.diets, event.target.value]
                })
            }
        }
    }

    function handleRemoveDiet(event) {
        event.preventDefault()
        let arrayFiltrado = input.diets.filter(diet => diet !== event.target.value)
        setInput({
            ...input,
            diets: arrayFiltrado
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (input.name === "") {
            return alert("Recipe NAME required")
        }
        else if (input.summary === null) {
            return alert("Recipe SUMMARY required")
        }
        else if (input.health_score === 0) {
            return alert("Recipe SCORE required")
        }
        else if (input.step_by_step === []) {
            return alert("Recipe STEPS required")
        }
        else if (input.diets === []) {
            return alert("Recipes must belong to a DIET type")
        }
        dispatch(postRecipe(input))
        alert("Recipe created!")
        setInput({
            name: "",
            summary: "",
            health_score: 0,
            step_by_step : [],
            diets: [],
            img: "",
        })
        navigate("/home");
    }

    return (
        <div >
            <h1>Create your own recipe !</h1>
            <form onSubmit={(event) => handleSubmit(event)} className="Form">

                <div className="Label">
                    <label>Name</label>
                    <input
                        type='text'
                        size="40"
                        value={input.name}
                        name='name'
                        placeholder="Your recipe name..."
                        onChange={(event) => handleInput(event)}
                    />
                    {/* {
                        input.name ?         
                                <p></p>             
                            :            
                                <p>"Debe ingresar un name"</p>
                    } */}
                </div>

                <div className="Label">
                    <label>Summary</label>
                    <textarea id="Summary"
                        type='text'
                        value={input.summary}
                        name='summary'
                        placeholder=" Here you can put a summary of your recipe"
                        rows="5" cols="55"
                        onChange={(event) => handleInput(event)}
                    />
                </div>

                <div className="Label">
                    <label>Health Score</label>
                    <input
                        type='number'
                        value={input.health_score}
                        name='health_score'
                        min="1" max="100"
                        onChange={(event) => handleInput(event)}
                    />
                </div>

                <div className="Label">
                    <label>Image</label>
                    <input
                        type='text'
                        size="80"
                        value={input.img}
                        name='img'
                        placeholder="Insert a image URL"
                        onChange={(event) => handleInput(event)}
                    />
                </div>

                <div className="Select">

                    <select onChange={(event) => handleSelectDiet(event)}>
                        <option>Diet</option>
                        {
                            diets && diets.map(diet => {
                                return (
                                    <option key={diet.id} value={diet.name}>{diet.name}</option>
                                )
                            })
                        }
                    </select>
                    <ul>
                        {
                            input.diets.map(diet => {
                                return (
                                    <li key={diet}>{diet}<button value={diet} onClick={(event) => handleRemoveDiet(event)}>X</button></li>
                                )
                            })
                        }
                    </ul>
                </div>

                <button id="submit" type="submit">Create Recipe</button>
            </form>
            <Link to='/home'><button id="backToHome">Back to Home!</button></Link>
        </div>
    )
}