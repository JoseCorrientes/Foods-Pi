import React from "redux";
import { Link } from "react-router-dom";
import CardCSS from './Card.module.css';


const Card=({id, score, title, image, diets})=> {
    
    var idRecipe=id;
    return(
        <div 
            className={CardCSS.cardContainer}>
            <div className={CardCSS.containerCardScore}>
                <h2
                    className={CardCSS.cardId}>
                    Id: {id}
                      
                </h2>
                <p
                    className={CardCSS.cardScore}>
                    Score: {score}</p>
            </div>
            <div className={CardCSS.cardSpace}>
                <h3 
                    className={CardCSS.cardTitle}>
                        {title}</h3>
            </div>
            <div >
                <Link to={`/recipes/${idRecipe}`}>     
                    <img className={CardCSS.cardImage} src={image} alt="nombre imagen" />
                </Link>
            </div> 
            {/* <h3>Tipo de Dietas:</h3> */}
            {diets.map((x,index2)=> <p
                                 className={CardCSS.cardDiet}   
                                 key={index2} >{x}.</p> )}
        </div>
    )
};

export default Card;    