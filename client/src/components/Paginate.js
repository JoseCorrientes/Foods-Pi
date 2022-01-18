import PageCSS from './Paginate.module.css';
import React from "react";;

const Paginate =({recipesPerPage, allRecipesNumber, paginate })=>{

    const pageNumbers=[];                //genera un arreglo de numeros de paginas
    // for (let i=0; i<Math.ceil(allRecipesNumber/recipesPerPage); i++) {
    for (let i=1; i<=Math.ceil(allRecipesNumber/recipesPerPage); i++) {    
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul>
                {pageNumbers &&
                        pageNumbers.map(num =>  
                                    <li 
                                        className={PageCSS.page}
                                        key={num}
                                        onClick={()=>paginate(num)}>Page {num}
                                           
                                    </li> )}
            </ul> 
        </nav>
    )
};

export default Paginate;
