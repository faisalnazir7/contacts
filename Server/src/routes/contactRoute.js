const express=require('express');
const { createContact, getAllContacts, getContactById, updateContactById, deleteContactById } = require('../controllers/contactController');
const router=express.Router();
const protect = require("../middleware/authMiddleware");

router.post('/contacts', protect, createContact);
router.get('/contacts', protect, getAllContacts);
router.get('/contacts/:id', protect, getContactById);
router.patch('/contacts/:id', protect, updateContactById);
router.delete('/contacts/:id', protect, deleteContactById);


module.exports=router