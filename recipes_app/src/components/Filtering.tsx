import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterProps {
  courseOption: string;
  onCourseChange: (value: string) => void;
}

function Filter(props: FilterProps) {
  const handleFilter = (event: SelectChangeEvent) => {
    props.onCourseChange(event.target.value);
    
    // Update URL with new course filter
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('course', event.target.value);
    
    // Maintain sorting if present
    if (newUrl.searchParams.get('sort')) {
      newUrl.searchParams.set('sort', newUrl.searchParams.get('sort')!);
    }

    // Update the URL and reload
    window.history.pushState({}, '', newUrl.toString());
    window.location.reload();
  };

  return (
    <FormControl className="filter_select">
      <InputLabel>Course</InputLabel>
      <Select
        value={props.courseOption}
        onChange={handleFilter}
      >
        <MenuItem value={'Lunch'}>Lunch</MenuItem>
        <MenuItem value={'Dinner'}>Dinner</MenuItem>
        <MenuItem value={'Side Dish'}>Side Dish</MenuItem>
        <MenuItem value={'Dessert'}>Dessert</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Filter;

