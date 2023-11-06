import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const names = ['Breakfast', 'Lunch', 'Dinner'];

export default function Filtering() {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPersonName(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel>Filter</InputLabel>
      <Select multiple value={personName} onChange={handleChange}>
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
