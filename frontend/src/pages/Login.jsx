import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { handleSuccess,handleError } from '../util';
import { Link ,useNavigate} from 'react-router-dom';
console.log(import.meta.env.VITE_BASE_URL)
const login = () => {
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo]=useState({
    email:"",
    password:""
  })
  const handleChange =(e)=>{
    const {name,value}=e.target; 
    const copyloginInfo={...loginInfo}
    copyloginInfo[name]=value
    setLoginInfo(copyloginInfo)
  }

  //handle login code
  const handlelogin=async (e)=>{
  e.preventDefault(); // stop page reload

  const { email, password } = loginInfo;

  // Basic validation
  if ( !email || !password) {
     handleError("All fields are required");
    return;
  }

  // You can replace this with API call
  try{
const url = `${import.meta.env.VITE_BASE_URL}/auth/login`
const response = await fetch(url,
  {
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(loginInfo)
  })
  const result = await response.json()
const {message,success,jwtToken,name,email,error} = result

if(success) 
 {
   handleSuccess(message)
   localStorage.setItem('token',jwtToken)
   localStorage.setItem('loggedInUser',name)
   setTimeout(()=>{
    navigate('/home')
   },100)
 }
 else if(error){
  const detail = error?.details[0].message
  handleError(detail)
 }
 else{
  handleError(message)
 }
  
  }
  catch(err){
    console.log(err)

  }

  console.log("login Data:", loginInfo);

   e.target.reset()
  }
  return (
 <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
  <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Login
    </h1>

    <form onSubmit={handlelogin} className="space-y-5">

      {/* Email Field */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email..."
          className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Password Field */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">
          Password
        </label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password..."
          className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
      >
        Login
      </button>

      <span className="block text-center text-sm text-gray-600">
        don't have account please{" "}
        <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
          signup
        </Link>
      </span>

    </form>
  </div>
</div>

  )
}

export default login