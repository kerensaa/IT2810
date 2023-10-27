import { Rating } from "@mui/material";
import useIndexedDBRatings from "./RatingsDB";

interface RatingsProps {
  title: string;
  value?: number;
  onChange?: (value: number) => void;
}

function Ratings({ title, value, onChange }: RatingsProps) {
  const { ratings, toggleRatings } = useIndexedDBRatings();

  const startValue = (ratings as { [key: string]: number })[title] || 0;
  const currentValue = value !== undefined ? value : startValue;


  return (
    <>
     <Rating
        name="simple-controlled"
        value={currentValue}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            if (onChange) {
              onChange(newValue);
            } else {
              toggleRatings(title, newValue);
            }
          }
        }}
      />
    </>
  );
}

export default Ratings;
