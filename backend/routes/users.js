const express = require('express');
const { deleteUser, getAllUser, getSingleUser, updateUser } = require('../controllers/userController.js');
const { verifyUser } = require('../utils/verifyToken.js');

const router=express.Router()

//update user
router.put('/:id',verifyUser,updateUser);


//delete user
router.delete('/:id',verifyUser,deleteUser);


//get single user
router.get('/:id', verifyUser,getSingleUser);


//get all  user
router.get('/',verifyUser,getAllUser);


module.exports = router;