import React from "react";
import '../Style/CSS/Paginado.css'


export default function Paginado({ recipesXPage, allRecipes, pages }) {

    let numberOfRecipes = arrayOrString(allRecipes)
    let pageNumbers = []

    for (let index = 1; index <= Math.ceil(numberOfRecipes / recipesXPage); index++) {
        pageNumbers.push(index)
    }

    function arrayOrString(allRecipes){
        if(typeof allRecipes === "object"){
            return allRecipes.length
        }
        else{
            return 1
        }
    }

    return (
        <nav>
            <ul className="Paginado">
                {
                    pageNumbers &&
                    pageNumbers.map(number => {
                        return (
                            <li key={number}>
                                <button onClick={() => pages(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}