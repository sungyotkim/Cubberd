import { createContext, useState } from "react"

export const PotContext = createContext({})

export const PotProvider = ({children}) => {
  const [potContents, setPotContents] = useState([]);
  const [potResults, setPotResults] = useState([]);
  const [addingIngredient, setAddingIngredient] = useState(false);
  const [openDoor, setOpenDoor] = useState(false);
  const [animateRack, setAnimateRack] = useState(false)

  return (
    <>
      <PotContext.Provider value={{
        potContents, 
        setPotContents, 
        potResults, 
        setPotResults,
        addingIngredient,
        setAddingIngredient,
        openDoor,
        setOpenDoor,
        animateRack,
        setAnimateRack
      }}>{children}</PotContext.Provider>
    </>
  )
}