const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipes = require('./recipes')
const diets = require('./diets')
const recipe = require('./recipe')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes',recipes)
router.use('/diets',diets)
router.use('/recipe',recipe)

module.exports = router;