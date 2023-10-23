// export type Recipe = {

//   id: number;
//   title: string;
//   ingredients: string;
//   description: string;
//   icon_path: string;
//   rating: string;
//   reviewCount: string;
//   instructions: string;
//   time: string;
// };


export const fetchAllRecipes = async (): Promise<any> => {
    const response = await fetch('/recipe');
    const data = await response.json();
    return data;
  };
  
export const fetchTest = async (): Promise<any> => {
    const response = await fetch('/test');
    const data = await response.json();
    return data;
};