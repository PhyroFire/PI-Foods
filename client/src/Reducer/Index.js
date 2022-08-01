const initialState = {
    recipes: [],
    recipe: [],
    diets: [],
    allRecipes: [],
}

function orderByName(order, state) {
    let allRecipes = state
    if (order === 'Ascendente') {
        allRecipes.sort(function (a, b) {
            if (a.name > b.name) {
                return 1
            }
            if (b.name > a.name) {
                return -1
            }
            return 0
        })
    }
    else if (order === 'Descendente') {
        allRecipes.sort(function (a, b) {
            if (a.name > b.name) {
                return -1
            }
            if (b.name > a.name) {
                return 1
            }
            return 0
        })
    }
    return allRecipes
}

function orderByScore(order, state) {
    let allRecipes = state
    if (order === 'Menor') {
        allRecipes.sort(function (a, b) {
            if (a.health_score > b.health_score) {
                return 1
            }
            if (b.health_score > a.health_score) {
                return -1
            }
            return 0
        })
    }
    else if (order === 'Mayor') {
        allRecipes.sort(function (a, b) {
            if (a.health_score > b.health_score) {
                return -1
            }
            if (b.health_score > a.health_score) {
                return 1
            }
            return 0
        })
    }
    return allRecipes
}

export default function rootReducer(state = initialState, action) {

    const allRecipes = state.allRecipes

    switch (action.type) {

        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            }

        case 'GET_RECIPE_BY_ID':
            return {
                ...state,
                recipe: action.payload,
            }

        case 'GET_RECIPES_BY_NAME':
            if (action.payload.length !== 0) {
                return {
                    ...state,
                    recipes: action.payload
                }
            }
            else {
                return {
                    ...state,
                    recipes: "NO RECIPES FOUND"
                }
            }

        case 'GET_ALL_DIETS':
            return {
                ...state,
                diets: action.payload
            }

        case 'FILTER_MY_RECIPES':
            const myRecipes = action.payload === 'My recipes' ? allRecipes.filter(recipe => recipe.myRecipe) : allRecipes.filter(recipe => !recipe.myRecipe)
            return {
                ...state,
                recipes: action.payload === 'All' ? state.allRecipes : myRecipes.length === 0 ? "NO RECIPES FOUND" : myRecipes
            }

        case 'GET_RECIPES_BY_DIET':
            const recipeDiets = action.payload === 'All' ? allRecipes : allRecipes.filter(recipe => recipe.diets.find(diet => diet === action.payload.toLowerCase() || diet.name === action.payload))
            return {
                ...state,
                recipes: recipeDiets
            }

        case 'ORDER_BY_NAME':
            const abcRecipes = action.payload === "Ascendente" ? orderByName("Ascendente", state.recipes) : action.payload === "Descendente" ? orderByName("Descendente", state.recipes) : state.allRecipes
            return {
                ...state,
                recipes: abcRecipes
            }

        case 'ORDER_BY_SCORE':
            const scoreRecipes = action.payload === "Mayor" ? orderByScore("Mayor", state.recipes) : action.payload === "Menor" ? orderByScore("Menor", state.recipes) : state.allRecipes
            return {
                ...state,
                recipes: scoreRecipes
            }

        default: return state
    }
}