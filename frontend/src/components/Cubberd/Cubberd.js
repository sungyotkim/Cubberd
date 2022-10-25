import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCubberdIngredients } from "../../store/ingredients";
import "./Cubberd.css";
import { BiSearchAlt } from "react-icons/bi";

const Cubberd = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userCubberd = useSelector((state) => state.ingredients.userCubberd);

  console.log(userCubberd);

  useEffect(() => {
    dispatch(fetchUserCubberdIngredients(currentUser._id));
  }, [currentUser, dispatch]);

  return (
    <>
      <div className="outer-container">
        <div className="cubberd-container">
          {/* <div className="cubberd-door">
            <div className="cubberd-door-pattern">
              <div className="cubberd-inner-door-pattern"></div>
            </div>
            <div className="cubberd-door-knob"></div>
          </div> */}
          <div className="cubberd-content-container">
            <div className="cubberd-search-container">
              <div className="cubberd-search-bar-container">
                <input
                  type="text"
                  className="cubberd-search-bar"
                  placeholder="Search for ingredients..."
                />
                <div className="cubberd-search-btn">
                  <BiSearchAlt />
                </div>
              </div>
              <div className="search-results"></div>
            </div>
            <div className="cubberd-ingredients-container"></div>
            <div className="cubberd-shelving"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cubberd;
