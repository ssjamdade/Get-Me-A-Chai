"use server"

import Razorpay from "razorpay"
import Payment from "../models/payment"
import User from "../models/user"
import connectDB from "../db/connectDb"
import username from "../[username]/page"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();
    
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

    // instance.orders.create({
    //     amount: 50000,
    //     currency: "INR",
    //     receipt: "receipt#1",
    //     notes: {
    //         key1: "value3",
    //         key2: "value2"
    //     }
    // })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }

    let x = await instance.orders.create(options)

    // X will be getting this respone
    // {
    //     "id": "order_IluGWxBm9U8zJ8",
    //     "entity": "order",
    //     "amount": 5000,
    //     "amount_paid": 0,
    //     "amount_due": 5000,
    //     "currency": "INR",
    //     "receipt": "rcptid_11",
    //     "offer_id": null,
    //     "status": "created",
    //     "attempts": 0,
    //     "notes": [],
    //     "created_at": 1642662092
    // }

    //create a payment object which shows a pending payment in the database
    await Payment.create({oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message})

    return x
}

export const fetchuser = async (username) => {
    console.log(username)
  await connectDB()
    
    let u = await User.findOne({username: username})
    let user = u.toObject({flattenObjectsIds: true})
    return user
}

export const fetchpayments = async (username) => {
    //find all the payments by decreasing order of amounts and flatten object ids
    const payments = await Payment.find({ to_user: username }).sort({amount: -1}).lean();
    return payments || []; // Return an empty array if no payments are found
}

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    // If the username is updated, check if username is available
    if(oldusername !== ndata.username){
        let u = await User.findOne({username: ndata.username})
        if(u){

            return "Username already exists"
        }
    }
    await User.updateOne({email: ndata.email}, ndata)
}
