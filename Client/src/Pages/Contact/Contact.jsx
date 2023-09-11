import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';

export default function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);

  // Function to fetch contact details by ID
  const fetchContactDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/contacts/${id}`, {
        method: 'GET',
        credentials: 'include', // Include cookies if needed
      });
      if (!response.ok) {
        console.error(`Error fetching contact details: ${response.status}`);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setContact(data.contact);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contact details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4">
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src="https://i.ibb.co/4pDNDk1/avatar.png" // Replace with the contact's photo URL
                  alt=""
                />
                <div className="ml-4">
                  <h1 className="text-2xl font-semibold">{contact.name}</h1>
                  <p className="text-gray-600">{contact.email}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-700 text-sm">
                  Phone: {contact.phone}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
