import React from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from "react-icons/ai";

const Model = ({ onClose, isOpen, children }) => {
  console.log("on modal we have : ",isOpen)
  return createPortal(
    isOpen && (
      <div className="backdrop-blur h-screen w-screen absolute top-0 z-40 grid place-items-center">
        <div className="relative z-50 min-h-[200px] min-w-[80%] bg-white p-4 m-auto">
          <div className="flex justify-end">
            <AiOutlineClose onClick={onClose} className="self-end text-2xl cursor-pointer" />
          </div>
          {children}
        </div>
        
      </div>
    ),
    document.getElementById("model-root")
  );
};

export default Model;