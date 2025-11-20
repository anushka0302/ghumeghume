const Booking = require("../models/Booking.js");

//create new booking
 const createBooking=async(req,res)=>{
    const newBooking=new Booking(req.body)
    try{
const savedBooking=await newBooking.save()
res.status(200).json({success:true,message:'Your tour is booked',data:savedBooking})
    }catch(err){
        res.status(500).json({success:false,message:'Internal Server Error'})
    }
};
// get single booking
 const getBooking=async(req,res)=>{
    const id=req.params.id

    try{
const book=await Booking.findById(id)
res.status(200).json({success:true,message:'successful',data:book})

    }catch(err){
        res.status(404).json({success:false,message:'not found'})
    }
}
// get all booking
 const getAllBooking=async(req,res)=>{
   

    try{
const books=await Booking.find()
res.status(200).json({success:true,message:'successful',data:books})

    }catch(err){
        res.status(500).json({success:false,message:'Internal Server Error'})
    }
}
module.exports={
createBooking,getBooking,getAllBooking
}