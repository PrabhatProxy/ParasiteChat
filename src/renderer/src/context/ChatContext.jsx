import { onAuthStateChanged } from "firebase/auth";
import { Children, createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { authContext } from "./AUthenticationContext";

export const chatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    
const {currentUser} = useContext(authContext)
    const INITIAL_STAGE = {
        chatId:"null",
        user:{}
    }

    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                console.log("current Usr",currentUser)
                console.log("payload Usr",action.payload)
             return{
                user:action.payload,
                chatId:currentUser.uid > action.payload.userInfo.uid ? currentUser.uid + action.payload.userInfo.uid : action.payload.userInfo.uid + currentUser.uid
             }  
             default:
                return state;
        }
    };

    const [state,dispatch] = useReducer(chatReducer,INITIAL_STAGE);
    
    return (
        <chatContext.Provider value={{ data:state, dispatch}}>
            {children}
        </chatContext.Provider>
    )
};