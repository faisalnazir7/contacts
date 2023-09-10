const express=require('express');
const { createContact } = require('../controllers/contactController');
const router=express.Router();
const protect = require("../middleware/authMiddleware");

router.post('/contacts', protect, createContact);


module.exports=router