const axios = require('axios');
require('dotenv').config();
const { YOUR_API_KEY9 } = process.env;
const { Recipe, Diet } = require('../db.js');
var apiDietSource = ["gluten free", "vegetarian","vegan", "ketogenic",
"lacto vegetarian", "ovo vegetarian", "pescatarian" ,"paleolithic", "primal", "fodmap friendly", "whole30" ];
var apiRecipes= [];
var dBRecipeIndex=0;
const API_GETRECIPE=100;                     //CAMBIAR A 100 PARA FINAL

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);





// Funciones auxiliares -------------------------------------------------------------
const loadApiRecipes = async()=> {
    var indice=1;
    var cantidad=1;
    while (cantidad<=API_GETRECIPE) {
                await axios.get(`https://api.spoonacular.com/recipes/${indice}/information?apiKey=${YOUR_API_KEY9}`)
                        .then( resp => {
                            let recipeSingle= {
                                id: resp.data.id,
                                title: resp.data.title,
                                image: resp.data.image,
                                summary: resp.data.summary,
                                dishTypes: resp.data.dishTypes,
                                spoonacularScore: resp.data.spoonacularScore,
                                healthScore: resp.data.healthScore,
                                instructions: resp.data.instructions,
                            };    
                            var recipeDiets=[];
                            resp.data.diets.map(x=>recipeDiets.push({ name: x } ));

                            if (recipeDiets.includes("lacto ovo vegetarian") || recipeDiets.includes("lacto vegetarian") || recipeDiets.includes("ovo vegetarian")) recipeDiets.push({ name: "vegetarian"});
                            recipeSingle.diets = recipeDiets;
                               
                            apiRecipes.push(recipeSingle);
                            indice++;
                            cantidad++;
                        })
                        .catch( e => {
                             if (e.response.status==404) {
                                                     indice++;
                            } else { 
                                            return console.log(e.response.status);
                             };
                        });            
    };   

    dBRecipeIndex=apiRecipes[apiRecipes.length-1].id;
    dBRecipeIndex++;
    return(apiRecipes);  
};


const loadDbRecipes = async()=>{
    try {
        const response = await Recipe.findAll({
                 include: {
                    model: Diet,  as: "diets",
                    attributes: ['name'],
                    through: {attributes: [],},
                 }                                 
        });
        return response;
    }catch (e) { console.log(e) }        
};


const loadAllRecipes = async() => {
    try{ 
        const response1 = (apiRecipes.length<1)? await loadApiRecipes() : apiRecipes;
        const response2 = await loadDbRecipes();
        return (response2.length>0) ? response1.concat(response2) : response1; 
    }catch(e) { console.log(e) }            
};





// --------------------------------------------   Rutas ---------------------------------------- 
// Obtiene listado de recetas de la API Y DB  -------------------------------    ok
router.get('/recipes', async (req, res)=> {
    try{
        const {name} = req.query;
        if (name) {
                const allRecipes = await loadAllRecipes();
                let response3 = allRecipes.filter(el=>el.title.toLowerCase().includes(name.toLowerCase()));
                return (response3.length>0)? res.send(response3): res.send("This word doesn't match any Recipe");
        } else { 
                const allRecipes = await loadAllRecipes();
                return res.send(allRecipes);
        }    
    }catch(e) { res.send(e)};              
});


// Recuperar todos los Types de Dieta de API y dB ------------------------------- ok
router.get('/types', async (req, res)=>{
    try{
        const result = await Diet.findAll();
        if(result.length===0) {                                       // dbType esta vacio (inicio)
            for (let n=0; n<apiDietSource.length; n++)   {      
                        let typeObject = { name: apiDietSource[n] };    
                        await Diet.create( typeObject );
            }
            return res.send(await Diet.findAll());
        };

        if(result.length>11) {                                         // dbType ya se cargo con dietas mas alla de las iniciales
            return res.send(result);   
        };

        if(result.length>0 && result.length<=11) {                      // dbType solo tiene las dietas iniciales, cargamos las de los Recipes en memoria
            for (let n=0; n<apiRecipes.length; n++ ) {
                        let dietArray = apiRecipes[n].diets;
                        for(j=0; j<dietArray.length; j++) {
                                    await Diet.findOrCreate( {
                                                where: {name: dietArray[j].name}
                        })};
            };
        };
        return res.send(await Diet.findAll());
        } catch(e) { res.send(e)};
});



//vi que en la api existe duplicados asi que no considero la repeticion de nombres
//Ej Balsamic, Caper, And Anchovy Marinade id 61 id 103
//Inhabilito el control de repeticion

// Cargar una receta----------------------------------------------------   ok 
router.post('/recipe', async (req, res)=> {
    try{
        const { title, image, summary, spoonacularScore, healthScore, instructions, diets} = req.body;
        
        const result7 = await Diet.findAll();
        if (result7.length<1) { return res.send('You may recover The Diets Types First')};

// si la Recipes BD esta vacio (se fija si apiRecipes esta llena y cuenta el ultimo indice de apiRecipes)
//-si apiRecipes esta vacio, lo llena y cuenta el ultimo indice de apiRecipes
//si la RecipesBD esta llena --crea la siguiente receta
        const result=await Recipe.findAll();
        
        if (result.length<1) {                       // todo lo que sigue es para sacar el indice que se va ausar para agregar
                    if (apiRecipes.length<1) { 
                        const result2 = await loadApiRecipes();
                        dBRecipeIndex=result2[result2.length-1].id
                        dBRecipeIndex++;
                    };
        };
        
        const recipeObjeto = {
            id: dBRecipeIndex++,
            title,
            image,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
        };
        const result5 = await Recipe.create(recipeObjeto);
        const result6 = await result5.addDiet(diets);                    // ver era types dentro del parentesis
        res.send(result6);
    } catch (e) { res.send(e)};
});


//Traer una receta por /recipes/:id
router.get('/recipes/:idRecipe', async (req, res)=>{
    try{
        const { idRecipe } = req.params;
        if (idRecipe) {
             const allRecipes = await loadAllRecipes();         
             let response = allRecipes.filter(el=>el.id===parseInt(idRecipe));
            return (response.length>0)? res.send(response): res.send(`NO DATA`);
        } else { 
            return res.send('Recipe Id Forgotten')
        }
    }catch(e) { res.send(e)};
});



module.exports = router;


