import React from "react";

export default function Paginado({ recipesXPage, allRecipes, pages }) {

    let pageNumbers = []

    for (let index = 1; index <= Math.ceil(allRecipes / recipesXPage); index++) {
        pageNumbers.push(index)
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