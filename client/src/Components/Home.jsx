import { getAllRecipes } from "../Actions/Index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

import Paginado from "./Paginado.jsx";
import Recipes from "./Recipes.jsx";
import SearchBar from "./SearchBar.jsx";
import FilterOrigin from "./FilterOrigen.jsx";
import FilterDiet from "./FilterDiet.jsx";

export default function Home() {

    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)

    const [currentPage, setCurrentPage] = useState(1)
    const recipesXPage = 9
    const indexOfLastRecipe = currentPage * recipesXPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesXPage
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    useEffect(() => {
        dispatch(getAllRecipes())
    }, [])


    return (
        <div className="Home">

            <div className="TOP">
                <h1>Henry's Foods Proyect</h1>
            </div>


            <nav className="MainNav">

                <SearchBar />

                <Link to={'/about'}><button>ABOUT THIS PAGE</button></Link>

                <Link to='/'><button>Back to start</button></Link>

                <Link to={'/createRecipe'}><button>CREATE RECIPE!</button></Link>

            </nav>

            <nav className="Nav_Home">

                <FilterOrigin />
                <FilterDiet />

            </nav>

            <Paginado
                recipesXPage={recipesXPage}
                allRecipes={recipes.length}
                pages={setCurrentPage}
            />

            <Recipes currentRecipes={currentRecipes} />

        </div>
    )
}