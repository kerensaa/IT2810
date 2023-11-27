import { Rating } from '@mui/material';
import useIndexedDBRatings from './RatingsDB';

interface Ratings {
  [title: string]: number;
}

function Ratings({ title }: { title: string }) {
  const { ratings, toggleRatings } = useIndexedDBRatings();

  const startValue = (ratings as Ratings)[title] ? (ratings as Ratings)[title] : 0;

  return (
    <>
      <Rating
        name="simple-controlled"
        value={startValue}
        onChange={(event, newValue) => toggleRatings(title, newValue)}
      />
    </>
  );
}

export default Ratings;
