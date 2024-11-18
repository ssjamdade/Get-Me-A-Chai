"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useState } from "react"
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [showdropdown, setShowdropdown] = useState(false)

  const { data: session } = useSession()//IT IS A HOOK

  return (


    <nav className='bg-slate-900 text-white flex justify-between items-center h-16 px-5'>
      <Link href={"/"} className='flex justify-center items-center gap-3'>
        <span>Get me a chai</span>
        <img className="bg-blue-300 rounded-lg" src="https://i.pinimg.com/originals/a3/7d/03/a37d03e9e6ad102a4f84c77413ac2673.gif" alt="" width={30} />
      </Link>
      <ul className='flex justify-center items-center gap-4'>
        {/* <li> <Link href="/home"> Home </Link> </li>
            <li> <Link href="/about"> About </Link> </li>
            <li> <Link href="/project"> Project </Link> </li>
            <li> <Link href="/signup"> Sign Up </Link> </li> */}

        {session &&
          < div className='relative'>
            <button onBlur={() => setTimeout(() => {
              setShowdropdown(false)
            }, 200)} onClick={() => setShowdropdown(!showdropdown)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> {`Welcome ${session.user.email}`} <svg className="w-2.5 h-2 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div id="dropdown" className={`z-10 top-10 right-0 absolute ${showdropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href={`/${session.user.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</a>
                </li>
                <li onClick={() => signOut({ callbackUrl: '/' })}>
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>

          </div>
        }

        {/* In Next.js, using href="/" inside <a> tags when combined with signOut() can sometimes prevent the sign-out process from completing correctly, because the browser navigates away from the page before signOut() finishes its action. */}
        
        {session ?
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Log out
          </button>
          :
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2"
            >
              Login
            </button>
          </Link>
        }
      </ul>
    </nav>
  )
}

export default Navbar
