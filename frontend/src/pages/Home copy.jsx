import React, { useEffect, useState } from 'react'
import { handleSuccess,handleError } from '../util';
import { Link ,useNavigate} from 'react-router-dom';
function Home() {
    const navigate = useNavigate()
    const [loggedInUser, setLoggedInUser] = useState('');
     const [products, setProducts] = useState('');

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

const handleLogout = (e) => {
    // 1. Remove the user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    // 2. Show a success notification
    handleSuccess('User Logged out');

    // 3. Redirect to the login page
    setTimeout(() => {
        navigate('/login');
    }, 1000);
};


const fetchProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_BASE_URL}/products`;
        const headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }
        const response = await fetch(url, headers);
        const result = await response.json();
        console.log(result);
        setProducts(result)
    } catch (err) {
        handleError(err);
    }
}

useEffect(() => {
    fetchProducts()
}, [])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

  {/* Card */}
  <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">

    {/* Left Section */}
    <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">
        Welcome Back <span className='text-white'> {loggedInUser.toUpperCase()}</span> 👋
      </h1>
      <p className="text-lg opacity-90">
        You are successfully logged in. Explore your dashboard and manage everything in one place.
      </p>
    </div>

    {/* Right Section */}
    <div className="flex flex-col justify-center items-center p-10">

      {/* Image */}
      <img
        src="/Home.jpg"
        alt="Home Illustration"
        className="w-64 mb-6 "
     
      />

      <h2 className="text-3xl font-bold text-gray-800 mb-3">
        Home Page
      </h2>

      <p className="text-gray-500 mb-8 text-center max-w-sm">
        This is your personalized home page. Everything you need is just one click away.
      </p>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full max-w-sm py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        Logout
      </button>

      {/* Content Placeholder */}
      <div className="mt-10 w-full">
        <div className="h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center  flex-col justify-center text-gray-400">
             <h1>Product Details</h1>
              {
        products && products?.map((item, index) => (
            <ul key={index}>
                <p>{item.name} : {item.price} </p><br />
            </ul>
        ))
    }
        </div>
      </div>

    </div>

  </div>
</div>
    )
}

export default Home