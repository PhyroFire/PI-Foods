const axios = require('axios');

export function getAllRecipes() {
    return async function (dispatch) {
        let response = await axios('http://localhost:3001/recipes')
        dispatch({
            type: "GET_ALL_RECIPES",
            payload: response.data
        })
    }
}

export function getRecipeById(id) {
    return async function (dispatch) {
        let response = await axios(`http://localhost:3001/recipes/${id}`)
        dispatch({
            type: 'GET_RECIPE_BY_ID',
            payload: response.data
        })
    }
}

export function deleteDietFromRecipe(payload) {
    return function () {
        axios.delete(`http://localhost:3001/diets`, { data: payload })
    }
}

export function deleteRecipe(id) {
    return async function () {
        await axios.delete(`http://localhost:3001/recipe/${id}`)
    }
}

export function getRecipeByName(name) {
    return async function (dispatch) {
        let response = await axios(`http://localhost:3001/recipes?name=${name}`)
        dispatch({
            type: 'GET_RECIPES_BY_NAME',
            payload: response.data
        })
    }
}

export function getAllDiets() {
    return async function (dispatch) {
        let response = await axios('http://localhost:3001/diets')
        dispatch({
            type: "GET_ALL_DIETS",
            payload: response.data
        })
    }
}

export function postRecipe(payload) {
    return async function () {
        await axios.post(`http://localhost:3001/recipe`, payload)
    }
}

export function filterMyRecipes(origen) {
    return {
        type: 'FILTER_MY_RECIPES',
        payload: origen
    }
}

export function getRecipesByDiet(diet) {
    return {
        type: 'GET_RECIPES_BY_DIET',
        payload: diet
    }
}