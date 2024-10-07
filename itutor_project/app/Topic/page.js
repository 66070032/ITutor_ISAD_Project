"use client";

import React from "react";


export default function Topic() {
  return (
    <div className="h-screen">
      <div className="bg-orange-500 flex justify-between items-center p-8">
        <div className="logo">
          <img className="h-14" src="/nav-bar.svg" alt="logo" />
        </div>
      </div>

      {/*รับมาจากที่ Tutor สร้างไว้*/}
      <div className="my-11 text-center">
        <h1 className="text-4xl bold">ISAD</h1>
        <h2 className="text-xl mt-4">Limited to 20 seats</h2>
        <h2 className="text-xl mt-4">Creative and Ideation Fl.2</h2>
      </div>
      <div className="mt-6 px-4 py-2 flex justify-center">
        <p className="w-[140vh] break-words">
        topicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptio
        </p>
      </div>

      <div className="flex justify-center ">
      <div className="bg-[#E4EDF5] p-4 w-[140vh] rounded-lg flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-400 w-16 h-16 rounded-full"></div>
            <div>
                <p className="font-bold">Name Surname</p>
                <p className="text-gray-500">@ITLADKRABANG</p>
            </div>
        </div>
      </div>
      </div>
      <div className=" mt-14 flex justify-center items-center">
        <a href=""><button className="w-40 p-2 rounded-[30px] bg-[#f8573c]">JOIN</button></a>
      </div>
    </div>
  );
}
