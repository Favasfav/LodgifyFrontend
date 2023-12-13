import React, { useState, useEffect, useContext } from 'react';
import Axiosinstance from '../../services/Axios';
import { w3cwebsocket } from 'websocket';
import AuthContext from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { chatUrl } from '../../constants';

export default function Chat() {
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [previousmessage,setpreviousmessage]=useState([])
  // const [otherUserId,setotherUserId]=useState('')
  let receiver = '';
  let partner = '';

  if (location.state.property) {
    partner = location.state.property;
  } else {
    receiver = location.state.receiver;
  }

  console.log("stateeee",location.state);
  let otherUserId = 0;

  if (partner) {
    otherUserId = partner;
    console.log("hloo")
  } if(receiver) {
    console.log("jhhhhhhhhhhhh")
    otherUserId = receiver;
  }

  console.log("object",otherUserId)
  const currentUserId = user.user_id;
  const previousmsg=async()=>{
    
    const response=await Axiosinstance.get(`chats/previous_message/${currentUserId}/${otherUserId}`)
    if (response.status===200){
      setpreviousmessage(response.data)
      
    }
    else{
      console.log("eerror===============")
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    previousmsg()
    // fetch_userobj()
    console.log('user.id0-0-0-0');
   
   
    const socket = new w3cwebsocket(`wss://${chatUrl}/ws/chat/${otherUserId}/?${currentUserId}`);
    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((previousmessage) => [...previousmessage, message]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWebSocket(socket);

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  
  }, [messages]); // Run once when the component mounts

  const sendMessage = () => {
    let messageReceiver = partner ? otherUserId : receiver;
  
    const message = {
      sender: user.user_id,
      receiver: messageReceiver,
      message: inputMessage,
    };
  
    // Send the message to the server
    if (webSocket) {
      webSocket.send(JSON.stringify(message));
    }
  
    // Clear the input field
    setInputMessage('');
  };

  return (






<div className="bg-white rounded p-6 shadow w-auto mt-[50px]">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-lg font-semibold">Chat App</h1>
      </div>
      {/* Chat Messages */}
      <div className="p-4 overflow-y-auto" style={{ maxHeight: 300 }}>
        {previousmessage.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              message.sender.id === user.user_id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="flex-shrink-0">
              <img
                src="https://placekitten.com/32/32"
                alt="User"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <div
              className={`ml-3 ${
                message.sender.id === user.user_id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              } rounded p-2`}
            >
              <p className="text-sm">
                <strong>{message.message}</strong> 
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Message Input */}
      <div className="p-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 border rounded p-2 focus:outline-none"
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>



  )
}
