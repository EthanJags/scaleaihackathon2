import React, { useState } from 'react';

const SearchBar = ({query, setQuery}) => {

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const styles = {
        container: {
            // display: 'flex',
            // flexDirection: 'column',
            margin: '30px auto',
            alignItems: 'center',

            position: 'relative',
            width: "100%",
        },
        searchBar: {
            width: '100%',
            height: '66px',
            padding: '0 30px',
            background: 'rgba(82, 82, 82, 0.8)',
            boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            fontSize: '25px',
            lineHeight: '30px',
            color: 'white',
            border: 'none',
        },
        searchBarPlaceholder: {
            color: '#939393',
        },
    }

    return (
        <div style={styles.container}>
            <input 
                type="text" 
                style={styles.searchBar} 
                placeholder="I want to play guitar"
                value={query} 
                onChange={handleInputChange}
            />
            <style jsx>{`
                input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                    color: #939393;
                }
                input::-moz-placeholder { /* Firefox 19+ */
                    color: #939393;
                }
                input:-ms-input-placeholder { /* IE 10+ */
                    color: #939393;
                }
                input::-ms-input-placeholder { /* Microsoft Edge */
                    color: #939393;
                }
                input::placeholder { /* Standard syntax */
                    color: #939393;
                }
            `}</style>
        </div>
    );
}

export default SearchBar;
