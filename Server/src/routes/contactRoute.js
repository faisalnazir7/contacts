const express=require('express');
const { createContact, getAllContacts } = require('../controllers/contactController');
const router=express.Router();
const protect = require("../middleware/authMiddleware");

router.post('/contacts', protect, createContact);
router.get('/contacts', protect, getAllContacts);


module.exports=router