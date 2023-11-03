import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

interface FilteringProps {
  filteringOption: string;
  onFilterChange: (value: string) => void;
}

export default function Filtering(props: FilteringProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    props.onFilterChange(event.target.value);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('filter', event.target.value);
    window.history.pushState({}, '', newUrl.toString());
    window.location.reload();
  };

  return (
    <FormControl>
      <InputLabel>Filter</InputLabel>
      <Select
        labelId="demo-multi-select-label"
        id="demo-multi-select"
        multiple
        value={props.filteringOption}
        onChange={handleChange}
      >
        <MenuItem key={'name'} value={'name'}>
          Lunch
        </MenuItem>
        <MenuItem key={'prep_time'} value={'prep_time'}>
          Dinner
        </MenuItem>
        <MenuItem key={'default'} value={'default'}>
          Breakfast
        </MenuItem>
      </Select>
    </FormControl>
  );
}
