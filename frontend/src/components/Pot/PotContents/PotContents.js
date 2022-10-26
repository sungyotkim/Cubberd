import { useContext } from "react";
import { PotContext } from "../../../context/PotContext";
import "./PotContents.css";
import { GiKnifeFork } from "react-icons/gi";
import { CustomToolTipTop } from "../../ToolTip/ToolTip";

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

  const handleClearAllPot = (e) => {
    e.preventDefault();

    setPotContents([]);
  };

  return (
    <>
      <div className="pot-component-wrapper">
        <div className="pot-component-header">
          <div>WHAT'S IN THE POT</div>
        </div>
        <div className="pot-ingredient-container">
          {potContents &&
            potContents.map((ingredient, i) => {
              return (
                <div className="pot-ingredient" key={`pot ${ingredient} ${i}`}>
                  {ingredient.food}
                  <span onClick={(e) => handleRemoveFromPot(e, ingredient)}>
                    <GiKnifeFork />
                  </span>
                </div>
              );
            })}
        </div>
        <div className="pot-component-footer">
          <CustomToolTipTop
            title="Remove all items in pot?"
            arrow
            placement="top"
          >
            <div
              className="clear-all-pot-items-btn"
              onClick={handleClearAllPot}
            >
              <GiKnifeFork />
            </div>
          </CustomToolTipTop>
        </div>
      </div>
    </>
  );
};

export default PotContents;
