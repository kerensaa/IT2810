interface Review {
    name: string;
    details: {
        reviewText: string; 
        rating: number;
    };
  }

export type RecipeType = {
    id: number;
    name: string;
    ingredients: string[];
    description: string;
    image_url: string;
    rating: number[];
    instructions: string;
    cuisine: string;
    course: string;
    diet: string;
    prep_time: string;
    reviews?: Review[];
  };
  