"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '../actions/userAction'


const dashboard = () => {
  const { data: session, status } = useSession();
  const [form, setform] = useState({});

  useEffect(() => {
      if (status === "authenticated") {
          getData();
      }
  }, [status]);

  const getData = async () => {
      if (session && session.user) {
        
          // Assuming 'username' is a property on session.user
          let u = await fetchuser(session.user.username); // Adjust as needed
          setform(u);
          console.log(u)
      } else {
          console.log("Session is not available");
      }
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    let a = await updateProfile(e, session.user.username)
    alert("Profile has been updated")
  }

  return (
    <div className='w-1/2 mx-auto'>
      <h1 className='text-center my-5 font-bold text-2xl'>Welcome To Your Dashboard</h1>

      <form action={handlesubmit}>
        <div className="form space-y-2">
          <div>Name</div>
          <input type="text" value={form.name ? form.name : ""} name='name' onChange={handlechange} className='w-full rounded-md bg-slate-800 p-1 ' />
          <div>Email</div>
          <input type="text" value={form.email ? form.email : ""} name='email' onChange={handlechange} className='w-full rounded-md bg-slate-800 p-1 ' />
          <div>Username</div>
          <input type="text" value={form.username ? form.username : ""} name='username' onChange={handlechange} className='w-full rounded-md bg-slate-800 p-1 ' />
          <div>Profile Picture</div>
          <input type="text" value={form.profilepic ? form.profilepic : ""} name='profilepic' onChange={handlechange} className='w-full rounded-md bg-slate-800 p-1 ' />
          <div>Cover Picture</div>
          <input type="text" value={form.coverpic ? form.coverpic : ""} name='coverpic' onChange={handlechange} className='w-full rounded-md bg-slate-800 p-1 ' />
          <div>Razorpay Id</div>
          <input type="text" value={form.razorpayid ? form.razorpayid : ""} name='razorpayid' onChange={handlechange} className='w-full rounded-md bg-slate-800 p-1 ' />
          <div>Razorpay Secret</div>
          <input type="text" value={form.razorpaysecret ? form.razorpaysecret : ""} name='razorpaysecret' onChange={handlechange} className='w-full rounded-md bg-slate-800 p-1 ' />
        </div>
        <button className='bg-blue-700 hover:bg-blue-800 w-full rounded-md p-1 my-5  dark:bg-blue-600 dark:hover:bg-blue-700'>Save</button>
      </form>
    </div>
  )
}

export default dashboard
