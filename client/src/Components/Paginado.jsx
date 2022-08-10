import React from "react";
import '../Style/CSS/Paginado.css'


export default function Paginado({ recipesXPage, allRecipes, pages, actual }) {

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
    
    function handlePaginado(orden){
        if(orden === "prev"){
            if( (actual - 1) > 0 ){
                pages(actual - 1)
            }
        }
        if(orden === "next"){
            if((actual +1 ) <= pageNumbers.length ){
                pages(actual + 1)
            }
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
            {
                <div id="prev_next">
                    <button onClick={() => handlePaginado("prev")}>PREVIUS</button>
                    <button onClick={() => handlePaginado("next")}>NEXT</button>
                </div>
            }
        </nav>
    )
}