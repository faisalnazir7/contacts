const express=require('express');
const { createContact, getAllContacts, getContactById } = require('../controllers/contactController');
const router=express.Router();
const protect = require("../middleware/authMiddleware");

router.post('/contacts', protect, createContact);
router.get('/contacts', protect, getAllContacts);
router.get('/contacts/:id', protect, getContactById);


module.exports=router