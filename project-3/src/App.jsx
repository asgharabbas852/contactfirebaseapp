import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddUpdateContact from "./components/AddUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer } from "react-toastify";
import NotFoundContact from "./components/NotFoundContact";


const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

          useEffect(() => {
            const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contactList);
        });
      } catch (error) {
        console.error(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value)
      );

      setContacts(filteredContacts);
    });
  };

  return (
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="relative flex items-center flex-grow">
          <FiSearch className="absolute text-3xl text-white ml-1" />
          <input
            onChange={filterContacts}
            type="text"
            className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-10"
            placeholder="Search..."
          />
        </div>
        <AiFillPlusCircle
          onClick={onOpen}
          className="text-5xl text-white cursor-pointer"
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {contacts.length === 0 ? (
          <NotFoundContact />
        ) : (
          contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)
        )}
      </div>
      <AddUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer />
    </div>
  );
};

export default App;
