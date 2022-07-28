const initialState = {
    recipes: [],
    recipe: [],
    diets: []
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload,
            }
        case 'GET_RECIPE_BY_ID':
            return {
                ...state,
                recipe: action.payload
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
                    recipes: "NO COUNTRIES FOUND"
                }
            }
        case 'GET_ALL_DIETS':
            return {
                ...state,
                diets: action.payload
            }

        default: return state
    }
}