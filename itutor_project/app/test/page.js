'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function test() {

  const [getTopic, setTopics] = useState([])
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  
  
  useEffect(() => {
    const search = async () => {
      let response = await fetch("http://localhost:3100/api/course/getCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // ส่ง cookies ไปด้วย
        body: JSON.stringify({ course_id: id }),
      });
      const result = await response.json();
      setTopics(result.data)
    }
    search();
  }, []);
 
  return (
    <div className="h-screen">
      <div className="bg-orange-500 flex justify-between items-center p-8">
        <div className="logo">
          <img className="h-14" src="/nav-bar.svg" alt="logo" />
        </div>
      </div>

      {/*รับมาจากที่ Tutor สร้างไว้*/}
      {getTopic.map((topic) => (
        <div key={topic.course_id}>
          {/*รับมาจากที่ Tutor สร้างไว้*/}
          <div className="my-11 text-center">
            <h1 className="text-4xl bold">{topic.course_name}</h1>
            <h2 className="text-xl mt-4">Limited to {topic.course_max_pax} seats</h2>
            <h2 className="text-xl mt-4">@{topic.course_place}</h2>
          </div>

          <div className="mt-6 px-4 py-2 flex justify-center">
            <p className="w-[140vh] break-words">{topic.course_desc}</p>
          </div>

          <div className="flex justify-center">
            <div className="bg-[#E4EDF5] p-4 w-[140vh] rounded-lg flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-400 w-16 h-16 rounded-full"></div>
                <div>
                  <p className="font-bold">{topic.firstname} {topic.lastname}</p>
                  <p className="text-gray-500">@ITLADKRABANG</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex justify-center items-center">
            <a href="">
              <button className="w-40 p-2 rounded-[30px] bg-[#f8573c]">JOIN</button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}