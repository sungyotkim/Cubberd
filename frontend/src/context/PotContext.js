import { createContext, useState } from "react"

export const PotContext = createContext({})

export const PotProvider = ({children}) => {
  const [potContents, setPotContents] = useState([]);
  const [potResults, setPotResults] = useState([]);

  return (
    <>
      <PotContext.Provider value={{
        potContents, 
        setPotContents, 
        potResults, 
        setPotResults
      }}>{children}</PotContext.Provider>
    </>
  )
}