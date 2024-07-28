"use client";
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';



export default function ProfilePage() {
    const router=useRouter()
    const [data,setData]=useState("")

    const getUserDetails=async()=>{
        try{
            const response=await axios.post('/api/users/me').then((response)=>{
            console.log(response.data.data._id);
            setData(response.data.data._id)
         } );
        }catch(error:any){
            console.log(error.response.data.message??"error");
            toast.error(error.response.data.message?? "No user found please login")
            router.push('/login')
        }
    }
    const logout=async()=>{
        try{
       const response=await axios.post('/api/users/logout')
        .then((response)=>{
            console.log(response.data);
            toast.success(response.data.message)
            router.push('/login')
        })
    }catch(error:any){
        toast.error(error.response.data.message)
    }
}
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile Page</h1>
        <hr />
        <button className=' bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={getUserDetails}>Get UserDetails</button>
        <h2>{data===""?"No Data":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button className=' bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>Logout</button>

    </div>
  );
}

