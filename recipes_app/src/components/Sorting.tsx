import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import '../styling/Sorting.css';

function Sorting() {
  return (
    <FormControl className="sort_select">
      <InputLabel>Sort</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
        <MenuItem>Name</MenuItem>
        <MenuItem>Prep Time</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Sorting;
