import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import '../styling/Sorting.css';
import { fetchSortedbyName, fetchAllRecipes, fetchSortedbyTime } from '../api';
import { useState } from 'react';

function Sorting() {
  const [sortingOption, setSortingOption] = useState('');

  const handleSort = async (event: SelectChangeEvent) => {
    setSortingOption(event.target.value);

    if (event.target.value === 'Name') {
      const data = await fetchSortedbyName();
    } else if (event.target.value === 'Prep Time') {
      const data = await fetchSortedbyTime();
    } else {
      const data = await fetchAllRecipes();
    }
  };

  return (
    <FormControl className="sort_select">
      <InputLabel>Sort</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        value={sortingOption}
        onChange={handleSort}
      >
        <MenuItem key={'Name'} value={'Name'}>
          Name
        </MenuItem>
        <MenuItem key={'Prep Time'} value={'Prep Time'}>
          Prep Time
        </MenuItem>
        <MenuItem key={'Best Match'} value={'Best Match'}>
          No Sorting
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default Sorting;
