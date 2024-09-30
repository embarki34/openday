import React from 'react';
import RetroButton from './RetroButton';

const RetroForm: React.FC = () => {


  return (
    <form  className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block mb-1">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full bg-white border-2 border-[#808080] border-r-[#ffffff] border-b-[#ffffff] px-2 py-1 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full bg-white border-2 border-[#808080] border-r-[#ffffff] border-b-[#ffffff] px-2 py-1 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-1">Message:</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full bg-white border-2 border-[#808080] border-r-[#ffffff] border-b-[#ffffff] px-2 py-1 focus:outline-none"
        ></textarea>
      </div>
      <div>
        <RetroButton>Send</RetroButton>
      </div>
    </form>
  );
};

export default RetroForm;