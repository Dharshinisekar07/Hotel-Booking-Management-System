
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";


const AppContext = createContext();

export const AppProvider = ({ children })=>{

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const {user} =useUser();
    const { getToken } = useAuth()
    
    const [isOwner, setIsOwner] = useState(false)
    const [showHotelReg, setShowHotelReg] = useState(false)
    const [searchedCities, setSearchedCities] = useState([])

    
    
    const value ={
        currency, navigate, user, getToken, isOwner, setIsOwner,
        showHotelReg,setShowHotelReg,searchedCities,
        setSearchedCities
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext);