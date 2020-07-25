import React, { useState } from 'react';
import {Input} from 'antd';

const SearchBar=(props)=>{

    //const [Searchtext,setSearchText]=useState('');
    //const {Search} =Input;

    const handleSearch=(e)=>{
        //setSearchText(e.target.value);
        //console.log(Searchtext);
        props.handleSearchBar(e.target.value);

    
    }

    return(
        <div>
            <input 
            style={{ width: "400px" }}
            onChange={handleSearch}
            placeholder="Search" />

        </div>
    )

};

export default SearchBar;