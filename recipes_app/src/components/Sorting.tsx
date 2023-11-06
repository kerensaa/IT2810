import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import '../styling/Sorting.css';

interface SortingProps {
  sortingOption: string;
  onSortChange: (value: string) => void;
}

function Sorting(props: SortingProps) {
  const handleSort = (event: SelectChangeEvent) => {
    props.onSortChange(event.target.value);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('sort', event.target.value);
    window.history.pushState({}, '', newUrl.toString());
    window.location.reload();
  };

  return (
    <div className="sort_select">
      <FormControl>
        <InputLabel>Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          value={props.sortingOption}
          onChange={handleSort}
        >
          <MenuItem key={'name'} value={'name'}>
            Name
          </MenuItem>
          <MenuItem key={'prep_time'} value={'prep_time'}>
            Prep Time
          </MenuItem>
          <MenuItem key={'default'} value={'default'}>
            No Sorting
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Sorting;
