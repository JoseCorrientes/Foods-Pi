import React  from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { details } from '../actions';
import DetailCSS from './Details.module.css';


const Details = (props) => {
    const { match }= props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(details(match.params.idRecipe))
        }, [match.params.idRecipe, dispatch]);

    const detailed = useSelector((state)=>state.recipeDetail);
     
    return(
        <div className={DetailCSS.mainContainer}>
            {                             //para que no se rompe cuando pongo un indice que no hay por url
             detailed!=='NO DATA' &&
             detailed.length>0 ?   
                    <div >
                        <Link
                            className={DetailCSS.link3} 
                            to='/home'>MENU
                        </Link>   
                        <h1
                                    className={DetailCSS.pageTitle}
                                    >RECIPE DETAILS
                        </h1>                   
                        
                        <div
                            className={DetailCSS.secondaryContainer} >
                                <p 
                                   className={DetailCSS.recipeTitle}>{detailed[0].title}
                                </p> 
                                {/* <h3>Id</h3> */}
                                <p
                                   className={DetailCSS.recipeId} >
                                    Id: {detailed[0].id}   
                                </p>
                                <img className={DetailCSS.detailImage} 
                                    src={detailed[0].image} alt='imagen receta'/>
                                <h3
                                    className={DetailCSS.innerTitles}
                                    >DISH TYPES:
                                </h3>
                                <p
                                    className={DetailCSS.innerText}
                                    >{!detailed[0].dishTypes ? "There aren't information" : detailed[0].dishTypes.join(", ")}</p>
                                <h3
                                    className={DetailCSS.innerTitles}
                                    >DIETS:
                                </h3>
                                <ul>{detailed[0].diets.length>0 ? detailed[0].diets.map(x=> <li 
                                                                                                className={DetailCSS.innerText}
                                                                                                key={x.name}>{x.name}
                                                                                            </li>)
                                : "None"}</ul>
                                <h3
                                    className={DetailCSS.innerTitles}
                                    >SUMMARY:
                                </h3>
                                <p
                                    className={DetailCSS.innerText2}
                                    >{detailed[0].summary.replaceAll('<b>','').replaceAll('</b>','').replaceAll(/<\/*a.*?>/g, '').replaceAll('&','and')}</p> 
                                <h3
                                    className={DetailCSS.innerTitles}
                                    >RECIPE SCORE:
                                </h3>
                                <p
                                    className={DetailCSS.innerText}
                                    >{detailed[0].spoonacularScore}</p>
                                <h3
                                    className={DetailCSS.innerTitles}
                                    >HEALTH SCORE:
                                </h3>
                                <p
                                    className={DetailCSS.innerText}
                                    >{detailed[0].healthScore}</p>
                                <h3
                                    className={DetailCSS.innerTitles}
                                    >INSTRUCTIONS:
                                </h3>
                                <p
                                    className={DetailCSS.innerText2}
                                    >{!detailed[0].instructions 
                                        ? "There aren't instructions"
                                        : detailed[0].instructions.replaceAll('<p>',' ').replaceAll('&amp;','').replaceAll('</p>',' ').replaceAll('</ol>','')
                                                                .replaceAll('<ol>','').replaceAll('</li>','').replaceAll('<li>','')  
                                        }</p>

                        </div>        
                        <Link
                            className={DetailCSS.link3} 
                            to='/home'>MENU</Link> 
                    </div> 
                    : <div>
                        <p
                            className={DetailCSS.innerText}
                            >This Recipe's Id. doesn't Exist.</p>
                        <Link
                            className={DetailCSS.link3}     
                            to='/home'><button>Back To Menu</button></Link>
                     </div>
            }
        </div>
        
    );
};

export default Details;