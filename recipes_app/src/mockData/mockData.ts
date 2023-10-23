type Recipe = {

  id: number;
  title: string;
  ingredients: string;
  description: string;
  icon_path: string;
  rating: string;
  reviewCount: string;
  instructions: string;
  time: string;
};

export const mockUsers: Recipe[] = [
  {
    id: 1,
    title: 'Low-Fat Berry Blue Frozen Dessert',
    ingredients: 'blueberries, granulated sugar, vanilla yogurt, lemon juice',
    description: 'Make and share this Low-Fat Berry Blue Frozen Dessert recipe from Food.com.',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/38/YUeirxMLQaeE1h3v3qnM_229%20berry%20blue%20frzn%20dess.jpg',
    rating: '4.5',
    reviewCount: '4',
    instructions: 'Toss 2 cups berries with sugar. Let stand for 45 minutes, stirring occasionally. Transfer b...',
    time: 'PT24H45M',
  },
  {
    id: 2,
    title: 'Buttermilk Pie With Gingersnap Crumb Crust',
    ingredients: '"sugar", "margarine", "egg", "flour", "salt", "buttermilk", "graham cracker crumbs", "margarine"',
    description: 'I copied this one out of a friends book so many moons ago that I cant remember where its from, bu...',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/45/pic79tPh5.jpg',
    rating: '5',
    reviewCount: '23',
    instructions:
      '"Melt 1 1/2 ozs butter, add the flour and cook for 2 to 3 minutes, stirring.", "Gradually add milk...',
    time: 'PT1H20M',
  },
  {
    id: 3,
    title: 'Biryani',
    ingredients:
      '"saffron", "milk", "hot green chili peppers", "onions", "garlic", "clove", "peppercorns", "cardamo...',
    description: 'Make and share this Biryani recipe from Food.com.',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/39/picM9Mhnw.jpg',
    rating: '3',
    reviewCount: '1',
    instructions:
      '"Soak saffron in warm milk for 5 minutes and puree in blender.", "Add chiles, onions, ginger, garl...',
    time: 'PT4H25M',
  },
  {
    id: 4,
    title: 'Best Lemonade',
    ingredients: '"sugar", "lemons, rind of", "lemon, zest of", "fresh water", "fresh lemon juice"',
    description:
      'This is from one of my  first Good House Keeping cookbooks.  You must use a *zester* in order to avoid getting any of that bitter rind, and when you zest the lemons, zest them onto some sugar from the recipe (the sugar will catch all of the oils).  I also advise you from personal experience to use only the best skinned lemons for the best flavor.',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/40/picJ4Sz3N.jpg',
    rating: '4.5',
    reviewCount: '10',
    instructions:
      '"Into a 1 quart Jar with tight fitting lid, put sugar and lemon peel, or zest; add 1 1/2 cups ver...',
    time: 'PT35M',
  },
  {
    id: 5,
    title: 'Carinas Tofu-Vegetable Kebabs',
    ingredients:
      '"extra firm tofu", "eggplant", "zucchini", "mushrooms", "soy sauce", "low sodium soy sauce", "oliv...',
    description:
      'This dish is best prepared a day in advance to allow the ingredients to soak in the marinade overni...',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/41/picmbLig8.jpg',
    rating: '4.5',
    reviewCount: '2',
    instructions:
      '"Drain the tofu, carefully squeezing out excess water, and pat dry with paper towels.", "Cut tofu...',
    time: 'PT24H20M',
  },
  {
    id: 6,
    title: 'Cabbage Soup',
    ingredients: '"plain tomato juice", "cabbage", "onion", "carrots", "celery"',
    description: 'Make and share this Cabbage Soup recipe from Food.com.',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/42/picVEMxk8.jpg',
    rating: '4.5',
    reviewCount: '11',
    instructions:
      '"Mix everything together and bring to a boil.", "Reduce heat and simmer for 30 minutes (longer if ...',
    time: 'PT50M',
  },
  {
    id: 7,
    title: 'Chicken Breasts Lombardi',
    ingredients:
      '"graham cracker crumbs", "sugar", "butter", "sugar", "cornstarch", "salt", "milk", "vanilla extrac...',
    description: 'Make and share this Chicken Breasts Lombardi recipe from Food.com.',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/49/m1z1F8S5mAZgyImm5zYw_Lombardi%20Chicken%203.jpg',
    rating: '1',
    reviewCount: '1',
    instructions: '"Graham Cracker Crust: In small bowl, combine graham cracker crumbs, sugar and butter. Press ev...',
    time: 'PT1H15M',
  },
  {
    id: 8,
    title: 'Warm Chicken A La King',
    ingredients:
      '"chicken", "butter", "flour", "milk", "celery", "button mushrooms", "green pepper", "canned pimien...',
    description: 'I copied this one out of a friends book so many moons ago that I cant remember where its from, bu...',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/44/picsSKvFd.jpg',
    rating: '5',
    reviewCount: '23',
    instructions:
      '"Melt 1 1/2 ozs butter, add the flour and cook for 2 to 3 minutes, stirring.", "Gradually add milk...',
    time: 'PT38M',
  },
  {
    id: 9,
    title: 'Biscotti Di Prato',
    ingredients: '""flour"", ""sugar"", ""baking powder"", ""salt"", ""eggs"", ""vanilla"", ""egg"", ""water""',
    description: 'Make and share this Biscotti Di Prato recipe from Food.com.',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/50/picyuYoeC.jpg',
    rating: '5',
    reviewCount: '2',
    instructions:
      '""EGG WASH 1 Egg, large 1 tsp Water In the bowl of an electric mixer fitted with the paddle attachment blend the flour, the sugar, the baking powder, and the salt until the mixture is combined well."", ""In a small bowl, whisk together the whole eggs, the yolks, the vanilla and the almond extract, add the mixture to the flour mixture, beating until a dough is formed, and stir in the almonds."", ""Turn the dough out onto a lightly floured surface, knead it several times, and divide it into fourths.""',
    time: 'PT1H10M',
  },
  {
    id: 10,
    title: 'Butter Pecan Cookies',
    ingredients:
      '""butter"", ""brown sugar"", ""granulated sugar"", ""vanilla extract"", ""flour"", ""pecan halves"", "salt", "sugar", "vanilla", "eggs", "milk", "sugar"',
    description: 'Make and share this Butter Pecan Cookies recipe from Food.com.',
    icon_path:
      'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/47/picfnmxck.jpg',
    rating: '2',
    reviewCount: '2',
    instructions:
      '""Preheat oven to 350 degrees."", ""Cream butter in large mixing bowl."", ""Gradually add brown sugar and granulated sugar."", ""Cream well."", ""Add unbeaten egg yolk and vanilla and beat well."", ""Blend in sifted flour to form a stiff dough."", ""Shape dough into small balls."", ""Place on greased cookie sheet. Flatten cookies with bottom of glass dipped in sugar."", ""Bake at 350 degrees for 7-9 minutes, till golden brown (do not overbrown.) Cool before frosting."", ""Garnish with pecan halves.""',
    time: 'PT1H4M',
  },
];
