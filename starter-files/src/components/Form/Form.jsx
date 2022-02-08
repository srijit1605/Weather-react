import React, {useState} from 'react';

import styles from './Form.module.css';

const Form = ({submitSearch}) => {
    const [location,setLocation] = useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        if(!location || location==='') return;
        submitSearch(location);
    }
    return (
        <form onSubmit={onSubmit}>
            <input
                aria-label="location"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Enter location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <button type="submit" className={styles.button} onClick={onSubmit}>
                SEARCH
            </button>
        </form>
    );
};

export default Form;
