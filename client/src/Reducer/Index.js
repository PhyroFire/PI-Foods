const initialState = {
    recipes: [],
    recipe: [],
    diets: [],
    allRecipes: [],
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
        default: return state
    }
}