import { useContext, useEffect, useState } from "react"
import cookingPot from "../../../assets/cooking-pot.png";
import cookingPotLid from "../../../assets/cooking-pot-lid.png";
import "./CookingPot.css";
import { PotContext } from "../../../context/PotContext";

export default function CookingPot({ loadingResult }) {
  const [lidUp, setLidUp] = useState(false);
  const [removeLid, setRemoveLid] = useState(false);
  const [lidClassName, setLidClassName] = useState("cooking-pot-img")
  const { addingIngredient } = useContext(PotContext)

  useEffect(() => {
    if (loadingResult) {
      setRemoveLid(false)
    } else if (!loadingResult) {
      setRemoveLid(true)
    }

    return () => {
      setRemoveLid(false)
    }
  }, [loadingResult])

  useEffect(() => {
    if (addingIngredient) {
      setLidUp(true)
    } else {
      setLidUp(false)
    }

    return () => {
      setLidUp(false)
    }
  }, [addingIngredient])
  

  useEffect(() => {
    if (lidUp) {
      setLidClassName("cooking-pot-img hover-lid")
    } else if (removeLid) {
      setLidClassName("cooking-pot-img remove-lid")
    } else {
      setLidClassName("cooking-pot-img")
    }
  
    return () => {
      setLidClassName("cooking-pot-img")
    }
  }, [lidUp, removeLid])
  

return (
    <>
    <div>

      <img
        src={cookingPot}
        alt="black ceramic bowl with lid by Alfonso Escu"
        className="cooking-pot-img"
      />
      <img
        src={cookingPotLid}
        alt="black ceramic bowl with lid by Alfonso Escu"
        className={lidClassName}
        id="cooking-pot-lid"
      />
    </div>
    </>
  )
}