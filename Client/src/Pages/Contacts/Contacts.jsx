import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const navigator = useNavigate();

  const searchData = (search) => {
    const filteredContacts = contacts?.filter(
      (contact) =>
        contact?.name?.toLowerCase().includes(search?.toLowerCase()) ||
        contact?.email?.toLowerCase().includes(search?.toLowerCase()) ||
        contact?.phone?.toLowerCase().includes(search?.toLowerCase())
    );
    return filteredContacts;
  };

  // Function to open the edit modal
  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setSelectedContact({});
    setShowEditModal(false);
  };

  // Function to update a contact
  async function updateContact(contactId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/contacts/${contactId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedContact), // Send the updated contact data
        }
      );

      if (response.ok) {
        // Contact updated successfully, close the modal and fetch updated data
        closeEditModal();
        getContacts();
      } else {
        console.error("Contact not updated");
      }
    } catch (error) {
      console.error("Error during contact update:", error);
    }
  }

  async function deleteContact(id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/contacts/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        navigator("/contacts");
        // After successful deletion, fetch the updated contact list
        getContacts();
      } else {
        console.error("Not deleted");
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  }

  const getContacts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/contacts`,
        {
          method: "GET",
          credentials: "include", // Include cookies
        }
      );
      if (!response.ok) {
        console.error(`Error fetching contacts: ${response.status}`);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setContacts(data.contacts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Contacts</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all contacts. You can add new contacts, edit, or
              delete existing ones.
            </p>
          </div>
          <div className="flex ml-6 mr-10 md:w-[250px]">
            <input
              className="w-full h-10 rounded-full bg-gray-100 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-30 disabled:opacity-50"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {search && (
              <div className="fixed w-[250px] mt-12 z-30 border-solid border-2 rounded-xl shadow-md p-4 bg-white">
                {searchData(search).length > 0 ? (
                  searchData(search)?.map((result) => (
                    <div
                      key={result._id}
                      onClick={() => {
                        navigator(`/contacts/${result._id}`);
                        setSearch("");
                      }}
                    >
                      <h1>
                        <b>{result?.name}</b>
                      </h1>
                      <p className="text-sm mt-1 mb-2">{result?.phone}</p>
                    </div>
                  ))
                ) : (
                  <p className="font-semibold">No results found.</p>
                )}
              </div>
            )}
          </div>

          <div>
            <Link to="/addcontact">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new Contact
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                {loading ? (
                  <p className="text-center py-4">Loading...</p>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          <span>Name</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Phone
                        </th>
                        <th scope="col" className="relative px-4 py-3.5">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {searchData(search)?.length > 0 ? (
                        searchData(search)?.map((contact) => (
                          <tr
                            key={contact._id}
                            className="divide-x divide-gray-200"
                          >
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://i.ibb.co/4pDNDk1/avatar.png"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {contact.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-12 py-4">
                              <div className="text-sm text-gray-900">
                                {contact.email}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900">
                                {contact.phone}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
  <button
    onClick={() => {
      const shouldDelete = window.confirm("Are you sure you want to delete this contact?");
      if (shouldDelete) {
        deleteContact(contact._id);
      }
    }}
    className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
  >
    Delete
  </button>
</td>
<td className="whitespace-nowrap px-4 py-4">
  <button
    onClick={() => openEditModal(contact)}
    className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
  >
    Edit
  </button>
</td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No contacts found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Edit Contact Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container">
            <div className="modal-content bg-white rounded-lg shadow-lg p-4">
              <div className="modal-header">
                <h3 className="text-lg font-semibold">Edit Contact</h3>
                <button onClick={closeEditModal} className="modal-close">
                  &#215;
                </button>
              </div>
              <div className="modal-body">
                {/* Edit contact form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent the default form submission behavior
                    updateContact(selectedContact._id); // Call the updateContact function
                  }}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-semibold"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={selectedContact.name}
                      onChange={(e) =>
                        setSelectedContact({
                          ...selectedContact,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-semibold"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={selectedContact.email}
                      onChange={(e) =>
                        setSelectedContact({
                          ...selectedContact,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-semibold"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={selectedContact.phone}
                      onChange={(e) =>
                        setSelectedContact({
                          ...selectedContact,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-lg focus:outline-none hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
