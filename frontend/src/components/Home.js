import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import coding from './coding.gif'

export default function Home() {
  const [username, setUser] = useState('');
  const [roomId, setRoomId] = useState('');
  return (
    <div className='row mx-5 my-5'>
      <div className="col-md-6">
        <div className='container my-5'>
          <h1>LiveShiksha</h1>    
        </div>
        <div className='container my-3'>
            <h3>Join Room</h3>
            <br/>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Your name</label>
              <input type="email" className="form-control" value={username} onChange={(e)=>{
                setUser(e.target.value)
              }} id="username" name="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="roomId" className="form-label">Room ID</label>
              <input className="form-control" value={roomId} onChange={(e)=>{
                  setRoomId(e.target.value)
              }} name="roomId" id="roomId" />
            </div>
            <Link className="btn btn-lg btn-primary" to={"/"+username+"/"+roomId}>Join Room</Link>
            <button className="btn btn-lg btn-success my-3 mx-3" onClick={()=>{setRoomId(uuidv4())}}>Dont have a room id?</button>
        </div>
      </div>
      <div className='col-md-4 my-5 mx-5'>
        <img src={coding} alt="coding" style={{width: "120%"}}/>
      </div>
    </div>
  );
}

