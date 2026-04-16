import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm(){
  
    const navigate = useNavigate();
    const [inputType,setInputType]=useState("text");
const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const query = new URLSearchParams({
      place: data.place,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guest,
    }).toString();

    navigate(`/search?${query}`);
  };
    return (
        <div className="mt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-3 shadow-xl grid grid-cols-4 gap-1 items-center w-full   ">
                    <input id="place" type="text" placeholder="Where?" {...register("place", {required:true})} className="col-span-1 px-3  py-2 rounded-2xl border outline-none"/>
                    <input id="checkIn" type={inputType} placeholder="CheckIn" {...register("checkIn", {required:true})} onFocus={() => setInputType('date')} onBlur={() => setInputType('text')} className="col-span-1 px-3 py-2 rounded-2xl border"/>
                    <input id="checkOut" type={inputType} placeholder="CheckOut" {...register("checkOut", {required:true})} onFocus={() => setInputType('date')} onBlur={() => setInputType('text')} className="col-span-1 px-3 py-2 rounded-2xl border"/>
                    <div className="flex items-center gap-2 col-span-1">
                    <input id="number" type="number" placeholder="Guest?" {...register("guest", {required:true})} className="w-20 px-3 py-2 rounded-2xl border"/>
                     {/* Inline SVG search icon (reliable) */}
                    <button type="submit" className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-2xl shadow hover:scale-105 transition" aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
                    </button></div>
                    </form>
                    
                </div>
    );
}