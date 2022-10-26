import { useContext } from "react";
import { PotContext } from "../../../context/PotContext";
import "./PotContents.css";
import { GiKnifeFork } from "react-icons/gi";

const PotContents = () => {
  const { potContents, setPotContents } = useContext(PotContext);

  const handleRemoveFromPot = (e, ingredient) => {
    e.preventDefault();

    let itemIndex;

    potContents.forEach((ele, i) => {
      if (ele._id === ingredient._id) {
        itemIndex = i;
      }
    });
    let newPot = potContents
      .slice(0, itemIndex)
      .concat(potContents.slice(itemIndex + 1));
    setPotContents([...newPot]);
  };

  return (
    <>
      <div className="pot-component-wrapper">
        <div className="pot-component-header">
          <div>INGREDIENTS</div>
        </div>
        <div className="pot-ingredient-container">
          {potContents &&
            potContents.map((ingredient, i) => {
              return (
                <div className="pot-ingredient" key={`pot ${ingredient} ${i}`}>
                  {ingredient.food}
                  <span onClick={(e) => handleRemoveFromPot(e, ingredient)}>
                    X
                  </span>
                </div>
              );
            })}
        </div>
        <div className="pot-component-footer">
          <div>
            <GiKnifeFork />
          </div>
        </div>
      </div>
    </>
  );
};

export default PotContents;
