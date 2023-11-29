

import React, { useEffect,useRef, useState,useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext';
function ProfileUpdateModel() {
  const navigate = useNavigate();
  // const [itsuser,setUser]=useState("True")
  const [formname, setFormname] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [formphno, setFormphno] = useState('');
  const [formprofile_photo,Setformprofile_photo]=useState('null')
  
  const {user}=useContext(AuthContext)

  const handleChange = async(e) => {
    const { name, value } = e.target;
    console.log("value",value)
    if (name === 'name') {
      setFormname(value);
    
    }
    
      else if (name === 'contact') {
        setFormphno(value);
      }
      
     
      
    }

    // function handleChangeimage(e){
    //   console.log(e.target.files[0])
    //   Setformprofile_photo(e.target.files[0])

    
    
    
      const handleChangeimage = (e) => {
        const file = e.target.files[0];
        Setformprofile_photo(e.target.files[0])
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreview(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      };
    // const file = inputFileRef.current.files[0];
      const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("ststes---------------------",formphno,formname,"jjjjjjjjjjjjjjj",formprofile_photo)
            console.log("itssubmit")
            if (formname.trim() === '') {
              return Swal.fire({
                title: 'Error',
                text: 'Enter username!',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
      
        
     
        
            if (isNaN(formphno) || formphno.toString().trim() === '') {
              return Swal.fire({
                title: 'Error',
                text: 'Enter a Mobile no!',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
            console.log("object",formname,formphno)
          
            
            const formData = new FormData();
            formData.append('username', formname);
            formData.append('phone_no', formphno);
            formData.append('profile_photo', formprofile_photo);
        console.log("formdat",formData.get('profile_photo'))
        console.log("id",user.user_id)
    
let response = await fetch(`http://127.0.0.1:8000/api/profileupdate/${user.user_id}/`, {
  method: 'POST',
  body: formData, // Use the FormData object
});
    let data = await response.json();
          console.log("hhhhhh",data)
          if (response.status === 201) {
           console.log("hhhhhh",data)
          
           Swal.fire({
            title: 'Success',
            text: 'Account created successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            
            console.log("updated user",user)
            navigate('/');
          });
        } 
        else if (data.username) {
          Swal.fire({
            title: 'Error',
            text: data.username,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          alert('Something went wrong');
        }
       
            
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-3/4">
        <form className="bg-white p-8 rounded-lg shadow-md"  onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input onChange={handleChange}
                type="text"
                name="name"
                id="username"
                autoComplete="username"
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400"
                placeholder="janesmith"
              />
            </div>

            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-900"
              >
                Contact No
              </label>
              <input onChange={handleChange}
                type="text"
                name="contact"
                id="contact"
                autoComplete="contact"
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-900"
              >
                 Photo
              </label>
              <div className="flex items-center mt-2">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 px-4 py-2 border border-gray-300 hover:text-indigo-500 focus:ring focus:ring-indigo-600 focus:ring-offset-2"
                >
                  Upload a file
                  <input  onChange={handleChangeimage}
                    id="file-upload"
                   
                    name="file"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-2 text-gray-600 text-xs">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              {imagePreview && (
        <div className="mt-2">
          <img src={imagePreview} alt="Preview" className="max-w-full max-h-52" />
        </div>
      )}
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-opacity-50"
            >
              Save
            </button>
            {/* <button
              type="button"
              className="rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-offset-2 focus:ring-opacity-50"
            >
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdateModel;
