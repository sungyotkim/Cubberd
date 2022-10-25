import { useState } from "react"
import cookingPot from "../../../assets/cooking-pot.png";
import cookingPotLid from "../../../assets/cooking-pot-lid.png";
import "./CookingPot.css";

export default function CookingPot() {
  const [lidUp, setLidUp] = useState(false);


  const hoverLid = () => {
    setLidUp(true);
    console.log('hi')
  }

  const unhoverLid = () => {
    setLidUp(false);
    console.log('ho')
  }

return (
    <>
      <img
        src={cookingPot}
        alt="black ceramic bowl with lid by Alfonso Escu"
        className="cooking-pot-img"
        onMouseEnter={hoverLid}
        onMouseLeave={unhoverLid}
      />
      <img
        src={cookingPotLid}
        alt="black ceramic bowl with lid by Alfonso Escu"
        className={lidUp ? "cooking-pot-img hover-lid" : "cooking-pot-img"}
        id="cooking-pot-lid"
      />
    </>
  )
}