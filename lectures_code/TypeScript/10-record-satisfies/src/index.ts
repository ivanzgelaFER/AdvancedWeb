import loadrecipes from "./loadrecipes"

type Recipe = typeof recipes[0];
type RecipeInfo = Pick<Recipe, "name" | "description">

const recipes = loadrecipes();
const brief = recipes.map(r => createInfo(r));
function createInfo(recipe : Recipe) : RecipeInfo {   
  return {name : recipe.name, description : recipe.description};
}
         
type Towns = "Zagreb" | "Florence" | "Berlin"


type CityMeals = Partial<Record<Towns, RecipeInfo | RecipeInfo[]>>
const citiesAndMeals1 : CityMeals  = {
  Zagreb : brief[0],
  Florence : brief[1],
  Berlin : brief.slice(2, 5)
};

const citiesAndMeals2 = {
  Zagreb : brief[0],
  Florence : brief[2],
  Berlin : brief.slice(2, 5) 
} satisfies CityMeals

const r1 = citiesAndMeals1.Berlin; //r1 is RecipeInfo | RecipeInfo[]
const r2 = citiesAndMeals2.Berlin; //r2 is RecipeInfo[]

          