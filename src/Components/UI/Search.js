import React from 'react'
import classes from './Search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
function Search(props) {

    return (
        <div className={classes.searchcontainer}>

            <input className={classes.search}
                onChange={(e) => props.change(e.target.value)}
                placeholder='Search' type='text' />
            <FontAwesomeIcon icon={faSearch} className={classes.icon} style={{ color: 'rgb(180, 179, 176)', marginLeft: '-35px' }} />
            <div className={classes.check}>
                <label > Show archived   </label>
                <input className={classes.checkbox} type='checkbox' onClick={() => props.clicked()} />

            </div>
        </div>
    )
}

export default Search;
