import React, { useEffect, useState } from "react";
import { handleSuccess, handleError } from "../util";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    // 1. Remove the user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    // 2. Show a success notification
    handleSuccess("User Logged out");

    // 3. Redirect to the login page
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/products`;
      const token = localStorage.getItem("token")
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, headers);
      console.log("response status", response.status);
      const result = await response.json();
      if (!response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
        handleError(result.message || "Something went wrong");
        return
      }
      setProducts(result);
   
  };

  useEffect(() => {
    fetchProducts();
    
  }, []);
  return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center"> {/* Main Card */} <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl"> <div className="grid grid-cols-1 lg:grid-cols-2"> {/* ================= LEFT / WELCOME SECTION ================= */} <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-7 sm:p-10 lg:p-12 text-white"> {/* Decorative circles */} <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl"></div> <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl"></div> <div className="relative z-10 flex min-h-[300px] flex-col justify-center lg:min-h-[600px]"> {/* Small Badge */} <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md"> <span className="h-2 w-2 rounded-full bg-green-400"></span> Account Active </div> {/* Welcome Heading */} <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"> Welcome Back, <span className="mt-2 block break-words text-indigo-100"> {loggedInUser?.toUpperCase()} 👋 </span> </h1> <p className="mt-6 max-w-lg text-base leading-7 text-indigo-100 sm:text-lg"> You are successfully logged in. Explore your dashboard, manage your products and keep everything organized in one place. </p> {/* Stats / Features */} <div className="mt-8 grid max-w-md grid-cols-2 gap-3 sm:gap-4"> <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"> <p className="text-2xl font-bold"> {products?.length || 0} </p> <p className="mt-1 text-sm text-indigo-100"> Products </p> </div> <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"> <p className="text-2xl font-bold"> ✓ </p> <p className="mt-1 text-sm text-indigo-100"> Verified Account </p> </div> </div> </div> </div> {/* ================= RIGHT / HOME SECTION ================= */} <div className="flex flex-col justify-center bg-white p-6 sm:p-10 lg:p-12"> {/* Image */} <div className="mb-6 flex justify-center"> <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-5 shadow-inner"> <img src="/Home.jpg" alt="Home Illustration" className="h-40 w-40 object-contain sm:h-48 sm:w-48" /> </div> </div> {/* Heading */} <div className="text-center"> <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600"> Dashboard </p> <h2 className="text-3xl font-extrabold text-slate-800 sm:text-4xl"> Home Page </h2> <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base"> Welcome to your personalized dashboard. Manage your account and explore everything available to you. </p> </div> {/* Logout Button */} <button onClick={handleLogout} className="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl active:translate-y-0" > Logout </button> {/* Products */} <div className="mt-8"> <div className="mb-4 flex items-center justify-between"> <h3 className="text-lg font-bold text-slate-800"> Product Details </h3> <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600"> {products?.length || 0} Items </span> </div> {/* Product List */} <div className="max-h-64 space-y-3 overflow-y-auto pr-1"> {products?.length > 0 ? ( products.map((item, index) => ( <div key={item._id || index} className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50 hover:shadow-md" > <div className="min-w-0"> <p className="truncate font-semibold text-slate-800"> {item.name} </p> <p className="mt-1 text-xs text-slate-400"> Product #{index + 1} </p> </div> <div className="ml-4 shrink-0 rounded-xl bg-white px-3 py-2 font-bold text-indigo-600 shadow-sm"> ₹{item.price} </div> </div> )) ) : ( <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center"> <p className="text-sm font-medium text-slate-400"> No products available </p> </div> )} </div> </div> </div> </div> </div> </div>
  );
}

export default Home;
