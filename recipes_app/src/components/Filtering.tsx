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
    <FormControl>
      <InputLabel>Course</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Course"
        value={props.courseOption ?? 'default'}
        onChange={handleFilter}
      >
        <MenuItem value={'default'}>No filter</MenuItem>
        <MenuItem value={'Lunch'}>Lunch</MenuItem>
        <MenuItem value={'Dinner'}>Dinner</MenuItem>
        <MenuItem value={'Side Dish'}>Side Dish</MenuItem>
        <MenuItem value={'Dessert'}>Dessert</MenuItem>
        <MenuItem value={'South Indian Breakfast'}>South Indian Breakfast</MenuItem>
        <MenuItem value={'Snack'}>Snack</MenuItem>
        <MenuItem value={'Main Course'}>Main Course</MenuItem>
        <MenuItem value={'North Indian Breakfast'}>North Indian Breakfast</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Filter;
