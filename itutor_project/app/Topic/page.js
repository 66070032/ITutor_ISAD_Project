'use client';

import React from 'react';
import { Irish_Grover } from "next/font/google";

const irishGrover = Irish_Grover({
  weight: "400",
  subsets: ["latin"],

});
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
                <h1 className>ISAD</h1>
                <h2>Limited to 20 seats</h2>
                <h2>Creative and Ideation Fl.2</h2>
                {/*<p>topicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopic
                    <br></br>descriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicde<br></br>scriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescriptiontopicdescription</p>*/}
            </div>
        </div>

    )
}