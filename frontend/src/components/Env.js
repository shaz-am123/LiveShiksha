import React, {useEffect} from 'react'
import Editor from "@monaco-editor/react";
import { useContext } from 'react';
import appContext from '../context/appContext';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import './Env.css';
import './Chat.css';
import { Link } from 'react-router-dom';

export default function Env() {
    const context = useContext(appContext);
    const { socket, setUser, setRoomId, code, setCode,  input, setInput, output, setOutput, language, setLanguage, execute } = context;
    const {username, roomId} = useParams();
    useEffect(()=>{
        setRoomId(roomId);
        setUser(username);
        socket.emit("joinRoom", {username, roomId})
    }, [])

    useEffect(()=>{
        socket.on("userJoined", data=>{
            alert(data.username+" has joined")
        })
        socket.on("rcvInput", input =>{
            setInput(input);
        });

        socket.on("rcvOutput", output =>{
            setOutput(output);
        });

        socket.on("rcvLanguage", language =>{
            setLanguage(language);
        });

        socket.on("rcvCode", code =>{
            setCode(code);
        });

        socket.on('userLeft', data=>{
            alert(data.username+" left")
        })
        },[socket]);

  return (
    <div className="main">
        <div className="main__left">
            <div id="codeheader">
                <div id="runbtndiv">
                    <button onClick={execute} id="run-btn" className="ui primary labeled icon button"><i data-v-e5efa640=""
                            aria-hidden="true" className="fa fa-play"></i> Run</button>
                </div>

                <div className='runbtndiv my-2 mx-3'>
                    <Link to='/' className='btn btn-lg btn-danger' onClick={e=>{
                            socket.emit('disconnectUser', {roomId, username}
                    )}}>Leave Call</Link>
                </div>

                <div className="dropdown">
                    <select className="ui dropdown" onChange={(event)=>{
                            setLanguage(event.target.value)
                            socket.emit("sendLanguage", {language:event.target.value, roomId})
                        }} value={language} name="language">
                        <option value='java'>Java</option>
                        <option value='c'>C</option>
                        <option value='cpp'>C++</option>
                        <option value='py'>Python</option>
                    </select>
                </div>


                <div >
                    <p id="madelove">liveShiksha</p>
                </div>

            </div>
            <div className="main__area">
                <Editor
                    style={{width:"100%", height:"100%"}}
                    defaultLanguage={language}
                    onChange={e=>{
                        setCode(e);
                        socket.emit("sendCode", {code:e, roomId})
                    }}  
                    value={code}
                />
                
                <div id="iodiv">
                    <div id="inputdiv">
                        <h6>Input</h6>
                        <textarea onChange={(event)=>{
                            setInput(event.target.value)
                            socket.emit("sendInput", {input:event.target.value, roomId});
                        }} name="input" style={{width:"100%", height: "80%", resize: "vertical"}} value={input}
                            placeholder="Input here..."></textarea>
                    </div>
                    <div id="outputdiv">
                        <h6>Output</h6>
                        <textarea name="output" style={{width:"100%", height: "85%", resize: "vertical"}} value={output} readOnly></textarea>
                    </div>
                </div>s
            </div>
            <div className="main__controls">
                <div id="roomid" style={{marginBottom:'5px'}}>Room Id : {roomId}</div>
            </div>
        </div>
        <div className="main__right" >
            <Chat username={username} room={roomId}/>
        </div>
    </div>
  )
}
