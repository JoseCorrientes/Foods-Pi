import axios from 'axios';

export function getRecipes() {
    return async function(dispatch) {
        var recipesFront = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: "GET_RECIPE",
            payload: recipesFront.data,
        });
    };
};

export function getDiets() {
    return async function(dispatch) {
        var dietsFront = await axios.get('http://localhost:3001/types');
        return dispatch( {
            type: "GET_DIET",
            payload: dietsFront.data,
        });
    };    
};

export function getTitleRecipeSearch(title) {
         return async function(dispatch) {
             try{
                 var recipeSearch = await axios.get(`http://localhost:3001/recipes?name=${title}`);
                 if (recipeSearch.data!=="This word doesn't match any Recipe") {   //borrar despues
                         return dispatch( {
                             type: "GET_BY_TITLE",
                             payload: recipeSearch.data
                         });
                 } else return dispatch ( {            //si no se encuentra coincidencia
                             type: "GET_BY_TITLE",
                             payload: []
                             });
        }catch(e) { console.log(e)};    
    };
};


export function filterRecipeByDiet(payload) {
    return {
        type: "FILTER_BY_DIET",
        payload,
    };
};

export function sorting (payload){
    const {typeSort, orderSort} = payload;
    return {
        type: "SORTING",
        payload: {
            typeSort,
            orderSort
        }
    }
};

export function createRecipe(payload){
    return async function(dispatch) {
        try{
            const {title, image, summary, spoonacularScore, healthScore, instructions, diets} = payload;
            let newRecipe={
                title: title[0],
                image: image[0],
                summary: summary[0],
                spoonacularScore: spoonacularScore,         
                healthScore: healthScore,
                instructions: instructions[0],
                diets: diets
                }
            await axios.post('http://localhost:3001/recipe', newRecipe);
            return dispatch({
                type: "CREATING",
            });
        }catch(e) { console.log(e)};   
    };
};

export function details(payload) {
    return async function(dispatch) {
        try{
            const result = await axios.get(`http://localhost:3001/recipes/${payload}`);
            return dispatch({
                        type: "GET_DETAILS",
                        payload: result.data
            });
        }catch(e) { console.log(e)}     
    
    };
};











