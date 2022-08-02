import React, {useState} from 'react';
// import { Accordion, AccordionDetails, AccordionSummary, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import './EventPageDropdown.css';


const EventPageDropdown = (props) => {
    const [selection, setSelection] = useState('')

    const handleChange = (e) => {
        setSelection(e.target.value);
    }
    

    // const generateMenuItems = () => {
    //     return props.categories.map((category, index) => {
    //         return <MenuItem key={index} value={index}>{category}</MenuItem>
    //     })
    // }
    return (
        <div className='dropdown'>
            <FormControl className="radio-buttons">
                <FormLabel id="demo-row-radio-buttons-group-label">Select A Category</FormLabel>
                <RadioGroup 
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    size="small"
                    className='radio-group'
                    onChange={handleChange}
                    state={selection}
                    >
                        <FormControlLabel value="aquarium" control={<Radio />} label="Aquarium" />
                        <FormControlLabel value="amusement_park" control={<Radio />} label="Amusement Park" />
                        <FormControlLabel value="library" control={<Radio />} label="Library" />
                        <FormControlLabel value="movie_theater" control={<Radio />} label="Theater" /> <br></br>
                        <FormControlLabel value="museum" control={<Radio />} label="Museum" />
                        <FormControlLabel value="park" control={<Radio />} label="Park" />
                        <FormControlLabel value="restaurant" control={<Radio />} label="Restaurant" />
                        <FormControlLabel value="shopping_mall" control={<Radio />} label="Mall" />
                        <FormControlLabel value="zoo" control={<Radio />} label="Zoo" />
                    </RadioGroup>
            </FormControl>
            

        </div>
    )
}

export default EventPageDropdown;