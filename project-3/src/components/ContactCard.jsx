import { deleteDoc , doc} from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from '../config/firebase';
import AddUpdateContact from "./AddUpdateContact"
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';


const ContactCard = ({ contact }) => {
   const {isOpen, onClose, onOpen} = useDisclouse();

  const deleteFunction = async (id) => {
    try {
  
      await deleteDoc(doc(db, "contacts", id))
      toast.success("contact deleted successfully");
      console.log("contact deleted successfully")
    } catch (error) {
      console.log("Error for deleting",error);
    }
  }
  return (
    <>
    <div className="bg-yellow flex justify-between items-center p-2 rounded-lg">
      <div className="flex gap-1">
        <FaRegUserCircle className="text-4xl text-orange" />
        <div>
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-sm">{contact.email}</p>
        </div>
      </div>
      <div className="flex text-3xl gap-2">
        <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
        <IoMdTrash onClick={() => deleteFunction(contact.id)} className="text-orange cursor-pointer" />
      </div>
    </div>
    <AddUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default ContactCard;
