import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../../store/recipes";
import { useEffect } from "react";

function RecipeShowPage() {
    const { id } = useParams();
    const recipe = useSelector(state => state.recipes);

    // useEffect(() => {
    //     dispatchEvent(fetchRecipe(id));
    // }, [])

    return (
        <h1>recipe show page {id} </h1>
    )
}

export default RecipeShowPage;