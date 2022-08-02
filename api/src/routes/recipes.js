const axios = require('axios');
const { Router } = require('express');
const { Recipe, Diet } = require('../db')
const { API_KEY } = process.env;
const router = Router();

const getRecipesApi = async () => {

    let results = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    let recipes = results.data.results.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.title,
            health_score: recipe.healthScore,
            img: recipe.image,
            diets: recipe.diets,
        }
    })
    return recipes
}

const getRecipesDb = async()=>{
    const recipes = Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['id','name'],
            through:{
                attributes: []
            }
        }
    })
    return recipes
}

const getAllRecipes = async()=>{
    const api = await getRecipesApi()
    const db = await getRecipesDb()
    const allRecipes = db.concat(api)
    return allRecipes;
}

router.get('/', async (req, res, next) => {
    let name = req.query.name;
    try {
        const allRecipes = await getAllRecipes()
        if(name){
            const recetas = allRecipes.filter(r=> r.name.toLowerCase().includes(name.toLowerCase()))
            if(recetas.length) return res.json(recetas)
            else return res.send(`No se encuentra "${name}" en el listado de recetas`)
        }
        res.json(allRecipes)
        
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    let id = req.params.id
    try {
        if (id.length > 10) {
            let resultado = await Recipe.findByPk(id)
            if (resultado) {
                let diets = await resultado.getDiets()
                res.json({ ...resultado.dataValues, diets })
            }
        } else {
            let recipeInApi = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            let recipe = {
                id: recipeInApi.data.id,
                name: recipeInApi.data.title,
                summary: recipeInApi.data.summary,
                health_score: recipeInApi.data.healthScore,
                step_by_step: recipeInApi.data.analyzedInstructions[0] ? recipeInApi.data.analyzedInstructions[0].steps.map(step => step.step) : ["No steps"],
                img: recipeInApi.data.image,
                diets: recipeInApi.data.diets,
            }
            res.json(recipe)
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;