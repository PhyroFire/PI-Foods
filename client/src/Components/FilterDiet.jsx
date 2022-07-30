import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipesByDiet, getAllDiets } from "../Actions/Index";

export default function FilterDiet() {

    const dispatch = useDispatch()
    const allDiets = useSelector(state => state.diets)

    useEffect(() => {
        dispatch(getAllDiets())
    }, [])

    function handleDietFilter(event) {
        dispatch(getRecipesByDiet(event.target.value))
    }

    return (
        <div>
            <select onChange={event => handleDietFilter(event)}>
                <option value='All'>All</option>
                {
                    allDiets && allDiets.map(diet => {
                        return (
                            <option key={diet.name} value={diet.name}>{diet.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )

}