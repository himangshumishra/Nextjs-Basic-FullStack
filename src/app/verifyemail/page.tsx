'use client'
import React, { useEffect, useState } from 'react'
 import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'


export default function VerifyEmailPage() {


    const [token, setToken] = useState('')
    const [verified,setVerified]=useState(false)
    const [error,setError]=useState(false)

    const verifyUserEmail=async()=>{
       try {
         await axios.post('/api/users/verifyemail',{token});
         setVerified(true)
         setError(false)
       } catch (error:any) {
        setError(true)
        toast.error(error.response.data.message??"Error")
       }
    }
    useEffect(()=>{
        setError(false)
       const urlToken= window.location.search.split('=')[1]
       setToken(urlToken ||"")
    // const urlToken=router.query
    console.log(urlToken);
    
    // setToken(urlToken as string || "")

    }, [])

    useEffect(()=>{
        setError(false)
        if(token.length>0){
            verifyUserEmail()
        }
    },[token])

    return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className=' text-4xl'>Verify Email</h1>
        <h2 className=' p-2 bg'>{token}</h2>
        {verified && (<div><h2 className=' text-2xl text-green-500'>Verified</h2>
        <Link href="/login">Login</Link>
        </div>
        )}
        {error && (<div><h2 className=' text-2xl text-green-500'> Not Verified</h2>
        </div>
        )}
    </div>
  )
}
