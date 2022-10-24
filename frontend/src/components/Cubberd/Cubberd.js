import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCubberdIngredients } from "../../store/ingredients";

const Cubberd = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userCubberd = useSelector(state => state.ingredients.userCubberd)

  console.log(userCubberd)

  useEffect(() => {
    dispatch(fetchUserCubberdIngredients(currentUser._id));
  }, [currentUser, dispatch]);

  return <></>;
};

export default Cubberd;
