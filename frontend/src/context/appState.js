import React from "react";
import AppContext from "./appContext";
import { useState } from "react";
import io from 'socket.io-client'

const socket = new io.connect("https://live-shiksha.herokuapp.com/");
// const socket = new io.connect("http://localhost:3001");

const AppState = (props)=>{
    const [username, setUser] = useState("");
    const [roomId, setRoomId] = useState("");
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("cpp")
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    
    const execute = async (e)=>{
        e.preventDefault();
        setOutput("Running ...")
        socket.emit("sendOutput", {output:"Running...", roomId})
        const url = `https://codex-api.herokuapp.com/`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           code, 
           language,
           input}) 
        });

        const json = await response.json();
        if(json.output)
        {
            setOutput(json.output);
            socket.emit("sendOutput", {output:json.output, roomId});
        }
        else
        {
            setOutput(json.error);
            socket.emit("sendOutput", {output:json.error,roomId})
        }  
    }

    return (
        <AppContext.Provider value={{socket, execute, code, setCode,  input, setInput, output, setOutput, language, setLanguage,
        username, setUser, roomId, setRoomId}}>
            {props.children}
        </AppContext.Provider>)
}

export default AppState;