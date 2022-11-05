import React from "react";
//
const AddClient = () => {
  return (
    <form className="w-full h-1/2 bg-slate-400">
      <div className="w-full text-center text-xl underline p-2 mt-5">
        <h2>Add Client</h2>
      </div>
      <div className="w-full text-center p-2 mt-5">
        <input
          className="w-3/4 p-2 rounded-lg"
          type="text"
          placeholder="Enter Client Name..."
        />
      </div>
      <div className="w-full text-center mt-5">
        <button type="submit" className="bg-white p-2 rounded-lg">
          Add Client
        </button>
      </div>
    </form>
  );
};
//
export default AddClient;
