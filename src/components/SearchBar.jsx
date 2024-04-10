import React, { useState } from 'react';
import './SearchBar.css'
import TextField from '@mui/material/TextField';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                className='form2'
                id="search"
                label="Search"
                variant="outlined"
                style={{ borderColor: 'white' }}
                value={searchTerm}
                onChange={handleChange}
                InputProps={{ style: { borderColor: 'white' } }} // Set the outline color to white
            />
        </form>
    );
}

export default SearchBar;
