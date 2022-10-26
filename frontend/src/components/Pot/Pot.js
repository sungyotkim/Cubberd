import { useContext } from "react";
import { PotContext } from "../../context/PotContext";
import CookingPot from "./CookingPot/CookingPot";
import "./Pot.css";

const Pot = () => {
  const { potContents } = useContext(PotContext);

  return (
    <>
      <div className="pot-component-wrapper">
        <div className="pot-container">
          <CookingPot />
        </div>
      </div>
    </>
  );
};

export default Pot;
