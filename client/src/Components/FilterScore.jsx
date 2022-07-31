import React from "react";
import { useDispatch } from "react-redux";
import { orderByScore } from "../Actions/Index";

export default function FilterScore({pages, orden}) {

    const dispatch = useDispatch()
    function handleOrderByScore(event) {
        event.preventDefault()
        dispatch(orderByScore(event.target.value))
        pages(1)
        orden(event.target.value)
    }

    return (
        <div>
            <select onChange={event => handleOrderByScore(event)}>
                <option>Order by Health Score</option>
                <option value='Mayor'>Score +</option>
                <option value='Menor'>Score -</option>
            </select>
        </div>
    )
}