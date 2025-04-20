import { createContext, useContext, useState } from "react";


const CountContext = createContext()

export const CountProvider = ({ children}) => {
    const [count,setCount] = useState(0)
    return(
        <CountContext.Provider value={{count,setCount}}>
            {children}
        </CountContext.Provider>
    )
}

export const useCountContect = () => useContext(CountContext)