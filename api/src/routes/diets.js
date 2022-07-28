
const { Router } = require('express');
const { Diet, Recipe } = require('../db')
const router = Router();

const getAllDiets = async () => {

    const allDiets = await Diet.findAll()
    if (!allDiets.length) {
        const diets = [
            "gluten free",
            "dairy free",
            "ketogenic",
            "lacto ovo vegetarian",
            "vegan",
            "pescatarian",
            "paleolithic",
            "primal",
            "fodmap friendly",
            "whole 30"
        ]
        const postedDietsInDB = diets.map(diet => {
            return Diet.create({ name: diet })
        })
        await Promise.all(postedDietsInDB)
        return await Diet.findAll()
    }
    else {
        return allDiets
    }
}

router.get('/', async (req, res, next) => {
    let diets = await getAllDiets();
    try {
        res.json(diets)
    } catch (error) {
        next(error)
    }
})

router.delete('/', async (req, res, next) => {
    let datos = req.body
    try {
        let recipe = await Recipe.findByPk(datos.recipeId)
        let diet = await Diet.findByPk(datos.dietId)

        if(recipe && diet){
            await recipe.removeDiet([diet])
            res.json("Diet remove from recipe")
        }
        else{
            res.json("Can't resolve request")
        }


    } catch (error) {
        next(error)
    }
})



module.exports = router;