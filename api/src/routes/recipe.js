const { Router } = require('express');
const { Recipe, Diet } = require('../db')
const router = Router();

const postGameDb = async (name, summary, health_score, step_by_step, img, diets) => {
    const recipe = await Recipe.create({
        name,
        summary,
        health_score,
        step_by_step,
        img,
        myGame: true
    })

    let dietsInDB = await Diet.findAll({
        where: {
            name: diets
        }, attributes: ['id']
    })
    recipe.addDiet(dietsInDB)

    return "Recipe created"
}

router.post('/', async (req, res, next) => {
    let datos = req.body
    try {
        let recipe = await postGameDb(datos.name, datos.summary, datos.health_score,
            datos.step_by_step, datos.img, datos.diets)
        res.json(recipe)
    } catch (error) {
        next(error)
    }
})

// router.post('/', (req, res, next) => {
//     let datos = req.body
//     try {
//         postGameDb(datos.name, datos.summary, datos.health_score,
//             datos.step_by_step, datos.img, datos.diets)
//             .then(res.json("receta creada"))
//     } catch (error) {
//         next(error)
//     }
// })

router.delete('/:id', (req, res, next) => {
    try {
        const { id } = req.params
        Recipe.destroy({ where: { id: id } })
        res.send(`Deleted recipe id number: ${id}`)
    } catch (error) {
        next(error)
    }
})

module.exports = router;