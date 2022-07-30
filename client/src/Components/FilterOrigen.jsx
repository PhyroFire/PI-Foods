import React from "react";
import { useDispatch } from "react-redux";
import { filterMyRecipes } from "../Actions/Index";

export default function FilterOrigin() {

    const dispatch = useDispatch()
    function handleMyRecipes(event) {
        dispatch(filterMyRecipes(event.target.value))
    }

    return (
        <div>
            <select onChange={event => handleMyRecipes(event)}>
                <option value='All'>All recipes</option>
                <option value='My recipes'>Created recipes</option>
                <option value='Api'>API's SPOONACULAR recipes</option>
            </select>
        </div>
    )
}