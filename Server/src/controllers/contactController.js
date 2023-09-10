const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Function to handle creating a new contact

const createContact = asyncHandler(async (req, res) => {
    const {
      name,
      email,
      phone
    } = req.body;
  
    const createdBy = req.user._id; // Assuming user ID is available in the request (e.g., after authentication)
  
    // Create a new contact using the contactModel
    const newContact = new Contact({
      name,
      email,
      phone,
      createdBy
    });
  
    // Save the new contact to the database
    const savedContact = await newContact.save();
  
    if (newContact) {
      res
        .status(201)
        .json({
          message: "Contact created successfully",
          contact: savedContact,
        });
    } else {
      res.status(500);
      throw new error("Internal server error");
    }
  });

  // Function to retrieve all contacts
const getAllContacts = asyncHandler(async (req, res) => {
    // Retrieve all contacts from the database
    const contacts = await Contact.find({ createdBy: req.user._id });
  
    res.status(200).json({ contacts });
  });

  module.exports = {
    createContact,
    getAllContacts
  };