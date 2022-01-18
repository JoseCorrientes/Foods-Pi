import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe } from "../actions";
import { Link } from "react-router-dom";
import RecipeCreationCSS from './RecipeCreation.module.css';


const RecipeCreation = () =>{
    
    const dispatch = useDispatch();
    const diets = useSelector((state)=>state.diets);

    const [input, setInput]=useState({
                                    title:'',
                                    etitle: '',
                                    image: '',
                                    eimage: '',
                                    summary: '',
                                    esummary: '',
                                    spoonacularScore: '0',
                                    espoonacularScore: '',    //se guarda como string
                                    healthScore: '0',                  //hay que parsearlo antes de guardarlo   
                                    ehealthScore: '',               
                                    instructions: '',
                                    einstructions: '', 
                                    recipeDiets:[],
                                    });

    
    const handleSubmit = (e)=>{
        e.preventDefault();
        let newRecipe={
            title: input.title,
            image: input.image,
            summary: input.summary,
            spoonacularScore: parseInt(input.spoonacularScore),         
            healthScore: parseInt(input.healthScore),
            instructions: input.instructions,
            diets: input.recipeDiets
            }
         dispatch(createRecipe(newRecipe));
         
         setInput({
            title:'',
            etitle: '',
            image: '',
            eimage: '',
            summary: '',
            esummary: '',
            spoonacularScore: '0',
            espoonacularScore: '',    
            healthScore: '0',         
            ehealthScore: '',               
            instructions: '',
            einstructions: '', 
            recipeDiets:[],
        });

    };

    const validationTitle=(e)=>{
        e.preventDefault();
        if (/^[a-zA-Z0-9_\-\s]{2,50}$/.test(input.title)) setInput({
                                            ...input,
                                            etitle: 'false'});
        else setInput({
                    ...input,
                    etitle: 'true'
        })
    };  
    
    const validationImage=(e)=>{
        e.preventDefault();
        if (/^(http|^HTTP)/.test(input.image)) setInput({
            ...input,
            eimage: 'false'})
            else setInput({
                ...input,
                eimage: 'true'     
            });
        };
        
        const validationSummary=(e)=>{
            e.preventDefault();
            if (/[a-zA-Z0-9_\-\s.;$%#+=/*@)(]{70}$/.test(input.summary)) setInput({
                ...input,
                esummary: 'false'});
                else setInput({
                    ...input,
                    esummary: 'true'
                })
            };  
            
        const validationInstructions=(e)=>{
            e.preventDefault();
            if (/[a-zA-Z0-9_\-\s.;$%#+=/*@)(]{100}$/.test(input.instructions)) setInput({
                                                    ...input,
                                                    einstructions: 'false'});
            else setInput({
                            ...input,
                            einstructions: 'true'
                })
            };  
            
            
        const validationSpoonScore=(e)=>{   ////aca
            e.preventDefault();
        let RegExp =/^[0-9]{1,3}$/;
        if (RegExp.test(input.spoonacularScore) && input.spoonacularScore>=0 && input.spoonacularScore<=100 ) {
            setInput({
                ...input,
                espoonacularScore: "false"
            });
        } else {
            setInput({
                ...input,
                espoonacularScore: "true"
            });
        };
    };
    
    const validationHealthScore=(e)=>{              /////aca
        e.preventDefault();
        let RegExp =/^[0-9]{1,3}$/;
        if (RegExp.test(input.healthScore) && input.healthScore>=0 && input.healthScore<=100 ) {
            setInput({
                ...input,
                ehealthScore: "false"
            });
        } else {
            setInput({
                ...input,
                                    ehealthScore: "true"
                                });
                            };
                        };
                        
                        const handleChange=(e)=>{
                            e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: [e.target.value]
        });
    };
    
    const handleDietsChange=(e)=>{
        e.preventDefault();
        if (input.recipeDiets.includes(e.target.value)) {
            setInput({
                ...input,
                erecipeDiets: `This Diet is already in the list.`
            });
        } else 
        setInput( {
            ...input,
            recipeDiets: [...input.recipeDiets, e.target.value],
            eRecipeDiets: ''
        });
    };
    
    const handleDeleteDietClick=(e)=> {
        e.preventDefault();
        console.log(e.target.name);
        console.log(typeof e.target.name);
        
        const result=input.recipeDiets.filter(x=>e.target.name!==x);
        setInput({
            ...input,
            recipeDiets: result
        })
    };   
    



    return(
        <div className={RecipeCreationCSS.mainContainer}>
            <div className={RecipeCreationCSS.secondaryContainer}>
                <Link  
                    className={RecipeCreationCSS.link1}
                    to='/home'
                    >
                    MENU    
                </Link >
                <h1 className={RecipeCreationCSS.title}>COMPLETE ALL FIELDS</h1> 
                <div className={RecipeCreationCSS.inputContainer}>
                        <form onSubmit={handleSubmit}>
                                <label className={RecipeCreationCSS.fieldNameTitle} htmlFor='title'> TITLE: </label>
                                <input
                                    className={RecipeCreationCSS.inputNameTitle}
                                    id='title'
                                    onChange={(e)=>handleChange(e)}
                                    onKeyUp={(e)=>validationTitle(e)} 
                                    /* obligatorio */
                                    key='title'
                                    tipe='text'
                                    autoComplete="off"
                                    required
                                    placeholder='Recipe Title...'
                                    size='51'
                                    value={input.title}
                                    name='title'
                                />

                                <label
                                    className={RecipeCreationCSS.fieldNameImagen} 
                                    htmlFor='image'>IMAGE:</label>
                                <input
                                    className={RecipeCreationCSS.inputNameImagen}
                                    id='image'
                                    onChange={(e)=>handleChange(e)}
                                    onKeyUp={(e)=>validationImage(e)}
                                    key='image'
                                    tipe='text'
                                    autoComplete="off"
                                    placeholder='Image...' 
                                    value={input.image}
                                    name='image'
                                />
                                <br/>

                                <label
                                    className={RecipeCreationCSS.fieldNameSummary}
                                    htmlFor='summary'>SUMMARY:</label>
                                <textarea 
                                    className={RecipeCreationCSS.inputNameSummary}   
                                    id='summary' 
                                    onChange={(e)=>handleChange(e)} 
                                    onKeyUp={(e)=>validationSummary(e)}
                                    key='summary'
                                    tipe='text'
                                    autoComplete="off"
                                    placeholder='Summary...' 
                                    value={input.summary}
                                    name="summary"
                                ></textarea> 
                                <br/>

                                <div className={RecipeCreationCSS.scoreContainer} >
                                        <label 
                                            className={RecipeCreationCSS.fieldNameScore}
                                            htmlFor='spoonacularScore'>RECIPE SCORE:</label>
                                        <input 
                                            className={RecipeCreationCSS.inputNameScore}
                                            id='spoonacularScore'
                                            onChange={(e)=>handleChange(e)}
                                            onKeyUp={(e)=>validationSpoonScore(e)}
                                            key='spoonacularScore' 
                                            tipe='text' 
                                            autoComplete="off"
                                            placeholder='Recipe Score...'   
                                            value={input.spoonacularScore}
                                            name='spoonacularScore'
                                        />
                                        <br/>

                                        <label 
                                            className={RecipeCreationCSS.fieldNameScore}
                                            htmlFor='healthScore'>HEALTH SCORE:</label>
                                        <input 
                                            className={RecipeCreationCSS.inputNameScore}
                                            id='healthScore'
                                            onChange={(e)=>handleChange(e)}
                                            onKeyUp={(e)=>validationHealthScore(e)}
                                            key='healthScore' 
                                            tipe='text' 
                                            autoComplete="off"
                                            placeholder='Health Score...' 
                                            value={input.healthScore}
                                            name='healthScore'
                                        />
                                        <br/>
                                </div>

                                <label
                                    className={RecipeCreationCSS.fieldNameInstruction}
                                    htmlFor='instructions'>INSTRUCTIONS:</label>
                                <textarea  
                                    className={RecipeCreationCSS.inputNameIntruction}
                                    id='instructions'
                                    onChange={(e)=>handleChange(e)}
                                    onKeyUp={(e)=>validationInstructions(e)}
                                    key='instructions' 
                                    tipe='text' 
                                    autoComplete="off"
                                    placeholder='Instructions...' 
                                    value={input.instructions}
                                    name='instructions'
                                />
                                <br/> 

                                {input.etitle==='false' && input.eimage==='false' && input.esummary==='false' && input.espoonacularScore==='false'  && input.ehealthScore==='false' &&
                                input.einstructions==='false' &&  <button className={RecipeCreationCSS.submit} type='submit'onSubmit={handleSubmit} >Create Recipe</button> }
                        </form>
                </div>    
            </div>  
            
            
            <div className={RecipeCreationCSS.dietContainer}>
                    <label
                        className={RecipeCreationCSS.titleDiet}
                        htmlFor='diets'>DIETS
                    </label>        
                    <select 
                        onChange={(e)=>handleDietsChange(e)}
                        id='diets' >
                        {diets.map(el=>
                            <option 
                                    className={RecipeCreationCSS.optionDiet}
                                    key={el.id}
                                    name={el.name} 
                                    value={el.id}>
                                    {el.name} 
                            </option>)} 
                    </select>
                    <div>
                            <ul>
                                {input.recipeDiets ? input.recipeDiets.map(el=>
                                        <li 
                                            className={RecipeCreationCSS.dietListName}
                                            key={el} >{`${diets[el-1].name}   `}  
                                            <button 
                                                    className={RecipeCreationCSS.dietListButton}
                                                    key={el}
                                                    name={el} 
                                                    onClick={(e)=>{handleDeleteDietClick(e)}}>X
                                            </button> 
                                        </li>) : null
                                }
                            </ul>   
                    </div>                                        
            </div>

            {(input.einstructions==='true'|| input.etitle==='true' || input.eimage==='true' || input.esummary==='true'||
                    input.espoonacularScore==='true' || input.ehealthScore==='true')  &&                    
                <div className={RecipeCreationCSS.error}>
                    {input.einstructions==='true' &&
                         <p
                           className={RecipeCreationCSS.errorText}     
                         >The Instructions may includes characters, numbers and (_-;$%#+=/*@)() (100 char Min).</p>}
                    {input.etitle==='true' &&
                         <p
                           className={RecipeCreationCSS.errorText} 
                         >The title must be 2 to 50 characteres long.
                            Only letters, numbers, '-', '_' and spaces.</p>}
                    {input.eimage==='true' &&
                         <p
                           className={RecipeCreationCSS.errorText}     
                         >The image must begin with http or HTTP.</p>}            
                    {input.esummary==='true' &&
                         <p
                           className={RecipeCreationCSS.errorText}
                         >The Summary may includes characters, numbers and (_-;$%#+=/*@)() (70 char Min).</p>}
                    {input.espoonacularScore==='true' && 
                         <p
                           className={RecipeCreationCSS.errorText}
                         >The Recipe Score must be an integer between 0 and 100 (1-3 digits).</p>}
                    {input.ehealthScore==='true' &&
                         <p
                           className={RecipeCreationCSS.errorText}
                         >The Health Score must be an integer between 0 and 100 (1-3 digits).</p>}
                </div>                    
            }   

        </div>    
    )
};



export default RecipeCreation;