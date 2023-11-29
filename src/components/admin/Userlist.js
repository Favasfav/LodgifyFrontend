import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [block,setBlock]=useState(true)
  const navigate=useNavigate()
  const blockfunction=async(user)=>{
    const newStatus = !user.user.is_blocked;
    // console.log("newStatus,user.user.username",user.user.username,newStatus)

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/userblock/${user.user.id}`)

       .then((response)=>{

        const updateduser = userList.map((customer)=>{
          if(customer.user.id === user.user.id){
            return{
              ...customer,
              user:{
                ...customer.user,
                is_blocked: newStatus,
              }
            }
          }
          return customer;
        });
        setUserList(updateduser);
        // Swal.fire({
        
        //         title: 'Success',
        //         text: 'Account Modified!',
        //         icon: 'success',
        //         confirmButtonText: 'OK',
        //       }).then(() => {
        //         console.log("Block",block)
        //          navigate('/userlist');
        //       });
      })
    
    }catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }}
  
  
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/userlist/');
        console.log("response.data",response.data)
        setUserList(response.data);
        setLoading(false);
        

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        
      }
    };
    console.log("userlist",userList)
    fetchUserList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-4">User List</h2>
      <ul role="list" className="divide-y divide-gray-100">
        {userList.map((user, index) => (
          <li className="flex justify-between gap-x-4 py-3" key={index}>
            <div className="flex min-w-0 gap-x-2">
              <img
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                src={user.user.profile_photo}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-5 text-gray-900">{user.user.username}</p>
                <p className="mt-1 truncate text-xs leading-4 text-gray-500">
                  {user.user.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              
              <p className="mt-1 text-xxs leading-4 text-gray-500">
              Contact no <time dateTime="2023-01-23T13:23Z">{user.user.phone_no}</time>
              </p>
            </div>
            <div className="flex shrink-0 gap-x-2">
            {user.user.is_blocked?<button onClick={()=>{blockfunction(user)}}
                className="px-2 py-1 text-xs font-medium leading-5 text-white bg-red-500 hover:bg-red-600"
              >
                Block
              </button>:<button  onClick={()=>{blockfunction(user)}}
                className="px-2 py-1 text-xs font-medium leading-5 text-white bg-green-500 hover.bg-green-600"
              >
                Unblock
              </button>}  
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
