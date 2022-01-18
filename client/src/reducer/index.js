const initialState = {
    recipesBackup: [],   //este agrego bkup para el paginado
    recipes: [],
    diets: [],
    recipeDetail: [],
};

function rootReducer (state=initialState, action) {

    switch(action.type) {
        case "GET_RECIPE": 
            return {
                ...state,
                recipes: action.payload,
                recipesBackup: action.payload   //este agrega bkup para la copia para paginado
            };
        
        case "GET_DIET":  
            return {
                ...state,
                diets: action.payload
            };

        case "FILTER_BY_DIET": 
            const recipes= state.recipesBackup;
            const recipesFiltered = 
                     (action.payload==='All')
                     ? recipes
                     : recipes.filter(x=> {                        
                                                let exist=false;
                                                for (let n=0; n<x.diets.length; n++) {
                                                    if( (x.diets[n].name===action.payload) ||
                                                        ((x.diets[n].name==="lacto ovo vegetarian" ||
                                                        x.diets[n].name==="ovo vegetarian"  || 
                                                        x.diets[n].name==="lacto vegetarian" ) && action.payload==="vegetarian"))  exist=true;
                                                };
                                                return (exist)? true: false;
                                                });
                                
            return {
                ...state,
                recipes: recipesFiltered
            };
        
        case "SORTING":                        //para probar orden
            const {typeSort, orderSort}= action.payload;  
            const recipesWork = state.recipes;  
            let sortedRecipes=[];
            if (typeSort==='Name' && orderSort==='Ascendant') {  
                    sortedRecipes = recipesWork.sort((a,b)=>{
                        if (a.title.toLowerCase()===b.title.toLowerCase()) return 0;
                        if (a.title.toLowerCase()<b.title.toLowerCase()) return -1;
                        return 1;
                    });
            } else if (typeSort==='Name' && orderSort==='Descendant') {
                    sortedRecipes = recipesWork.sort((a,b)=>{
                        if (a.title.toLowerCase()===b.title.toLowerCase()) return 0;
                        if (a.title.toLowerCase()<b.title.toLowerCase()) return 1;
                        return -1;
                    });
            } else if (typeSort==='Score' && orderSort==='Ascendant') {
                    sortedRecipes = recipesWork.sort((a,b)=>{
                        if (a.spoonacularScore===b.spoonacularScore) return 0;
                        if (a.spoonacularScore<b.spoonacularScore) return -1;
                        return 1;
                });
            } else if (typeSort==='Score' && orderSort==='Descendant') {
                    sortedRecipes = recipesWork.sort((a,b)=>{
                        if (a.spoonacularScore===b.spoonacularScore) return 0;
                        if (a.spoonacularScore<b.spoonacularScore) return 1;
                        return -1;
                });
            };      
            return {
                    ...state,
                    recipes: sortedRecipes
            };    


        case "GET_BY_TITLE":
            if (action.payload.length>0) return {
                                                ...state,
                                                recipes: action.payload
                                            };
             else return {
                         ...state,
                         recipes: []
                         };        

        case "CREATING": 
            return {
                ...state
            };                 
        
        case "GET_DETAILS":
            return {
                ...state,
                recipeDetail: action.payload
            }    

        default :
            return {
                ...state
            }    
    };
};


export default rootReducer;