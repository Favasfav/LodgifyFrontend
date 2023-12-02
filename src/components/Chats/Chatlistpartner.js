import React, { useContext,useState, useEffect } from 'react'
import Axiosinstance from '../../services/Axios'
import AuthContext from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


function Chatlistpartner() {
const navigate=useNavigate()
const {user}=useContext(AuthContext)
console.log(user)
const [chats,setchats]=useState([])
useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
        try {
            const response = await Axiosinstance.get(`chats/getchatlistpartner/${user.user_id}`);
            console.log(response.data);
            if (response.status === 200) {
                console.log("hhhhhh",response.data)
                setchats(response.data)

               }
            if (response.status===400){
                Swal.fire({
                    title: 'Problem to get message!',
                    text: 'I will close in 2 seconds.',
                    timer: 2000 
                })
            }


                 
        } catch (error) {
            console.error('Error fetching chat list:', error);
        }
    };

    fetchData();
}, [user.user_id]); 


  return (
    
    <div className='p-10'>
    <div className='p-7'> Chat List </div>
    <ul role="list" className="divide-y divide-gray-100">
        {chats.map((chat) => (
            <li key={chat.sender.email} className="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={chat.sender.profile_photo} alt="" />
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{chat.username}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{chat.sender.email}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500"> Last chat on {chat.timestamp}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row sm:items-end">
                    <button onClick={() => {
                      navigate("/getchatpartner",{state
                        :{sender:chat.sender.id}});
                    }} className="mt-1 truncate text-xs leading-5 text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-green active:bg-green-800">
                        Chat
                    </button>
                </div>
            </li>
        ))}
    </ul>
</div>

  )
}

export default Chatlistpartner

