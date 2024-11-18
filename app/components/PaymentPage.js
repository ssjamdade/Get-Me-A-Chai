"use client"
import React, { useEffect } from 'react'
import Script from 'next/script'
import Razorpay from 'razorpay'
import { initiate } from '../actions/userAction'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { fetchuser, fetchpayments } from '../actions/userAction'

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const [paymentform, setpaymentform] = useState({})
    const [currentuser, setcurrentuser] = useState({})
    const [dbpayments, setDbpayments] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        let u = await fetchuser(username)
        setcurrentuser(u)

        let payments = await fetchpayments(username)
        // Add this to check what `fetchpayments` is returning
        if (payments) {
            setDbpayments(payments)
        } else {
            console.log("No payments found or error in fetching payments.")
        }

    }
    useEffect(() => {
        console.log("Current User Updated:", currentuser); // Log whenever currentuser updates
    }, [currentuser]);

    let pay = async (amount) => {

        let a = await initiate(amount, username, paymentform)
        let orderid = a.id
        var options = {
            "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        setpaymentform({ name: "", amount: "", message: "" })
        var rzp1 = new Razorpay(options);
        rzp1.open();
        // This line opens the Razorpay payment modal or popup on the user's browser, allowing them to proceed with the payment.
        // When the modal opens, the user will be able to select their preferred payment method (e.g., credit card, debit card, UPI, net banking, etc.) and complete the transaction.

    }


    const handlechange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })

    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            {/* frontend code */}
            <div>

                <div className='relative w-full'>
                    <img className='w-full h-80' src={`${currentuser.coverpic}`} alt="" />
                </div>
                <div className='profile absolute bottom-[35%] left-[46%] border-2 rounded-full border-white  '>
                    <img className='border-3 border-white rounded-full w-[120px] h-[120px] object-fit  ' src={`${currentuser.profilepic}`} alt="" />
                </div>
                <div className='mt-20 flex-col text-center'>

                    <div className='text-xl font-bold'>@{username}</div>
                    <div className='text-slate-300'>Creating Animated art for VTT's</div>
                    <div className='text-slate-400'>13,925 members . 89 posts . $17,740/release</div>
                </div>

                <div className="payment flex gap-5 justify-center container mx-auto my-10">
                    <div className="supporters w-[80%] bg-slate-900  rounded-lg p-10">
                        <h2 className='text-2xl font-bold mb-5'>Supports</h2>
                        <ul className='space-y-3'>
                            {dbpayments.length == 0 && <div>No payments yet</div>}
                            {dbpayments.map((i) => {

                                return <div key={i.oid}>
                                    <div className='text-lg text-gray-300'>{i.name} has donated <span className='font-bold und'>₹{i.amount}</span> with a message "{i.message}"</div>

                                </div>
                            })}
                        </ul>
                    </div>

                    <div className="makepayment w-[80%] bg-slate-900 rounded-lg p-10">
                        <h2 className='text-2xl font-bold mb-5'>Make Payment</h2>

                        <div className='flex-col flex gap-3'>
                            <input onChange={handlechange} value={paymentform.name} name='name' className='rounded-md bg-slate-800 p-2 px-4' placeholder='Enter Name' type="text" />
                            <input onChange={handlechange} value={paymentform.message} name='message' className='rounded-md bg-slate-800 p-2 px-4' placeholder='Enter Message' type="text" />
                            <input onChange={handlechange} value={paymentform.amount} name='amount' className='rounded-md bg-slate-800 p-2 px-4' placeholder='Enter Payment' type="text" />
                            <button onClick={() => { pay(paymentform.amount) }} className='text-white bg-gradient-to-br from-blue-600 to-green-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 w-1/4'>Pay</button>
                        </div>
                        <div className='payoptions space-x-3 my-3 w-fit'>
                            <button onClick={() => { pay(1000) }} className='rounded-md hover:bg-slate-700  bg-slate-800 text-gray-300 p-2 '>Pay ₹10</button>
                            <button onClick={() => { pay(2000) }} className='rounded-md hover:bg-slate-700  bg-slate-800 text-gray-300 p-2 '>Pay ₹20</button>
                            <button onClick={() => { pay(3000) }} className='rounded-md hover:bg-slate-700  bg-slate-800 text-gray-300 p-2 '>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
