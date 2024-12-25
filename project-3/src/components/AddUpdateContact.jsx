import React from "react";
import Model from "./Model";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Field, Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";


const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AddUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  
  const addContact = async (contact) => {
         try {
            const contactsRef = collection(db, "contacts"); 
            await addDoc(contactsRef, contact); 
            onClose(); 
            toast.success("Contact added successfully");
          } catch (error) {
          console.error("Error adding contact:", error);
             toast.error("Failed to add contact");
             } 
           };

             const updateContact = async (values) => {
               try {
            if (!contact.id) {
              throw new Error("Document ID is missing. Cannot update contact.");
              }
             const contactRef = doc(db, "contacts", contact.id); 
              console.log("Updating contact with ID:", contact.id, values);

             await updateDoc(contactRef, {
               name: values.name,
               email: values.email,
                  });

            onClose(); 
            toast.success("Contact updated successfully");
           } catch (error) {
          console.error("Error updating contact:", error);
         toast.error("Failed to update contact");
       }
     };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={contactSchemaValidation}
        initialValues={
          isUpdate
            ? { name: contact.name, email: contact.email } 
            : { name: "", email: "" } 
        }
             onSubmit={(values) => {
               if (isUpdate) {
               updateContact(values); 
              } else {
              addContact(values); 
            }
          }}>
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border" />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <button
              type="submit"
              className="self-end border-2 bg-orange px-3 py-1.5 mt-5">
              {isUpdate ? "Update Contact" : "Add Contact"}
            </button>
          </Form>
        )}
      </Formik>
    </Model>
  );
};

export default AddUpdateContact;
