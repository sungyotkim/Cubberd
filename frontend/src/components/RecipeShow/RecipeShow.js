// import { fetchRecipes } from "../../store/recipes";
// import { useSelector } from "react-redux";
import './RecipeShow.css';
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

function RecipeShow({recipe}) {
    // const dispatch = useDispatch();
    // const recipes = useSelector(state => state.recipes)
    // debugger

    // useEffect(() => {
    //     dispatch(fetchRecipes())
    // }, [])



    return (
        <div id="recipe">
            <h3><a href={recipe.url}>{recipe.label}</a></h3>
            <div id="recipe-bottom-half">
                <div id="recipe-ingredients-list">
                    

                </div>



            </div>

        </div>
    )

}

export default RecipeShow;