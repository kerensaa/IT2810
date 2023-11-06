import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const meals = ['Breakfast', 'Lunch', 'Dinner'];
interface FilteringProps {
  onFilterChange: (value: string) => void;
}

export default function Filtering(props: FilteringProps) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    props.onFilterChange(event.target.value);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('filter', event.target.value);
    window.history.pushState({}, '', newUrl.toString());
    window.location.reload();
    setPersonName(event.target.value);
  };

  return (
    <FormControl className="filter_select">
      <InputLabel>Filter</InputLabel>
      <Select multiple value={personName} onChange={handleChange}>
        {meals.map((meal) => (
          <MenuItem key={meal} value={meal}>
            {meal}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
