import { Rating } from "@mui/material";
import useIndexedDBRatings from "./RatingsDB";

interface Ratings {
  [title: string]: number;
}

function Ratings({ title }: { title: string }) {
  const { ratings, toggleRatings } = useIndexedDBRatings();

  const startValue = (ratings as Ratings)[title]
    ? (ratings as Ratings)[title]
    : 2;

  return (
    <>
      <Rating
        name="simple-controlled"
        value={startValue}
        onChange={(_, newValue) => toggleRatings(title, newValue === null ? 0 : newValue)}
        />
    </>
  );
}

export default Ratings;
