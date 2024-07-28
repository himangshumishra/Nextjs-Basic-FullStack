"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [button, setButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success", response.data);
      toast.success(response.data.message);
      router.push('/login');
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-3'>{loading ? "Processing" : "Signup"}</h1>
      <label htmlFor="username">Username</label>
      <input
        className='text-black p-1 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600'
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
        type="text"
      />

      <label htmlFor="email">Email</label>
      <input
        className='text-black p-1 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
        type="email"
      />

      <label htmlFor="password">Password</label>
      <input
        className='text-black p-1 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
        type="text"
      />

      <button
        onClick={onSignup}
        className='border border-blue-400 rounded-lg p-2 hover:'
        disabled={loading}
      >
        {button ? "Signup" : "Fill the inputs first"}
      </button>
      <Link href={'/login'}>Visit Login</Link>
    </div>
  );
}