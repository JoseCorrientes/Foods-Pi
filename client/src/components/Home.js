import React from  'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { getDiets, getRecipes, filterRecipeByDiet, sorting } from '../actions/index';
import { Link } from "react-router-dom";

import Card from './Card';
import Paginate from './Paginate';
import SearchBar from './SearchBar';

import HomeCSS from './Home.module.css';


const Home = () => {

  
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state)=>state.diets)

    const [typeSort, setTypeSort] = useState('Name');
    const [orderSort, setOrderSort] = useState('Ascendant');


    //Lo siguiente es para el paginado
    const [ currentPage, setcurrentPage] = useState(1);            //pagina actual
    const [ recipesPerPage, setrecipesPerPage ] = useState(9);        //cantidad de recetas x pagina

    const indexOfLastRecipe = currentPage*recipesPerPage;            //indice de ultima receta de pagina actual
    const indexOfFirstRecipe = indexOfLastRecipe-recipesPerPage;      //indice de primer receta de pagina actual
  
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe);  //personajes a renderizar dependiendo de la pagina
  
    //funcion paginate que cambia la pagina actual
    const paginateFunction =(pageNumber)=> setcurrentPage(pageNumber);    //seteo la pagina
    // aca arriba  termino el paginado


    const [renderize, setRenderize] = useState(false);  

 
    useEffect(() => {                  //LifeCycle Components al inicio
        dispatch(getDiets());        //carga al principio la api y los tipes por defecto   
        dispatch(getRecipes());
    },[]);

    
    useEffect(()=> {
        dispatch(sorting({typeSort, orderSort}));
        paginateFunction(1);
        setRenderize(!renderize);
    }, [typeSort, orderSort]);

    const handleRecipesClick = (e)=>{
        e.preventDefault();
        dispatch(getRecipes());
        dispatch(getDiets());
    };

  const handleFilterDiet = (e)=>{
        dispatch(filterRecipeByDiet(e.target.value));
  };
  
  let seeFlag = (allRecipes.length>0)? true: false;   // bandera uso para no imprimir si 
                                                      // el estado state.recipe esta vacio
  return (
        <div className={HomeCSS.totalContainer}>
            <div className={HomeCSS.menuContainer}>        
                    <h1
                        className={HomeCSS.pageTitle}
                        >FOOD's Home
                    </h1>

                    <button className={HomeCSS.btn1} onClick={(e)=>{handleRecipesClick(e)}}>RELOAD RECIPES & DIETS</button>
                    <SearchBar />
                    
                    <Link 
                        className={HomeCSS.btn2}
                        to='/recipe'>CREATE RECIPE!
                    </Link>
                    <h1
                        className={HomeCSS.pageFilter}
                        >DIET`S FILTERING
                    </h1>

                    <div 
                        className={HomeCSS.filterField}>
                        <select onChange={(e)=>handleFilterDiet(e)}>
                            <option value="All">todos</option>
                            {allDiets.map(x=> <option key={x.name} value={x.name}>{x.name}</option>)}
                        </select> 
                    </div>

                    <div >
                        <h1
                            className={HomeCSS.pageFilter}
                            >SORTING
                        </h1>
                        <div
                            className={HomeCSS.sortField}>
                            <select onChange={(e)=>setTypeSort(e.target.value)}> 
                                <option value="Name">By Name</option>
                                <option value="Score">By Score</option>
                            </select>

                            <select onChange={(e)=>setOrderSort(e.target.value)}>
                                <option value="Ascendant" >Ascendant</option>
                                <option value="Descendant">Descendant</option>
                            </select>
                        </div>
                    </div>
                    
                    <div 
                        className={HomeCSS.containerPage}
                        >
                        {seeFlag && <Paginate
                            recipesPerPage={recipesPerPage}
                            allRecipesNumber={allRecipes.length}
                            paginate={paginateFunction}
                        /> }
                    </div>

                    <div>
                        {!seeFlag && <h1 
                                        className={HomeCSS.warning} 
                                        >No Data
                                    </h1>} 
                    </div>     
            </div>

            <div className={HomeCSS.cardBoard}>
                {seeFlag && currentRecipes.map((el)=> {
                        const dietsArray = el.diets.map(x =>x.name);
                        
                        return  <div key={el.id} className={HomeCSS.cardContainer}>
                                    <Card  key={el.id} 
                                        score={el.spoonacularScore} 
                                        title={el.title} 
                                        id={el.id} 
                                        image={el.image} 
                                        diets={dietsArray}/>                     
                                </div>                        
                        })
                
                }
            </div>   
        </div>
    );
};

export default Home;