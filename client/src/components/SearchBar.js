import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { getTitleRecipeSearch } from '../actions/index';  
;


const SearchBar=()=> {
    
    const dispatch = useDispatch();
    const [searchField, setSearchField] = useState('');   
    const handleChange=(e)=>{
        e.preventDefault();
        setSearchField(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getTitleRecipeSearch(searchField));
        setSearchField('');
        };

    return (
            <form 
                onSubmit={(e)=>handleSubmit(e)}>
                <input
                    onChange={(e)=>handleChange(e)}
                    tipe="text"
                    placeholder="Recipe Name..."
                    value={searchField}  ></input>
                <button  type='submit'>Search Recipe</button>
            </form>
            )
};


export default SearchBar;

