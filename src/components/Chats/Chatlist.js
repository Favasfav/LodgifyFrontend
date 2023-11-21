import React, { useContext,useState, useEffect } from 'react'
import Axiosinstance from '../../services/Axios'
import AuthContext from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      role: 'Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      role: 'Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      role: 'Director of Product',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
  ]

function Chatlist() {
const navigate=useNavigate()
const {user}=useContext(AuthContext)
console.log(user)
const [chats,setchats]=useState([])
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await Axiosinstance.get(`chats/getchatlist/${user.user_id}`);
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
            <li key={chat.receiver.email} className="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={chat.receiver.profile_photo} alt="" />
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{chat.username}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{chat.receiver.email}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500"> Last chat on {chat.timestamp}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row sm:items-end">
                    <button onClick={() => {
                      navigate("/chat",{state
                        :{receiver:chat.receiver.id}});
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

export default Chatlist

