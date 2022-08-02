import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getAllDiets } from "../Actions/Index";
import '../Style/CSS/CreateRecipe.css'
import noImage from '../Style/Imagenes/noImage.png'

export default function CreateRecipe() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const diets = useSelector(state => state.diets)
    const [errors, setErrors] = useState({ first: true })


    const [steps, setSteps] = useState("") // STRING QUE SE MODIFICA CON EL INPUT STEP PARA SER AGREGADO AL ESTADO "INPUT" AL APRETAR BUTON ADDSTEP

    const [input, setInput] = useState({
        name: "",
        summary: "",
        health_score: 0,
        step_by_step: steps,
        diets: [],
        img: noImage,
    })

    const validations = (input) => { // VARIABLE PARA GUARDAR UN MENSAJE EN CASO DE FALTANTES DEL INPUT
        let errors = {}
        if (!input.name) {
            errors.name = "Recipe name required-"
        }
        else if (input.name?.trim().length < 3) { //el .trim() saca los espacios del inicio y el fin de la palabra
            errors.name = "Recipe name must be at least 3 characters"
        }
        else if ((/[^a-zA-Z0-9 ]/.test(input.name))) { //validacion para que el name no pueda contener caracteres especiales
            errors.name = "Recipe name cannot contain special characters"
        }
        if (input.diets.length === 0) {
            errors.diets = "Select at least one DIET for your recipe"
        }
        if (input.step_by_step.length === 0) {
            errors.step_by_step = "Add at least one step for your recipe"
        }
        return errors
    }

    useEffect(() => {
        dispatch(getAllDiets())
    }, [])


    function handleInput(event) {
        event.preventDefault()
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validations({
            ...input,
            [event.target.name]: event.target.value
        }))
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
                setErrors(validations({
                    ...input,
                    diets: [...input.diets, event.target.value]
                }))
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
        setErrors(validations({
            ...input,
            diets: arrayFiltrado
        }))
    }

    function handleStep(event) {
        event.preventDefault()
        setSteps(
            event.target.value
        )
    }

    function addStep(event) {
        event.preventDefault()
        if (steps !== "") {
            setInput({
                ...input,
                step_by_step: [...input.step_by_step, steps]
            })
            setErrors(validations({
                ...input,
                step_by_step: [...input.step_by_step, steps]
            }))
        }
        document.getElementById("STEP").value = ""
        setSteps("")
    }

    function deleteStep(event) {
        event.preventDefault()
        let arrayFiltrado = input.step_by_step.filter(paso => paso !== event.target.value)
        setInput({
            ...input,
            step_by_step: arrayFiltrado
        })
        setErrors(validations({
            ...input,
            step_by_step: arrayFiltrado
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (input.name === "") {
            return alert("Recipe NAME required")
        }
        else if (input.summary === "") {
            return alert("Recipe SUMMARY required")
        }
        else if (input.health_score === 0) {
            return alert("Recipe SCORE required")
        }
        else if (input.step_by_step === steps) {
            return alert("Recipe STEPS required")
        }
        else if (input.diets.length === 0) {
            return alert("Recipes must belong to a DIET type")
        }
        else if (input.img === noImage) {
            return alert("Recipe IMAGE required")
        }
        else {
            dispatch(postRecipe(input))
            alert("Recipe created!")
            setInput({
                name: "",
                summary: "",
                health_score: 0,
                step_by_step: steps,
                diets: [],
                img: noImage,
            })
            navigate("/home");
        }
    }

    return (
        <div className="CreateRecipe">
            <h1>Create your own recipe !</h1>
            <img id="imagenFood" alt={input.img} src={input.img}></img>
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
                    {
                        !errors.name ? null : <span>{errors.name}</span>
                    }
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
                    {
                        !errors.diets ? null : <span>{errors.diets}</span>
                    }
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

                <div>
                    <label>Steps for recipe:</label>
                    <div id="step_input">
                    <input
                        id="STEP"
                        type='text'
                        size="40"
                        name='paso'
                        placeholder="Step..."
                        onChange={(event) => handleStep(event)} />
                    <button onClick={(event) => addStep(event)}>Add step</button>
                    </div>
                    {
                        input.step_by_step && input.step_by_step.map(paso => {
                            return (
                                <div key={paso} id="paso" >
                                    <li>{paso}</li>
                                    <button value={paso} onClick={(event) => deleteStep(event)}>Delete step</button>
                                </div>
                            )
                        })
                    }
                    {
                        !errors.step_by_step ? null : <span>{errors.step_by_step}</span>
                    }
                </div>

                <button id="submit" type="submit">Create Recipe</button>
            </form>
            <Link to='/home'><button id="backToHome">Back to Home!</button></Link>
        </div>
    )
}