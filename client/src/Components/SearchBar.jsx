import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getRecipeByName } from "../Actions/Index";


export default function SearchBar({pages}) {

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInput(event) {
        setName(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch( getRecipeByName(name))
        setName("")
        pages(1)
    }

    function handleReset() {
        dispatch( getRecipeByName(name))
        setName("")
    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <input
                    value={name}
                    type='text'
                    placeholder="Search recipe..."
                    onChange={(event) => handleInput(event)}
                />
                <button type="submit" >Search</button>
            </form>

            <button onClick={ () => handleReset() }>RESET</button>
        </div>
    )

}