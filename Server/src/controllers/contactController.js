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

  // Function to retrieve a specific contact by ID
const getContactById = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
  
    // Find the contact by ID for the authenticated user
    const contact = await Contact.findOne({
      _id: contactId,
      createdBy: req.user._id,
    });
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    res.status(200).json({ contact });
  });

  // Function to update an existing contact by ID
const updateContactById = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
    const { name, email, phone } = req.body;
  
    // Find the contact by ID for the authenticated user
    const contact = await Contact.findOne({
      _id: contactId,
      createdBy: req.user._id,
    });
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    // Update the contact fields
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
  
    // Save the updated contact
    const updatedContact = await contact.save();
  
    res.status(200).json({ message: "Contact updated successfully", contact: updatedContact });
  });

  // Function to delete a contact by ID
const deleteContactById = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
  
    // Find the contact by ID for the authenticated user
    const contact = await Contact.findOne({
      _id: contactId,
      createdBy: req.user._id,
    });
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    // Remove the contact from the database
    await Contact.deleteOne({ _id: contactId });
  
    res.status(204).json({ message: "Contact deleted successfully" });
  });

  module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContactById,
    deleteContactById
  };